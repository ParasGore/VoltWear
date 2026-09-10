"""fp16 two-pass img2img from the drawn silhouettes (short step counts; fp16 img2img collapses past ~16 steps on Metal)."""
import torch, time, os, sys, gc
from PIL import Image
from diffusers import StableDiffusionImg2ImgPipeline, DPMSolverMultistepScheduler
S="/private/tmp/claude-501/-Users-kushu-Ashu-Proj/314608fd-66d8-4277-9cdf-74fa338e66fb/scratchpad"
OUT=f"{S}/gen"
pipe = StableDiffusionImg2ImgPipeline.from_pretrained("Lykon/dreamshaper-8", torch_dtype=torch.float32, safety_checker=None, requires_safety_checker=False, local_files_only=True)
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config, use_karras_sigmas=True, algorithm_type="dpmsolver++", final_sigmas_type="sigma_min")
pipe = pipe.to("mps"); pipe.set_progress_bar_config(disable=True)
pipe.vae = pipe.vae.to(torch.float32)
def encode(img):
    t = pipe.image_processor.preprocess(img).to("mps", torch.float32)
    with torch.no_grad():
        return (pipe.vae.encode(t).latent_dist.mean * pipe.vae.config.scaling_factor).to(torch.float32)
def decode(lat):
    with torch.no_grad():
        img = pipe.vae.decode(lat.to(torch.float32) / pipe.vae.config.scaling_factor).sample
    return pipe.image_processor.postprocess(img, output_type="pil")[0]
STYLE=", empty garment on an invisible mannequin, clothing only, matte dark charcoal grey technical knit fabric, visible fabric texture and soft folds, thin copper-orange stitching along the seams, dark navy studio backdrop, soft studio lighting, photorealistic product photography, sharp focus, high detail"
NEG="woman, girl, man, person, human, model, body, skin, neck, shoulders, arms, legs, face, head, hair, mannequin head, text, watermark, logo, cartoon, illustration, painting, blurry, deformed, white background, bright, shiny plastic"
JOBS={
 "bra":  "product photo of a charcoal grey racerback sports bra with an elastic under-band"+STYLE,
 "pants":"product photo of charcoal grey compression leggings, athletic training pants"+STYLE,
 "suit": "product photo of a one-piece charcoal grey full-body compression suit with long sleeves and full-length legs"+STYLE,
}
names=sys.argv[1].split(","); seeds=[int(x) for x in sys.argv[2].split(",")]
for name in names:
    init=encode(Image.open(f"{S}/sil/{name}.png").convert("RGB").resize((512,800), Image.LANCZOS))
    for sd in seeds:
        fn=f"{OUT}/{name}-32-{sd}.png"
        if os.path.exists(fn): continue
        t=time.time(); g=torch.Generator("cpu").manual_seed(sd)
        lat=pipe(JOBS[name], negative_prompt=NEG, image=init, strength=0.55, num_inference_steps=24, guidance_scale=7.5, generator=g, output_type="latent").images
        ok = "ok" if (not torch.isnan(lat).any().item() and lat.float().std().item()>0.2) else "COLLAPSED"
        decode(lat).save(fn); print(name, sd, round(time.time()-t,1), ok, flush=True)
        gc.collect(); torch.mps.empty_cache()
print("DONE", flush=True)

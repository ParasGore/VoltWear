"""fp16 txt2img with IP-Adapter, ONE image per process. usage: tx1.py out seed W H ipscale "prompt" "neg" """
import sys, torch
from PIL import Image
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
out,seed,W,H,ip,prompt,neg=sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),int(sys.argv[4]),float(sys.argv[5]),sys.argv[6],sys.argv[7]
REF=Image.open("/Users/kushu/Ashu Proj/VoltWear-main/assets/images/products/tee-front.png").convert("RGB")
pipe=StableDiffusionPipeline.from_pretrained("Lykon/dreamshaper-8", torch_dtype=torch.float16, safety_checker=None, requires_safety_checker=False, local_files_only=True)
pipe.scheduler=DPMSolverMultistepScheduler.from_config(pipe.scheduler.config, use_karras_sigmas=True, algorithm_type="dpmsolver++", final_sigmas_type="sigma_min")
pipe.load_ip_adapter("h94/IP-Adapter", subfolder="models", weight_name="ip-adapter_sd15.bin", local_files_only=True); pipe.set_ip_adapter_scale(ip)
pipe=pipe.to("mps"); pipe.set_progress_bar_config(disable=True); pipe.vae=pipe.vae.to(torch.float32)
lat=pipe(prompt, negative_prompt=neg, ip_adapter_image=REF, width=W, height=H, num_inference_steps=30, guidance_scale=7, generator=torch.Generator("cpu").manual_seed(seed), output_type="latent").images
with torch.no_grad(): dec=pipe.vae.decode(lat.to(torch.float32)/pipe.vae.config.scaling_factor).sample
img=pipe.image_processor.postprocess(dec, output_type="pil")[0]; img.save(out)
print("saved", out, "std", round(lat.float().std().item(),2), flush=True)

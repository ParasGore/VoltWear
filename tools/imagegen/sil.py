# Draw rough garment silhouettes (dark fabric + copper seam lines) on the studio backdrop
# to drive img2img so Stable Diffusion renders garments only, no model.
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
S="/private/tmp/claude-501/-Users-kushu-Ashu-Proj/314608fd-66d8-4277-9cdf-74fa338e66fb/scratchpad/sil"
W,H=576,896
def backdrop(w,h):
    y,x=np.mgrid[0:h,0:w]; cx,cy=w/2,h*0.45
    r=np.sqrt(((x-cx)/(w*0.7))**2+((y-cy)/(h*0.7))**2)
    base=np.array([9,14,17]); glow=np.array([26,34,40])
    img=base+(glow-base)*np.clip(1-r,0,1)[...,None]
    return Image.fromarray(img.astype('uint8'))
def shade(mask_img, w, h, light=(0.38,0.3)):
    """dark grey fabric with soft directional shading inside mask"""
    m=np.asarray(mask_img).astype(float)/255
    y,x=np.mgrid[0:h,0:w]
    lx,ly=light[0]*w,light[1]*h
    d=np.sqrt(((x-lx)/w)**2+((y-ly)/h)**2)
    tone=np.clip(0.36-0.25*d,0.10,0.36)          # 0..1 brightness
    # edge darkening (fake curvature): distance to mask edge
    edge=np.asarray(mask_img.filter(ImageFilter.GaussianBlur(14))).astype(float)/255
    tone=tone*(0.55+0.45*np.clip(edge*1.4-0.2,0,1))
    rgb=np.stack([tone*255*0.92,tone*255*0.95,tone*255*1.0],-1)
    return rgb, m
TEX=Image.open("/Users/kushu/Ashu Proj/VoltWear-main/assets/images/products/tee-front.png").convert("RGB").crop((150,150,240,330))
def texture(w,h):
    """tile only the fine grain of the reference knit (high-pass), so no lighting bands are copied"""
    t=TEX.resize((TEX.width*2,TEX.height*2), Image.LANCZOS)
    a=np.asarray(t).astype(float); lo=np.asarray(t.filter(ImageFilter.GaussianBlur(5))).astype(float)
    hp=(a-lo)/max(lo.mean(),1)                       # zero-centred grain
    tile=Image.fromarray(((hp*0.5+0.5).clip(0,1)*255).astype('uint8'))
    canvas=Image.new("RGB",(w,h))
    for y in range(0,h,tile.height):
        for x in range(0,w,tile.width):
            canvas.paste(tile if ((x//tile.width+y//tile.height)%2==0) else tile.transpose(Image.FLIP_LEFT_RIGHT),(x,y))
    g=(np.asarray(canvas).astype(float)/255-0.5)*2   # back to zero-centred
    return 1.0+g*0.9
def compose(bg, mask, lines):
    w,h=bg.size
    rgb,m=shade(mask,w,h)
    rgb=rgb*np.clip(texture(w,h),0.7,1.3)
    out=np.asarray(bg).astype(float)*(1-m[...,None])+rgb*m[...,None]
    img=Image.fromarray(out.clip(0,255).astype('uint8'))
    d=ImageDraw.Draw(img)
    for pts in lines: d.line(pts,fill=(186,124,74),width=2,joint="curve")
    return img.filter(ImageFilter.GaussianBlur(0.5))

def mirror(pts,cx=W/2): return [(2*cx-x,y) for x,y in pts]

# ---- Sports bra (front) ----
bg=backdrop(W,H); mask=Image.new("L",(W,H),0); d=ImageDraw.Draw(mask)
half=[(166,436),(176,360),(196,312),(222,286),(222,180),(252,180),(252,300),(270,318),(288,326)]
d.polygon(half+mirror(half)[::-1],fill=255)
d.rectangle([166,436,410,488],fill=255)                        # under-band
mask=mask.filter(ImageFilter.GaussianBlur(1.2))
neck=[(252,300),(270,318),(288,326)]; arm=[(176,360),(196,312),(222,286)]
lines=[[(166,436),(410,436)],[(166,486),(410,486)],neck,mirror(neck),arm,mirror(arm),
       [(237,182),(237,298)],mirror([(237,182),(237,298)]),[(288,326),(288,436)]]
compose(bg,mask,lines).save(f"{S}/bra.png")

# ---- Pants (front) ----
bg=backdrop(W,H); mask=Image.new("L",(W,H),0); d=ImageDraw.Draw(mask)
d.rectangle([182,70,394,118],fill=255)                            # waistband
leg=[(182,118),(288,118),(292,330),(284,560),(276,830),(196,830),(198,560),(186,330)]
d.polygon(leg,fill=255); d.polygon(mirror(leg),fill=255)
mask=mask.filter(ImageFilter.GaussianBlur(1.2))
lines=[[(182,118),(394,118)],[(190,125),(194,330),(202,560),(206,826)],mirror([(190,125),(194,330),(202,560),(206,826)]),
       [(288,120),(288,300)],[(210,470),(270,470)],mirror([(210,470),(270,470)])]
compose(bg,mask,lines).save(f"{S}/pants.png")

# ---- Full-body suit (front) : long-sleeve top + legs ----
bg=backdrop(W,H); mask=Image.new("L",(W,H),0); d=ImageDraw.Draw(mask)
top=[(288,60),(322,58),(352,72),(402,92),(430,116),(462,330),(452,470),(416,470),(414,280),(410,420),(394,440),(288,440)]
d.polygon(top+mirror(top)[::-1],fill=255)
d.ellipse([254,42,322,84],fill=0)                                  # neck opening
d.rectangle([182,440,394,470],fill=255)
leg=[(182,470),(288,470),(292,610),(284,730),(278,870),(202,870),(202,730),(190,610)]
d.polygon(leg,fill=255); d.polygon(mirror(leg),fill=255)
mask=mask.filter(ImageFilter.GaussianBlur(1.2))
sh=[(322,60),(352,72),(402,92),(430,116)]; sl=[(430,116),(446,220),(458,330),(450,466)]; side=[(414,280),(410,420)]
lines=[sh,mirror(sh),sl,mirror(sl),side,mirror(side),[(288,86),(288,440)],[(182,470),(394,470)],
       [(190,474),(196,610),(206,868)],mirror([(190,474),(196,610),(206,868)])]
compose(bg,mask,lines).save(f"{S}/suit.png")
print("silhouettes ok")

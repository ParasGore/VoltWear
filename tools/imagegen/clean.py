"""Clean a silhouette-driven render: keep the garment (dilated silhouette mask), replace everything
outside it with a clean studio backdrop matched to the reference crops. usage: clean.py name src out"""
import sys
from PIL import Image, ImageFilter, ImageDraw
import numpy as np
S="/private/tmp/claude-501/-Users-kushu-Ashu-Proj/314608fd-66d8-4277-9cdf-74fa338e66fb/scratchpad"
name,src,out=sys.argv[1:4]
im=Image.open(src).convert("RGB"); W,H=im.size
sil=Image.open(f"{S}/sil/{name}.png").convert("RGB").resize((W,H))
# garment mask = where the silhouette differs from its own backdrop, dilated and feathered
def backdrop(w,h):
    y,x=np.mgrid[0:h,0:w]; cx,cy=w/2,h*0.45
    r=np.sqrt(((x-cx)/(w*0.7))**2+((y-cy)/(h*0.7))**2)
    base=np.array([9,14,17]); glow=np.array([26,34,40])
    return base+(glow-base)*np.clip(1-r,0,1)[...,None]
bg=backdrop(W,H)
diff=np.abs(np.asarray(sil).astype(float)-bg).sum(axis=2)
mask=Image.fromarray((diff>18).astype('uint8')*255)
mask=mask.filter(ImageFilter.MaxFilter(15)).filter(ImageFilter.GaussianBlur(6))
m=np.asarray(mask).astype(float)/255
a=np.asarray(im).astype(float)
# also soften the render's own backdrop tone inside the feather zone toward the clean backdrop
outp=a*m[...,None]+bg*(1-m[...,None])
Image.fromarray(outp.clip(0,255).astype('uint8')).save(out)
print("cleaned", out)

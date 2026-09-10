"""clean + crop a silhouette-driven render to the garment and save the web asset.
usage: finalize.py name src aspect(w:h)"""
import sys, subprocess
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
S="/private/tmp/claude-501/-Users-kushu-Ashu-Proj/314608fd-66d8-4277-9cdf-74fa338e66fb/scratchpad"
DST="/Users/kushu/Ashu Proj/VoltWear-main/assets/images/products"
name,src,aspect=sys.argv[1],sys.argv[2],sys.argv[3]
aw,ah=[float(x) for x in aspect.split(":")]
tmp=f"{S}/gen/{name}-final-clean.png"
subprocess.run([sys.executable,f"{S}/clean.py",name,src,tmp],check=True)
im=Image.open(tmp).convert("RGB"); W,H=im.size
sil=Image.open(f"{S}/sil/{name}.png").convert("L").resize((W,H))
m=np.asarray(sil)>40                          # garment pixels in the silhouette
ys,xs=np.where(m); x0,x1,y0,y1=xs.min(),xs.max(),ys.min(),ys.max()
gw,gh=x1-x0,y1-y0
# margins: 14% around the garment, then expand to the requested aspect
cx,cy=(x0+x1)/2,(y0+y1)/2; bw,bh=gw*1.45,gh*1.3
if bw/bh < aw/ah: bw=bh*aw/ah
else: bh=bw*ah/aw
box=(cx-bw/2,cy-bh/2,cx+bw/2,cy+bh/2)
# pad with clean backdrop colour if the box leaves the image
pad=int(max(0,-box[0],-box[1],box[2]-W,box[3]-H))+2
if pad:
    canvas=Image.new("RGB",(W+2*pad,H+2*pad),(9,14,17)); canvas.paste(im,(pad,pad)); im=canvas
    box=tuple(v+pad for v in box)
out=im.crop(tuple(int(round(v)) for v in box))
out=out.resize((1000,int(round(1000*ah/aw))),Image.LANCZOS)
out=out.filter(ImageFilter.UnsharpMask(radius=1.4,percent=55,threshold=2))
out=ImageEnhance.Color(out).enhance(0.9)
out.save(f"{DST}/{name}.jpg",quality=90,optimize=True,progressive=True)
print("final", name, out.size)

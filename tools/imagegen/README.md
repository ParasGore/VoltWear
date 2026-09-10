# Image generation scripts

Used to produce `assets/images/products/{bra,pants,suit,pod,seam,gym,desk}.jpg` locally with
Stable Diffusion (DreamShaper 8) on an Apple-silicon Mac. The T-shirt and long-sleeve images are
crops of the two supplied renders and were not generated.

| Script | Purpose |
|---|---|
| `sil.py` | Draws the sports bra, pants and full-body silhouettes with copper seam lines and knit grain on the studio backdrop |
| `i2i5.py` | Float32 img2img from a silhouette (`i2i5.py <name> <seed>`), one image per process |
| `tx1.py` | Float16 text-to-image with IP-Adapter style reference (pod, seam, gym, desk), one image per process |
| `clean.py` | Keeps the garment region of a render and re-composites it on a clean backdrop |
| `finalize.py` | `clean.py` + crop to the garment + resize/sharpen → `assets/images/products/<name>.jpg` |
| `batch2.sh` | The batch that produced the candidates |

Paths inside the scripts point at the session scratchpad and the venv at `~/new collection/.venv`;
edit `S=` / `cd` lines before re-running. Run one image per process: the Metal allocator grows
across iterations and the machine starts swapping.

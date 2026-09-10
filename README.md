# VOLTWEAR
### Clothing that measures how you move.

Landing page and supporting pages for Voltwear smart clothing: garments with insulated conductive
thread sewn over their structural seams, a removable Bluetooth micro-pod that reads the capacitive
change as the seams deform, and an app for passive posture nudges and active workout tracking.

---

## Run it

```bash
python3 -m http.server 4321
```

Then open <http://localhost:4321>. No build step, no dependencies.
Add `?static` to the URL to render every section immediately (no scroll-reveal, hero not locked
to the viewport). This is also what reduced-motion users get.

---

## Landing page (`index.html`)

| Section | Contents |
|---|---|
| Hero | Stationary product photography of the T-shirt with a front / side / back switch |
| How it works | Thread → capacitive deformation → micro-pod → app, with seam and pod close-ups |
| Garments | T-shirt, long-sleeve, sports bra, pants, full-body tracker |
| Where the seams run | The two supplied three-view sheets (`include 1.jpeg`, `include 2.jpeg`) |
| The app | Passive posture mode and active workout mode |
| Pricing | Basic ₹14,999 · Elite ₹39,999 |
| Plain facts | What the sensing does and does not measure, washing, data |

The landing page contains no fabricated metrics, testimonials, awards or investor material.

### Images

`assets/images/products/`

| File | Source |
|---|---|
| `tee-*.png`, `tee-views.jpg` | Cropped from the supplied `include 2.jpeg` |
| `ls-*.png`, `longsleeve-views.jpg` | Cropped from the supplied `include 1.jpeg` |
| `bra.jpg`, `pants.jpg`, `suit.jpg` | Generated locally with Stable Diffusion (DreamShaper 8, img2img from drawn garment silhouettes carrying the copper seam lines; garment isolated and re-composited on a clean backdrop) |
| `desk.jpg`, `gym.jpg` | Back-view crops of the supplied renders (posture and workout mode cards) |
| `pod.jpg` | Generated locally with Stable Diffusion (DreamShaper 8, text-to-image) |
| `seam.jpg` | Crop of the supplied back view refined with Stable Diffusion img2img |

### Source

```
assets/
├── css/core.css        shared design system
├── css/landing.css     landing-page layer: copper accent, photo frames, product grid, pricing
├── js/core.js          logo mark, nav, scroll reveal (with static fallback)
├── js/landing.js       front / side / back viewer, hover-to-back on product cards
├── js/shirt.js         parametric SVG garment engine (still used by product.html)
└── js/marketing.js     marketing-page visual generators
```

---

## Other pages

`product.html`, `app.html`, `brand.html` and `marketing.html` are the earlier concept pages and
still contain the original speculative content. Only the navigation (Investors link and the $99
reserve button) was updated on those pages.

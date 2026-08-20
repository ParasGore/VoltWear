# VOLTWEAR — 3D Render & Image Prompt Package
**Version 1.0 · Production art direction for CG, photography and generative pipelines**

---

## 0. Global art direction (prepend to every prompt)

> Photoreal product photography of a black technical athletic garment. Obsidian near-black
> background (#05070A). Single electric-lime accent (#C8FF3C) and cool blue (#2F80FF) only —
> no other colours in frame. Matte fabric, no plastic sheen. Extremely clean, minimal,
> Apple-keynote restraint. Shot on Phase One IQ4, 85 mm, f/8, ISO 64. Colour graded cool,
> lifted blacks at 4%, no bloom, no lens flare, no text overlays, no watermark.
> Sharp micro-detail on knit structure. 8K.

**Negative prompt (all sets):**
`cartoon, illustration, 3d render look, plastic, glossy, oversaturated, rainbow, neon pink, purple haze, cluttered background, props, logos of other brands, text, watermark, hands, face closeup, low resolution, blurry, jpeg artifacts, distorted anatomy, extra limbs`

**Engine settings**
| Engine | Settings |
|---|---|
| Blender / Cycles | 4096 samples, denoise OptiX, filmic → AgX, 3-light HDRI-off studio |
| KeyShot 12 | Interior mode, 4096 samples, Ray-traced first-bounce, Product HDRI 4k @ 0.6 |
| Octane | Path tracing, 3000 spp, AI denoiser, ACES |
| Midjourney v7 | `--ar 3:2 --style raw --stylize 180 --chaos 4 --quality 2` |
| Flux / SDXL | CFG 3.5, 40 steps, DPM++ 2M Karras, refiner 0.25 |

---

## RENDER SET A — Dark studio, keynote
*Purpose: hero imagery, PDP, keynote slides, press kit.*

### A-01 · Hero three-quarter float
> A black smart compression T-shirt floating in a void, no mannequin, gently inflated as if worn
> by an invisible body, rotated 22° to camera left. Fine electric-lime conductive traces are
> knitted into the outer fabric, branching from a small titanium module at the left rib up across
> the chest to the shoulders like dendrites. Seven small circular sensor pads sit flush with the
> knit. Lighting: one 4×6 ft softbox at 45° camera-left, two vertical rim strips behind — one lime,
> one cool blue — separating the garment from the black. Deep falloff, 70% of the frame is pure
> black. Centred composition with generous negative space above.
> `--ar 4:5`

### A-02 · Macro — electrode array
> Extreme macro, 1:1, of a dry biopotential electrode on black technical knit: a 22 mm circle of
> soft grey silicone covered in a precise hexagonal array of micro-pillars, ringed by a thin lime
> conductive trace disappearing into the fabric weave. Shallow depth of field, focus falls off after
> 6 mm. Single hard key from camera right, black card fill left. The knit structure is razor sharp.
> `--ar 3:2`

### A-03 · Macro — VoltCore hub docked
> Macro of a 38 × 24 × 7 mm bead-blasted titanium module magnetically docked into a recessed
> pocket on black technical fabric. One 2 mm lime LED breathing at the corner. Chamfered edges
> catching a single specular line. The fabric around it is untouched — no stitching, no seam,
> the pocket is welded. Product photography, top-down 15° tilt.
> `--ar 1:1`

### A-04 · Fabric detail — trace serpentine
> Macro of silver-plated conductive yarn knitted in a serpentine wave through matte black nylon,
> stretched slightly so the serpentine opens. The silver catches a cool blue rim light; a faint
> lime glow implies current. Abstract, almost topographic. Fills the frame edge to edge.
> `--ar 16:9`

### A-05 · Family lineup
> Four black technical garments floating in a row against a void — a compression T-shirt, a sports
> bra, compression shorts and a full training suit — each with the same lime conductive trace
> language and the same titanium module. Even spacing, identical scale relationship, single
> overhead softbox with individual rim lights. Catalogue precision.
> `--ar 21:9`

### A-06 · The exploded hero (for keynote transition)
> The same black smart shirt, with a soft blue X-ray ghost of its internal sensor layer visible
> at 20% opacity through the fabric — 31 small nodes and a branching bus. Floating, front elevation,
> perfectly symmetrical, dead centre. Void background.
> `--ar 4:5`

---

## RENDER SET B — Athlete in motion
*Purpose: campaign film stills, OOH, paid social, PDP lifestyle band.*

Casting note: **effort, never joy.** No smiling, no eye contact with camera, no group shots.
Diverse casting across all three environments. Visible sweat is mandatory. Real athletes.

### B-01 · Pre-dawn road runner
> A distance runner on wet black asphalt at 5 a.m., shot from a low front three-quarter, mid-stride,
> frozen at 1/2000 s. They wear a black smart compression T-shirt whose fine lime conductive traces
> catch the sodium streetlight behind them. Rain in the air, breath visible. Deep shadows, one
> practical light source. The body is sharp, the background is a wash of bokeh streetlight.
> Cinematic, desaturated except the lime accent.
> `--ar 21:9`

### B-02 · Strength hall, single north window
> A powerlifter at the bottom of a heavy back squat in a bare concrete strength hall, lit only by
> one large north-facing window at frame right. Black smart compression shirt, lime traces visible
> across the lats and erector spinae, sweat through the fabric. Shot from behind and slightly low.
> Dust in the light beam. Grain intact, no fill light — let the shadow side go black.
> `--ar 4:5`

### B-03 · Alpine climb, golden hour
> A cyclist out of the saddle on a steep alpine switchback at golden hour, shot from the front
> with a 200 mm lens compressing the mountain behind. Black smart compression shirt under an open
> jersey, lime traces just visible on the chest. Backlit, rim-lit edge, heat haze off the tarmac.
> `--ar 21:9`

### B-04 · The desk athlete
> An engineer at a standing desk in a dim office at night, three monitors as the only light source,
> shot from behind at shoulder height. They wear a black smart shirt under an open overshirt; a
> faint mint-green trace runs up the spine. Posture visibly corrected — shoulders back. Quiet,
> unglamorous, honest.
> `--ar 3:2`

### B-05 · Clinical / team environment
> A sports scientist reviewing a live muscle-activation display on a sideline tablet while an
> athlete in a black smart compression shirt performs a single-leg hop test behind them, out of
> focus. Overcast daylight, neutral grade, documentary framing. No branding visible on the tablet.
> `--ar 16:9`

### B-06 · Recovery, morning
> An athlete sitting on the edge of a bed at first light, elbows on knees, head down, still wearing
> the black smart shirt from the night before. Window light only, long shadows, warm-cool contrast.
> Stillness. The frame should feel like the day after, not the day of.
> `--ar 4:5`

---

## RENDER SET C — Exploded engineering
*Purpose: technology page, investor deck, patent illustrations, CES vitrine graphics.*

### C-01 · Six-layer Z explosion
> Technical exploded-view render of a smart garment separated into six parallel layers along the
> vertical axis, 22° isometric, on a pure black background with a 4% white blueprint grid.
> Top to bottom: (1) black knit outer shell, (2) a plane of branching silver conductive traces,
> (3) a translucent violet dielectric film, (4) a plane of 31 small circuit islands on lime
> polyimide, (5) a plane of red-pink circular electrode pads, (6) a soft mint inner liner.
> Each layer semi-transparent so all six read at once. Thin leader lines to empty callout boxes.
> Precision instrument aesthetic.
> `--ar 3:4`

### C-02 · Hub cutaway
> Cross-section render of a 38 mm titanium wearable module: silicon-anode pouch cell, a small SoC
> die, a 6-axis IMU package, spring-pin dock contacts, and an IPX7 gasket, all labelled with thin
> leader lines. Ghosted titanium shell at 15% opacity. Black background, blue and lime accents only.
> `--ar 16:9`

### C-03 · Signal path diagram render
> A 3D render of a single conductive pathway leaving an electrode, running as a serpentine through
> knit fabric, joining a 31-lane fan-out bus and terminating at a docked module. The current is
> visualised as a lime pulse travelling the path. Everything else is matte black. Macro depth of
> field, dramatic single light.
> `--ar 21:9`

### C-04 · Sensor placement anatomy
> Anatomical rendering of a human torso in translucent grey, front and back, with 31 glowing sensor
> nodes positioned on the muscle groups and spine, colour-coded: red-pink at the heart, lime on the
> muscles, blue along the spine, amber at two thermal points. Medical-illustration precision on a
> black field. No skin texture, no face.
> `--ar 16:9`

### C-05 · Stretch test
> High-speed capture of the conductive-trace fabric being stretched to 180% between two clamps,
> the serpentine geometry opening like a spring, a lime current pulse continuing to travel through
> it uninterrupted. Laboratory aesthetic, black background, single hard light, motion frozen.
> `--ar 3:2`

---

## SET D — Packaging
### D-01 · Primary carton, hero
> A matte soft-touch black rigid box, 340 × 240 × 62 mm, three-quarter view on black, with a small
> lime hot-foil V-shaped logo mark at top left and a blind-deboss pattern of fine branching traces
> across the lid. Single softbox top-left, subtle gradient falloff, one crisp specular line along
> the foil. Apple product photography restraint.
> `--ar 4:3`

### D-02 · Unboxing sequence, top-down
> Flat-lay top-down of the opened box: black garment folded on a charcoal felt cradle showing the
> chest trace array, an uncoated card calibration certificate, and a titanium module seated in an
> anodised aluminium tray. Perfectly square to camera, even soft light, generous margins.
> `--ar 1:1`

### D-03 · Elite aluminium case
> A bead-blasted natural anodised aluminium case with a machined recess holding a black garment and
> a titanium module, lid open at 60°, engraved serial "001 / 2000" and a small V mark. On black.
> Jewellery-grade lighting: one large soft source plus two narrow specular strips.
> `--ar 3:2`

---

## SET E — App & UI imagery
### E-01 · Device composition
> Three floating smartphones at a slight 12° tilt in a dark void, each showing a dark-mode fitness
> interface: a large lime progress ring reading 87, a red-pink live ECG waveform, and a mint spine
> visualisation. Soft blue rim light on the device edges, faint reflections below. Glassmorphic UI
> panels. No visible brand logos on the devices.
> `--ar 16:9`

### E-02 · Watch on wrist, dark gym
> Close crop of a smartwatch on a wrist in a dark gym, screen showing a large lime number and a
> thin muscle-activation bar chart. Only the screen lights the frame. Shallow depth of field.
> `--ar 1:1`

---

## SET F — Environment & booth
### F-01 · CES island stand
> An architectural visualisation of a 12 × 9 m trade-show island stand: polished black resin floor,
> a 6 m cubic LED volume in the centre displaying a giant lime and red-pink live biometric
> visualisation, six black carbon-fibre changing pods around the perimeter, a 3 m backlit acrylic
> vitrine holding an exploded garment, and a suspended black sign reading nothing (text to be added
> in post). Wide-angle eye-level view, evening exhibition-hall ambience, warm perimeter wash.
> `--ar 16:9`

### F-02 · Retail shop-in-shop
> A 4 m retail bay: matte black wall, six garments hung on thin machined-aluminium rails, one
> backlit vitrine with an exploded garment, one screen showing live telemetry. Lime accent lighting
> under the shelf edge only. Minimal, museum-like.
> `--ar 3:2`

---

## Shot list summary

| ID | Set | Deliverable | Priority | Format |
|---|---|---|---|---|
| A-01 | Studio | Website hero, PDP hero | P0 | 4:5 + 16:9 crop |
| A-02/03 | Studio | Technology section macros | P0 | 3:2, 1:1 |
| A-05 | Studio | Ecosystem / roadmap | P1 | 21:9 |
| B-01 | Motion | Campaign hero, OOH | P0 | 21:9 + 9:16 |
| B-02 | Motion | Gym edition PDP | P0 | 4:5 |
| B-04 | Motion | Posture edition PDP | P1 | 3:2 |
| C-01 | Engineering | Technology page centrepiece | P0 | 3:4 |
| C-04 | Engineering | Investor deck, patent figs | P1 | 16:9 |
| D-01/02 | Packaging | PDP, press kit, unboxing | P0 | 4:3, 1:1 |
| E-01 | App | App section, app store | P0 | 16:9 |
| F-01 | Environment | CES pre-promotion, press | P2 | 16:9 |

**Total P0 deliverables: 9 hero images + 4 macro inserts.**
Estimated CG production: 3 weeks with two artists in Blender + KeyShot, or 4 days with a
generative-first pipeline plus retouching.

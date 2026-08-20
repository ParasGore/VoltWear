# VOLTWEAR
### The body, instrumented.

A complete brand, product, digital and go-to-market system for an AI-powered smart electrical
fitness garment — built as a live, self-contained website plus a full documentation set.

---

## Run it

```bash
python3 -m http.server 4321
```

Then open <http://localhost:4321>. No build step, no dependencies, no network required
(web fonts fall back gracefully offline).

---

## What's here

### Website — five pages

| Page | Contents |
|---|---|
| **[index.html](index.html)** | Landing page: 3D drag-rotatable garment hero with live floating telemetry, thesis, interactive six-layer fabric-stack explorer, capabilities, the four editions, WHOOP / Apple Watch comparison, app showcase, beta testimonials, and the full investor brief (market size, unit economics, revenue projection, 2026–2030 roadmap) |
| **[product.html](product.html)** | Industrial design: all four editions with front / rear / side technical elevations, toggleable sensor-placement maps with callouts, conductive-pathway design language, exploded six-layer assembly, textile bill of materials, stretch and ventilation mapping, sizing, manufacturing |
| **[app.html](app.html)** | Four complete mobile screens at full fidelity — Dashboard, Workout (live ECG + muscle heat map), Posture (spine reconstruction), AI Coach — plus the mobile design system and accessibility commitments |
| **[brand.html](brand.html)** | Naming study (VoltWear assessed + five stronger alternatives, scored), logo architecture with four explorations, lockups and clear space, full colour system with hex values, typography, voice, application |
| **[marketing.html](marketing.html)** | Packaging renders and unboxing sequence, six taglines, three campaign concepts, out-of-home, social system, CES booth plan and elevation, and the five-product future ecosystem |

### Documentation

| Document | Contents |
|---|---|
| **[docs/BRANDBOOK.md](docs/BRANDBOOK.md)** | Positioning, naming study and recommendation, logo rules, complete colour and type specification, voice, motion, application checklist |
| **[docs/PRODUCT-SPEC.md](docs/PRODUCT-SPEC.md)** | Platform architecture, sensor taxonomy, signal chain, the four editions compared, VoltCore hub, full textile BOM, durability, sizing, manufacturing, regulatory |
| **[docs/RENDER-PROMPTS.md](docs/RENDER-PROMPTS.md)** | Production-ready prompts for Render Sets A (dark studio), B (athlete in motion), C (exploded engineering), plus packaging, app and environment — with engine settings, negative prompts and a prioritised shot list |
| **[docs/GTM-CAMPAIGN.md](docs/GTM-CAMPAIGN.md)** | Launch architecture, campaign concepts, channel plan and budget split, OOH, social system, packaging, CES booth, ecosystem roadmap, unit economics, risk register |

### Source

```
assets/
├── css/core.css        design system — tokens, components, motion, responsive
├── js/shirt.js         parametric garment render engine (every technical view is generated
│                       from one geometry source: paths, trace networks, sensor maps)
├── js/core.js          logo system, scroll reveal, counters, 3D turntable, chart helpers
└── js/marketing.js     packaging, OOH, social, booth and ecosystem visual generators
```

Every visual in this project — every garment view, sensor map, package render, booth plan, app
screen and chart — is hand-built vector art or live UI. There are no image files and no
external dependencies.

---

## Key design decisions

**On the name.** VOLTWEAR scores 6.4/10 as a *platform* name — "Volt" is the strongest available
root in the category, but the `-wear` suffix caps the company at apparel exactly when the roadmap
reaches an OS and a licensing business. The recommendation is to **ship as VOLTWEAR and secure
AXON** for the Series C platform rebrand. The identity system is built so that swapping the
wordmark breaks nothing.

**On the palette.** 74% obsidian, 18% elevated surface, 5% platinum type, 3% Volt. If the accent
exceeds 3% of a composition, the composition is wrong.

**On the product.** Nothing specified requires a manufacturing process that does not already exist
at scale. The one genuinely novel element — motion-artefact cancellation using six IMUs to model
the fabric's own movement — is also the reason every previous smart shirt failed and this one
doesn't.

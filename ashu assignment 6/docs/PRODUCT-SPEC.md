# VOLTWEAR — Product & Engineering Specification
**DVT-3 · April 2026 · Design intent, not release-to-manufacture**

---

## 1. Platform architecture

All four editions share one platform. What changes between them is sensor population, compression
grade and finishing.

```
SKIN ── CoolTouch liner (0.18 mm)
     ── Dry electrode array   (0.34 mm)   Ag/AgCl micro-pillar silicone
     ── Sensor plane          (0.71 mm)   31 polyimide islands
     ── TPU dielectric film   (0.06 mm)   isolation + IPX7
     ── Silver-yarn bus       (0.19 mm)   31 lanes, serpentine
     ── AeroKnit outer shell  (0.42 mm)   118 gsm
                              ═══════
                       TOTAL  1.90 mm
```

### 1.1 Sensor taxonomy
| Type | Count (Elite) | Spec |
|---|---|---|
| ECG electrode | 5 | Dry Ag/AgCl, 512 Hz, clinical 5-lead morphology, <12 kΩ dry |
| EMG array | 16 | Surface differential, 1 kHz, 20–450 Hz band, CMRR 110 dB |
| 9-axis IMU | 6 | Accel ±16 g / gyro ±2000 dps / mag, 200 Hz fusion |
| Thermistor | 2 | NTC, skin + ambient delta, ±0.05 °C |
| Respiration | 2 | Conductive-elastomer strain gauge, tidal volume |
| Hub | 1 | VoltCore — see §3 |

### 1.2 Signal chain
1. Dry electrode → 0.19 mm serpentine silver yarn → fan-out at left rib
2. 24-bit ΔΣ AFE, 110 dB CMRR, active shielding on the ECG lanes
3. **Motion-artefact cancellation** — the six IMUs build a mechanical model of the *fabric*, and
   an adaptive LMS filter subtracts garment motion from the biosignal. −38 dB artefact rejection,
   0.4 ms end-to-end latency. This is the core patent family (14 granted, 31 pending).
4. On-device NPU inference (VOLT-1) → BLE 5.4 to phone / UWB to team receiver

---

## 2. The four editions

| | 01 Performance Athlete | 02 Gym Performance | 03 Posture | 04 Elite |
|---|---|---|---|---|
| **For** | Runners, cyclists, triathletes | Strength, CrossFit, hypertrophy | Desk workers, students, engineers, gamers | Pro teams, federations |
| **Nodes** | 10 | 10 | 9 | 31 |
| **ECG** | 3-lead | 2-lead | 1-lead | 5-lead clinical |
| **EMG** | 2 ch (core) | 6 ch (prime movers) | 6 ch (postural) | 16 ch (full trunk) |
| **IMU** | 1 sternal | 2 (T7, L3) | 3 (C7, T4, L3) | 6 (C7→L3 + sternal) |
| **Respiration** | 2 bands | — | 1 band | 2 bands |
| **Fit** | Athletic, −4 cm ease | Locked, −6 cm ease | Everyday, −1 cm ease | Bespoke, 14-point scan |
| **Weight (M)** | 132 g | 148 g | 118 g | 156 g |
| **Battery** | 9 days | 9 days | 11 days | 9 days (Pro cell) |
| **Signature metric** | Ventilatory threshold, live | Muscle share per set | Cervical angle, live | Full-trunk neuromuscular map |
| **Price** | $349 | $349 | $279 | $1,290 |

### 2.1 Sensor placement rationale

**01 Performance Athlete.** Sensor mass is pushed high onto the sternum and low onto the obliques,
keeping the mid-torso clear for a race vest or hydration pack. The two respiration bands are the
signature: direct tidal-volume measurement gives ventilatory threshold without a mask. The sternal
IMU sits at the body's centre of mass — a cleaner cadence and ground-contact-time source than any
foot pod.

**02 Gym Performance.** EMG density concentrates on the pressing and pulling chains — pectoralis
(clavicular and sternal heads separately), anterior deltoid, latissimus, mid-trapezius and the
full erector column. Compression is one grade firmer so electrodes hold contact through a bench
arch or a rack pull. The L3 IMU fires a haptic pulse the instant the lumbar spine leaves neutral
under load.

**03 Posture.** All intelligence moves to the posterior chain: cervical tilt at C7, kyphosis at T4,
lordosis at L3, plus EMG proving the classic desk pattern — overworked upper traps, dormant lower
traps. Softer hand, longer body, −1 cm ease so it disappears under a shirt. Two haptic actuators
sit between the scapulae; the intervention is a tap, never a notification.

**04 Elite.** Everything, with nothing removed for cost. Numbered run of 2,000, delivered in an
anodised aluminium case with a calibration certificate signed by the technician who tested it.

---

## 3. VoltCore hub

| Parameter | Spec |
|---|---|
| Dimensions | 38 × 24 × 7 mm |
| Mass | 6 g (Standard) / 9 g (Pro, titanium shell) |
| Compute | 0.9 TOPS NPU + Cortex-M55, 512 MB buffer |
| Cell | 210 mAh silicon-anode, 9-day duty cycle, 40 min to 80% |
| Radio | BLE 5.4, UWB (Pro), ANT+ |
| Ingress | IP68, 1.5 m / 30 min |
| Dock | 6-pin spring contact, magnetic retention 12 N |
| Offline storage | 34 h continuous full-rate capture |

The hub is **field-replaceable and generation-independent** — a Gen 2 hub will dock into a Gen 1
garment. The garment is the consumable; the intelligence is not.

---

## 4. Materials — bill of materials

| Zone | Construction | Composition | Weight | Function |
|---|---|---|---|---|
| Chest & upper back | Warp-knit power mesh | 72% recycled PA6.6 / 28% Lycra® Sport | 142 gsm | Holds 4.2 kPa electrode contact pressure |
| Side ribs & underarm | Laser-perforated jacquard | 78% PA6.6 / 22% elastane | 96 gsm | Ventilation — 2,140 perforations per side |
| Sleeve & shoulder | 4-way AeroKnit™ | 78% recycled nylon / 22% Lycra® | 118 gsm | Unrestricted scapular glide |
| Lumbar band | Double jersey + TPU rib | Nylon / elastane / TPU | 168 gsm | Anchors L3 IMU against ride-up |
| Next-to-skin liner | Micro-modal jersey | Jade-mineral modal + Polygiene® | 84 gsm | Thermal comfort, odour control |
| Signal bus | 3-yarn plated serpentine | Silver-plated nylon, 12 Ω/m | — | 31-lane conductive routing |
| Electrode pads | Moulded micro-pillar array | Ag/AgCl-loaded silicone | — | Dry biopotential contact |
| Hem & cuff | Silicone-dot elastic | Elastane / silicone print | — | Zero migration during sprint |
| Elite reinforcement | Bonded ripstop grid | Dyneema® fibre | +22 gsm | Abrasion + tear resistance |

### 4.1 Stretch mapping
| Axis | Recovery | Zone |
|---|---|---|
| Lateral (rib expansion) | 180% | Side panels |
| Diagonal (rotation) | 165% | Oblique panels |
| Vertical (reach) | 150% | Shoulder / sleeve |
| Electrode zone | 108% — deliberately locked | Chest, spine |

### 4.2 Ventilation — 11 mapped zones
Driven by a thermal study of 240 athletes under load. Mid-back uses open jacquard at 4.1 mm;
lateral ribs and underarm gusset use graduated 0.8 mm laser perforations. Sternum and lumbar are
**sealed** — they are sensor zones and perforation would compromise contact.

### 4.3 Integration method
Sensor islands are **ultrasonically welded** to the dielectric film — never stitched. No needle
holes means no failure initiation points. The island-and-serpentine architecture guarantees the
rigid parts never stretch and the stretchy parts never carry a chip.

### 4.4 Durability
| Test | Result |
|---|---|
| Machine wash (40 °C, hub removed) | 60 cycles |
| Signal drift @ 60 washes | < 4% |
| Martindale abrasion | 40,000 rubs |
| Sweat corrosion (ISO 105-E04) | Grade 4–5 |
| Stretch cycling | 50,000 cycles @ 150% |
| Expected service life | 14 months / 400 sessions |

---

## 5. Sizing

Nine sizes, two fits. **Electrode position is graded independently of the size grade** — a size S
and a size XXL both place the V5 electrode on the fifth intercostal space.

| Size band | Chest | Electrode grade |
|---|---|---|
| XS / S / M | 81–99 cm | Grade A · −8 mm pitch |
| L / XL | 99–114 cm | Grade B · nominal |
| XXL / 3XL | 114–130 cm | Grade C · +11 mm pitch |
| Tall S–XL | +6 cm torso | Grade B · +6 mm drop |

---

## 6. Manufacturing

| Parameter | Value |
|---|---|
| Primary facility | Bình Dương, Vietnam · ISO 13485 |
| Second source | Porto, Portugal (EU volume) |
| Process | Santoni seamless knit → TPU lamination → ultrasonic weld → test → pack |
| Takt time | 41 s / garment |
| Line capacity | 1.2 M units / year at full ramp |
| Yield at DVT-3 | 96.4% |
| BOM cost @ 100k | $146 |
| Gross margin @ $349 | 58% |

**Nothing in this design requires a process that does not already exist at scale.** Santoni
seamless knitting, TPU lamination and ultrasonic welding are standard performance-apparel
operations. The only novel step is conductive-yarn plating, and the tooling is owned.

---

## 7. Regulatory

| Claim | Pathway | Status |
|---|---|---|
| Heart rate, fitness | Wellness exemption | Cleared to ship |
| ECG rhythm / AFib notification | FDA 510(k) Class II | Submitted Q1 2026 |
| EMG for clinical assessment | 510(k) | 2027 target |
| EU | MDR Class IIa via notified body | In progress |
| Data | HIPAA-compliant infrastructure, GDPR, on-device inference by default | Live |

**Standing disclaimer:** VOLTWEAR is not a medical device. FDA 510(k) pending for ECG indications.

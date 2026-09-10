#!/bin/bash
S="/private/tmp/claude-501/-Users-kushu-Ashu-Proj/314608fd-66d8-4277-9cdf-74fa338e66fb/scratchpad"
cd "/Users/kushu/new collection"
for n in pants suit; do for sd in 1 2 3 4; do ./.venv/bin/python "$S/i2i5.py" "$n" "$sd" 2>&1 | grep -E "^(pants|suit) |Error"; done; done
NEGP="text, letters, watermark, logo, person, human, face, head, skin, hands, arms, cartoon, illustration, painting, blurry, deformed, duplicate, neon, rainbow, bright colors, white background"
NEGL="text, letters, watermark, logo, face, eyes, cartoon, illustration, painting, blurry, deformed, extra limbs, bad anatomy, neon, rainbow, low quality"
run(){ [ -f "$S/gen/$1-$2.png" ] && return; ./.venv/bin/python "$S/tx1.py" "$S/gen/$1-$2.png" "$2" "$3" "$4" "$5" "$6" "$7" 2>&1 | grep -E "saved|Error" | sed "s|saved.*/|$1 $2 |"; }
for sd in 41 42 43; do run pod $sd 768 512 0.35 "macro product photo of a small matte black rounded electronic pod with a thin LED ring, clipped into a fabric dock at the collar of a charcoal grey technical knit shirt, copper conductive stitching leading into the dock, dark background, shallow depth of field, studio lighting, photorealistic, sharp focus" "$NEGP"; done
for sd in 51 52 53; do run seam $sd 768 512 0.3 "extreme macro photo of copper-coloured conductive thread stitched in a fine zigzag along a seam of dark charcoal technical knit fabric, visible knit texture, faint warm glow along the thread, dark background, shallow depth of field, product photography, photorealistic" "$NEGP"; done
for sd in 61 62 63; do run gym $sd 576 832 0.35 "athlete seen from behind holding a barbell back squat, wearing a fitted charcoal grey compression shirt with thin copper stitching seams along the spine and shoulders, dark concrete gym, single hard light from the side, dramatic rim light, cinematic, photorealistic, 85mm lens" "$NEGL"; done
for sd in 71 72 73; do run desk $sd 576 832 0.35 "person seen from behind sitting upright at a desk in a dim office at night, wearing a fitted charcoal grey technical t-shirt with thin copper stitching along the spine and shoulders, monitor glow, shoulders back, cinematic, photorealistic, shallow depth of field" "$NEGL"; done
echo ALLDONE

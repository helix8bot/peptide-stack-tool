# Peptide Stack Tool

Customer-facing peptide stack recommendation quiz built with Next.js App Router + Tailwind CSS.

## What’s built

- Standalone page and iframe-ready embed mode
- `?embed=true` hides the standalone header/footer chrome
- Free Lite flow: 3 questions + email gate + starter results
- Full flow: 7 additional questions + paywall screen + detailed results
- Hardcoded, compliance-safe recommendation engine based on Atlas’s peptide reference
- Browser print / save-as-PDF button on full results
- Best-effort lead webhook post to:
  - `https://services.leadconnectorhq.com/hooks/peptide-stack-free`

## Quiz structure

### Free Lite
1. Primary health goal
2. Peptide experience level
3. Decision priority
4. Email capture before results

### Full analysis
Adds:
5. Current health conditions
6. Current supplements or protocols
7. Age range
8. Monthly budget
9. Delivery preference
10. Timeline expectation
11. Additional notes

## Recommendation engine

Goals currently mapped:
- Pain Recovery → BPC-157, TB-500, SS-31
- Hair Restoration → GHK-Cu, GLOW Blend, NAD+
- Body Composition → Tesamorelin, Ipamorelin, AOD-9604, CJC-1295
- Longevity → MOTS-C, Epitalon, NAD+, SS-31
- Cognitive Performance → Selank, Semax, NAD+
- Sleep & Recovery → Selank, DSIP, MOTS-C

Logic adjusts for:
- Beginner vs. advanced experience
- Lower vs. higher budget
- Delivery preference
- Relevant health-condition signals from the full intake

## Embed usage

```html
<iframe src="https://peptide-stack-tool.vercel.app?embed=true" width="100%" height="800" frameborder="0"></iframe>
```

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Production build

```bash
npm run build
npm run start
```

## Deployment

Intended for Vercel deployment.

Suggested GitHub repo:

```bash
gh repo create helix8bot/peptide-stack-tool --public --source=. --remote=origin --push
```

## Compliance note

All copy is framed for research and educational use only. The UI avoids prescriptive treatment language, dosing instructions, and outcome guarantees.

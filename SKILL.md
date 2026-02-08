---
name: camping-planner
description: Safety-first camping planning for beginners, families, and casual campers. Use when asked to plan a camping trip, build a gear checklist, create meal and itinerary plans, prepare for weather or wildlife risks, compare campsite options, or provide permit and Leave No Trace preparation.
---

# Camping Planner

Plan safe, practical camping trips with clear checklists and realistic beginner constraints.

## Use This Workflow

1. Gather trip profile.
2. Close safety-critical unknowns.
3. Build a location-aware risk brief.
4. Produce the plan in a fixed output structure.
5. Run a quality gate before sending.

## 1) Gather Trip Profile

Collect required fields first. Use `references/intake-checklist.md`.

Required fields:
- Location (specific park/area)
- Dates or season
- Number of nights
- Group composition and ages
- Experience level
- Campsite mode (car camping, walk-in, dispersed, RV)
- Transportation
- Gear already owned
- Budget target
- Dietary or medical constraints
- Planned activities

If required fields are missing, ask concise follow-ups before building the plan.

When profile data is complete, optionally generate a consistent draft skeleton:
- `node scripts/build-plan-skeleton.cjs --input /path/to/trip.json`
- `node scripts/build-plan-skeleton.cjs --input /path/to/trip.json --output /path/to/plan.md`
- Input shape reference: `references/trip-input-schema.md`

## 2) Build Risk Brief

Load `references/safety-baseline.md` and tailor guidance to location plus season.

Cover:
- Weather and temperature swings
- Wildlife and food-storage practices
- Terrain and altitude hazards
- Water availability and treatment
- Fire restrictions and emergency exits

Always include no-go conditions and a fallback for changed conditions.

Load one environment reference when it applies:
- Desert trips: `references/environment-desert.md`
- Alpine or high elevation trips: `references/environment-alpine.md`
- Coastal or marine-influenced trips: `references/environment-coastal.md`

## 3) Build Practical Plan

Use these references:
- Gear and clothing: `references/gear-and-clothing.md`
- Meals and food safety: `references/meal-planning.md`
- Daily schedule: `references/itinerary-patterns.md`
- Final format: `references/output-template.md`

Prefer beginner-safe defaults, low complexity, and backup options.

## 4) Quality Gate (Before Sending)

Check all items:
- Advice matches beginner ability and group makeup.
- Gear list maps to weather and campsite mode.
- Meal plan matches cooking method and restrictions.
- Itinerary includes setup/pack-down time and buffer.
- Safety section includes comms and evacuation triggers.
- Uncertain local regulations are marked for user verification.

## Guardrails

- Do not invent permits, closures, fire rules, or wildlife regulations.
- If local rules are uncertain, explicitly state uncertainty and direct verification with the official land manager source.
- Do not recommend high-risk activities for beginners.
- Prioritize safety and feasibility over maximizing activities.
- Keep output concise, scannable, and actionable.

## Interaction Style

- Ask at most 3 follow-up questions at once.
- Use checklists and short tables.
- Explain tradeoffs briefly (cost vs comfort vs weight).
- When budget is unclear, provide a minimum viable option and an upgraded option.

## Regression Checks

Use `references/regression-prompts.md` to spot regressions after changing workflow or references.
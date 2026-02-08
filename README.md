# Camping Planner Skill

Safety-first camping planning skill for beginners, families, and casual campers.

## Install

```bash
npx skills add https://github.com/franklins-git/camping-planner --skill camping-planner
```

This skill helps produce practical trip plans with:
- risk and safety brief
- gear and clothing checklist
- meal and hydration plan
- simple day-by-day itinerary
- pre-departure checklist

## Repository Layout

- `SKILL.md` - core workflow and guardrails
- `references/` - safety, environment, meal, gear, itinerary, and regression guidance
- `scripts/build-plan-skeleton.cjs` - deterministic markdown skeleton generator from JSON input
- `LICENSE` - MIT license

## Quick Use

When this skill is loaded in your agent, ask for trip planning help directly, for example:

- "Plan a 2-night beginner car-camping trip to Shenandoah in late May for 2 adults."
- "Build a family camping checklist for 3 nights in Big Bend in March."
- "Create a conservative itinerary with backup options for a coastal 1-night trip."

The skill will ask for missing required inputs before finalizing a full plan.

## Generate a Plan Skeleton (Optional)

Use the included script to generate a deterministic markdown template from trip JSON.

```bash
node scripts/build-plan-skeleton.cjs --input /path/to/trip.json
node scripts/build-plan-skeleton.cjs --input /path/to/trip.json --output /path/to/plan.md
```

Example input shape is documented in `references/trip-input-schema.md`.

## Safety Notes

- This skill does not invent permits, closures, or local regulations.
- Local rules must be verified with the official land manager source before departure.
- Recommendations are intentionally conservative for beginner safety.

## License

MIT. See `LICENSE`.

# Regression Prompts

Use these prompts after changing workflow, references, or output format.

## Acceptance Criteria (All Cases)

- Output follows `references/output-template.md` section order.
- Safety brief includes no-go triggers and rule verification items.
- Plan reflects beginner-safe assumptions unless user states otherwise.
- Gear and itinerary align with season and campsite mode.
- If critical data is missing, asks concise follow-up questions first.

## Prompt 1: Basic Beginner Frontcountry

"Plan a 2-night car-camping trip to Shenandoah in late May for 2 adults with no camping experience and a moderate budget."

Expected checks:
- Beginner gear baseline
- Black bear food storage mention
- Easy itinerary with setup and pack-down buffers

## Prompt 2: Family with Constraints

"Plan 3 nights in Big Bend in March for 2 adults and kids ages 7 and 9. Low budget, stargazing focus, one child has a nut allergy."

Expected checks:
- Desert risk handling
- Allergy-aware meals
- Heat and water controls

## Prompt 3: Alpine Shoulder Season

"Plan 2 nights near Rocky Mountain NP in early October for 2 adults with day-hiking experience but new to overnight camping."

Expected checks:
- Alpine weather and insulation emphasis
- Early turnaround guidance
- Conservative activity recommendations

## Prompt 4: Coastal Wind/Fog Scenario

"Plan a 1-night coastal campground trip near Big Sur in July for 1 adult beginner, arriving after work."

Expected checks:
- Coastal wind/fog adjustments
- Short first-day plan
- Dry and warm layer planning

## Prompt 5: Missing Critical Inputs

"Help me plan a camping trip in Colorado."

Expected checks:
- Requests missing required fields before full plan
- Uses no unsafe assumptions

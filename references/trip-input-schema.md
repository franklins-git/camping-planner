# Trip Input Schema for `build-plan-skeleton.cjs`

Use this shape for `--input` JSON.

```json
{
  "location": "Yosemite National Park",
  "dates_or_season": "mid-July",
  "nights": 2,
  "group": "2 adults",
  "campsite_mode": "car camping",
  "experience_level": "beginner",
  "budget_target": "moderate",
  "priority_activities": "easy hikes, stargazing",
  "assumptions": [
    "Established campground with potable water"
  ],
  "top_risks": [
    "afternoon thunderstorms"
  ],
  "prevention_actions": [
    "finish exposed hikes before noon"
  ],
  "no_go_triggers": [
    "lightning forecast during planned ridge hike"
  ],
  "rules_to_verify": [
    "current fire restrictions at campground"
  ]
}
```

## Required

- `location` (string recommended)
- `nights` (integer >= 1 recommended)

## Optional

All other fields are optional. Missing fields are filled with placeholders in the generated markdown.

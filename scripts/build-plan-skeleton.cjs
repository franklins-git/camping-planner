#!/usr/bin/env node

/* eslint-env node */

/**
 * Build a deterministic camping-plan markdown skeleton from trip JSON input.
 *
 * Usage:
 *   node scripts/build-plan-skeleton.cjs --input trip.json
 *   node scripts/build-plan-skeleton.cjs --input trip.json --output plan.md
 */

const fs = require('node:fs');
const path = require('node:path');

function parseArgs(argv) {
  const args = { input: null, output: null };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--input') {
      args.input = argv[i + 1] || null;
      i += 1;
    } else if (token === '--output') {
      args.output = argv[i + 1] || null;
      i += 1;
    }
  }
  return args;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/build-plan-skeleton.cjs --input trip.json',
    '  node scripts/build-plan-skeleton.cjs --input trip.json --output plan.md',
  ].join('
');
}

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value.filter((v) => typeof v === 'string' && v.trim().length > 0);
  }
  return [];
}

function sanitizeNights(value) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
}

function dayMealSlots(day, totalDays) {
  if (totalDays === 1) {
    return 'Lunch, Dinner';
  }
  if (day === 1) {
    return 'Lunch, Dinner';
  }
  if (day === totalDays) {
    return 'Breakfast, Lunch';
  }
  return 'Breakfast, Lunch, Dinner';
}

function toBulletList(values, placeholder) {
  if (!values.length) {
    return [`- ${placeholder}`];
  }
  return values.map((v) => `- ${v}`);
}

function toSnapshotLine(label, value, placeholder) {
  const finalValue =
    typeof value === 'string' && value.trim().length > 0 ? value.trim() : placeholder;
  return `- ${label}: ${finalValue}`;
}

function buildMarkdown(input) {
  const location =
    typeof input.location === 'string' && input.location.trim().length > 0
      ? input.location.trim()
      : '<location>';
  const datesOrSeason =
    typeof input.dates_or_season === 'string' && input.dates_or_season.trim().length > 0
      ? input.dates_or_season.trim()
      : '<dates/season>';

  const nights = sanitizeNights(input.nights);
  const totalDays = nights + 1;

  const assumptions = normalizeArray(input.assumptions);
  const topRisks = normalizeArray(input.top_risks);
  const preventionActions = normalizeArray(input.prevention_actions);
  const noGoTriggers = normalizeArray(input.no_go_triggers);
  const rulesToVerify = normalizeArray(input.rules_to_verify);

  const lines = [];
  lines.push(`# Camping Plan: ${location} (${datesOrSeason})`);
  lines.push('');
  lines.push('### Assumptions Used');
  if (assumptions.length) {
    lines.push(...assumptions.map((a) => `- ${a}`));
  } else {
    lines.push('- <none>');
  }
  lines.push('');

  lines.push('### 1. Trip Snapshot');
  lines.push(toSnapshotLine('Nights', String(nights), '<nights>'));
  lines.push(toSnapshotLine('Group', input.group, '<group details>'));
  lines.push(toSnapshotLine('Campsite mode', input.campsite_mode, '<campsite mode>'));
  lines.push(
    toSnapshotLine('Experience level', input.experience_level, '<experience level>'),
  );
  lines.push(toSnapshotLine('Budget target', input.budget_target, '<budget target>'));
  lines.push(
    toSnapshotLine('Priority activities', input.priority_activities, '<priority activities>'),
  );
  lines.push('');

  lines.push('### 2. Risk and Safety Brief');
  lines.push('- Top risks for this location/season:');
  lines.push(...toBulletList(topRisks, '<risk 1>'));
  lines.push('- Prevention actions:');
  lines.push(...toBulletList(preventionActions, '<prevention action 1>'));
  lines.push('- Evacuation or no-go triggers:');
  lines.push(...toBulletList(noGoTriggers, '<trigger 1>'));
  lines.push('- Rules to verify with official source:');
  lines.push(...toBulletList(rulesToVerify, '<rule to verify>'));
  lines.push('');

  lines.push('### 3. Gear and Clothing Checklist');
  lines.push('- Shelter and sleep');
  lines.push('- Kitchen and water');
  lines.push('- Clothing layers');
  lines.push('- Safety and navigation');
  lines.push('- Optional upgrades');
  lines.push('');

  lines.push('### 4. Meal and Hydration Plan');
  for (let day = 1; day <= totalDays; day += 1) {
    lines.push(`- Day ${day}: ${dayMealSlots(day, totalDays)}`);
  }
  lines.push('- Snack list');
  lines.push('- Storage and cleanup notes');
  lines.push('- Backup no-cook options');
  lines.push('');

  lines.push('### 5. Sample Itinerary');
  for (let day = 1; day <= totalDays; day += 1) {
    lines.push(`- Day ${day}: main activity, backup activity, turnaround time`);
  }
  lines.push('');

  lines.push('### 6. Pre-Departure Checklist');
  lines.push('- Reservations/permits verified');
  lines.push('- Forecast checked within 24-48 hours');
  lines.push('- Gear test completed');
  lines.push('- Emergency contacts and check-in plan shared');
  lines.push('');

  return `${lines.join('
')}
`;
}

function main() {
  try {
    const args = parseArgs(process.argv);
    if (!args.input) {
      process.stderr.write(`Failure: Missing --input
${usage()}
`);
      process.exit(1);
    }

    const inputPath = path.resolve(args.input);
    const raw = fs.readFileSync(inputPath, 'utf8');
    const payload = JSON.parse(raw);

    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      process.stderr.write('Failure: Input JSON must be an object.
');
      process.exit(1);
    }

    const markdown = buildMarkdown(payload);

    if (args.output) {
      const outputPath = path.resolve(.output);
      fs.writeFileSync(outputPath, markdown, 'utf8');
      process.stdout.write(`Success: Wrote plan skeleton to ${outputPath}
`);
      return;
    }

    process.stdout.write(markdown);
  } catch (err) {
    process.stderr.write(`Failure: ${err.message}
`);
    process.exit(1);
  }
}

main();

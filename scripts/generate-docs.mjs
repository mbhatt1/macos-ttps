import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const TTPS_DIR = path.join(DOCS_DIR, 'ttps');
const DATA_DIR = path.join(DOCS_DIR, '.vitepress', 'data');

const CATEGORY_LABELS = {
  collection: 'Collection',
  command_control: 'Command & Control',
  credential_access: 'Credential Access',
  defense_evasion: 'Defense Evasion',
  discovery: 'Discovery',
  discovery_advanced: 'Discovery (Advanced)',
  exfiltration: 'Exfiltration',
  impact: 'Impact',
  'impact-linux': 'Impact (Linux)',
  initial_access: 'Initial Access',
  lateral_movement: 'Lateral Movement',
  lateral_movement_linux: 'Lateral Movement (Linux)',
  persistence: 'Persistence',
  privilege_escalation: 'Privilege Escalation',
};

const CATEGORY_ORDER = [
  'initial_access',
  'persistence',
  'privilege_escalation',
  'defense_evasion',
  'credential_access',
  'discovery',
  'discovery_advanced',
  'lateral_movement',
  'lateral_movement_linux',
  'collection',
  'command_control',
  'exfiltration',
  'impact',
  'impact-linux',
];

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function escapeForFrontmatter(str) {
  if (!str) return '';
  return str.replace(/"/g, '\\"').replace(/\n/g, ' ').trim();
}

// Escape {{ }} outside of fenced code blocks so Vue doesn't parse them.
// Code blocks are handled by the VitePress markdown config (v-pre on <code>).
function escapeVueInterpolation(md) {
  const lines = md.split('\n');
  const result = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }

    if (inCodeBlock) {
      result.push(line);
    } else {
      // Outside code blocks: escape {{ }} so Vue ignores them
      result.push(line.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;'));
    }
  }

  return result.join('\n');
}

function firstLine(str) {
  if (!str) return '';
  return str.trim().split('\n')[0].trim();
}

function parseMitreId(raw) {
  const s = String(raw).replace(/^'|'$/g, '').trim();
  const spaceIdx = s.indexOf(' ');
  if (spaceIdx === -1) return { id: s, name: '' };
  return { id: s.substring(0, spaceIdx), name: s.substring(spaceIdx + 1) };
}

function discoverCategories() {
  const cats = [];
  for (const cat of CATEGORY_ORDER) {
    const dir = path.join(ROOT, cat);
    if (fs.existsSync(dir) && globSync('*.yaml', { cwd: dir }).length > 0) {
      cats.push(cat);
    }
  }
  return cats;
}

function renderTtpMarkdown(ttp) {
  const lines = [];
  const platform = ttp.requirements?.platforms?.[0]?.os || 'unknown';
  const platformLabel = platform === 'darwin' ? 'macOS' : 'Linux';

  // Frontmatter
  lines.push('---');
  lines.push(`title: "${escapeForFrontmatter(ttp.name)}"`);
  lines.push(`description: "${escapeForFrontmatter(firstLine(ttp.description))}"`);
  lines.push('outline: [2, 3]');
  lines.push('---');
  lines.push('');

  // Title + badges
  lines.push(`# ${ttp.name}`);
  lines.push('');
  const badges = [];
  badges.push(`<Badge type="info" text="${platformLabel}" />`);
  if (ttp.requirements?.superuser) {
    badges.push('<Badge type="danger" text="Superuser Required" />');
  }
  lines.push(badges.join(' '));
  lines.push('');

  // Description
  if (ttp.description) {
    const desc = ttp.description.trim();
    lines.push(desc.split('\n').map(l => `> ${l}`).join('\n'));
    lines.push('');
  }

  // Metadata
  lines.push('## Metadata');
  lines.push('');
  lines.push('| Field | Value |');
  lines.push('|-------|-------|');
  lines.push(`| **UUID** | \`${ttp.uuid}\` |`);
  lines.push(`| **Authors** | ${(ttp.authors || []).join(', ')} |`);
  lines.push(`| **Platform** | ${platformLabel} |`);
  if (ttp.requirements?.superuser) {
    lines.push('| **Superuser** | Required |');
  }
  lines.push(`| **Source** | \`${ttp._category}/${ttp._yamlFile}\` |`);
  lines.push('');

  // MITRE ATT&CK
  lines.push('## MITRE ATT&CK Mapping');
  lines.push('');
  lines.push('| Level | ID | Name |');
  lines.push('|-------|----|------|');
  if (ttp.mitre?.tactics) {
    for (const t of ttp.mitre.tactics) {
      const { id, name } = parseMitreId(t);
      lines.push(`| **Tactic** | \`${id}\` | ${name} |`);
    }
  }
  if (ttp.mitre?.techniques) {
    for (const t of ttp.mitre.techniques) {
      const { id, name } = parseMitreId(t);
      lines.push(`| **Technique** | \`${id}\` | ${name} |`);
    }
  }
  if (ttp.mitre?.subtechniques) {
    for (const t of ttp.mitre.subtechniques) {
      const { id, name } = parseMitreId(t);
      lines.push(`| **Subtechnique** | \`${id}\` | ${name} |`);
    }
  }
  lines.push('');

  // Arguments
  if (ttp.args && ttp.args.length > 0) {
    lines.push('## Arguments');
    lines.push('');
    lines.push('| Name | Type | Default | Description |');
    lines.push('|------|------|---------|-------------|');
    for (const arg of ttp.args) {
      const def = arg.default !== undefined ? `\`${String(arg.default)}\`` : '-';
      const desc = (arg.description || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
      lines.push(`| \`${arg.name}\` | ${arg.type || 'string'} | ${def} | ${desc} |`);
    }
    lines.push('');
  }

  // Steps
  if (ttp.steps && ttp.steps.length > 0) {
    lines.push('## Steps');
    lines.push('');
    for (let i = 0; i < ttp.steps.length; i++) {
      const step = ttp.steps[i];
      lines.push(`### Step ${i + 1}: ${step.name}`);
      lines.push('');

      if (step.description) {
        lines.push(step.description.trim());
        lines.push('');
      }

      if (step.inline) {
        lines.push('```bash');
        lines.push(step.inline.trim());
        lines.push('```');
        lines.push('');
      }

      if (step.create_file) {
        lines.push(`**Creates file:** \`${step.create_file}\``);
        lines.push('');
        const lang = detectLang(step.create_file, step.contents);
        lines.push(`\`\`\`${lang}`);
        lines.push((step.contents || '').trim());
        lines.push('```');
        lines.push('');
        if (step.mode) {
          lines.push(`**File mode:** \`${step.mode.toString(8).padStart(4, '0')}\``);
          lines.push('');
        }
      }

      if (step.cleanup) {
        if (typeof step.cleanup === 'string') {
          lines.push('::: info Cleanup');
          lines.push(step.cleanup);
          lines.push(':::');
        } else if (step.cleanup.inline) {
          lines.push('::: warning Cleanup');
          lines.push('```bash');
          lines.push(step.cleanup.inline.trim());
          lines.push('```');
          lines.push(':::');
        }
        lines.push('');
      }
    }
  }

  // Tests
  if (ttp.tests && ttp.tests.length > 0) {
    lines.push('## Tests');
    lines.push('');
    lines.push('| Name | Dry Run |');
    lines.push('|------|---------|');
    for (const test of ttp.tests) {
      lines.push(`| \`${test.name}\` | ${test.dry_run ? 'Yes' : 'No'} |`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function detectLang(filepath, contents) {
  if (!filepath) return 'text';
  if (filepath.endsWith('.plist')) return 'xml';
  if (filepath.endsWith('.sh')) return 'bash';
  if (filepath.endsWith('.py')) return 'python';
  if (filepath.endsWith('.json')) return 'json';
  if (filepath.endsWith('.yml') || filepath.endsWith('.yaml')) return 'yaml';
  if (contents && contents.includes('<?xml')) return 'xml';
  if (contents && contents.includes('#!/bin/bash')) return 'bash';
  return 'text';
}

function renderCategoryIndex(category, ttps) {
  const label = CATEGORY_LABELS[category] || category;
  const lines = [];

  lines.push('---');
  lines.push(`title: "${label}"`);
  lines.push('---');
  lines.push('');
  lines.push(`# ${label}`);
  lines.push('');

  // Include category README content if available
  const readmePath = path.join(ROOT, category, 'README.md');
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf-8');
    // Strip the first H1 heading
    readme = readme.replace(/^#\s+[^\n]*\n/, '');
    // Take only the introductory paragraph (before first ## heading)
    const introMatch = readme.match(/^([\s\S]*?)(?=\n##\s)/);
    if (introMatch && introMatch[1].trim()) {
      lines.push(introMatch[1].trim());
      lines.push('');
    }
  }

  // TTP listing table
  lines.push('## TTPs');
  lines.push('');
  lines.push('| # | Name | Technique | Platform |');
  lines.push('|---|------|-----------|----------|');
  for (const ttp of ttps) {
    const num = (ttp._slug.match(/^(\d+)/) || ['', '?'])[1];
    const tech = ttp.mitre?.techniques?.[0];
    const techId = tech ? parseMitreId(tech).id : '-';
    const platform = ttp.requirements?.platforms?.[0]?.os === 'darwin' ? 'macOS' : 'Linux';
    lines.push(`| ${num} | [${ttp.name}](./${ttp._slug}) | \`${techId}\` | ${platform} |`);
  }
  lines.push('');

  return lines.join('\n');
}

function indexMitre(mitreMap, ttp) {
  if (!ttp.mitre) return;

  const tactics = ttp.mitre.tactics || [];
  const techniques = ttp.mitre.techniques || [];
  const subtechniques = ttp.mitre.subtechniques || [];

  for (const rawTactic of tactics) {
    const { id: tacticId, name: tacticName } = parseMitreId(rawTactic);
    if (!mitreMap[tacticId]) {
      mitreMap[tacticId] = { id: tacticId, name: tacticName, techniques: {} };
    }

    for (const rawTech of techniques) {
      const { id: techId, name: techName } = parseMitreId(rawTech);
      if (!mitreMap[tacticId].techniques[techId]) {
        mitreMap[tacticId].techniques[techId] = {
          id: techId,
          name: techName,
          ttps: [],
          subtechniques: {},
        };
      }
      mitreMap[tacticId].techniques[techId].ttps.push({
        name: ttp.name,
        category: ttp._category,
        slug: ttp._slug,
      });

      for (const rawSub of subtechniques) {
        const { id: subId, name: subName } = parseMitreId(rawSub);
        if (!mitreMap[tacticId].techniques[techId].subtechniques[subId]) {
          mitreMap[tacticId].techniques[techId].subtechniques[subId] = {
            id: subId,
            name: subName,
            ttps: [],
          };
        }
        mitreMap[tacticId].techniques[techId].subtechniques[subId].ttps.push({
          name: ttp.name,
          category: ttp._category,
          slug: ttp._slug,
        });
      }
    }
  }
}

function buildMitreOutput(mitreMap, allTtps) {
  const tactics = Object.values(mitreMap)
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(tactic => ({
      id: tactic.id,
      name: tactic.name,
      techniques: Object.values(tactic.techniques)
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(tech => ({
          id: tech.id,
          name: tech.name,
          ttps: tech.ttps,
          subtechniques: Object.values(tech.subtechniques).sort((a, b) =>
            a.id.localeCompare(b.id)
          ),
        })),
    }));

  const techSet = new Set();
  for (const t of tactics) {
    for (const tech of t.techniques) {
      techSet.add(tech.id);
    }
  }

  const platformCounts = { darwin: 0, linux: 0 };
  let superuserCount = 0;
  for (const ttp of allTtps) {
    const os = ttp.requirements?.platforms?.[0]?.os || 'darwin';
    platformCounts[os] = (platformCounts[os] || 0) + 1;
    if (ttp.requirements?.superuser) superuserCount++;
  }

  return {
    tactics,
    stats: {
      totalTtps: allTtps.length,
      totalCategories: new Set(allTtps.map(t => t._category)).size,
      totalTactics: tactics.length,
      totalTechniques: techSet.size,
      platformBreakdown: platformCounts,
      superuserRequired: superuserCount,
    },
  };
}

function main() {
  console.log('Generating documentation from YAML TTPs...');

  ensureDirSync(TTPS_DIR);
  ensureDirSync(DATA_DIR);

  const categories = discoverCategories();
  console.log(`Found ${categories.length} categories`);

  const allTtps = [];
  const sidebarGroups = [];
  const mitreMap = {};

  for (const category of categories) {
    const categoryDir = path.join(ROOT, category);
    const yamlFiles = globSync('*.yaml', { cwd: categoryDir }).sort();
    const categoryTtps = [];

    ensureDirSync(path.join(TTPS_DIR, category));

    for (const yamlFile of yamlFiles) {
      const raw = fs.readFileSync(path.join(categoryDir, yamlFile), 'utf-8');
      let ttp;
      try {
        ttp = yaml.load(raw);
      } catch (e) {
        console.warn(`  WARN: Failed to parse ${category}/${yamlFile}: ${e.message}`);
        continue;
      }

      if (!ttp || !ttp.name) {
        console.warn(`  WARN: Skipping ${category}/${yamlFile} (no name field)`);
        continue;
      }

      const slug = yamlFile.replace('.yaml', '');
      ttp._slug = slug;
      ttp._category = category;
      ttp._yamlFile = yamlFile;

      categoryTtps.push(ttp);
      allTtps.push(ttp);

      indexMitre(mitreMap, ttp);

      const markdown = escapeVueInterpolation(renderTtpMarkdown(ttp));
      fs.writeFileSync(path.join(TTPS_DIR, category, `${slug}.md`), markdown);
    }

    // Category index
    const categoryIndex = renderCategoryIndex(category, categoryTtps);
    fs.writeFileSync(path.join(TTPS_DIR, category, 'index.md'), categoryIndex);

    // Sidebar group
    sidebarGroups.push({
      text: CATEGORY_LABELS[category] || category,
      collapsed: true,
      items: [
        { text: 'Overview', link: `/ttps/${category}/` },
        ...categoryTtps.map(ttp => ({
          text: `${(ttp._slug.match(/^\d+/) || [''])[0]} - ${ttp.name}`,
          link: `/ttps/${category}/${ttp._slug}`,
        })),
      ],
    });

    console.log(`  ${category}: ${categoryTtps.length} TTPs`);
  }

  // Write sidebar data
  fs.writeFileSync(
    path.join(DATA_DIR, 'sidebar.json'),
    JSON.stringify({ '/ttps/': sidebarGroups }, null, 2)
  );

  // Write MITRE matrix data
  const mitreOutput = buildMitreOutput(mitreMap, allTtps);
  fs.writeFileSync(
    path.join(DATA_DIR, 'mitre-data.json'),
    JSON.stringify(mitreOutput, null, 2)
  );

  console.log(`\nGenerated ${allTtps.length} TTP pages across ${categories.length} categories`);
  console.log(`MITRE: ${mitreOutput.stats.totalTactics} tactics, ${mitreOutput.stats.totalTechniques} techniques`);
  console.log('Done!');
}

main();

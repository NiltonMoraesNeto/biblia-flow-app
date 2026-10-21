import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

export function validateTasks(tasks, exists = existsSync) {
  const errors = [];
  const ids = new Set();
  const states = new Set(['todo', 'in_progress', 'review', 'done', 'blocked']);
  for (const t of tasks) {
    if (!/^M\d+-T\d{2}$/.test(t.id) || ids.has(t.id))
      errors.push(`Invalid/duplicate ID: ${t.id}`);
    ids.add(t.id);
    if (!states.has(t.status)) errors.push(`Invalid status: ${t.id}`);
    if (!t.id.startsWith(`${t.milestone}-`))
      errors.push(`Milestone mismatch: ${t.id}`);
    if (!exists(`specs/milestones/${t.milestone}.md`))
      errors.push(`Missing milestone: ${t.id}`);
    if (!t.acceptance?.length || t.acceptance.some((x) => !x.trim()))
      errors.push(`Missing acceptance: ${t.id}`);
    if (!t.specs?.length || t.specs.some((s) => !exists(s)))
      errors.push(`Missing spec: ${t.id}`);
    if (t.status === 'done' && (!t.evidence?.length || !t.owner))
      errors.push(`Done without evidence/owner: ${t.id}`);
    if (t.status === 'blocked' && !t.blockedReason?.trim())
      errors.push(`Missing blocked reason: ${t.id}`);
    if (!Array.isArray(t.dependsOn))
      errors.push(`Missing dependencies array: ${t.id}`);
  }
  const byId = new Map(tasks.map((t) => [t.id, t]));
  const active = new Set();
  const visited = new Set();
  function visit(id) {
    if (active.has(id)) {
      errors.push(`Dependency cycle: ${id}`);
      return;
    }
    if (visited.has(id)) return;
    active.add(id);
    const t = byId.get(id);
    for (const dep of t.dependsOn ?? []) {
      if (!ids.has(dep)) errors.push(`Unknown dependency: ${id} -> ${dep}`);
      else {
        if (t.status === 'done' && byId.get(dep).status !== 'done')
          errors.push(`Unfinished dependency: ${id} -> ${dep}`);
        visit(dep);
      }
    }
    active.delete(id);
    visited.add(id);
  }
  tasks.forEach((t) => visit(t.id));
  return errors;
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (['node_modules', '.git', '.expo', 'dist'].includes(e.name)) return [];
    const path = resolve(dir, e.name);
    return e.isDirectory() ? walk(path) : [path];
  });
}
export function validateProject(root = process.cwd()) {
  const exists = (p) => existsSync(resolve(root, p));
  const required = [
    'AGENTS.md',
    'README.md',
    'package.json',
    'package-lock.json',
    'app.json',
    'tsconfig.json',
    '.github/workflows/quality.yml',
    '.agents/rules/engineering.md',
    '.agents/workflows/task.md',
    '.agents/workflows/review.md',
    'docs/product/roadmap.md',
    'docs/engineering/status.md',
    'docs/engineering/validation.md',
    'specs/foundation.md',
    'src/theme/tokens.ts',
    'src/i18n/pt-BR.ts',
  ];
  const errors = required
    .filter((p) => !exists(p))
    .map((p) => `Missing file: ${p}`);
  const tasks = JSON.parse(
    readFileSync(resolve(root, 'specs/tasks.json'), 'utf8'),
  ).tasks;
  errors.push(...validateTasks(tasks, exists));
  const requirements = JSON.parse(
    readFileSync(resolve(root, 'specs/requirements.json'), 'utf8'),
  ).requirements;
  const reqIds = new Set();
  for (const req of requirements) {
    if (reqIds.has(req.id)) errors.push(`Duplicate requirement: ${req.id}`);
    reqIds.add(req.id);
    if (
      !exists(req.spec) ||
      !tasks.some(
        (t) => t.milestone === req.milestone && t.specs.includes(req.spec),
      )
    )
      errors.push(`Untracked requirement: ${req.id}`);
  }
  for (let i = 0; i <= 10; i++) {
    if (!tasks.some((t) => t.milestone === `M${i}`))
      errors.push(`Untracked milestone M${i}`);
  }
  for (const file of walk(root).filter((p) => p.endsWith('.md'))) {
    const content = readFileSync(file, 'utf8');
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1];
      if (/^(?:https?:|mailto:|#)/.test(target)) continue;
      const local = decodeURIComponent(target.split('#')[0]);
      if (!existsSync(resolve(dirname(file), local)))
        errors.push(`Broken link: ${relative(root, file)} -> ${local}`);
    }
  }
  return { errors, tasks: tasks.length, requirements: requirements.length };
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const result = validateProject();
  if (result.errors.length) {
    console.error(result.errors.join('\n'));
    process.exitCode = 1;
  } else
    console.log(
      `Structure OK: ${result.tasks} tasks, ${result.requirements} requirements; links and dependency graph valid.`,
    );
}

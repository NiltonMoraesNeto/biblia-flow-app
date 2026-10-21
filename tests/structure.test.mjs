import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateTasks,
  validateProject,
} from '../scripts/validate-structure.mjs';

const task = (id, dependsOn = []) => ({
  id,
  milestone: id.split('-')[0],
  title: 'Task',
  status: 'todo',
  owner: null,
  acceptance: ['Resultado observável'],
  specs: ['spec.md'],
  evidence: [],
  dependsOn,
});
const exists = () => true;
test('project links, requirements and tasks are consistent', () => {
  assert.deepEqual(validateProject().errors, []);
});
test('gate rejects duplicate task IDs', () => {
  assert.ok(
    validateTasks([task('M0-T01'), task('M0-T01')], exists).some((e) =>
      e.includes('duplicate'),
    ),
  );
});
test('gate rejects unknown dependencies and cycles', () => {
  assert.ok(
    validateTasks([task('M0-T01', ['M0-T99'])], exists).some((e) =>
      e.includes('Unknown'),
    ),
  );
  assert.ok(
    validateTasks(
      [task('M0-T01', ['M0-T02']), task('M0-T02', ['M0-T01'])],
      exists,
    ).some((e) => e.includes('cycle')),
  );
});
test('gate rejects missing specs and acceptance', () => {
  const t = { ...task('M0-T01'), acceptance: [] };
  const errors = validateTasks([t], () => false);
  assert.ok(errors.some((e) => e.includes('Missing spec')));
  assert.ok(errors.some((e) => e.includes('Missing acceptance')));
});
test('done requires owner, evidence and completed dependencies', () => {
  const t = { ...task('M0-T02', ['M0-T01']), status: 'done' };
  const errors = validateTasks([task('M0-T01'), t], exists);
  assert.ok(errors.some((e) => e.includes('Done without')));
  assert.ok(errors.some((e) => e.includes('Unfinished')));
});
test('blocked requires an actionable reason', () => {
  assert.ok(
    validateTasks([{ ...task('M0-T01'), status: 'blocked' }], exists).some(
      (e) => e.includes('blocked reason'),
    ),
  );
});

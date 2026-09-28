import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const SRC = join(process.cwd(), 'src');
const PANEL = join('components', 'MetricsPanel.astro');

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

describe('MetricsPanel is not mounted in v1', () => {
  it('exists', () => {
    expect(readFileSync(join(SRC, PANEL), 'utf8')).toContain('data-component="metrics"');
  });

  it('is referenced by no file in src/ other than itself', () => {
    const offenders = listFiles(SRC)
      .filter((path) => relative(SRC, path) !== PANEL)
      .filter((path) => readFileSync(path, 'utf8').includes('MetricsPanel'))
      .map((path) => relative(SRC, path));
    expect(offenders).toEqual([]);
  });
});

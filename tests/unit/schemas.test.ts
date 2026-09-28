import { describe, expect, it } from 'vitest';
import { images } from '../../src/content/images';
import { languageCount, languages } from '../../src/content/languages';
import { metrics } from '../../src/content/metrics';
import {
  copySchema,
  imagesSchema,
  languagesSchema,
  metricsSchema,
  teamSchema,
  updatesSchema,
} from '../../src/content/schemas';
import { footerNavItems, navItems, renders } from '../../src/content/sections';
import { site } from '../../src/content/site';
import { publishedTeam, team } from '../../src/content/team';
import { approvedUpdates, updates } from '../../src/content/updates';

const fakeImage = { src: '/x.png', width: 10, height: 10, format: 'png' };

describe('content modules (as shipped)', () => {
  it('lists Remlo’s 12 languages, with Urdu right-to-left', () => {
    expect(languageCount).toBe(12);
    expect(languages.map((l) => l.code)).toEqual([
      'en',
      'ta',
      'hi',
      'bn',
      'my',
      'si',
      'fil',
      'id',
      'zh',
      'th',
      'ur',
      'ne',
    ]);
    expect(languages.find((l) => l.code === 'ur')?.dir).toBe('rtl');
    expect(languages.filter((l) => l.dir === 'rtl')).toHaveLength(1);
  });

  it('derives every "N languages" phrase from languages.ts', () => {
    expect(site.remlo.title).toBe(`Free money tools, in ${languageCount} languages.`);
    expect(site.what.remlo.body).toContain(`in ${languageCount} languages.`);
    expect(site.approach.principles[2]?.body).toContain(`Remlo in ${languageCount} languages.`);
  });

  it('seeds the five team members, all published, with no portraits', () => {
    expect(team.map((m) => m.name)).toEqual([
      'Nick Thiery',
      'Alex Thiery',
      'Marcus Magura',
      'Christopher Chen',
      'Ries Joos',
    ]);
    expect(publishedTeam).toHaveLength(5);
    expect(team.every((m) => m.portrait === undefined)).toBe(true);
  });

  it('has no updates and keeps the Updates section out of the nav', () => {
    expect(updates).toEqual([]);
    expect(approvedUpdates).toEqual([]);
    expect(renders.updates).toBe(false);
    expect(navItems.map((n) => n.id)).not.toContain('updates');
    expect(footerNavItems.map((n) => n.id)).not.toContain('updates');
  });

  it('keeps metrics disabled and empty', () => {
    expect(metrics).toEqual({ enabled: false, items: [] });
  });

  it('marks the supplied images approved, and alt text comes from the copy', () => {
    expect(images.every((image) => image.approved)).toBe(true);
    expect(images.find((i) => i.id === 'remlo-welcome')?.alt).toBe(site.hero.phoneAlt);
    expect(images.find((i) => i.id === 'remlo-welcome')?.capturedFromCommit).toBe('1eabe26');
  });

  it('builds the header nav in page order', () => {
    expect(navItems.map((n) => n.label)).toEqual([
      'What we do',
      'Remlo',
      'Approach',
      'How we measure',
      'Team',
      'Contact',
    ]);
  });
});

describe('schemas reject bad content', () => {
  it('rejects a language without a label or with a bad direction', () => {
    expect(() => languagesSchema.parse([{ code: 'en', label: '', dir: 'ltr' }])).toThrow();
    expect(() => languagesSchema.parse([{ code: 'en', label: 'English', dir: 'up' }])).toThrow();
    expect(() => languagesSchema.parse([])).toThrow();
  });

  it('requires name, role, bio and publish for team members', () => {
    expect(() => teamSchema.parse([{ name: 'A', role: 'B', bio: 'C' }])).toThrow();
    expect(() => teamSchema.parse([{ name: '', role: 'B', bio: 'C', publish: true }])).toThrow();
    expect(teamSchema.parse([{ name: 'A', role: 'B', bio: 'C', publish: false }])).toHaveLength(1);
  });

  it('requires portrait alt text and an approval flag', () => {
    const member = { name: 'A', role: 'B', bio: 'C', publish: true };
    expect(() =>
      teamSchema.parse([{ ...member, portrait: { src: fakeImage, alt: '', approved: true } }]),
    ).toThrow();
    expect(() =>
      teamSchema.parse([{ ...member, portrait: { src: fakeImage, alt: 'Portrait of A' } }]),
    ).toThrow();
    expect(() =>
      teamSchema.parse([{ ...member, portrait: { src: 'x.png', alt: 'P', approved: true } }]),
    ).toThrow();
  });

  it('only accepts updates dated YYYY-MM', () => {
    expect(() =>
      updatesSchema.parse([{ date: '2026-03-15', text: 'x', approved: true }]),
    ).toThrow();
    expect(() => updatesSchema.parse([{ date: '2026-13', text: 'x', approved: true }])).toThrow();
    expect(() => updatesSchema.parse([{ date: '2026-03', text: '', approved: true }])).toThrow();
    expect(updatesSchema.parse([{ date: '2026-03', text: 'x', approved: false }])).toHaveLength(1);
  });

  it('requires unique image ids and an approval flag', () => {
    const entry = { id: 'a', src: fakeImage, alt: '', approved: true, source: 's' };
    expect(() => imagesSchema.parse([entry, entry])).toThrow();
    expect(() => imagesSchema.parse([{ ...entry, approved: undefined }])).toThrow();
    expect(() => imagesSchema.parse([{ ...entry, capturedFromCommit: 'nope' }])).toThrow();
  });

  it('will not enable metrics without complete, approved items', () => {
    expect(() => metricsSchema.parse({ enabled: true, items: [] })).toThrow();
    const item = {
      label: 'L',
      value: '1',
      definition: 'd',
      source: 's',
      periodStart: '2026-09-01',
      periodEnd: '2026-09-30',
      caveat: 'c',
      approvedBy: 'Nick Thiery',
      approvedOn: '2026-10-01',
    };
    expect(metricsSchema.parse({ enabled: true, items: [item] }).items).toHaveLength(1);
    for (const key of [
      'definition',
      'source',
      'periodStart',
      'periodEnd',
      'caveat',
      'approvedBy',
      'approvedOn',
    ]) {
      const incomplete: Record<string, string> = { ...item };
      delete incomplete[key];
      expect(() => metricsSchema.parse({ enabled: false, items: [incomplete] }), key).toThrow();
    }
  });

  it('rejects public copy with review markers or empty strings', () => {
    expect(() => copySchema.parse({ a: 'Fine [VERIFY date]' })).toThrow();
    expect(() => copySchema.parse({ a: ['ok', 'TODO later'] })).toThrow();
    expect(() => copySchema.parse({ a: 'Lorem ipsum' })).toThrow();
    expect(() => copySchema.parse({ a: '   ' })).toThrow();
    expect(copySchema.parse({ a: ['ok', { b: 'fine' }] })).toBeTruthy();
  });
});

/*
 * Which optional sections render, and the nav built from them. The header nav,
 * the mobile menu and the footer only link to sections that actually render.
 */
import { site } from './site';
import { publishedTeam } from './team';
import { approvedUpdates } from './updates';

export type SectionId = keyof typeof site.nav;

export const renders: Record<SectionId, boolean> = {
  what: true,
  remlo: true,
  approach: true,
  measure: true,
  updates: approvedUpdates.length > 0,
  team: publishedTeam.length > 0,
  contact: true,
};

export interface NavItem {
  id: SectionId;
  label: string;
  href: `#${string}`;
}

const allNav: NavItem[] = (Object.keys(site.nav) as SectionId[]).map((id) => ({
  id,
  label: site.nav[id],
  href: `#${id}`,
}));

/** Header and mobile menu. */
export const navItems = allNav.filter((item) => renders[item.id]);

/** The footer's FinanceForward group. */
const footerIds: SectionId[] = ['what', 'approach', 'measure', 'updates', 'team'];
export const footerNavItems = allNav.filter(
  (item) => footerIds.includes(item.id) && renders[item.id],
);

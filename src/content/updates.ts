/*
 * Dated updates for the optional Updates section. Empty in v1.
 *
 * Only entries with `approved: true` are shown, newest first. While there are
 * none, the section and its nav item are left out of the page. Example:
 *   { date: '2026-10', text: 'One short, confirmed sentence.', approved: true },
 */
import { updatesSchema } from './schemas';

export const updates = updatesSchema.parse([]);

export const approvedUpdates = updates
  .filter((update) => update.approved)
  .sort((a, b) => b.date.localeCompare(a.date));

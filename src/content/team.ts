/*
 * Team members, in display order.
 *
 * - `publish: false` hides a person. If nobody is published, the Team section
 *   and its nav and footer links disappear.
 * - A portrait replaces the initials tile only when `approved: true`. Import the
 *   image at the top of this file, then add for example:
 *     portrait: {
 *       src: nickPortrait,
 *       alt: 'Portrait of Nick Thiery, Founder at FinanceForward.',
 *       approved: true,
 *     },
 */
import { teamSchema } from './schemas';

export const team = teamSchema.parse([
  {
    name: 'Nick Thiery',
    role: 'Founder',
    bio: 'Leads product direction, worker outreach and institutional relationships.',
    publish: true,
  },
  {
    name: 'Alex Thiery',
    role: 'Social Media & Online Presence',
    bio: 'Coordinates public content and digital presence.',
    publish: true,
  },
  {
    name: 'Marcus Magura',
    role: 'Operations',
    bio: 'Coordinates delivery plans and team execution.',
    publish: true,
  },
  {
    name: 'Christopher Chen',
    role: 'Software Engineering',
    bio: 'Develops and maintains Remlo.',
    publish: true,
  },
  {
    name: 'Ries Joos',
    role: 'Data Analytics',
    bio: 'Measures product use, attribution and learning.',
    publish: true,
  },
]);

export const publishedTeam = team.filter((member) => member.publish);

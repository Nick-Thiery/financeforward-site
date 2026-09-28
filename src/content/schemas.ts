/*
 * Zod schemas for every content module. Each module parses its data at build
 * time, so a malformed edit fails `npm run build` with a readable error.
 */
import { z } from 'zod';

const text = z.string().trim().min(1);

/** Review markers that must never reach public copy (the output guard checks dist/ too). */
const markerPattern = /\[(?:VERIFY|DECIDE|HOLD|PLACEHOLDER)|\b(?:TODO|TBD|FIXME)\b|lorem/i;

const publicString = text.refine((value) => !markerPattern.test(value), {
  message: 'Public copy contains a review marker',
});

type Copy = string | readonly Copy[] | { readonly [key: string]: Copy };

/** Any nesting of objects and arrays whose leaves are non-empty public strings. */
export const copySchema: z.ZodType<Copy> = z.lazy(() =>
  z.union([publicString, z.array(copySchema), z.record(z.string(), copySchema)]),
);

/** Astro image metadata, as returned by `import img from './x.png'`. */
export const imageMetadataSchema = z.custom<ImageMetadata>(
  (value) =>
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ImageMetadata).src === 'string' &&
    typeof (value as ImageMetadata).width === 'number' &&
    typeof (value as ImageMetadata).height === 'number',
  { message: 'Expected an imported image (import img from "…png")' },
);

export const languageSchema = z.object({
  code: z.string().regex(/^[a-z]{2,3}(-[A-Za-z0-9]+)*$/, 'Expected a BCP 47 language code'),
  label: text,
  dir: z.enum(['ltr', 'rtl']),
});
export const languagesSchema = z.array(languageSchema).min(1);

export const portraitSchema = z.object({
  src: imageMetadataSchema,
  alt: text,
  approved: z.boolean(),
});

export const teamMemberSchema = z.object({
  name: text,
  role: text,
  bio: text,
  publish: z.boolean(),
  portrait: portraitSchema.optional(),
});
export const teamSchema = z.array(teamMemberSchema);

export const updateSchema = z.object({
  date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected a date in the form YYYY-MM'),
  text,
  approved: z.boolean(),
});
export const updatesSchema = z.array(updateSchema);

export const imageEntrySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  src: imageMetadataSchema,
  /** Empty only for decorative images that sit next to the same text. */
  alt: z.string(),
  approved: z.boolean(),
  source: text,
  capturedFromCommit: z
    .string()
    .regex(/^[0-9a-f]{7,40}$/)
    .optional(),
});
export const imagesSchema = z
  .array(imageEntrySchema)
  .refine((entries) => new Set(entries.map((e) => e.id)).size === entries.length, {
    message: 'Image ids must be unique',
  });

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected a date in the form YYYY-MM-DD');

export const metricItemSchema = z.object({
  label: text,
  value: text,
  definition: text,
  source: text,
  periodStart: isoDate,
  periodEnd: isoDate,
  caveat: text,
  approvedBy: text,
  approvedOn: isoDate,
});
export const metricsSchema = z
  .object({
    enabled: z.boolean(),
    items: z.array(metricItemSchema),
  })
  .refine((m) => !m.enabled || m.items.length > 0, {
    message: 'Metrics cannot be enabled without at least one approved item',
  });

export type Language = z.infer<typeof languageSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type Update = z.infer<typeof updateSchema>;
export type ImageEntry = z.infer<typeof imageEntrySchema>;
export type MetricItem = z.infer<typeof metricItemSchema>;

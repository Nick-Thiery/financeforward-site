import type { z } from 'zod';
import type { guideContentSchema, guideUiSchema } from '../schemas';

/** What a content file exports; parsed (and so checked) in ./index.ts. */
export type GuideContentInput = z.input<typeof guideContentSchema>;
export type GuideUiInput = z.input<typeof guideUiSchema>;

/** A parsed (checked) page. */
export type GuideContent = z.output<typeof guideContentSchema>;
export type GuideUi = z.output<typeof guideUiSchema>;

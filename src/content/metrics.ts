/*
 * Public figures. Disabled in v1, and the component that would show them is not
 * mounted on any page.
 *
 * Every item needs a definition, source, period, caveat and a named approval
 * before it can be enabled; the schema rejects anything less.
 */
import { metricsSchema } from './schemas';

export const metrics = metricsSchema.parse({ enabled: false, items: [] });

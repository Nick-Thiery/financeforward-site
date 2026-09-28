/*
 * Lighthouse CI, mobile preset, against `astro preview` of the built site.
 * Reports are written to artifacts/lighthouse/ only; nothing is uploaded.
 */
const shared = require('./lighthouserc.shared.cjs');

module.exports = shared({ preset: 'mobile' });

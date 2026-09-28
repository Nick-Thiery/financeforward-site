/* Lighthouse CI, desktop preset. See lighthouserc.shared.cjs. */
const shared = require('./lighthouserc.shared.cjs');

module.exports = shared({ preset: 'desktop' });

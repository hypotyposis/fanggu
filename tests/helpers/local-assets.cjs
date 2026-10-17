'use strict';
// Images, white originals and reference photos are gitignored (see docs/development.md#本地资源包),
// so fresh clones and CI runners lack them. Tests that hash or open those files declare
// `requiresLocalAssets` and are reported as skipped instead of failing with ENOENT.
// Set FANGGU_REQUIRE_LOCAL_ASSETS=1 to turn the skip off and fail loudly instead.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const hasLocalAssets = ['assets/plates', 'assets/generated', 'assets/colored-transparent-avif']
  .every(directory => fs.existsSync(path.join(root, directory)));
const requiresLocalAssets = {
  skip: hasLocalAssets || process.env.FANGGU_REQUIRE_LOCAL_ASSETS === '1'
    ? false
    : '需要本地图版素材；按 docs/development.md#本地资源包 恢复后再运行'
};
module.exports = { hasLocalAssets, requiresLocalAssets };

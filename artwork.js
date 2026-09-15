/* Display artwork without changing the original catalogue or personal records. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory({});
  else root.FangguArtwork = factory(root.COLORED_PLATES || {});
})(typeof globalThis === 'object' ? globalThis : this, plates => {
  'use strict';
  function resolve(site, status = site.record?.status) {
    const colored = status === 'visited' && plates[site.id];
    return colored ? { ...colored, colored: true } : { ...site.image, colored: false };
  }
  function apply(image, site, status) {
    const artwork = resolve(site, status);
    image.classList.toggle('colored-plate', artwork.colored);
    image.src = artwork.src;
    image.alt = artwork.alt || site.name;
    image.width = artwork.width; image.height = artwork.height;
    image.onerror = artwork.colored ? () => {
      image.onerror = null;
      image.classList.remove('colored-plate');
      image.src = site.image.src;
      image.alt = site.image.alt || site.name;
      image.width = site.image.width; image.height = site.image.height;
    } : null;
    return artwork;
  }
  return { resolve, apply };
});

module.exports = function (eleventyConfig) {
  // Single source of truth for video data is _data/videos.json.
  // This filter derives the client-side search index from it at build time,
  // so the search feature never needs a second hand-maintained copy of the catalog.
  eleventyConfig.addFilter("toSearchIndexJSON", function (videos) {
    const mapped = videos.map((v) => ({
      id: v.id,
      t: v.title,
      c: v.cat,
      cn: v.catName,
      s: v.short,
      kw: v.kw,
    }));
    return JSON.stringify(mapped);
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};

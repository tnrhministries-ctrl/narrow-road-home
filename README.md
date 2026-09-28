# The Narrow Road Home — website source

This is the source code for thenarrowroadhome.com. It's built with
[Eleventy](https://www.11ty.dev/) (a static site generator) and deploys
automatically on Netlify whenever this repository's `main` branch changes.

Nothing about the site *looks* different because of this rebuild — every
page renders the same as before. What changed is how the pages are put
together behind the scenes, so that future updates are quicker and safer.

## The most common update: adding or editing a video

You will not need to touch any HTML for this. Open:

```
_data/videos.json
```

Every video on the Watch page is one entry in that file, like this:

```json
{
  "id": "t5Cw9RogdWY",
  "title": "Overwhelmed? Under Attack?",
  "cat": "overwhelmed",
  "catName": "Feeling Overwhelmed or Anxious",
  "short": true,
  "kw": "overwhelmed anxiety stress worry panic fear rest peace burdened"
}
```

- `id` — the YouTube video ID (the part after `watch?v=` in a YouTube URL).
- `title` — the title shown on the video card.
- `cat` — which category it belongs to. Must match an `id` in `_data/categories.json`.
- `catName` — the human-readable category name (shown in search results).
- `short` — `true` for a short clip, `false` for a long-form video.
- `kw` — extra search words, so the on-site search box can find this video
  by topic even if those words aren't in the title.

To add a new video, copy an existing entry, change the values, and add a
comma between entries. To add a whole new category (e.g. a new topic
button), add an entry to `_data/categories.json` too, and add a matching
button in `pages/watch.html.njk`'s topic-chip list if you want a quick-search
button for it.

The search index shown to visitors is generated automatically from this
file when the site builds — there is only one place to update a video, not
two.

## Where everything else lives

- `pages/*.html.njk` — one file per page (about, faith, prayer, and so on).
  The top block between `---` marks is the page's title/description; the
  rest is the page content.
- `_layouts/base.njk` — the shared page shell every page uses: the
  `<head>`, the navigation bar, the footer, and the shared scripts. Change
  this once and it updates every page.
- `_includes/nav.njk` / `_includes/footer.njk` — the navigation bar and
  footer, shared by every page (this is why every page's nav/footer now
  stays in sync automatically — before this rebuild, each page had its own
  copy, which is how small inconsistencies crept in over time).
- `_includes/video-card.njk`, `_includes/cat-block.njk` — how each video
  card and category row on the Watch page is drawn.
- `css/site.css` — all the site's styling, in one file (previously each
  page had its own copy-pasted `<style>` block).
- `_data/navLinks.json` — the links in the top navigation bar.
- `_data/site.json` — the site's canonical URL, used for SEO tags.
- `images/`, `favicon.svg` — image assets, copied as-is into the built site.
- `robots.txt`, `sitemap.xml` — copied as-is into the built site.

## How the automatic deploy works

Netlify watches this repository. Every time changes are pushed to `main`,
Netlify runs `npm run build` (which runs Eleventy), and publishes the
result. The build settings are in `netlify.toml`. There is nothing to run
by hand — editing a file and pushing it is the whole deploy process.

## Making a change yourself

1. Edit the file (most often `_data/videos.json`).
2. Commit and push the change to `main`.
3. Netlify builds and publishes automatically, usually within a minute or
   two. You can watch the build progress in the Netlify dashboard.

If you'd rather not use git directly, GitHub's website lets you edit a file
and commit the change entirely in the browser (open the file on
github.com, click the pencil/edit icon, make the change, and click
"Commit changes").

## Local preview (optional, requires Node.js)

```
npm install
npm run serve
```

This runs a local copy of the site at `http://localhost:8080` that updates
live as you edit files. You don't need this to make simple changes — it's
just useful if you want to see a change before pushing it.

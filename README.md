# Strapi plugin oEmbed

Embed videos, pictures and rich content from hundreds of third-parties in to [Strapi](https://strapi.io) via the admin interface. For more information about oEmbed, check out the article [Enhance your Strapi content with rich media using oEmbed](https://medium.com/@bashaus/enhance-your-strapi-content-with-rich-media-using-oembed-59d0f5047603).

![Example of the strapi-plugin-oembed plugin](demo.gif)

## Use cases

- Video: YouTube, Vimeo, TikTok, Twitch, DailyMotion
- Photo: Imgur, Flickr, DeviantArt, Unsplash, Instagram
- Rich: Twitter, Pinterest, SlideShare, SoundCloud, CodePen, JSFiddle
- ... plus [hundreds more providers](https://oembed.com/providers.json).

## Installation

Ensure the version of this plugin corresponds with the correct version of Strapi that you are using.

| Strapi version | Plugin semver           |
| -------------- | ----------------------- |
| Strapi v5      | strapi-plugin-oembed@^2 |
| Strapi v4      | strapi-plugin-oembed@^1 |
| Strapi v3      | strapi-plugin-oembed@^0 |

Install the package to your repository:

```bash
# npm
npm install --save strapi-plugin-oembed@^2

# yarn
yarn add strapi-plugin-oembed@^2
```

Enable the plugin:

`config/plugins.ts`:

```typescript
export default () => ({
  // ...
  oembed: {
    enabled: true,
  },
});
```

## Migration

Check the [migration documentation](MIGRATION.md) for important information on
how to upgrade from Strapi version 4 to Strapi version 5.

## Usage

Edit the `content type` model and insert the `oembed` field to the`attributes` section.

`./src/api/[content-type]/content-types/[content-type]/schema.json`

```json
{
  "kind": "collectionType",
  "collectionName": "[content-type]",
  // ...
  "attributes": {
    // ...
    "oembed": {
      "type": "customField",
      "customField": "plugin::oembed.oembed"
    }
    // ...
  }
}
```

## Example response

Assuming the URL: `https://www.youtube.com/watch?v=aqz-KE-bpKQ` is used:

```json
{
  "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  "thumbnail": "data:image/jpeg;base64,...truncated...",
  "oembed": {
    "title": "Big Buck Bunny 60fps 4K - Official Blender Foundation Short Film",
    "author_name": "Blender",
    "author_url": "https://www.youtube.com/@BlenderOfficial",
    "type": "video",
    "height": 113,
    "width": 200,
    "version": "1.0",
    "provider_name": "YouTube",
    "provider_url": "https://www.youtube.com/",
    "thumbnail_height": 360,
    "thumbnail_width": 480,
    "thumbnail_url": "https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg",
    "html": "<iframe width=\"200\" height=\"113\" src=\"https://www.youtube.com/embed/aqz-KE-bpKQ?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"Big Buck Bunny 60fps 4K - Official Blender Foundation Short Film\"></iframe>"
  }
}
```

- The `url` property is the value you typed.
- The `thumbnail` is a base64 encoded string of the thumbnail, if there is one
- The `oembed` contains the raw oembed data.

# Strapi plugin oEmbed

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E0H3N9M)

Embed content from third party sites (YouTube, Vimeo, TikTok, SoundCloud, Spotify, CodePen, etc.) into [Strapi](https://strapi.io).

![](demo.gif)

## How it works

- Add the field in your model
- When you create a new content, paste the URL of the third party site in the modal
- The data is fetched and stored in the content

## Installation

Using npm

```bash
npm install --save strapi-plugin-oembed
npm run build
```

Using yarn

```bash
yarn add strapi-plugin-oembed
yarn build
```

### ⚠️ Allowing Thumbnails in Strapi Admin

To enable thumbnails to display in the admin panel (used by oEmbed previews), add the following to your Strapi app:

#### `config/middlewares.ts`

```ts
export default [
  "strapi::logger",
  "strapi::errors",
  
  // 👇 Remove this line ...
  "strapi::security",
  
  // 👇 Replace with this line ...
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://market-assets.strapi.io",
            "https://i.ytimg.com", // YouTube
            "https://*.sndcdn.com", // SoundCloud
            "https://i.vimeocdn.com", // Vimeo
            "https://*.tiktokcdn.com", // TikTok
            "https://*.spotifycdn.com", // Spotify
            "https://shots.codepen.io", // CodePen
          ],
        },
      },
    },
  },
  // ...other middlewares
];
```

## Versions

| Strapi version | strapi-plugin-oembed version |
| -------------- | ---------------------------- |
| Version 5      | Version 2.\*                 |
| Version 4      | Version 1.\*                 |
| Version 3      | Version 0.\*                 |

## Setup

Go to your model and add the `oembed` field. For example if you have a content type `Article` it will be in `/api/article/models/article.settings.json` and paste the field in the `attributes` section.

e.g

```json
{
  "kind": "collectionType",
  "collectionName": "articles",
  ...
  "attributes": {
    ...
    "oembed": {
      "type": "json",
      "customField": "plugin::oembed.oembed"
    }
    ...
  }
}
```

## Example response

If you paste the url `https://www.youtube.com/watch?v=tkiOqSTVGds` in the modal, this data will be stored:

```json
{
  "url": "https://www.youtube.com/watch?v=tkiOqSTVGds",
  "oembed": {
    "type": "video",
    "thumbnail_url": "https://i.ytimg.com/vi/tkiOqSTVGds/hqdefault.jpg",
    "thumbnail_width": 480,
    "html": "<iframe width=\"480\" height=\"270\" src=\"https://www.youtube.com/embed/tkiOqSTVGds?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
    "version": "1.0",
    "width": 480,
    "author_url": "https://www.youtube.com/user/lilomoino",
    "provider_name": "YouTube",
    "thumbnail_height": 360,
    "height": 270,
    "author_name": "LilO Moino",
    "provider_url": "https://www.youtube.com/",
    "title": "Beautiful New Caledonia"
  }
}
```

**Note:** the data returned from your endpoint will be a JSON object.

## Supported third-parties

- YouTube
- Vimeo
- TikTok
- SoundCloud
- Spotify
- CodePen
- Twitter

Feel free to submit a PR with the provider you want, you just have to edit this file: `server/services/oembed.js`.

// Base type for all oEmbed responses
export type OEmbedBase = {
  version: '1.0';
  type: 'photo' | 'video' | 'link' | 'rich';
  title?: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  provider_url?: string;
  cache_age?: number;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
};

/* Specific types for each oEmbed type */

export type PhotoOEmbed = OEmbedBase & {
  type: 'photo';
  url: string;
  width: number;
  height: number;
};

export type VideoOEmbed = OEmbedBase & {
  type: 'video';
  html: string;
  width: number;
  height: number;
};

export type LinkOEmbed = OEmbedBase & {
  type: 'link';
};

export type RichOEmbed = OEmbedBase & {
  type: 'rich';
  html: string;
  width: number;
  height: number;
};

/* Union type for all oEmbed responses */

export type OEmbedResponse = PhotoOEmbed | VideoOEmbed | LinkOEmbed | RichOEmbed;

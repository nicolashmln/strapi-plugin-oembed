'use strict';

const axios = require('axios');

const providers = [
  {
    provider: 'youtube',
    pattern: /^(https?:\/\/)?(www\.)?(youtu\.be|youtube\.com)/i,
    embedData: async (url) => {
      const embedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const fetchedData = await axios.get(embedUrl);
      return fetchedData.data;
    },
    mime: 'video/youtube',
  },
  {
    provider: 'soundcloud',
    pattern: /^(https?:\/\/)?(www\.)?(soundcloud\.com)/i,
    embedData: async (url) => {
      const embedUrl = `https://www.soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const fetchedData = await axios.get(embedUrl);
      return fetchedData.data;
    },
    mime: 'audio/soundcloud',
  },
  {
    provider: 'vimeo',
    pattern: /^(https?:\/\/)?(www\.)?(vimeo\.com)/i,
    embedData: async (url) => {
      const embedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;
      const fetchedData = await axios.get(embedUrl);
      return fetchedData.data;
    },
    mime: 'video/vimeo',
  },
  {
    provider: 'tiktok',
    pattern: /^(https?:\/\/)?(www\.)?(tiktok\.com)/i,
    embedData: async (url) => {
      const embedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const fetchedData = await axios.get(embedUrl);
      return fetchedData.data;
    },
    mime: 'video/tiktok',
  },
  {
    provider: 'spotify',
    pattern: /^(https?:\/\/)?(www\.)?(open\.spotify\.com)/i,
    embedData: async (url) => {
      const embedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
      const fetchedData = await axios.get(embedUrl);
      return fetchedData.data;
    },
    mime: 'audio/spotify',
  },
];

module.exports = providers;

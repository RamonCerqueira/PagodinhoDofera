export const WHATSAPP_URL =
  'https://wa.me/557192037869?text=Quero%20contratar%20o%20Pagodinho%20do%20Fera';

export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/pagodinhodofera/';

export const INSTAGRAM_EMBED_CODES = (process.env.NEXT_PUBLIC_INSTAGRAM_EMBEDS ?? '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

export const INSTAGRAM_REEL_URL = 'https://www.instagram.com/reel/DQvKG0-EeIX/embed';

export const YOUTUBE_VIDEO_URL = 'https://www.youtube.com/embed/bjksC63eHvU?si=91sZp1aS9sFN5y3R';
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@VALFERA';

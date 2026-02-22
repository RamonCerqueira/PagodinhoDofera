export const WHATSAPP_URL =
  'https://wa.me/557192037869?text=Quero%20contratar%20o%20Pagodinho%20do%20Fera';

export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/pagodinhodofera/';

export const INSTAGRAM_EMBED_CODES = (process.env.NEXT_PUBLIC_INSTAGRAM_EMBEDS ?? '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

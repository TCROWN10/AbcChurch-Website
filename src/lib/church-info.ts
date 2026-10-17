export const CHURCH_VENUE = 'Bettendorf Community Center';
export const CHURCH_ADDRESS = '2204 Grant St, Bettendorf, IA 52722';

/** Opens Google Maps (or the Maps app on phones) pinned to the church. */
export const CHURCH_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${CHURCH_VENUE}, ${CHURCH_ADDRESS}`
)}`;

export const CHURCH_MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(CHURCH_ADDRESS)}&output=embed`;

export const BASE_URL = `https://es31-server.appspot.com/six-cities`;
export const MAX_CITIES = 6;
export const MAX_CHAR_COMMENT = 300;
export const MIN_CHAR_COMMENT = 50;
export const MAX_COMMENTS = 10;
export const MAX_CLOSER_OFFERS = 3;
export const MAX_PLACE_IMG = 6;
export const BASE_COLOR = `#e6e6e6`;
export const ERROR_COLOR = `red`;
export const EMAIL_REGEXP = new RegExp(`^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$`);

export const ROUTES = {
  HOME: `/`,
  LOGIN: `/login`,
  OFFER: `/offer`,
  FAVORITES: `/favorites`,
  ERROR: `/error`,
};

export const RATING_ITEMS = [
  {value: 5, title: `perfect`},
  {value: 4, title: `good`},
  {value: 3, title: `not bad`},
  {value: 2, title: `badly`},
  {value: 1, title: `terribly`},
];



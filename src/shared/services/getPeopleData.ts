import { HTTPS, SWAPI_PEOPLE, SWAPI_ROOT, URL_IMG_PERSON, VISUAL_GUIDE_IMG_EXTENSION } from "../constants/constants";

type CategoryType = "people";

const getId = (url: string, category: CategoryType): string => {
  const id =
    url
      .replace(HTTPS + SWAPI_ROOT + category, '')
      .replace(/\//g, '');
  return id;
};
export const getPeopleId = (url: string): string => getId(url, SWAPI_PEOPLE);

export const getPeopleImage = (id: string): string => `${URL_IMG_PERSON}/${id}${VISUAL_GUIDE_IMG_EXTENSION}`;

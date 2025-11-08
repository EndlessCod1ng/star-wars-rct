const SWAPI_ROOT = `https://swapi.dev/api/`;
const SWAPI_PEOPLE = `people/`;

interface GetApiResourceResult {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}
interface GetApiResourceResponce {
  count: number;
  next: string;
  previous: null | number;
  results: GetApiResourceResult[];
}
// export const getApiResource = (url: string) => {
//   fetch(url)
//     .then((res) => res.json())
//     .then((body) => console.log("body", body)
// return body.result)
//     .catch((error) => console.log(error.message)
// return false);

//   return ``;
// };

export const getApiResource = async (url: string): Promise<boolean | GetApiResourceResponce> => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Could not fetch`, res.status);
      return false;

    }
    const body: GetApiResourceResponce = await res.json();
    return body;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Now 'error' is safely narrowed to type 'Error'
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack: ${error.stack}`);
    } else if (typeof error === 'string') {
      // Handle cases where a string might be thrown
      console.error(`Caught a string error: ${error}`);
    } else {
      // Handle other unknown types of errors
      console.error("An unexpected error occurred:", error);
    }
    return false;
  }
};

// getApiResource(SWAPI_ROOT + SWAPI_PEOPLE)
//   .then(body => console.log(body)
//   );
(async () => {
  const body = await getApiResource(SWAPI_ROOT + SWAPI_PEOPLE);
  return body;
})();

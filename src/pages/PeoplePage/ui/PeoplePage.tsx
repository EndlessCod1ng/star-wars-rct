import { getApiResource } from "@/shared/utils/getApiResource";
import s from "./PeoplePage.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useEffect, useState } from "react";
import { API_PEOPLE } from "@/shared/constants/constants";
import { getPeopleId, getPeopleImage } from "@/shared/services/getPeopleData";
import { PeopleList } from "@/entities/People";
interface PeoplePageProps {
  className?: string;
}
export interface PeopleListType {
  name: string;
  id: string;
  img: string;
}
export const PeoplePage = ({ className }: PeoplePageProps) => {
  const [people, setPeople] = useState<PeopleListType[] | null>(null);
  const [errorApi, setErrorApi] = useState<boolean>(false);
  const [imgList, setImgList] = useState<string[]>([]);

  const getResource = async (url: string) => {
    const res = await getApiResource(url);

    if (res !== false && res !== true) {
      const peopleList = res.results.map(({ name, url }) => {
        const id = getPeopleId(url);
        // const img = getPeopleImage(id);
        setImgList([
          ...imgList,
          `../../shared/assets/images/characters/${id} - ${name}.png`,
        ]);

        console.log("imgList", imgList);

        const img = imgList[Number(id) - 1];
        console.log(name, img);

        // console.log("id", id);
        return {
          id,
          name,
          img,
        };
      });
      setPeople(peopleList);
      setErrorApi(false);
    } else {
      setErrorApi(true);
    }
  };

  useEffect(() => {
    getResource(API_PEOPLE);
  }, []);
  return (
    <>
      {errorApi ? (
        <div className={s.error}>error</div>
      ) : (
        <div className={classNames(s.peoplePage, {}, [className])}>
          <PeopleList list={people} />
        </div>
      )}
    </>
  );
};

// import { getApiResource } from "@/shared/utils/getApiResource";
// import s from "./PeoplePage.module.scss";
// import { classNames } from "@/shared/lib/classNames/classNames";
// import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
// import { API_PEOPLE } from "@/shared/constants/constants";
// import { getPeopleId, getPeopleImage } from "@/shared/services/getPeopleData";
// import { PeopleList } from "@/entities/People";
// import { WithErrorApi } from "@/shared/hocs/withErrorApi";

// interface PeoplePageProps {
//   setErrorApi?: Dispatch<SetStateAction<boolean>>;
//   className?: string;
// }
// export interface PeopleListType {
//   name: string;
//   id: string;
//   img: string;
// }

// // eslint-disable-next-line
// const PeoplePageView = ({ setErrorApi, className }: PeoplePageProps) => {
//   const [people, setPeople] = useState<PeopleListType[] | null>(null);

//   const getResource = async (url: string) => {
//     const res = await getApiResource(url);

//     if (res !== false && res !== true) {
//       const peopleList = res.results.map(({ name, url }) => {
//         const id = getPeopleId(url);
//         const img = getPeopleImage(id);
//         // console.log(name, img);

//         // console.log("id", id);
//         return {
//           id,
//           name,
//           img,
//         };
//       });
//       setPeople(peopleList);
//       setErrorApi?.(false);
//     } else {
//       setErrorApi?.(true);
//     }
//   };

//   useEffect(() => {
//     getResource(API_PEOPLE);
//   }, []);

//   return (
//     <div className={classNames(s.peoplePage, {}, [className])}>
//       <PeopleList list={people} />
//     </div>
//   );
// };
// // eslint-disable-next-line
// export const PeoplePage = WithErrorApi(PeoplePageView);

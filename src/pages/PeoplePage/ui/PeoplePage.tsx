import { getApiResource } from "@/shared/utils/getApiResource";
import s from "./PeoplePage.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useEffect } from "react";
import { API_PEOPLE } from "@/shared/constants/constants";
interface PeoplePageProps {
  className?: string;
}
export const PeoplePage = ({ className }: PeoplePageProps) => {
  // (async () => {
  //   const body = await getApiResource(SWAPI_ROOT + SWAPI_PEOPLE);
  //   return body;
  // })();

  // const getResource = async (url: string) => {
  //   const res = await getApiResource(url);

  //   if (res !== false) {
  //     const peopleList = res.map((element) => {
  //       console.log(element.name, element.url);
  //     });
  //   }
  // };
  // useEffect(() => {
  //   getApiResource(API_PEOPLE);
  // }, []);

  return (
    <div className={classNames(s.peoplePage, {}, [className])}>
      <div>PeoplePage</div>
    </div>
  );
};

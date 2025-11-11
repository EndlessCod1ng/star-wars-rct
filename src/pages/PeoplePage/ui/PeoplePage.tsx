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

  const getResource = async (url: string) => {
    const res = await getApiResource(url);

    if (res !== false && res !== true) {
      const peopleList = res.results.map(({ name, url }) => {
        const id = getPeopleId(url);
        const img = getPeopleImage(id);
        // console.log(name, img);

        // console.log("id", id);
        return {
          id,
          name,
          img,
        };
      });
      setPeople(peopleList);
    }
  };

  useEffect(() => {
    getResource(API_PEOPLE);
  }, []);

  return (
    <div className={classNames(s.peoplePage, {}, [className])}>
      <PeopleList list={people} />
    </div>
  );
};

import { getApiResource } from "@/shared/utils/getApiResource";
import s from "./PeoplePage.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useEffect, useState } from "react";
import { API_PEOPLE } from "@/shared/constants/constants";
import { getPeopleId, getPeopleImage } from "@/shared/services/getPeopleData";
interface PeoplePageProps {
  className?: string;
}
interface PeopleListType {
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
        console.log(name, img);

        console.log("id", id);
        return {
          id,
          name,
          img,
        };
      });
      setPeople(peopleList);
      // console.log(peopleList);
    }
  };

  useEffect(() => {
    getResource(API_PEOPLE);
  }, []);

  return (
    <div className={classNames(s.peoplePage, {}, [className])}>
      {people && (
        <ul>
          {people.map(({ name, id, img }) => {
            return (
              <li key={id}>
                <img
                  src={img}
                  alt="img"
                />
                <div>{name}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

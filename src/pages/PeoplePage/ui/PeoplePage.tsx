import { getApiResource } from "@/shared/utils/getApiResource";
import s from "./PeoplePage.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useEffect, useState } from "react";
import { API_PEOPLE } from "@/shared/constants/constants";
interface PeoplePageProps {
  className?: string;
}
export const PeoplePage = ({ className }: PeoplePageProps) => {
  const [people, setPeople] = useState<any>(null);

  const getResource = async (url: string) => {
    const res = await getApiResource(url);

    if (res !== false && res !== true) {
      const peopleList = res.results.map(({ name, url }) => {
        console.log(name, url);
        return {
          name,
          url,
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
      {people && (
        <ul>
          {people.map(({ name, url }) => {
            return <li key={url}>{name}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

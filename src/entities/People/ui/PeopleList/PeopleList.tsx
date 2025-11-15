import type { PeopleListType } from "@/pages/PeoplePage/ui/PeoplePage";
import s from "./PeopleList.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { PeopleItem } from "../PeopleItem/PeopleItem";

interface PeopleListProps {
  list: PeopleListType[] | null;
  className?: string;
}

export const PeopleList = ({ list, className }: PeopleListProps) => {
  if (list === null) {
    return (
      <div className={classNames(s.peopleList, {}, [className])}>
        {" List is empty"}
      </div>
    );
  }
  return (
    <ul className={classNames(s.peopleList, {}, [className])}>
      {list.map(({ name, id, img }) => {
        return (
          <PeopleItem
            name={name}
            img={img}
            key={id}
          />
        );
      })}
    </ul>
  );
};

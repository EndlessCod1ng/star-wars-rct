import s from "./PeopleItem.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
interface PeopleItemProps {
  className?: string;
}
export const PeopleItem = ({ className }: PeopleItemProps) => {
  return (
    <div className={classNames(s.peopleItem, {}, [className])}>
      <div>PeopleItem</div>
    </div>
  );
};

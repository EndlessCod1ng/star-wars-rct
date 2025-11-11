import s from "./PeopleItem.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
interface PeopleItemProps {
  name: string;
  img: string;
  className?: string;
}
export const PeopleItem = ({ name, img, className }: PeopleItemProps) => {
  return (
    <div className={classNames(s.peopleItem, {}, [className])}>
      <li className={classNames(s.peopleItem, {}, [className])}>
        <a
          className={s.link}
          href="#"
        >
          <img
            className={s.photo}
            src={img}
            alt="img"
          />
          <p>{name}</p>
        </a>
      </li>
    </div>
  );
};

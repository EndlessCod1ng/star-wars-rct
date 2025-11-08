import s from "./Header.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
interface HeaderProps {
  className?: string;
}
export const Header = ({ className }: HeaderProps) => {
  return (
    <div className={classNames(s.header, {}, [className])}>
      <div>Header</div>
    </div>
  );
};

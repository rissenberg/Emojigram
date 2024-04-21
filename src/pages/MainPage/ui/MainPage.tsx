import {ChatsList} from "../../../widgets/ChatsList";
import cls from "./style.module.scss"
import {ChatView} from "../../../widgets/ChatView";

export const MainPage = () => {

  return (
    <div className={cls.page}>
      <ChatsList />
      <ChatView />
    </div>
  );
}

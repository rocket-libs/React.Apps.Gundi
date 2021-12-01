import { ReactElement, ReactNode } from "react";
import BusyDialog from "../Busy/BusyDialog";
interface IProps {
  title: string;
  busy: boolean;
  children: ReactNode;
}
export default function Page(props: IProps): ReactElement {
  document.title = props.title;
  return (
    <>
      <BusyDialog show={props.busy} />
      {props.children}
    </>
  );
}

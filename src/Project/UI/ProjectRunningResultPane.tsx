import { ReactElement } from "react";
import IProcessRunningResult from "../Data/IProcessRunningResult";

interface IProps {
  processRunningResult: IProcessRunningResult[];
}

export default function ProjectRunningResultPane(props: IProps): ReactElement {
  return (
    <div>
      {props.processRunningResult.map((item) => {
        return (
          <>
            <div>{item.rawCommand}</div>
            <div>Duration: {item.duration}</div>
            <div>
              {item.output.map((singleLine) => {
                return <div>{singleLine}</div>;
              })}
            </div>
            <div>
              {item.errors.map((singleLine) => {
                return <div>{singleLine}</div>;
              })}
            </div>
          </>
        );
      })}
    </div>
  );
}

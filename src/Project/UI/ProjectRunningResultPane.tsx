import { ReactElement } from "react";
import IProcessRunningResult from "../Data/IProcessRunningResult";

interface IProps {
  processRunningResult: IProcessRunningResult[];
}

const writeLines = (lines?: string[]) : ReactElement => {
  if(!lines) {
    return <></>;
  }else{
    return (
      <>
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </>
    );
  }
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
              {writeLines(item.output)}
            </div>
            <div>
              {writeLines(item.errors)}
            </div>
          </>
        );
      })}
    </div>
  );
}

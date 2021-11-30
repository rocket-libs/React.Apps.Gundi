import { PotterComponent } from "react-potter";
import ProjectLogic from "../Potter/ProjectLogic";
import ProjectRepository from "../Potter/ProjectRepository";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import { ReactElement } from "react";

export default class Project extends PotterComponent<
  ProjectRepository,
  IProjectDefinition,
  ProjectLogic,
  any
> {
  constructor() {
    super(
      new ProjectRepository(),
      {} as IProjectDefinition,
      new ProjectLogic()
    );
  }

  onRender(): ReactElement {
    return <>It is alive</>;
  }

  async onStartedAsync() {}
}

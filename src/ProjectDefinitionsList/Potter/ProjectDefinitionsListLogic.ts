import { PotterLogicBase } from "react-potter";
import ProjectDefinitionsListRepository from "./ProjectDefinitionsListRepository";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import ProjectDefinitionsListApiIntegrator from "../Data/ProjectDefinitionsListApiIntegrator";
import Databinder from "../../Forms/DataList/DataboundList/Databinder";
import ProjectDefinitionRunnerApiIntegrator from "../../ProjectRunning/Data/ProjectDefinitionRunnerApiIntegrator";

export default class ProjectDefinitionsListLogic extends PotterLogicBase<
  ProjectDefinitionsListRepository,
  IProjectDefinition
> {
  private dataAdapter = new Databinder<IProjectDefinition>([], "get-all");
  public async fetchProjectDefinitionsAsync() {
    const projectDefinitions = await this.runAsync({
      fn: async () => {
        return await new ProjectDefinitionsListApiIntegrator().getOptionallyPaged(
          this.dataAdapter
        );
      },
    });
    this.potter.pushToRepository({ projectDefinitions: projectDefinitions });
  }

  public async runProjectAsync(projectId: string) {
    const succeeded = await this.runAsync({
      fn: async () => {
        return await new ProjectDefinitionRunnerApiIntegrator().runByIdAsync(
          projectId
        );
      },
    });
    debugger;
    if (succeeded) {
      this.potter.pushToRepository({ message: "Completed successfully" });
    } else {
      this.potter.pushToRepository({
        message: "Unable to complete running of project",
      });
    }
  }
}

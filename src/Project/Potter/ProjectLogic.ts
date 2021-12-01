import { PotterLogicBase } from "react-potter";
import GetRouteData from "../../BasicRouter/BasicRouterDataReader";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import ProjectDefinitionRunnerApiIntegrator from "../../ProjectRunning/Data/ProjectDefinitionRunnerApiIntegrator";
import ProjectRepository from "./ProjectRepository";
export default class ProjectLogic extends PotterLogicBase<
  ProjectRepository,
  IProjectDefinition
> {
  public get projectDefinition(): IProjectDefinition {
    return GetRouteData<IProjectDefinition>();
  }

  public async runProjectAsync() {
    await this.runAsync({
      fn: async () => {
        const result =
          await new ProjectDefinitionRunnerApiIntegrator().runByIdAsync(
            this.projectDefinition.projectId
          );
        this.potter.pushToRepository({ processRunningResult: result });
      },
    });
  }
}

import { PotterLogicBase } from "react-potter";
import GetRouteData from "../../BasicRouter/BasicRouterDataReader";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import ProjectDefinitionRunnerApiIntegrator from "../../ProjectRunning/Data/ProjectDefinitionRunnerApiIntegrator";
import IProcessRunningResult from "../Data/IProcessRunningResult";
import ProjectRepository from "./ProjectRepository";
export default class ProjectLogic extends PotterLogicBase<
  ProjectRepository,
  IProjectDefinition
> {

  private isRunning: boolean = false;

  public get projectDefinition(): IProjectDefinition {
    return GetRouteData<IProjectDefinition>();
  }


  public async runProjectAsync() {
    await this.runAsync({
      fn: async () => {
        try{
          if(this.isRunning){
            return;
          }
          this.isRunning = true;
          const result =
          await new ProjectDefinitionRunnerApiIntegrator().runByIdAsync(
            this.projectDefinition.projectId
          );
          
        this.potter.pushToRepository({ processRunningResult: result });
          }catch(e){
            
            console.error(e);
            const result = {
              errors: ["Error occured on server"],
            } as IProcessRunningResult;
            this.potter.pushToRepository({ processRunningResult: [result] });
          }finally{
            this.isRunning = false;
          }
      },
    });
  }
}

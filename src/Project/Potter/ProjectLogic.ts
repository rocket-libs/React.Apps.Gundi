import { PotterLogicBase } from "react-potter";
import GetRouteData from "../../BasicRouter/BasicRouterDataReader";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import ProjectDefinitionRunnerApiIntegrator from "../../ProjectRunning/Data/ProjectDefinitionRunnerApiIntegrator";
import IProcessRunningResult from "../Data/IProcessRunningResult";
import ProjectRepository from "./ProjectRepository";
import ServerEventListener from "../../EventStreaming/ServerEventListener";
import Settings from "../../Settings/Settings";
export default class ProjectLogic extends PotterLogicBase<
  ProjectRepository,
  IProjectDefinition
> {

  private isRunning: boolean = false;

  public get projectDefinition(): IProjectDefinition {
    return GetRouteData<IProjectDefinition>();
  }


  public async runProjectAsync() {
      try{
          if(this.isRunning){
            return;
          }
          this.potter.pushToRepository({busy:true});
          this.handleEventListening();
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
  }

  private scrollToBottom(){
    const outputDiv = document.getElementById("gundi-output");
    if(outputDiv){
    outputDiv.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  }

  private handleEventListening(){
    new ServerEventListener(
      {
        url: `${new Settings().host}api/v1/EventQueue/listen?projectId=${this.projectDefinition.projectId}`,
        onData: (data: string) => {
          this.context.repository.output.push(data);
          this.potter.pushToRepository({});
          this.scrollToBottom();
        },
        onCompleted: () => {
          this.potter.pushToRepository({busy:false});
          this.scrollToBottom();
        }
      }
    )
  }
}

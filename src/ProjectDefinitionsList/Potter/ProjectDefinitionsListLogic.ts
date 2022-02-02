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

  private get branchlessLabel() : string {
    return "Local Only Projects!";
  }
  private dataAdapter = new Databinder<IProjectDefinition>([], "get-all");
  public async fetchProjectDefinitionsAsync() {
    const projectDefinitions = await this.runAsync({
      fn: async () => {
        try{
        const result = await new ProjectDefinitionsListApiIntegrator().getOptionallyPaged(
          this.dataAdapter
        );
        this.context.repository.hasFetchedProjectDefinitions = true;
        return result;
        }
        catch(e){
          console.error(e);
          setTimeout(async () => {
            await this.fetchProjectDefinitionsAsync();
          }, 2000);
          return [];
        }  
      },
    });
    this.potter.pushToRepository({ projectDefinitions: projectDefinitions });
  }

  
  public get tabs() : string[]{
    const result = [];
    let hasBranchless = false;
    if(this.context.repository.hasFetchedProjectDefinitions){
      for(let i = 0; i < this.context.repository.projectDefinitions.length; i++){
        if(this.context.repository.projectDefinitions[i].repositoryDetail && this.context.repository.projectDefinitions[i].repositoryDetail.branch){
          const candidateBranch = this.toTitleCase(this.context.repository.projectDefinitions[i].repositoryDetail.branch);
          if(result.indexOf(candidateBranch) === -1){
            result.push(candidateBranch);
          }
        }else{
          hasBranchless = true;
        }
      }
    }
    result.sort((a, b) => { 
      if(a.toLowerCase() < b.toLowerCase()){
        return -1;
      }else{
        return 1;
      }
    });
    if(hasBranchless){
    result.push(this.branchlessLabel);
    }
    return result;
  }

  public getProjectsByBranch(args: { branch: string}) : IProjectDefinition[]{
    const targetProjects = args.branch === this.branchlessLabel ? this.context.repository.projectDefinitions.filter((projectDefinition) => {
      return !projectDefinition.repositoryDetail || !projectDefinition.repositoryDetail.branch;
    }) : this.context.repository.projectDefinitions.filter((projectDefinition) => {
      if(projectDefinition.repositoryDetail && projectDefinition.repositoryDetail.branch){
        return this.toTitleCase(projectDefinition.repositoryDetail.branch) === args.branch;
      }
      return false;
    }) ?? [];
    return targetProjects;
  }

  private toTitleCase(str: string) {
    if(str){
      const firstChar = str.charAt(0).toUpperCase();
      const rest = str.substring(1).toLocaleLowerCase();
      return `${firstChar}${rest}`;
    }else{
      return "";
    }
  }

  public async runProjectAsync(projectId: string) {
    const succeeded = await this.runAsync({
      fn: async () => {
        return await new ProjectDefinitionRunnerApiIntegrator().runByIdAsync(
          projectId
        );
      },
    });

    if (succeeded) {
      this.potter.pushToRepository({ message: "Completed successfully" });
    } else {
      this.potter.pushToRepository({
        message: "Unable to complete running of project",
      });
    }
  }
}

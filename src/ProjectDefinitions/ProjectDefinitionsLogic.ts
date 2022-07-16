import ModuleStateManager from "module-state-manager";
import AsyncRunner from "../AsyncRunner/AsyncRunner";
import IProject from "../Project/Data/IProject";
import ProjectApiIntergrator from "../Project/Data/ProjectApiIntergrator";
import ProjectDefinitionsListApiIntegrator from "../ProjectDefinitionsList/Data/ProjectDefinitionsListApiIntegrator";
import IProjectDefinition from "./Data/IProjectDefinition";
import ProjectDefinitionRepository from "./Data/ProjectDefinitionRepository";

export default class ProjectDefinitionsLogic extends ModuleStateManager<ProjectDefinitionRepository,IProjectDefinition>{
    repository: ProjectDefinitionRepository = new ProjectDefinitionRepository();
    model: IProjectDefinition = {} as IProjectDefinition;
    private asyncRunner = new AsyncRunner({
        runStateWriter: (running: boolean) => this.updateRepository({busy: running})
    });


    public async initializeAsync(){
        const project = await this.asyncRunner.runAsync(async () => {
            return await new ProjectApiIntergrator().getByIdAsync({id: this.model.projectId});
        });
        if(project){
            this.model.project = project;
        }else{
            this.model.project = {} as IProject;
        }
    }
    

    public async submitAsync() {
        await this.asyncRunner.runAsync(async () => {
        await new ProjectDefinitionsListApiIntegrator().updateAsync(this.model);
        this.repository.savedModel = JSON.stringify(this.model);
        });
    }

    public get modelChanged () : boolean{
        return JSON.stringify(this.model) !== this.repository.savedModel;
    }
}
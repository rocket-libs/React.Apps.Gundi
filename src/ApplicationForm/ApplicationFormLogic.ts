import ModuleStateManager from "module-state-manager";
import Databinder from "../Forms/DataList/DataboundList/Databinder";
import IProjectDefinition from "../ProjectDefinitions/Data/IProjectDefinition";
import ProjectDefinitionsListApiIntegrator from "../ProjectDefinitionsList/Data/ProjectDefinitionsListApiIntegrator";
import ApplicationFormRepository from "./Data/ApplicationFormRepository";
import ApplicationFormStrings from "./Data/ApplicationFormStrings";
import IApplication from "./Data/IApplication";
import IApplicationProjectDefinition from "./Data/IApplicationProjectDefinition";

export default class ApplicationFormLogic extends ModuleStateManager<ApplicationFormRepository,IApplication>{
    strings: ApplicationFormStrings = new ApplicationFormStrings();
    repository: ApplicationFormRepository = new ApplicationFormRepository();
    model: IApplication = {} as IApplication;

    private dataAdapter = new Databinder<IProjectDefinition>([], "get-all");
    onProjectSelectionChanged (data:  IApplicationProjectDefinition[]) : void {
        
        this.updateModel({ applicationProjectDefinitions: data  });
    }

    setApplicationDisplayLabel(displayLabel: string){
        this.updateModel({ displayLabel });
    }

    public async fetchProjectDefinitionsAsync() {
        const projectDefinitions = await new ProjectDefinitionsListApiIntegrator().getOptionallyPaged(
            this.dataAdapter
            );
        const applicationProjectDefinitions = projectDefinitions
        .filter(a => a.repositoryDetail ? true : false)
        .map(a => {
            return {
                label: a.repositoryDetail.branch + " − "+ a.label,
                repositoryDetail: a.repositoryDetail,
                tag: ""
            }
        });
        applicationProjectDefinitions.sort((a,b) => a.label.localeCompare(b.label));
        this.updateRepository({ applicationProjectDefinitions:  applicationProjectDefinitions});
    }

    public async saveApplicationAsync(){
        const application = this.model;
        return Promise.resolve(application);
    }
}
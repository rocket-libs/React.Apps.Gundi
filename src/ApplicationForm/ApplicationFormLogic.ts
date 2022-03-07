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
    public async fetchProjectDefinitionsAsync() {
        const projectDefinitions = await new ProjectDefinitionsListApiIntegrator().getOptionallyPaged(
            this.dataAdapter
            );
        this.updateRepository({ applicationProjectDefinitions: projectDefinitions.map(a => {
            return {
                label: a.label,
                repositoryDetail: a.repositoryDetail,
                tag: ""
            }
        }) });
    }
}
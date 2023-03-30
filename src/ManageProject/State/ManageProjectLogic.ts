import ModuleStateManager from "module-state-manager";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import IRepositoryDetail from "../../RepositoryDetail/Data/IRepositoryDetail";

export default class ManageProjectLogic extends ModuleStateManager<
  {},
  IProjectDefinition
> {
  repository: any;
  model: IProjectDefinition = {
    repositoryDetail: {} as IRepositoryDetail,
  } as IProjectDefinition;

  public get projectLabel(): string {
    return this.model.label ?? "";
  }
}

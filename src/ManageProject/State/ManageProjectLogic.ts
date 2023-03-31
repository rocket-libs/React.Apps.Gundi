import ModuleStateManager from "module-state-manager";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import IRepositoryDetail from "../../RepositoryDetail/Data/IRepositoryDetail";
import ManageProjectApiCaller from "../Data/ManageProjectApiCaller";
import ManageProjectRepository from "./ManageProjectRepository";

export default class ManageProjectLogic extends ModuleStateManager<
  ManageProjectRepository,
  IProjectDefinition
> {
  repository: any;
  model: IProjectDefinition = {
    repositoryDetail: {} as IRepositoryDetail,
  } as IProjectDefinition;

  public get projectLabel(): string {
    return this.model.label ?? "";
  }

  public async saveAsync() {
    const saveResult = await new ManageProjectApiCaller().saveAsync(this.model);
    this.updateRepository({ validationErrors: saveResult.validationErrors });
    if (this.inError) {
      throw new Error("Unable to save project");
    }
  }

  public get inError(): boolean {
    return this.repository.validationErrors.length > 0;
  }

  public get canSave(): boolean {
    return this.model.label &&
      this.model.repositoryDetail?.url &&
      this.model.repositoryDetail?.branch
      ? true
      : false;
  }
}

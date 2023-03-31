import ApiIntergratorBase from "../../Api/ApiIntergratorBase";
import ValidationResponse from "../../Api/ValidationResponse";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";

export default class ManageProjectApiCaller extends ApiIntergratorBase {
  protected get basePath(): string {
    return "ProjectDefinitions";
  }

  public async saveAsync(
    projectDefinition: IProjectDefinition
  ): Promise<ValidationResponse<IProjectDefinition>> {
    return await this.postAsync<ValidationResponse<IProjectDefinition>>(
      projectDefinition.projectId ? "Update" : "Insert",
      projectDefinition
    );
  }
}

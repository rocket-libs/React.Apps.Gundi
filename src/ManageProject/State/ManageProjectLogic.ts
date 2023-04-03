import ModuleStateManager from "module-state-manager";
import IProject from "../../Project/Data/IProject";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import IRepositoryDetail from "../../RepositoryDetail/Data/IRepositoryDetail";
import ManageProjectApiCaller from "../Data/ManageProjectApiCaller";
import ManageProjectRepository from "./ManageProjectRepository";

export default class ManageProjectLogic extends ModuleStateManager<
  ManageProjectRepository,
  IProjectDefinition
> {
  repository: ManageProjectRepository = {
    validationErrors: [],
    buildStages: [
      {
        name: "RunBuildCommands",
        displayLabel: "Run Build Commands",
      },
      {
        name: "CopyToStagingDirectory",
        displayLabel: "Copy To Staging Directory",
      },
      {
        name: "PublishToRepository",
        displayLabel: "Publish To Repository",
      },
    ],
  } as ManageProjectRepository;
  model: IProjectDefinition = {
    repositoryDetail: {} as IRepositoryDetail,
  } as IProjectDefinition;

  public get projectLabel(): string {
    return this.model.label ?? "";
  }

  public async saveAsync() {
    const saveResult = await new ManageProjectApiCaller().saveAsync(this.model);

    this.updateRepository({
      validationErrors: saveResult.validationErrors ?? [],
    });
    if (this.inError) {
      throw new Error("Unable to save project");
    } else {
      setTimeout(() => {
        window.history.back();
      }, 1000);
    }
  }

  public get isInitialized(): boolean {
    return this.model.project ? true : false;
  }

  public initializeModel(projectDefinition: IProjectDefinition) {
    if (this.isInitialized) {
      return;
    }

    if (!projectDefinition.project) {
      projectDefinition.project = {
        disabledStages: [],
        buildOutputDirectory: "",
        buildCommands: [],
        onFailurePostBuildCommands: [],
        onSuccessPostBuildCommands: [],
        publishUrl: "",
      } as IProject;
    }

    this.updateModel(projectDefinition);
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

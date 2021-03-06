import IProject from "../../Project/Data/IProject";
import IRepositoryDetail from "../../RepositoryDetail/Data/IRepositoryDetail";
export default interface IProjectDefinition {
  label: string;
  projectId: string;
  projectPath: string;
  repositoryDetail: IRepositoryDetail;
  keepSource: boolean;
  project: IProject;
}

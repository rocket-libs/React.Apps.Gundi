import IRepositoryDetail from "../../RepositoryDetail/Data/IRepositoryDetail";
export default interface IProjectDefinition {
  label: string;
  projectId: string;
  projectPath: string;
  repositoryDetail: IRepositoryDetail;
}

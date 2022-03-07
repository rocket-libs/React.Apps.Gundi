import IRepositoryDetail from "../../RepositoryDetail/Data/IRepositoryDetail";

export default interface IApplicationProjectDefinition  {
    label: string;
    repositoryDetail: IRepositoryDetail;
    tag: string;
}
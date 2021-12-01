import { PotterRepositoryBase } from "react-potter";
import IProcessRunningResult from "../Data/IProcessRunningResult";

export default class ProjectRepository extends PotterRepositoryBase {
  processRunningResult: IProcessRunningResult[] = [];
}

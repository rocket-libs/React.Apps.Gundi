import { PotterRepositoryBase } from "react-potter";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
export default class ProjectDefinitionsListRepository extends PotterRepositoryBase {
  projectDefinitions: IProjectDefinition[] = [];
  message: string = "";
}

import { PotterRepositoryBase } from "react-potter";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
export default class ProjectDefinitionsListRepository extends PotterRepositoryBase {
  projectDefinitions: IProjectDefinition[] = [];
  message: string = "";
  hasFetchedProjectDefinitions: boolean = false;
  startingUpText: string = "Gundi is starting up. Please wait...";
}

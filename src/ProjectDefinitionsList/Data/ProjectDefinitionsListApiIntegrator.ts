import StandardApiIntergrator from "../../Api/StandardApiIntergrator";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";

export default class ProjectDefinitionsListApiIntegrator extends StandardApiIntergrator<IProjectDefinition> {
  basePath: string = "ProjectDefinitions";
}

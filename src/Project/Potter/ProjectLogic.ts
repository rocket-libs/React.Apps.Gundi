import { PotterLogicBase } from "react-potter";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import ProjectRepository from "./ProjectRepository";
export default class ProjectLogic extends PotterLogicBase<
  ProjectRepository,
  IProjectDefinition
> {}

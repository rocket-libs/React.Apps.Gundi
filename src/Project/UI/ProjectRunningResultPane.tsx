import { PotterChildComponent } from "react-potter";
interface IProps
  extends IPotterChildComponentProps<ProjectRepository, object, ProjectLogic> {}
export default class ProjectRunningResultPane extends PotterChildComponent<
  ProjectRepository,
  object,
  ProjectLogic,
  IProps
> {}

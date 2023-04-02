import IBuildCommand from "../../BuildCommands/Data/IBuildCommand";
import IBuildStage from "../../BuildStages/Data/IBuildStage";

export default interface IProject {
  publishUrl: string;
  buildOutputDirectory: string;
  buildCommands: string[];
  disabledStages: IBuildStage[];
  onFailurePostBuildCommands: IBuildCommand[];
  onSuccessPostBuildCommands: IBuildCommand[];
}

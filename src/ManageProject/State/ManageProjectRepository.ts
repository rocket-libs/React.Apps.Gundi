import IBuildStage from "../../BuildStages/Data/IBuildStage";
import IValidationError from "../../ValidatableUI/IValidationError";

export default class ManageProjectRepository {
  validationErrors: IValidationError[] = [];
  buildStages: IBuildStage[] = [];
}

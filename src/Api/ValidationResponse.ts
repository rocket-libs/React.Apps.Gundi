import GlobalConstants from "../GlobalConstants/GlobalConstants";
import IValidationError from "../ValidatableUI/IValidationError";

export default class ValidationResponse<TEntity> {
  entity: TEntity | undefined = undefined;
  validationErrors: IValidationError[] = [];

  get hasErrors(): boolean {
    return this.validationErrors &&
      this.validationErrors.length > GlobalConstants.zero
      ? true
      : false;
  }

  get firstError(): string {
    if (this.hasErrors === true) {
      return this.validationErrors[GlobalConstants.zero].errors[
        GlobalConstants.zero
      ];
    } else {
      return "";
    }
  }
}

import IValidationError from "../../ValidatableUI/IValidationError";
import IApplicationProjectDefinition from "./IApplicationProjectDefinition";

export default class ApplicationFormRepository{
    public applicationProjectDefinitions: IApplicationProjectDefinition[] = [];
    public validationErrors: IValidationError[] = [];
}
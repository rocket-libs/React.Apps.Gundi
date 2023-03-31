import { PureComponent, ReactNode } from "react";
import IValidationError from "../ValidatableUI/IValidationError";

interface IInputField {
  children: React.ReactNode;
  validationErrors: IValidationError[];
  id: string;
  displayLabel?: string;
}

export type IInputFieldSupport = Omit<IInputField, "children">;

export default class InputField extends PureComponent<IInputField> {
  private get displayLabel(): ReactNode {
    if (this.props.displayLabel) {
      return <div>{this.props.displayLabel}</div>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <>
        {this.displayLabel}
        {this.props.children}
      </>
    );
  }
}

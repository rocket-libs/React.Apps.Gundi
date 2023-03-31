import { PureComponent, ReactNode } from "react";
import IValidationError from "../ValidatableUI/IValidationError";

interface IProps {
  validationErrors: IValidationError[];
  children: ReactNode;
  id: string;
}

const styles = {
  errorText: {
    color: "red",
  },
};

export default class ErrorDisplayer extends PureComponent<IProps> {
  private get firstError(): string {
    if (this.props.validationErrors.length > 0) {
      const firstError = this.props.validationErrors.find(
        (error) => error.key === this.props.id
      );
      if (firstError) {
        return firstError.errors[0];
      }
    }
    return "";
  }
  render(): ReactNode {
    if (this.firstError) {
      return (
        <>
          {this.props.children}
          <div style={styles.errorText}>{this.firstError}</div>
        </>
      );
    } else {
      return this.props.children;
    }
  }
}

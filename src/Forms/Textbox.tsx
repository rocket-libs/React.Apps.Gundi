import { PureComponent } from "react";
import { Form } from "react-bootstrap";
import ErrorDisplayer from "./ErrorDisplayer";
import { IInputFieldSupport } from "./InputField";

interface IProps extends IInputFieldSupport {
  onChange: (value: string) => void;
  value: string;
  description?: string;
}
export default class Textbox extends PureComponent<
  Exclude<IProps, "children">
> {
  // render(){
  //     return <InputField {...this.props}>
  //         <input type={"text"} onChange={(e) => this.props.onChange(e.target.value)} defaultValue={this.props.value}/>
  //         </InputField>
  // }

  render() {
    return (
      <ErrorDisplayer
        id={this.props.id}
        validationErrors={this.props.validationErrors}
      >
        <Form.Group className="mb-3" controlId="label">
          <Form.Label>{this.props.displayLabel}</Form.Label>
          <Form.Control
            type="text"
            title={this.props.displayLabel}
            placeholder={this.props.displayLabel}
            value={this.props.value}
            onChange={(e) => {
              this.props.onChange(e.target.value);
            }}
          />
          <Form.Text className="text-muted">{this.props.description}</Form.Text>
        </Form.Group>
      </ErrorDisplayer>
    );
  }
}

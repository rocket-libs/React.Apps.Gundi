import { PureComponent } from "react";
import InputField, { IInputFieldSupport } from "./InputField";

interface IProps extends IInputFieldSupport{
    onChange: (value: string) => void;
    value: string;
}
export default class Textbox extends PureComponent<Exclude<IProps,"children">>{
    render(){
        return <InputField {...this.props}>
            <input type={"text"} onChange={(e) => this.props.onChange(e.target.value)} defaultValue={this.props.value}/>
            </InputField>
    }
}
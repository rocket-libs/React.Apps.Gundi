import { PureComponent } from "react";
import InputField, { IInputFieldSupport } from "./InputField";

interface IProps extends IInputFieldSupport{

}
export default class Textbox extends PureComponent<Exclude<IProps,"children">>{
    render(){
        return <InputField {...this.props}>
            <input type={"text"}/>
            </InputField>
    }
}
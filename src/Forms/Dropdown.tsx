import { PureComponent } from "react";
import InputField, { IInputFieldSupport } from "./InputField";
import Select from "react-select";

interface IProps<TData> extends IInputFieldSupport {
    data: TData[];
    onSelectionChanged?: (data: TData[] | TData) => void;
    selected?: TData[] | TData;
}

export default class Dropdown<TData> extends PureComponent<IProps<TData>>{
    render(){
       return   <InputField {...this.props}>
                    <Select options={this.props.data} value={this.props.selected} isMulti={true} />
                </InputField>
    }
}
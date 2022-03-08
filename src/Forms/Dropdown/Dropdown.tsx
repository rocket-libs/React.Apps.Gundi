import { PureComponent } from "react";
import InputField, { IInputFieldSupport } from "../InputField";
import Select from "react-select";
import IDropdownValueAdapter from "./IDropdownValueAdapter";
import DefaultDropdownAdapter from "./DefaultDropdownAdapter";

interface IProps<TData extends object,TDropDownValue extends object={}> extends IInputFieldSupport {
    data: TData[];
    onSelectionChanged?: (data: TData[] | TData) => void;
    selected?: TData[] | TData;
    adapter?: IDropdownValueAdapter<TData,TDropDownValue>
}

export default class Dropdown<TData extends object,TDropDownValue extends object> extends PureComponent<IProps<TData,TDropDownValue>>{
    
    private dropDownValues: TDropDownValue[] = [];

    
    private get adapter() : IDropdownValueAdapter<TData,TDropDownValue>{
        if(this.props.adapter){
            return this.props.adapter;
        }else{
            const defaultAdapter = new DefaultDropdownAdapter<TData>();
            return defaultAdapter as unknown as IDropdownValueAdapter<TData,TDropDownValue>;
        }
    }

    

    
    

    render(){
       return   <InputField {...this.props}>
                    <Select 
                        closeMenuOnSelect
                        options={this.props.data.map(x => this.adapter.adaptSingleToDropdownValue(x)) } 
                        {...this.props.adapter}
                        onChange={(newValue) => {
                            if(this.props.onSelectionChanged){
                                const userData = this.adapter.onSelectionChanged(newValue as any);
                                this.props.onSelectionChanged(userData);
                            }
                    }} />
                </InputField>
    }
}
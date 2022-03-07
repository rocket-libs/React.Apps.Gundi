import { PureComponent } from "react";
import InputField, { IInputFieldSupport } from "../InputField";
import Select from "react-select";
import IDropdownValueAdapter from "./IDropdownValueAdapter";
import DefaultDropdownAdapter from "./DefaultDropdownAdapter";

interface IProps<TData,TDropDownValue={}> extends IInputFieldSupport {
    data: TData[];
    onSelectionChanged?: (data: TData[] | TData) => void;
    selected?: TData[] | TData;
    isMultipleSelect?: boolean
    adapter?: IDropdownValueAdapter<TData,TDropDownValue>
}

export default class Dropdown<TData,TDropDownValue> extends PureComponent<IProps<TData,TDropDownValue>>{
    
    private dropDownValues: TDropDownValue[] = [];

    componentDidMount(){
        this.adaptData();
    }
    
    componentWillUpdate(nextProps: IProps<TData>){
        this.adaptData();
    }

    private getAdapter<TData,TDropdownValue>() : IDropdownValueAdapter<TData,TDropDownValue>{
        if(this.props.adapter){
            return this.props.adapter;
        }else{
            return new DefaultDropdownAdapter<TData>();
        }
    }

    adaptData(){
        if(this.props.data && this.props.adapter){
            this.dropDownValues = [];
            for(let i = 0; i < this.props.data.length; i++){
                this.dropDownValues.push(this.props.adapter.adaptToDropdownValue(this.props.data[i]));
            }
        }
    }

    render(){
       return   <InputField {...this.props}>
                    <Select 
                        options={this.dropDownValues} 
                        isMulti={this.props.isMultipleSelect} 
                        onChange={(newValue) => {
                        if(this.props.onSelectionChanged){
                            const selectedData = this.props.isMultipleSelect === true ? newValue as TDropDownValue[] : newValue as TDropDownValue;
                            const userData: TData[] | TData = this.props.isMultipleSelect === true ? [] : {} as TData;
                            if(this.props.adapter){

                            }
                            this.props.onSelectionChanged(data);
                        }
                    }} />
                </InputField>
    }
}
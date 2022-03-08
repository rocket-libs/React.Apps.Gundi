import IDropdownValueAdapter from "../IDropdownValueAdapter";
import IReactSelectValue from "./IReactSelectValue";

export default class ReactSelectDropDownAdapter<TData extends object> implements IDropdownValueAdapter<TData,IReactSelectValue<TData>>{
    
    public isMulti?: boolean;

    public closeMenuOnSelect?: boolean;

    private labelKey: string;

    constructor(labelKey: Extract<keyof TData, string>, props: {isMulti?: boolean, closeMenuOnSelect?: boolean} = {}) {
        this.labelKey = labelKey;
        this.isMulti = props.isMulti;
        this.closeMenuOnSelect = props.closeMenuOnSelect;
    }
    adaptManyToDropdownValue(data: TData[]): IReactSelectValue<TData>[] {
        return data.map(a => this.adaptSingleToDropdownValue(a));
    }
    extractManyDataFromDropdownValue(dropdownValue: IReactSelectValue<TData>[]): TData[] {
        return dropdownValue.map(a => this.extractSingleDataFromDropdownValue(a));
    }
    
    
    
    adaptSingleToDropdownValue(data: TData): IReactSelectValue<TData> {
        
        return {
            value: data,
            label: this.getLabel(data)
        }
    }
    extractSingleDataFromDropdownValue(dropdownValue: IReactSelectValue<TData>): TData {
        return dropdownValue?.value;
    }

    onSelectionChanged (newValue: IReactSelectValue<TData>[] | IReactSelectValue<TData>) : TData[] | TData
    {
        const selectedData = this.isMulti === true ? newValue as IReactSelectValue<TData>[] : newValue as IReactSelectValue<TData>;
        if(this.isMulti)
        {
            const selectedDataAsArray = selectedData as [];
            const userData = selectedDataAsArray.map(x => this.extractSingleDataFromDropdownValue(x));
            return userData;
        }else{
            const userData = this.extractSingleDataFromDropdownValue(selectedData as IReactSelectValue<TData>);
            return userData;
        }
    }

    private getLabel(data: TData) : string {
        if(data){
           const labelProperty = Reflect.getOwnPropertyDescriptor(data, this.labelKey)
           if(labelProperty){
               const labelValue = labelProperty.value;
               if(labelValue){
                   return labelValue.toString();
               }
           } 
        }
        return "";
    }
}
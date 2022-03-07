import IDropdownValueAdapter from "./IDropdownValueAdapter"
export default class DefaultDropdownAdapter<TData> implements IDropdownValueAdapter<TData,TData>{
    adaptToDropdownValue(data: TData): TData {
        return data;
    }
    extractDataFromDropdownValue(dropdownValue: TData): TData {
        return dropdownValue;
    }

}
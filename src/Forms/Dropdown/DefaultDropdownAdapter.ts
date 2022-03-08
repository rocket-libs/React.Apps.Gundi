import IDropdownValueAdapter from "./IDropdownValueAdapter"
export default class DefaultDropdownAdapter<TData extends object> implements IDropdownValueAdapter<TData,TData>{
    onSelectionChanged (newValue: TData | TData[]) : TData | TData[]{
        return newValue;
    }
    adaptManyToDropdownValue(data: TData[]): TData[] {
        return data;
    }
    extractManyDataFromDropdownValue(dropdownValue: TData[]): TData[] {
        return dropdownValue;
    }
    adaptSingleToDropdownValue(data: TData): TData {
        return data;
    }
    extractSingleDataFromDropdownValue(dropdownValue: TData): TData {
        return dropdownValue;
    }

}
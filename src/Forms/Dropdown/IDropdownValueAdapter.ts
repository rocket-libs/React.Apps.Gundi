export default interface IDropdownValueAdapter<TData extends object,TDropDownValue extends object> {
    adaptSingleToDropdownValue(data: TData): TDropDownValue;
    extractSingleDataFromDropdownValue(dropdownValue: TDropDownValue): TData;

    adaptManyToDropdownValue(data: TData[]): TDropDownValue[];
    extractManyDataFromDropdownValue(dropdownValues: TDropDownValue[]): TData[];

    onSelectionChanged: (newValue: TDropDownValue[] | TDropDownValue) => TData[] | TData;    
}
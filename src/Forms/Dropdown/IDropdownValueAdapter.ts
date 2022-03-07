export default interface IDropdownValueAdapter<TData,TDropDownValue> {
    adaptToDropdownValue(data: TData): TDropDownValue;
    extractDataFromDropdownValue(dropdownValue: TDropDownValue): TData;
}
import IApplicationProjectDefinition from "./IApplicationProjectDefinition";

export default interface IApplication{
    displayLabel: string;
    applicationProjectDefinitions: IApplicationProjectDefinition[];
    tag: string;
}
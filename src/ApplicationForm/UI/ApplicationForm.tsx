import { PureComponent, ReactNode } from "react";
import { Button } from "react-bootstrap";
import Dropdown from "../../Forms/Dropdown/Dropdown";
import ReactSelectDropDownAdapter from "../../Forms/Dropdown/ReactSelect/ReactSelectDropDownAdapter";
import GundiForm from "../../Forms/GundiForm";
import Textbox from "../../Forms/Textbox";
import ApplicationFormLogic from "../ApplicationFormLogic";
import IApplicationProjectDefinition from "../Data/IApplicationProjectDefinition";

let logic: ApplicationFormLogic = new ApplicationFormLogic();



export default class ApplicationForm extends PureComponent{
    
    async componentDidMount(){
        logic.setRerender(() => this.forceUpdate());
        await logic.fetchProjectDefinitionsAsync();
    }

    get saveButton() : ReactNode{
        return <Button onClick={async () => await logic.saveApplicationAsync()}>{logic.strings.save}</Button>
    }
    
    render(){
        return <GundiForm 
            title={logic.strings.addNewApplication} 
            description={logic.strings.description}
            buttons={this.saveButton}>
            <Textbox 
                displayLabel={logic.strings.name} 
                validationErrors={logic.repository.validationErrors} 
                id="Application.DisplayLabel"
                onChange={(value: string) => logic.setApplicationDisplayLabel(value)}
                value={logic.model.displayLabel} />
            <Dropdown 
                id="Application.Projects" 
                displayLabel={logic.strings.projects}
                data={logic.repository.applicationProjectDefinitions} 
                validationErrors={logic.repository.validationErrors}
                selected={logic.model.applicationProjectDefinitions}
                onSelectionChanged={(data) => {
                    logic.onProjectSelectionChanged(data as IApplicationProjectDefinition[])
                }}
                adapter={new ReactSelectDropDownAdapter<IApplicationProjectDefinition>("label",{
                    isMulti: true,
                    closeMenuOnSelect: false
                })}
                />
                
        </GundiForm>
    }
}
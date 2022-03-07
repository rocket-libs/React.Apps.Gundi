import { PureComponent } from "react";
import Dropdown from "../../Forms/Dropdown";
import GundiForm from "../../Forms/GundiForm";
import Textbox from "../../Forms/Textbox";
import ApplicationFormLogic from "../ApplicationFormLogic";

let logic: ApplicationFormLogic = new ApplicationFormLogic();

export default class ApplicationForm extends PureComponent{
    
    async componentDidMount(){
        logic.setRerender(this.forceUpdate.bind(this));
        await logic.fetchProjectDefinitionsAsync();
    }
    
    render(){
        return <GundiForm title={logic.strings.addNewApplication} description={logic.strings.description}>
            <Textbox displayLabel={logic.strings.name} validationErrors={logic.repository.validationErrors} id="Application.DisplayLabel" />
            <Dropdown 
                id="Application.Projects" 
                displayLabel={logic.strings.projects}
                data={logic.repository.applicationProjectDefinitions} 
                validationErrors={logic.repository.validationErrors}
                selected={logic.model.applicationProjectDefinitions}
                onSelectionChanged={logic.onProjectSelectionChanged}
                />
        </GundiForm>
    }
}
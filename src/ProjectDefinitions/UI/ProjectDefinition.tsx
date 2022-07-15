import { PureComponent, ReactNode } from "react";
import { Button, Form } from "react-bootstrap";
import GetRouteData from "../../BasicRouter/BasicRouterDataReader";
import BusyDialog from "../../Busy/BusyDialog";
import PageHeader from "../../PageHeader/UI/PageHeader";
import IProjectDefinition from "../Data/IProjectDefinition";
import ProjectDefinitionsLogic from "../ProjectDefinitionsLogic";

const logic = new ProjectDefinitionsLogic();
export default class ProjectDefinition extends PureComponent{
    
    componentDidMount(){
        logic.model = GetRouteData<IProjectDefinition>()
        logic.repository.savedModel = JSON.stringify(logic.model);
        logic.setRerender(() => this.forceUpdate());
        this.forceUpdate();
    }

    
    
    render(): ReactNode {
        return  <>
                    <BusyDialog show={logic.repository.busy} />
                    <PageHeader title={"Configure: " + logic.model.label} />
                    <div style={{width:"90%", marginTop:"30px"}}>
                    <Form>
                        <Form.Check 
                        type={"switch"}
                        label={`Delete Local Repository After Build Success`}
                        checked={!logic.model.keepSource}
                        onChange={() => logic.updateModel({keepSource: !logic.model.keepSource})}
                    />
                    <Button onClick={async () => await logic.submitAsync()} disabled={!logic.modelChanged}>Save</Button>
                    </Form>
                    </div>
        </>
    }
}
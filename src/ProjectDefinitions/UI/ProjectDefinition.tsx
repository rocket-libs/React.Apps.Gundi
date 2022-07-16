import { PureComponent, ReactNode } from "react";
import { Button, Form } from "react-bootstrap";
import GetRouteData from "../../BasicRouter/BasicRouterDataReader";
import BusyDialog from "../../Busy/BusyDialog";
import PageHeader from "../../PageHeader/UI/PageHeader";
import IProjectDefinition from "../Data/IProjectDefinition";
import ProjectDefinitionsLogic from "../ProjectDefinitionsLogic";

const logic = new ProjectDefinitionsLogic();
export default class ProjectDefinition extends PureComponent{
    
    async componentDidMount(){
        logic.setRerender(() => this.forceUpdate());
        logic.model = GetRouteData<IProjectDefinition>()
        await logic.initializeAsync();
        logic.repository.savedModel = JSON.stringify(logic.model);
        this.forceUpdate();
    }


    private get projectConfigurations() : ReactNode{
        return <>
            <h3>Project Settings</h3>
            <Form.Group className="mb-3" controlId="publishUrl">
                <Form.Label>Publish URL</Form.Label>
                <Form.Control 
                    type="text" 
                    title={logic.model.project.publishUrl}
                    placeholder="Enter url to publish to" 
                    value={logic.model.project.publishUrl}
                    onChange={(e) => logic.updateModel({project: {...logic.model.project, publishUrl: e.target.value}})} />
                <Form.Text className="text-muted">
                Git remote to which build artifacts are pushed to on successful builds.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="buildOutputDirectory">
                <Form.Label>Build Output Directory</Form.Label>
                <Form.Control 
                    type="text" 
                    title={logic.model.project.buildOutputDirectory} 
                    value={logic.model.project.buildOutputDirectory}
                    onChange={(e) => logic.updateModel({project: {...logic.model.project, buildOutputDirectory: e.target.value}})} />
                <Form.Text className="text-muted">
                This is the directory to which build artifacts are placed in on successful build.
                </Form.Text>
            </Form.Group>
        </>
    }
    
    
    render(): ReactNode {
        return  <>
                    <BusyDialog show={logic.repository.busy} />
                    <PageHeader title={"Configure: " + logic.model.label} />
                    <div style={{width:"90%", marginTop:"30px"}}>
                    <Form>
                        {logic.model.project ? <>
                            {this.projectConfigurations}
                            <hr />
                        </>
                        
                        : null }
                        <h3>Build Settings</h3>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check 
                            type={"switch"}
                            label={`Delete Local Repository After Build Success`}
                            checked={!logic.model.keepSource}
                            onChange={() => logic.updateModel({keepSource: !logic.model.keepSource})}
                            />
                        </Form.Group>
                    <Button onClick={async () => await logic.submitAsync()} disabled={!logic.modelChanged}>Save</Button>
                    </Form>
                    </div>
        </>
    }
}
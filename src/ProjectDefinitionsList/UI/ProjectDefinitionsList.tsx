import { ReactElement } from "react";
import { PotterComponent } from "react-potter";
import ProjectDefinitionsListLogic from "../Potter/ProjectDefinitionsListLogic";
import ProjectDefinitionsListRepository from "../Potter/ProjectDefinitionsListRepository";
import ProjectDefinitionsTable from "./ProjectDefinitionsTable";
import BusyDialog from "../../Busy/BusyDialog";
import { Modal, Button } from "react-bootstrap";

interface IProps {}

export default class ProjectDefinitionsList extends PotterComponent<
  ProjectDefinitionsListRepository,
  object,
  ProjectDefinitionsListLogic,
  IProps
> {
  constructor() {
    super(
      new ProjectDefinitionsListRepository(),
      {},
      new ProjectDefinitionsListLogic()
    );
  }

  message(): ReactElement {
    return (
      <Modal
        show={this.repository.message ? true : false}
        onHide={() => this.potter.pushToRepository({ message: "" })}
      >
        <Modal.Body>{this.repository.message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.potter.pushToRepository({ message: "" })}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  async componentDidMount() {
    await this.logic.fetchProjectDefinitionsAsync();
  }

  componentToShow = () : ReactElement => {
    if(this.repository.hasFetchedProjectDefinitions) {
      return <ProjectDefinitionsTable
      potter={this.potter}
      key={this.getChildKeyFromObject(this.repository.projectDefinitions)}
    />
    }else
    {
        return <div style={{width:"100%",margin:"auto", border:"solid 1px #DFDFDF",textAlign:"center",paddingTop:"50px"}}>{this.repository.startingUpText}</div>
    }
  }

  onRender(): ReactElement {
    return (
      <>
        <BusyDialog show={this.repository.busy} />
        {this.componentToShow()}
      </>
    );
  }

  async onStartedAsync() {
    
  }
}

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

  onRender(): ReactElement {
    return (
      <>
        <BusyDialog show={this.repository.busy} />
        <ProjectDefinitionsTable
          potter={this.potter}
          key={this.getChildKeyFromObject(this.repository.projectDefinitions)}
        />
      </>
    );
  }

  async onStartedAsync() {
    await this.logic.fetchProjectDefinitionsAsync();
  }
}

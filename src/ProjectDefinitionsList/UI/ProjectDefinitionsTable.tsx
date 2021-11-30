import { ReactElement } from "react";
import { Table, Button } from "react-bootstrap";
import { PotterChildComponent } from "react-potter";
import { IPotterChildComponentProps } from "react-potter/build/components/PotterChildComponent";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import ProjectDefinitionsListLogic from "../Potter/ProjectDefinitionsListLogic";
import ProjectDefinitionsListRepository from "../Potter/ProjectDefinitionsListRepository";

interface IProps
  extends IPotterChildComponentProps<
    ProjectDefinitionsListRepository,
    object,
    ProjectDefinitionsListLogic
  > {}

export default class ProjectDefinitionsTable extends PotterChildComponent<
  ProjectDefinitionsListRepository,
  object,
  ProjectDefinitionsListLogic,
  IProps
> {
  onRender(): ReactElement {
    return (
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Project</th>
            <th>Action</th>
          </tr>
          {this.repository.projectDefinitions.map(
            (projectDefinition: IProjectDefinition, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{projectDefinition.label}</td>
                  <td>
                    <Button
                      onClick={() => {
                        const navigate = this.context.history;
                        navigate.push("/project-runner");
                      }}
                    >
                      Run
                    </Button>
                  </td>
                </tr>
              );
            }
          )}
        </thead>
      </Table>
    );
  }
}

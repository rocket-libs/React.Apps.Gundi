import { ReactElement } from "react";
import { Table, Button } from "react-bootstrap";
import { PotterChildComponent } from "react-potter";
import { IPotterChildComponentProps } from "react-potter/build/components/PotterChildComponent";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import ProjectDefinitionsListLogic from "../Potter/ProjectDefinitionsListLogic";
import ProjectDefinitionsListRepository from "../Potter/ProjectDefinitionsListRepository";
import history from "history";

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
                        history.push({
                          pathname: "/project-runner",
                          state: {
                            id: 7,
                            color: "green",
                          },
                        });
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

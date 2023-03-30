import { ReactElement } from "react";
import { Table, Button, Tabs, Tab, ButtonGroup } from "react-bootstrap";
import { PotterChildComponent } from "react-potter";
import { IPotterChildComponentProps } from "react-potter/build/components/PotterChildComponent";

import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import ProjectDefinitionsListLogic from "../Potter/ProjectDefinitionsListLogic";
import ProjectDefinitionsListRepository from "../Potter/ProjectDefinitionsListRepository";

const styles = {
  container: {
    margin: "10px",
  },
};

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
      <div style={styles.container}>
        <Tabs id="projects" className="mb-3">
          {this.logic.tabs.map((label) => {
            const tableProjects = this.logic.getProjectsByBranch({
              branch: label,
            });
            const count = tableProjects?.length ?? 0;
            return (
              <Tab key={label} eventKey={label} title={`${label} (${count})`}>
                {this.table({
                  branch: label,
                })}
              </Tab>
            );
          })}
        </Tabs>
      </div>
    );
  }

  table(args: { branch: string }): ReactElement {
    return (
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Project</th>
            <th>Build Number</th>
            <th>Action</th>
          </tr>
          {this.logic
            .getProjectsByBranch(args)
            .map((projectDefinition: IProjectDefinition, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{projectDefinition.label}</td>
                  <td></td>
                  <td>
                    <ButtonGroup>
                      <Button
                        onClick={() => {
                          window.basicRouter.push({
                            path: "/project",
                            data: projectDefinition,
                          });
                        }}
                      >
                        Run
                      </Button>
                      <Button
                        variant="info"
                        onClick={() => {
                          window.basicRouter.push({
                            path: "/project-definitions/configure",
                            data: projectDefinition,
                          });
                        }}
                      >
                        Configure
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
        </thead>
      </Table>
    );
  }
}

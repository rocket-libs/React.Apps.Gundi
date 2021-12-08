import { PotterComponent } from "react-potter";
import ProjectLogic from "../Potter/ProjectLogic";
import ProjectRepository from "../Potter/ProjectRepository";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import { ReactElement } from "react";
import Page from "../../Layout/Page";

const styles = {
  header: {
    fontSize: "25px",
    fontWeight: "bold",
  },
};

export default class Project extends PotterComponent<
  ProjectRepository,
  IProjectDefinition,
  ProjectLogic,
  any
> {
  constructor() {
    super(
      new ProjectRepository(),
      {} as IProjectDefinition,
      new ProjectLogic()
    );
  }

  async componentDidMount() {
    await this.logic.runProjectAsync(); 
  }

  onRender(): ReactElement {
    return (
      <Page
        title={this.logic.projectDefinition.label}
        busy={this.repository.busy}
      >
        <div style={styles.header}>{this.logic.projectDefinition.label}</div>
        <hr />
        <ol>
          {this.repository.output.map((line, index) => {
            return <li key={index}>{line}</li>;
          })}
        </ol>
      </Page>
    );
  }

  async onStartedAsync() {
   
    
  }
}

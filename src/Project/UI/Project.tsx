import { PotterComponent } from "react-potter";
import ProjectLogic from "../Potter/ProjectLogic";
import ProjectRepository from "../Potter/ProjectRepository";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import { ReactElement } from "react";
import Page from "../../Layout/Page";
import Linkify from 'react-linkify';

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
        title={`Gundi - ${this.logic.projectDefinition.label}`}
        busy={this.repository.busy}
      >
        <div style={styles.header}>{this.logic.projectDefinition.label}</div>
        <hr />
        <div id="gundi-output" style={{padding:"10px", margin:"4px", border:"solid 1px #DFDFDF"}}>
        <Linkify>
        <ol>
          {this.repository.output.map((chunk) => {
            const lines = chunk.split("<br/>")
            return lines.map((line, index) => {
              if(line){
              return <li key={index}>{line}</li>
            }else{
              return <></>
            }});
          })}
        </ol>
        </Linkify>
        </div>
      </Page>
    );
  }

  async onStartedAsync() {
   
    
  }
}

import StandardApiIntergrator from "../../Api/StandardApiIntergrator";
import IProcessRunningResult from "../../Project/Data/IProcessRunningResult";
export default class ProjectDefinitionRunnerApiIntegrator extends StandardApiIntergrator<object> {
  basePath: string = "Run";

  eventSource: EventSource | undefined;

  public async runByIdAsync(
    projectId: string
  ): Promise<IProcessRunningResult[]> {
    
    this.eventSource = new EventSource(`http://localhost:5002/api/v1/EventStreaming/listen`);
    this.eventSource.onmessage = (event) => {
      console.log(event.data);
    }


    const result = await this.getAsync<IProcessRunningResult[]>(
      `run-by-id?projectId=${projectId}`
    );
    return result;
  }

  
}

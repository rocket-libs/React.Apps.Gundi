import StandardApiIntergrator from "../../Api/StandardApiIntergrator";
import IProcessRunningResult from "../Data/IProcessRunningResult";
export default class ProjectDefinitionRunnerApiIntegrator extends StandardApiIntergrator<object> {
  basePath: string = "Run";

  public async runByIdAsync(
    projectId: string
  ): Promise<IProcessRunningResult[]> {
    const result = await this.getAsync<IProcessRunningResult[]>(
      `run-by-id?projectId=${projectId}`
    );
    return result;
  }
}

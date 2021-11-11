import StandardApiIntergrator from "../../Api/StandardApiIntergrator";
export default class ProjectDefinitionRunnerApiIntegrator extends StandardApiIntergrator<object> {
  basePath: string = "Run";

  public async runByIdAsync(projectId: string): Promise<boolean> {
    const result = await this.getAsync<boolean>(
      `run-by-id?projectId=${projectId}`
    );
    return result;
  }
}

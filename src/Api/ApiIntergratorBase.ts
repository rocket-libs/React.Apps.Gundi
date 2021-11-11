import WrappedResponseApiCaller from "./WrappedResponseApiCaller";

export default abstract class ApiIntergratorBase {
  protected apiVersion: "v0" | "v1" = "v1";

  protected get wrappedResponseApiCaller(): WrappedResponseApiCaller {
    return new WrappedResponseApiCaller();
  }

  protected abstract get basePath(): string;

  private getRelativeUrl(action: string): string {
    return `${this.apiVersion}/${this.basePath}/${action}`;
  }

  protected async getAsync<TResult>(action: string): Promise<TResult> {
    return await this.wrappedResponseApiCaller.getAsync<TResult>(
      this.getRelativeUrl(action)
    );
  }

  protected async postAsync<TResult>(
    action: string,
    payload: any
  ): Promise<TResult> {
    return await this.wrappedResponseApiCaller.postAsync(
      this.getRelativeUrl(action),
      payload
    );
  }
}

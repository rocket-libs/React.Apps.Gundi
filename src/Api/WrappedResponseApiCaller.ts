import IWrappedResponse from "./IWrappedResponse";
import ApiCaller from "./ApiCaller";

export default class WrappedResponseApiCaller {
  public async getAsync<TPayload>(relativeUrl: string): Promise<TPayload> {
    const apiCaller = new ApiCaller();
    const response = await apiCaller.getAsync(relativeUrl);
    return await this.extractPayloadAsync(response);
  }

  public async postAsync<TPayload>(
    relativeUrl: string,
    payload: object
  ): Promise<TPayload> {
    const apiCaller = new ApiCaller();
    const response = await apiCaller.postAsync(relativeUrl, payload);
    return await this.extractPayloadAsync(response);
  }

  private async extractPayloadAsync<TPayload>(
    response: Response
  ): Promise<TPayload> {
    const successCode = 1;
    const responseObject =
      (await response.json()) as IWrappedResponse<TPayload>;
    if (responseObject.code === successCode) {
      return responseObject.payload;
    } else {
      throw new Error("API call error: " + responseObject.message);
    }
  }
}

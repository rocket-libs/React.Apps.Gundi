import Settings from "../Settings/Settings";

const apiTimeoutMilliseconds = 1000 * 60 * 5;

export const fullEndpointUri = (relativeUrl: string): string => {
  const settings = new Settings();
  return encodeURI(`${settings.host}api/${relativeUrl}`);
};

export default class ApiCaller {
  public async getAsync(relativeUrl: string): Promise<Response> {
    return await this.callAsync(relativeUrl, "GET");
  }

  public async postAsync(
    relativeUrl: string,
    payload: object
  ): Promise<Response> {
    return await this.callAsync(relativeUrl, "POST", payload);
  }
  private async callAsync(
    relativeUrl: string,
    method: string,
    payload?: object
  ): Promise<Response> {
    const fullUrl = fullEndpointUri(relativeUrl);
    const controller = new AbortController();

    const options = {
      method: method,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: payload ? JSON.stringify(payload) : undefined,
    };

    setTimeout(() => controller.abort(), apiTimeoutMilliseconds);
    const response = await fetch(fullUrl, options);
    if (response.ok) {
      return response;
    } else {
      throw new Error(
        `Error calling api '${fullUrl}'\n HTTP Status Code: '${response.status}' Status Text '${response.statusText}'`
      );
    }
  }
}

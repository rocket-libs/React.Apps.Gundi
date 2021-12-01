import INavigationInformation from "./INavigationInformation";
export default class BasicRouterFunctions {
  public push: (navigationInformation: INavigationInformation) => void = (_) =>
    console.error("Push not yet initialized");
}

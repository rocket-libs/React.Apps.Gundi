import ModuleStateManager from "module-state-manager";
import LandingStrings from "./Data/LandingStrings";

export default class LandingLogic extends ModuleStateManager{
    repository: any;
    model: any;
    strings: LandingStrings = new LandingStrings();
}
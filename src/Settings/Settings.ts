import AppEnvironments from "./AppEnvironments";
export default class Settings {
  environment: AppEnvironments = "Development";
  get host(): string{
    const environmentHosts = new Map<AppEnvironments,string>();
    environmentHosts.set("Development", "http://localhost:5002/");
    environmentHosts.set("Production", "");
    if(environmentHosts.has(this.environment)){
      return environmentHosts.get(this.environment) ?? "";
    }else{
      throw new  Error(`Host for environment ${this.environment} has not been defined`);
    }
  }
}

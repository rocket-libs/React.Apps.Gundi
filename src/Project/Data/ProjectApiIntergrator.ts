import StandardApiIntergrator from "../../Api/StandardApiIntergrator";
import IProject from "./IProject";

export default class ProjectApiIntergrator extends StandardApiIntergrator<IProject>{
    protected get basePath(): string {
        return "Projects"
    }

    public async getByIdAsync(args: {id: string}): Promise<IProject>{
        return await this.getAsync("get-by-id?id=" + args.id);
    }
}
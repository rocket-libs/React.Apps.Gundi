export default class AsyncRunner{
    private runStateWriter: (running: boolean) => void;
    constructor(args: {runStateWriter: (running: boolean) => void}){
        this.runStateWriter = args.runStateWriter;
    }

    public async runAsync<TResult>(fn: () => Promise<TResult>) : Promise<TResult>{
        try{
            this.runStateWriter(true);
            return await fn();
        }finally{
            this.runStateWriter(false);
        }
    }
}
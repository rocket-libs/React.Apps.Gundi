export default class ServerEventListener{
    eventSource: EventSource;
    constructor(args: {  url: string, onData: (data: string) => void, onCompleted: () => void}){
        this.eventSource = new EventSource(args.url);
        this.eventSource.onmessage = (event) => {
            if(event.data === "---terminate---" && this.eventSource){
                this.eventSource.close();
                this.eventSource.onmessage = null;
                args.onCompleted();
            }else{
                args.onData(event.data);
            }
        }
    }
}
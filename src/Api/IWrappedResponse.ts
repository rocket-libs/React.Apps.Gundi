export default interface IWrappedResponse<TPayload> {
    code: number;
    message: string;
    payload: TPayload;
}

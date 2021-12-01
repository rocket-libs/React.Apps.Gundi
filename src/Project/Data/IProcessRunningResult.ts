export default interface IProcessRunningResult {
  duration: Date;
  endTime: Date;
  errors: string[];
  exitCode: number;
  output: string[];
  rawCommand: string;
  startTime: Date;
}

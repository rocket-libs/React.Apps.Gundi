export default function GetRouteData<TState>(): TState {
  debugger;
  return window.history.state as TState;
}

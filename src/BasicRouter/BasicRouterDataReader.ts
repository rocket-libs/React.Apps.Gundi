export default function GetRouteData<TState>(): TState {
  return window.history.state as TState;
}

import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";

const History = createBrowserHistory();

export default History;

const GetNavigator = () => {
  return useNavigate();
};

export { GetNavigator };

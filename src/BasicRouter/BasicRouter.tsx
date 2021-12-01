import { ReactElement, useEffect, useState } from "react";
import BasicRouterFunctions from "./BasicRouterFunctions";
import INavigationInformation from "./INavigationInformation";
import IRoute from "./IRoute";

interface IProps {
  routes: IRoute[];
  badRouteComponent: ReactElement;
}

let pathSetterInstance: () => void;

declare global {
  interface Window {
    basicRouter: BasicRouterFunctions;
  }
}

window.basicRouter = window.basicRouter || new BasicRouterFunctions();

export default function BasicRouter(props: IProps): ReactElement {
  const [navigationInfo, setNavigationInfo] = useState<INavigationInformation>({
    path: "/",
  });

  const [activeNavigationInformation, setActiveNavigationInformation] =
    useState<INavigationInformation>();

  const pathSetter = () => {
    setNavigationInfo({
      path: window.location.pathname,
    });
  };

  useEffect(() => {
    window.basicRouter.push = (
      navigationInformation: INavigationInformation
    ) => {
      navigationInformation.path =
        navigationInformation.path.toLocaleLowerCase();
      setNavigationInfo(navigationInformation);
    };
    pathSetterInstance = pathSetter;
    window.addEventListener("popstate", pathSetterInstance);

    return function () {
      window.basicRouter.push = (_) => {
        console.error("BasicRouter push was disposed");
      };
      window.removeEventListener("popstate", pathSetterInstance);
    };
  });
  useEffect(() => {
    window.history.pushState(navigationInfo.data, "", navigationInfo.path);
    setActiveNavigationInformation(navigationInfo);
  }, [navigationInfo.path, navigationInfo.data, navigationInfo]);

  const targetComponent = props.routes.find(
    (candidateRoute) =>
      candidateRoute.path.toLocaleLowerCase() === navigationInfo.path
  ) ?? { path: "/404", component: props.badRouteComponent };

  const readyToRender = activeNavigationInformation === navigationInfo;
  if (readyToRender) {
    return (
      <div key={activeNavigationInformation?.path}>
        {targetComponent.component}
      </div>
    );
  } else {
    return <>...</>;
  }
}

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import BasicRouter from "./BasicRouter/BasicRouter";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectDefinitionsList from "./ProjectDefinitionsList/UI/ProjectDefinitionsList";
import Project from "./Project/UI/Project";

ReactDOM.render(
  <React.StrictMode>
    <BasicRouter
      routes={[
        {
          path: "/",
          component: <ProjectDefinitionsList />,
        },
        {
          path: "/project",
          component: <Project />,
        },
      ]}
      badRouteComponent={<div>Nothing here</div>}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

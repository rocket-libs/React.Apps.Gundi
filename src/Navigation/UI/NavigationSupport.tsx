import { PureComponent, ReactNode } from "react";
import { Button } from "react-bootstrap";
import "../../grid.css";

interface IProps {
  children: ReactNode;
}
export default class NavigationSupport extends PureComponent<IProps> {
  render() {
    return (
      <div className="flex-grid-responsive">
        <div className="col1">
          <div>
            <Button
              variant="link"
              onClick={() => window.basicRouter.push({ path: "/" })}
            >
              Home
            </Button>
          </div>
          <div>
            <Button
              variant="link"
              onClick={() =>
                window.basicRouter.push({ path: "/project-definitions/list" })
              }
            >
              Projects
            </Button>
          </div>
        </div>
        <div className="col6">{this.props.children}</div>
      </div>
    );
  }
}

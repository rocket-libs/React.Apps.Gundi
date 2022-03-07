import { PureComponent } from "react";
import LandingLogic from "../LandingLogic";
import "../../grid.css";
import { Button } from "react-bootstrap";

const styles={
    container:{
        width: "90%",
        margin: "auto",
    }
}
let logic: LandingLogic = new LandingLogic();
export default class Landing extends PureComponent{
    render(){
        return  <div style={styles.container}>
                    <div>
                        <h1>Welcome to {logic.strings.applicationName}</h1>
                        <hr/>
                    </div>
                    <div className="flex-grid-responsive">
                        <div className="col1">
                            <Button onClick={() => window.basicRouter.push({path: "/applications/form"})}>{logic.strings.addNewApplication}</Button>
                        </div>
                    </div>
                </div>

    }
}
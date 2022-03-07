import { PureComponent } from "react";

interface IProps{
    children: React.ReactNode; 
    title: string;
    description: string;
}

const styles={
    form:{
        width: "90%",
        margin: "auto",
        padding: "10px"
    }
}


export default class GundiForm extends PureComponent<IProps>{
    render(){
        return  <div style={styles.form}>
                    <div>
                        <h1>{this.props.title}</h1>
                        <div>{this.props.description}</div>
                        <hr/>
                    </div>
                    {this.props.children}
                </div>
    }
}
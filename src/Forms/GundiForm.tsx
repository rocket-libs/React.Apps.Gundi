import { CSSProperties, PureComponent, ReactNode } from "react";

interface IProps{
    children: React.ReactNode; 
    title: string;
    description: string;
    buttons?: React.ReactNode;
}

const styles={
    form:{
        width: "90%",
        margin: "auto",
        padding: "10px"
    },
    buttonsContainer:{
        textAlign:"right"
    } as CSSProperties
}


export default class GundiForm extends PureComponent<IProps>{
    
    private get buttons() : ReactNode{
        if(this.props.buttons){
            return <div style={styles.buttonsContainer}>
                        <hr/>
                        {this.props.buttons}
                    </div>
        }else{
            return null;
        }
    }
    
    render(){
        return  <div style={styles.form}>
                    <div>
                        <h1>{this.props.title}</h1>
                        <div>{this.props.description}</div>
                        <hr/>
                    </div>
                    {this.props.children}
                    {this.buttons}
                </div>
    }
}
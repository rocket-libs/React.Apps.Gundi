import { PureComponent, ReactNode } from "react";

interface IProps{
    title: string;
}

export default class PageHeader extends PureComponent<IProps>{
    render(): ReactNode {
        window.document.title = this.props.title;
        return <>
            <h1>{this.props.title}</h1>
            <hr />
        </>
    }
}
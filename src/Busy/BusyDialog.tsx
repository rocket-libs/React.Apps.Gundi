import { Modal, ProgressBar } from "react-bootstrap";

interface IProps {
  show: boolean;
}
export default function BusyDialog(props: IProps) {
  return (
    <Modal show={props.show}>
      <ProgressBar animated now={100} />
    </Modal>
  );
}

import { PureComponent } from "react";
import { Button, Form } from "react-bootstrap";
import GetRouteData from "../../BasicRouter/BasicRouterDataReader";
import GundiForm from "../../Forms/GundiForm";
import PageHeader from "../../PageHeader/UI/PageHeader";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import ManageProjectLogic from "../State/ManageProjectLogic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const logic = new ManageProjectLogic();
export default class ManageProjectForm extends PureComponent {
  componentDidMount(): void {
    logic.setRerender(() => this.forceUpdate());
    logic.updateModel(GetRouteData<IProjectDefinition>());
  }

  render() {
    return (
      <>
        <ToastContainer />
        <PageHeader title={`Manage Project: ${logic.projectLabel}`} />
        <GundiForm
          title={logic.projectLabel}
          description="Manage the settings of your Gundi Project"
          buttons={
            <>
              <Button
                disabled={logic.canSave === true ? false : true}
                onClick={() => {
                  toast.promise(logic.saveAsync(), {
                    pending: "Saving Project...",
                    success: "Saved",
                    error: "Error saving",
                  });
                }}
              >
                Save
              </Button>{" "}
            </>
          }
        >
          <Form.Group className="mb-3" controlId="label">
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              title={logic.model.label}
              placeholder="Label"
              value={logic.model.label}
              onChange={(e) =>
                logic.updateModel({
                  label: e.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              The name of the project as you'd wish it displayed.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="repositoryUrl">
            <Form.Label>Repository Url</Form.Label>
            <Form.Control
              type="text"
              title={logic.model.repositoryDetail.url}
              placeholder="Repository Url"
              value={logic.model.repositoryDetail.url}
              onChange={(e) =>
                logic.updateModel({
                  repositoryDetail: {
                    ...logic.model.repositoryDetail,
                    url: e.target.value,
                  },
                })
              }
            />
            <Form.Text className="text-muted">
              The git repository url for the project.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="repositoryBranch">
            <Form.Label>Repository Branch</Form.Label>
            <Form.Control
              type="text"
              title={logic.model.repositoryDetail.url}
              placeholder="Repository Branch"
              value={logic.model.repositoryDetail.branch}
              onChange={(e) =>
                logic.updateModel({
                  repositoryDetail: {
                    ...logic.model.repositoryDetail,
                    branch: e.target.value,
                  },
                })
              }
            />
            <Form.Text className="text-muted">
              The git branch for the project.
            </Form.Text>
          </Form.Group>
        </GundiForm>
      </>
    );
  }
}

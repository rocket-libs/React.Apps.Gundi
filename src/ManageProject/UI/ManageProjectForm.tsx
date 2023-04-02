import { PureComponent, ReactNode } from "react";
import { Button, Form } from "react-bootstrap";
import GetRouteData from "../../BasicRouter/BasicRouterDataReader";
import GundiForm from "../../Forms/GundiForm";
import PageHeader from "../../PageHeader/UI/PageHeader";
import IProjectDefinition from "../../ProjectDefinitions/Data/IProjectDefinition";
import ManageProjectLogic from "../State/ManageProjectLogic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Textbox from "../../Forms/Textbox";
import MultilineTextbox from "../../Forms/MultilineTextbox";
import Dropdown from "../../Forms/Dropdown/Dropdown";
import ReactSelectDropDownAdapter from "../../Forms/Dropdown/ReactSelect/ReactSelectDropDownAdapter";
import IBuildStage from "../../BuildStages/Data/IBuildStage";

const logic = new ManageProjectLogic();
export default class ManageProjectForm extends PureComponent {
  componentDidMount(): void {
    logic.setRerender(() => this.forceUpdate());
    logic.initializeModel(GetRouteData<IProjectDefinition>());
  }

  private get buildSection(): ReactNode {
    return (
      <>
        <Textbox
          id="Project.BuildOutputDirectory"
          validationErrors={logic.repository.validationErrors}
          displayLabel="Build Output Directory"
          value={logic.model.project.buildOutputDirectory}
          onChange={(value) =>
            logic.updateModel({
              project: {
                ...logic.model.project,
                buildOutputDirectory: value,
              },
            })
          }
          description={
            "The path relative to the root of the repository to where build output shall be placed."
          }
        />
        <MultilineTextbox
          id="Project.BuildCommands"
          validationErrors={logic.repository.validationErrors}
          displayLabel="Build Commands"
          value={logic.model.project.buildCommands.join("\n")}
          onChange={(value) =>
            logic.updateModel({
              project: {
                ...logic.model.project,
                buildCommands: value.split("\n"),
              },
            })
          }
          description={
            "The commands to run to build the project.  Each line is a separate command."
          }
        />
        <Dropdown
          id="Project.DisabledStages"
          displayLabel={"Disabled Stages"}
          data={logic.repository.buildStages}
          validationErrors={logic.repository.validationErrors}
          selected={logic.model.project.disabledStages}
          onSelectionChanged={(data) => {
            //logic.onProjectSelectionChanged(data as IApplicationProjectDefinition[])
          }}
          adapter={
            new ReactSelectDropDownAdapter<IBuildStage>("displayLabel", {
              isMulti: true,
              closeMenuOnSelect: false,
            })
          }
        />
        <MultilineTextbox
          id="Project.OnFailurePostBuildCommands"
          validationErrors={logic.repository.validationErrors}
          displayLabel="On Failure Post Build Commands"
          value={logic.model.project.onFailurePostBuildCommands
            .map((buildCommand) => buildCommand.command)
            .join("\n")}
          onChange={(value) =>
            logic.updateModel({
              project: {
                ...logic.model.project,
                onFailurePostBuildCommands: value.split("\n").map((x) => {
                  return {
                    command: x,
                  };
                }),
              },
            })
          }
          description={
            "The commands to run after a build failure.  Each line is a separate command."
          }
        />
        <MultilineTextbox
          id="Project.OnSuccessPostBuildCommands"
          validationErrors={logic.repository.validationErrors}
          displayLabel="On Success Post Build Commands"
          value={logic.model.project.onSuccessPostBuildCommands
            .map((buildCommand) => buildCommand.command)
            .join("\n")}
          onChange={(value) =>
            logic.updateModel({
              project: {
                ...logic.model.project,
                onSuccessPostBuildCommands: value.split("\n").map((x) => {
                  return {
                    command: x,
                  };
                }),
              },
            })
          }
          description={
            "The commands to run after a successful build.  Each line is a separate command."
          }
        />

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type={"switch"}
            label={`Delete Local Repository After Build Success`}
            checked={!logic.model.keepSource}
            onChange={() =>
              logic.updateModel({ keepSource: !logic.model.keepSource })
            }
          />
        </Form.Group>
      </>
    );
  }

  render() {
    return (
      <>
        <ToastContainer />
        <PageHeader title={`Manage Project: ${logic.projectLabel}`} />

        {!logic.isInitialized ? (
          <>Loading...</>
        ) : (
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
            <h3>Basic Information</h3>
            <Textbox
              id="ProjectDefinition.Label"
              value={logic.model.label}
              validationErrors={logic.repository.validationErrors}
              onChange={(value) => logic.updateModel({ label: value })}
              displayLabel={"Label"}
              description="The name of the project as you'd wish it displayed."
            />

            <h3>Source Repository</h3>
            <Textbox
              id="RepositoryDetail.Url"
              value={logic.model.repositoryDetail.url}
              validationErrors={logic.repository.validationErrors}
              onChange={(value) =>
                logic.updateModel({
                  repositoryDetail: {
                    ...logic.model.repositoryDetail,
                    url: value,
                  },
                })
              }
              displayLabel={"Repository Url"}
              description="The git repository url for the project."
            />
            <Textbox
              id="RepositoryDetail.Branch"
              value={logic.model.repositoryDetail.branch}
              validationErrors={logic.repository.validationErrors}
              onChange={(value) =>
                logic.updateModel({
                  repositoryDetail: {
                    ...logic.model.repositoryDetail,
                    branch: value,
                  },
                })
              }
              displayLabel={"Repository Branch"}
              description="The branch to build when repository is pulled"
            />
            <Textbox
              id="ProjectDefinition.ProjectPath"
              validationErrors={logic.repository.validationErrors}
              displayLabel="Project Path"
              value={logic.model.projectPath}
              onChange={(value) =>
                logic.updateModel({
                  projectPath: value,
                })
              }
              description={
                "The path relative to the root of the repository to where the Gundi file is located."
              }
            />
            <h3>Build</h3>
            {this.buildSection}
          </GundiForm>
        )}
      </>
    );
  }
}

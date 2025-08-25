import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonIcon,
  IonInput,
  IonModal,
  IonRow,
  IonText,
  IonTextarea,
} from "@ionic/react";
import { logInOutline } from "ionicons/icons";
import React from "react";
import { addTask } from "../../services/api";
import { Task } from "../../types/task";

type Props = {
  modal?: React.RefObject<HTMLIonModalElement | null>;
  showAddModal: boolean;

  setShowAddModal: (t: boolean) => void;
  setLoading: (t: boolean) => void;
  fetchTasks: () => void;
};

const TaskAddNew: React.FC<Props> = ({
  modal,
  showAddModal,

  setShowAddModal,
  setLoading,
  fetchTasks,
}) => {
  return (
    <IonModal
      isOpen={showAddModal}
      ref={modal}
      initialBreakpoint={0.5}
      breakpoints={[0.5, 0.75, 1]}
      onDidDismiss={({ detail }) => {
        setShowAddModal(false);
        console.log(`Dismissed with role: ${detail.role}`);
      }}
    >
      <IonContent scrollY={false}>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Create your task</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!e.currentTarget.checkValidity()) {
                        e.currentTarget.reportValidity();
                        return;
                      }
                      const fd = new FormData(e.currentTarget);
                      const formDateTime = String(fd.get("dateOnly"));
                      const formDate = formDateTime.split("T")[0]; // "2025-08-25"
                      const taskObj: Task = {
                        title: String(fd.get("title")),
                        body: String(fd.get("body")),
                        dueDates: [formDate],
                      };
                      await addTask(taskObj);
                      setShowAddModal(false);
                      setLoading(true);
                      await fetchTasks();
                      setLoading(false);
                    }}
                  >
                    <IonInput
                      fill="outline"
                      labelPlacement="floating"
                      //label="Title"
                      name="title"
                      type="text"
                      placeholder="Title"
                      required={true}
                    >
                      <div slot="label">
                        Title <IonText color="danger">(Required)</IonText>
                      </div>
                    </IonInput>

                    <IonTextarea
                      className="ion-margin-top"
                      label="Describe task"
                      labelPlacement="floating"
                      name="body"
                      fill="outline"
                      placeholder="Enter text"
                      autoGrow={true}
                    ></IonTextarea>

                    <IonDatetimeButton
                      className="ion-padding"
                      datetime="dateOnly"
                    ></IonDatetimeButton>

                    <IonModal keepContentsMounted={true}>
                      <IonDatetime
                        id="dateOnly"
                        presentation="date"
                        showDefaultTitle={true}
                        name="dateOnly"
                        formatOptions={{
                          date: {
                            year: "numeric",
                            weekday: "short",
                            month: "long",
                            day: "2-digit",
                          },
                        }}
                        value={new Date().toISOString().split("T")[0]}
                        preferWheel={true}
                        doneText="All set"
                        cancelText="Never mind"
                        showDefaultButtons={true}
                      ></IonDatetime>
                    </IonModal>

                    <IonButton
                      className="ion-margin-top"
                      type="submit"
                      expand="block"
                      color="success"
                    >
                      Create
                      <IonIcon icon={logInOutline} slot="end" />
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default TaskAddNew;

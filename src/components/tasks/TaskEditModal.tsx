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
  IonTextarea,
} from "@ionic/react";
import { logInOutline } from "ionicons/icons";
import React from "react";
import { editTask } from "../../services/api";
import { Task } from "../../types/task";

type Props = {
  modal?: React.RefObject<HTMLIonModalElement | null>;
  showEditModal: boolean;
  taskSelected: Task | null;

  setShowEditModal: (t: boolean) => void;
  setLoading: (t: boolean) => void;
  fetchTasks: () => void;
};

const TaskEditModal: React.FC<Props> = ({
  modal,
  showEditModal,
  taskSelected,

  setShowEditModal,
  setLoading,
  fetchTasks,
}) => {
  return (
    <IonModal
      isOpen={showEditModal}
      ref={modal}
      initialBreakpoint={0.5}
      breakpoints={[0.5, 0.75, 1]}
      onDidDismiss={({ detail }) => {
        setShowEditModal(false);
        console.log(`Dismissed with role: ${detail.role}`);
      }}
    >
      <IonContent scrollY={false}>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Edit your task</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <form
                    onSubmit={async (e) => {
                      if (taskSelected) {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        const formDate = String(fd.get("dateOnly"));

                        const updatedTask = {
                          ...taskSelected,
                          title: String(fd.get("title") ?? taskSelected.title),
                          body: String(fd.get("body") ?? taskSelected.body),
                          dueDates: taskSelected.dueDates.map(
                            (d) => d.dueDates
                          ),
                        };
                        updatedTask.dueDates[0] = formDate;
                        await editTask(updatedTask);
                        setShowEditModal(false);
                        setLoading(true);
                        await fetchTasks();
                        setLoading(false);
                      }
                    }}
                  >
                    <IonInput
                      fill="outline"
                      labelPlacement="floating"
                      label="Title"
                      name="title"
                      type="text"
                      placeholder="Title"
                      value={taskSelected?.title}
                    />

                    <IonTextarea
                      className="ion-margin-top"
                      label="Describe task"
                      labelPlacement="floating"
                      name="body"
                      fill="outline"
                      placeholder="Enter text"
                      value={taskSelected?.body}
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
                        value={taskSelected?.dueDates[0].dueDates}
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
                      Edit
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

export default TaskEditModal;

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { gridOutline, addOutline } from "ionicons/icons";
import React from "react";
import { Route } from "react-router";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tab1";

const TabsLayout: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/dashboard" component={Dashboard} />
        <Route exact path="/app/tasks" component={Tasks} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/app/dashboard">
          <IonIcon icon={gridOutline} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tasks" href="/app/tasks">
          <IonIcon icon={addOutline} />
          <IonLabel>Add Task</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsLayout;

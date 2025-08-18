import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { gridOutline, addOutline } from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router";
import Dashboard from "./Dashboard";
import Tasks from "./Tasks";

const TabsLayout: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/tabs/dashboard" component={Dashboard} />
        <Route exact path="/app/tabs/tasks" component={Tasks} />
        <Redirect exact from="/app/tabs" to="/app/tabs/dashboard" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/app/tabs/dashboard">
          <IonIcon icon={gridOutline} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tasks" href="/app/tabs/tasks">
          <IonIcon icon={addOutline} />
          <IonLabel>Tasks</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsLayout;

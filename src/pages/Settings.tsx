import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Tab1 from "./Tab1";
import Tab2 from "./Dashboard";
import { addCircleOutline, clipboardOutline } from "ionicons/icons";

const Settings: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/app/settings/tab1">
          <IonIcon icon={clipboardOutline}></IonIcon>
          <IonLabel>Tasks</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab2" href="/app/settings/tab2">
          <IonIcon icon={addCircleOutline}></IonIcon>
          <IonLabel>Add 1</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route path="/app/settings/tab1" component={Tab1}></Route>
        <Route path="/app/settings/tab2" component={Tab2}></Route>
        <Route exact path="/app/settings">
          <Redirect to="/app/settings/tab1"></Redirect>
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Settings;

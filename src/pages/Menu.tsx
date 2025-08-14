import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import List from "./List";
import Settings from "./Settings";
import {
  addOutline,
  gridOutline,
  homeOutline,
  logOutOutline,
  newspaperOutline,
} from "ionicons/icons";
import Dashboard from "./List";

const Menu: React.FC = () => {
  const pathes = [
    { name: "Settings", url: "/app/settings", icon: newspaperOutline },
  ];

  return (
    <IonPage>
      <IonRouterOutlet id="main">
        <Route exact path='/app/dashboard' component={Dashboard}/>
        <Route exact path='/app/dashboard' render={() =>
          (
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path='/app/dashboard' />
              </IonRouterOutlet>
              <IonTabBar slot='bottom'>
                <IonTabButton tab='dashboard' href="/app/dashboard">
                  <IonIcon icon={gridOutline}></IonIcon>
                  <IonLabel>Dashboard</IonLabel>
                </IonTabButton>

                <IonTabButton tab='tasks' href="/app/tasks">
                  <IonIcon icon={addOutline}></IonIcon>
                  <IonLabel>Add Task</IonLabel>
                </IonTabButton>
              </IonTabBar>
              
            </IonTabs>
          )
        }>
        </Route>
      </IonRouterOutlet>

      <IonHeader>
        <IonToolbar color={"tertiary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar color={"secondary"}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {pathes.map((item, index) => (
            <IonMenuToggle key={index}>
              <IonItem
                lines="full"
                routerLink={item.url}
                routerDirection="none"
              >
                <IonIcon slot="start" icon={item.icon} /> {item.name}
              </IonItem>
            </IonMenuToggle>
          ))}

          <IonMenuToggle>
            <IonItem routerLink="/" routerDirection="root" lines="full">
              <IonIcon slot="start" icon={logOutOutline} />
              Logout
            </IonItem>
          </IonMenuToggle>
        </IonContent>
      </IonMenu>
    </IonPage>
  );
};

export default Menu;

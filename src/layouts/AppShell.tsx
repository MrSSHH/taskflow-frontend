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
import {
  gridOutline,
  addOutline,
  logOutOutline,
  newspaperOutline,
} from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router";
import Dashboard from "../pages/Dashboard";

const AppMenu: React.FC = () => {
  const pathes = [
    { name: "Settings", url: "/app/settings", icon: newspaperOutline },
  ];
  return (
    <IonPage>
      <IonRouterOutlet id="main">
        <Route
          path="/app"
          render={() => (
            <>
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
              <Route exact path="/">
                <Redirect to="/app/dashboard" />
              </Route>
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
            </>
          )}
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default AppMenu;

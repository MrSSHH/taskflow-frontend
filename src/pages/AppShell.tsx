import React from "react";
import { logOutOutline, newspaperOutline, homeOutline } from "ionicons/icons";
import {
  IonPage,
  IonMenu,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonRouterOutlet,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import TabsLayout from "./TabsLayout";
import Settings from "./Settings";

const AppShell: React.FC = () => {
  const pathes = [
    { name: "Home", url: "/app/tabs", icon: homeOutline },
    { name: "Settings", url: "/app/settings", icon: newspaperOutline },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"secondary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>TaskFlow</IonTitle>
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

      <IonRouterOutlet id="main">
        <Route path="/app/tabs" component={TabsLayout} />
        <Route path="/app/settings" component={Settings} />
        <Redirect exact from="/app" to="/app/tabs" />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default AppShell;

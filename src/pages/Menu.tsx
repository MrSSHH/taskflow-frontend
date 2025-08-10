import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import List from "./List";
import Settings from "./Settings";
import { homeOutline, newspaperOutline } from "ionicons/icons";

const Menu: React.FC = () => {
  const pathes = [
    { name: "Home", url: "/app/list", icon: homeOutline },
    { name: "Settings", url: "/app/settings", icon: newspaperOutline },
  ];

  return (
    <IonPage>
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar color={"secondary"}>
            <IonButtons slot='start'>
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent >
          {pathes.map((item, index) => (
            <IonMenuToggle key={index}>
              <IonItem lines='full' routerLink={item.url} routerDirection="none">
                <IonIcon slot='start' icon={item.icon} /> {item.name}
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id="main">
        <Route exact path="/app/list" component={List} />
        <Route exact path="/app/settings" component={Settings} />
        <Route exact path="/app">
          <Redirect to="/app/list" />
        </Route>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Menu;

import React, { useEffect } from "react";
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
  useIonRouter,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import TabsLayout from "./TabsLayout";
import Settings from "./Settings";
import { removeToken } from "../lib/auth-stroage";
import { setSession } from "../utils/session-store";

const AppShell: React.FC = () => {
  const router = useIonRouter();

  const handleLogout = async () => {
    await removeToken();
    await setSession(null);
    router.push("/", "root"); // navigate to login
  };
  const pathes = [
    { name: "Home", url: "/app/tabs", icon: homeOutline },
    { name: "Settings", url: "/app/settings", icon: newspaperOutline },
  ];

  return (
    <IonPage>
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="content-darkmode">
          {pathes.map((item, index) => (
            <IonMenuToggle key={index}>
              <IonItem
                className="content-darkmode"
                lines="full"
                routerLink={item.url}
                routerDirection="none"
              >
                <IonIcon slot="start" icon={item.icon} /> {item.name}
              </IonItem>
            </IonMenuToggle>
          ))}

          <IonMenuToggle>
            <IonItem
              className="content-darkmode"
              onClick={handleLogout}
              lines="full"
            >
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

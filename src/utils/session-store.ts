let session: tokenStruct | null = null;
let listeners: (() => void)[] = [];
export interface tokenStruct {
  accessToken: string;
  refreshToken: string;
}

export function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

export function getSnapshot() {
  return session;
}

export function setSession(newSession: tokenStruct | null) {
  session = newSession;
  for (const l of listeners) l();
}

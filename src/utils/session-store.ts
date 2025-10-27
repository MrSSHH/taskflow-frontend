let session: string | null = null;
let listeners: (() => void)[] = [];

export function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

export function getSnapshot() {
  return session;
}

export function setSession(newSession: string | null) {
  session = newSession;
  for (const l of listeners) l();
}

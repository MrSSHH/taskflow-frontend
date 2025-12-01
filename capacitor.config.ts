import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.benji.taskflow",
  appName: "Taskflow",
  webDir: "dist",
  android: {
    allowMixedContent: true,
  },
  plugins: {},
};

export default config;

import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "Mesh Focus Sprint",
  description: "A browser-local shared focus sprint with an honest timer.",
  accentHex: "#ff9f43",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});

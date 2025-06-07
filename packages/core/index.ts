import { makeInstaller } from "@mxm-ui/utils";
import components from "./components";
import '@mxm-ui/theme/index.css'

const installer = makeInstaller(components);

export * from "@mxm-ui/components";
export default installer;
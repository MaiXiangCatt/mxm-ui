import Button from "./Button.vue";
import ButtonGroup from "./ButtonGroup.vue";
import { withInstall } from "../../utils/install";

export const MxmButton = withInstall(Button)
export const MxmButtonGroup = withInstall(ButtonGroup)

export * from "./types"
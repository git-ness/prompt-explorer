import {filterAsync, RNPlugin} from "@remnote/plugin-sdk";
import {updateState} from "./assigment";
import {promptPowerupCode} from "./consts";
import {runPrompt} from "./prompt";

export const runWorkflow = async (plugin: RNPlugin) => {
  const rem = await plugin.focus.getFocusedRem();
  const children = (await rem?.getChildrenRem()) || [];
  const promptRems = (await filterAsync(children, child => child.hasPowerup(promptPowerupCode)));
  let state = {}
  for (const promptRem of promptRems) {
    debugger
    const output = await runPrompt(plugin, promptRem, state)
    if (output) {
      const {result, args} = output
      state = await updateState(plugin, promptRem, result, args);
    }
  }
}

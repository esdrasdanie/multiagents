import { AIMessage } from "@langchain/core/messages"
import type { State } from "./state.js"

export const commsSpecialist = (state: typeof State.State) => {
  console.log('Comms specialist chamando')
  return {
    executedNodes: 1,
    output: [new AIMessage('Olá da IA')],
  }
}
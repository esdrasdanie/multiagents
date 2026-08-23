import { AIMessage } from "@langchain/core/messages"
import type { State } from "./state.js"

export const schedulingSpecialist = (state: typeof State.State) => {
  console.log('Scheduling specialist chamando')
  return {
    executedNodes: 1,
    output: [new AIMessage('Olá da IA')],
  }
}
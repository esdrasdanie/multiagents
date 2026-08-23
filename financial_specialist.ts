import { AIMessage } from "@langchain/core/messages"
import type { State } from "./state.js"

export const financialSpecialist = (state: typeof State.State) => {
  console.log('Financial specialist chamando')
  return {
    executedNodes: 1,
    output: [new AIMessage('Olá da IA')],
  }
}
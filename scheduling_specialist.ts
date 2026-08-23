import { HumanMessage } from "@langchain/core/messages"
import type { State } from "./state.js"

export const schedulingSpecialist = (state: typeof State.State) => {
  console.log('Scheduling specialist chamando')
  return {
    messages: [new HumanMessage('Olá da IA')],
  }
}
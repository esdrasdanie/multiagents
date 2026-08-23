import { HumanMessage } from "@langchain/core/messages"
import type { State } from "./state.js"

export const financialSpecialist = (state: typeof State.State) => {
  console.log('Financial specialist chamando')
  return {
    messages: [new HumanMessage('Aqui está sua conta: 300 reais. Pode terminar')],
  }
}
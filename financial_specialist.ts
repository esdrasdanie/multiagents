import { HumanMessage } from '@langchain/core/messages'
import type { State } from './state.js'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { ai } from './google_genai.js'
import { SystemMessage } from '@langchain/core/messages'
import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

const payBill = new DynamicStructuredTool({
  name: "pay_bill",
  description: "Pagar a conta do usuário",
  schema: z.object({
    price: z.number().describe("valor da conta")
  }),
  func: async ( { price } ) => {
    console.log("Pagando conta...")  
    return "Conta paga com sucesso!"
  } 
})

const financialSpecialistAgent = createReactAgent({
  llm: ai,
  tools: [payBill],
  prompt: new SystemMessage(
    'Você é um analista financeiro de um consultório' +
      'analise a conversa e tome a melhor ação para atender o usuário.',
  ),
})

export const financialSpecialist = async (state: typeof State.State) => {
  console.log('Financial specialist chamando')

  const result = await financialSpecialistAgent.invoke(state)

  const financialSpcilistResponse =
    result.messages[result.messages.length - 1]?.content ?? ''

  return {
    messages: [new HumanMessage({ 
      content: financialSpcilistResponse })],
  }
}

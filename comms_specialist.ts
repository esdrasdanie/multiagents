import { HumanMessage } from '@langchain/core/messages'
import type { State } from './state.js'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { ai } from './google_genai.js'
import { SystemMessage } from '@langchain/core/messages'
import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

const sendEmail = new DynamicStructuredTool({
  name: "send_email",
  description: "Envia um email para o usuário",
  schema: z.object({
    emailContent: z.string()
  }),
  func: async ({ emailContent }) => {
    console.log("Enviando email para o usuário:")
    console.log(emailContent)  
    return "Email enviado com sucesso!"
  } 
})

const agent = createReactAgent({
  llm: ai,
  tools: [sendEmail],
  prompt: new SystemMessage(
    'Você é um secretário financeiro de um consultório, responsável' +
      'por enviar comunicações para os clientes.' +
      'Apenas envie um email, não espere nenhuma confirmação.' +
      'sumarize toda a conversa e todas as ações que foram feitas e envie um email para o cliente.',
  ),
})

export const commsSpecialist = async (state: typeof State.State) => {
  console.log('Comms specialist chamando')

  const result = await agent.invoke(state)

  const response =
    result.messages[result.messages.length - 1]?.content ?? ''

  return {
    messages: [new HumanMessage({ 
      content: "Comms Specialist: " + response })],
  }
}

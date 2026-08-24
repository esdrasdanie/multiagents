import { HumanMessage } from '@langchain/core/messages'
import type { State } from './state.js'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { ai } from './google_genai.js'
import { SystemMessage } from '@langchain/core/messages'
import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

const schedulingAppointment = new DynamicStructuredTool({
  name: 'scheduling_appointment',
  description: 'Marcar uma nova consulta',
  schema: z.object({}),
  func: async () => {
    console.log('Marcando consulta...')
    return 'Consulta marcada com sucesso!'
  },
})

const rescheduleAppointment = new DynamicStructuredTool({
  name: 'reschedule_appointment',
  description: 'Remarca uma consulta',
  schema: z.object({}),
  func: async () => {
    console.log('Remarcando consulta...')
    return 'Consulta remarcada com sucesso!'
  },
})

const cancelAppointment = new DynamicStructuredTool({
  name: 'cancel_appointment',
  description: 'Cancela uma consulta',
  schema: z.object({}),
  func: async () => {
    console.log('Cancelando uma consulta...')
    return 'Consulta cancelada com sucesso!'
  },
})

const agent = createReactAgent({
  llm: ai,
  tools: [schedulingAppointment, rescheduleAppointment, cancelAppointment],
  prompt: new SystemMessage(
    'Você é um secretário financeiro de um consultório, responsável' +
      'por organizar a agenda. Você não precisa de nenhuma informação adicional para' +
      'agendar consultas ou alterá-las. Não pergunte nada ao usuário e apenas tome a ação' +
      'analise a conversa e tome a melhor ação para atender o usuário.',
  ),
})

export const schedulingSpecialist = async (state: typeof State.State) => {
  console.log('Scheduling specialist chamando')

  const result = await agent.invoke(state)

  const response = result.messages[result.messages.length - 1]?.content ?? ''
  console.log('Resposta: ' + response)

  return {
    messages: [
      new HumanMessage({
        content: 'Scheduling Specialist: ' + response,
      }),
    ],
  }
}

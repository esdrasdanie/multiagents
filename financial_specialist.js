import { HumanMessage } from '@langchain/core/messages';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ai } from './google_genai.js';
import { SystemMessage } from '@langchain/core/messages';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
const payBill = new DynamicStructuredTool({
    name: 'pay_bill',
    description: 'Pagar a conta do usuário',
    schema: z.object({}),
    func: async () => {
        console.log('Pagando conta...');
        return 'Conta paga com sucesso!';
    },
});
const createBill = new DynamicStructuredTool({
    name: 'create_bill',
    description: 'Criar um novo boleto para ser pago',
    schema: z.object({
        price: z.number(),
    }),
    func: async () => {
        console.log('Gerando conta...');
        return 'Boleto gerado com sucesso!';
    },
});
const getBill = new DynamicStructuredTool({
    name: 'get_bill',
    description: 'Pegar o valor da conta do usuário',
    schema: z.object({}),
    func: async () => {
        console.log('Buscando valor da conta...');
        return 'Sua conta tem o valor de 500 reais';
    },
});
const financialSpecialistAgent = createReactAgent({
    llm: ai,
    tools: [payBill, getBill, createBill],
    prompt: new SystemMessage('Você é um analista financeiro de um consultório' +
        'analise a conversa e tome a melhor ação para atender o usuário.'),
});
export const financialSpecialist = async (state) => {
    console.log('Financial specialist chamando');
    const result = await financialSpecialistAgent.invoke(state);
    const response = result.messages[result.messages.length - 1]?.content ?? '';
    console.log('Resposta: ' + response);
    return {
        messages: [
            new HumanMessage({
                content: 'Financial Specialist: ' + response,
            }),
        ],
    };
};
//# sourceMappingURL=financial_specialist.js.map
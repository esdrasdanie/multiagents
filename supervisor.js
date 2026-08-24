import { State } from "./state.js";
import { z } from "zod";
import { ai } from "./google_genai.js";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
const routingTool = {
    name: 'routingTool',
    description: 'Selecione o próximo estado',
    schema: z.object({
        next: z.enum([
            'financial_specialist',
            'scheduling_specialist',
            'comms_specialist',
            'END',
        ]),
    }),
};
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "Você é supervisor de um consultório. Tome a melhor ação para atender a necessidade do cliente. " +
            "ao final de tudo, chame o especialista de comunicação para enviar um email para o cliente. Depois de enviar exatamente um email, termine." +
            "com base na conversa a seguir:"],
    new MessagesPlaceholder("messages"),
    //messages
    ["human", "Escolha um desses próximos estados: financial_specialist, scheduling_specialist, comms_specialist, END (estado terminal se não tiver mais nada para fazer)"]
]);
export const supervisor = async (state) => {
    console.log('Supervisor escolhendo o próximo');
    console.log(state.messages);
    const aiWithTool = ai.bindTools([routingTool], {
        tool_choice: 'routingTool',
    });
    const aiResponse = await prompt.pipe(aiWithTool).invoke({ messages: state.messages });
    if (aiResponse.tool_calls) {
        return {
            nextNode: aiResponse.tool_calls[0].args.next,
        };
    }
    else {
        return {
            nextNode: 'END',
        };
    }
};
//# sourceMappingURL=supervisor.js.map
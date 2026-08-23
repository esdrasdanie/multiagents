import { AIMessage } from "@langchain/core/messages";
export const financialSpecialist = (state) => {
    console.log('Financial specialist chamando');
    return {
        output: [new AIMessage('Aqui está sua conta: 300 reais')],
    };
};
//# sourceMappingURL=financial_specialist.js.map
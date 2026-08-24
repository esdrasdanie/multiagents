import { HumanMessage } from "@langchain/core/messages";
export const financialSpecialist = (state) => {
    console.log('Financial specialist chamando');
    return {
        messages: [new HumanMessage('Aqui está sua conta: 300 reais. Pode terminar')],
    };
};
//# sourceMappingURL=financial_specialist.js.map
import { AIMessage } from "@langchain/core/messages";
export const schedulingSpecialist = (state) => {
    console.log('Scheduling specialist chamando');
    return {
        executedNodes: 1,
        output: [new AIMessage('Olá da IA')],
    };
};
//# sourceMappingURL=scheduling_specialist.js.map
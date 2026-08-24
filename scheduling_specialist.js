import { HumanMessage } from "@langchain/core/messages";
export const schedulingSpecialist = (state) => {
    console.log('Scheduling specialist chamando');
    return {
        messages: [new HumanMessage('Olá da IA')],
    };
};
//# sourceMappingURL=scheduling_specialist.js.map
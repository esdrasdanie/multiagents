import { AIMessage } from "@langchain/core/messages";
export const commsSpecialist = (state) => {
    console.log('Comms specialist chamando');
    return {
        messages: [new AIMessage('Olá da IA')],
    };
};
//# sourceMappingURL=comms_specialist.js.map
import { AIMessage } from "@langchain/core/messages";
import type { State } from "./state.js";
export declare const schedulingSpecialist: (state: typeof State.State) => {
    executedNodes: number;
    output: AIMessage<import("@langchain/core/messages").MessageStructure<import("@langchain/core/messages").MessageToolSet>>[];
};
//# sourceMappingURL=scheduling_specialist.d.ts.map
import { Annotation } from '@langchain/langgraph';
import { BaseMessage } from '@langchain/core/messages';
export const State = Annotation.Root({
    nextNode: (Annotation),
    messages: Annotation({
        reducer: (currOutput, newOutput) => currOutput.concat(newOutput),
        default: () => [],
    }),
});
//# sourceMappingURL=state.js.map
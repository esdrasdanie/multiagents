import { Annotation, StateGraph, START, END } from '@langchain/langgraph'
import fs from "fs"

const State = Annotation.Root({
  input: Annotation<string>,
  output: Annotation<string[]>({
    reducer: (currOutput, newOutput) => currOutput.concat(newOutput),
    default: () => ["olá"]
  })
})

const mockAction = (state: typeof State) => {
  return {
    output: ["Matheus disse 'oi'!"]
  }
}

const mockAction2 = (state: typeof State) => {
  return {
    output: ["Juliana disse 'oi'!"]
  }
}

const graph = new StateGraph(State)
  .addNode('matheus', mockAction)
  .addNode('juliana', mockAction2)
  .addEdge(START, 'matheus')
  .addEdge('matheus', 'juliana')
  .addEdge('juliana', END)
  .compile()

const result = await graph.invoke({ input: 'olá!' })

console.log(result)

const drawableGraph = await graph.getGraphAsync()
const graphImage = await drawableGraph.drawMermaidPng()
const graphArrayBuffer = await graphImage.arrayBuffer()

fs.writeFileSync("./graph.png", new Uint8Array(graphArrayBuffer))

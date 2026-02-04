import { EdgeRenderingData, NodeRenderingData } from "@gephi/gephi-lite-sdk";
import { NodeData } from "./NodeData";

export type EdgeData = EdgeRenderingData &{
    id: string,
    source: NodeData,
    target: NodeData,
}
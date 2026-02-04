import { NodeRenderingData } from "@gephi/gephi-lite-sdk";

export type NodeData = NodeRenderingData & {
    id: string;
    z: number;
    hidden: boolean;
}
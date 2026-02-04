import { LayoutParameter } from "@gephi/gephi-lite/src/core/layouts/types";
import { NodeData } from "../types/NodeData";

export interface XRLayout<P = any> {
    id: string;
    type: "xr";
    description?: boolean;
    parameters: Array<LayoutParameter>;
    run: (nodes: NodeData[], options: P) => NodeData[];
  }
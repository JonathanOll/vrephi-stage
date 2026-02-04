import { NodeData } from "../types/NodeData";
import { XRLayout } from "./XRLayout";

function apply(nodes: NodeData[], options: XRRandomLayoutOptions) {
  const result = nodes.map((node) => ({
    ...node,
    x: (Math.random() - 0.5) * 2 * options.range,
    y: (Math.random() - 0.5) * 2 * options.range,
    z: (Math.random() - 0.5) * 2 * options.range,
  }))

  return result;
}

interface XRRandomLayoutOptions {
  range: number;
}

export const XRRandomLayout = {
    id: "random",
    type: "xr",
    description: true,
    parameters: [
      {
        id: "range",
        type: "number",
        description: true,
        defaultValue: 10,
      },
    ],
    run: (nodes, options) => apply(nodes, options),
  } as XRLayout<XRRandomLayoutOptions>;
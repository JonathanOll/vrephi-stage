import { NodeData } from "../types/NodeData";
import { XRLayout } from "./XRLayout";

function apply(nodes: NodeData[], options: XROrderByLayoutOptions) {

  const sorted = nodes
    .filter(node => !node.hidden && node[options.field] !== undefined)
    .sort((a, b) => {
      if (a[options.field]! < b[options.field]!) return options.increasing ? -1 : 1;
      if (a[options.field]! > b[options.field]!) return options.increasing ? 1 : -1;
      return 0;
    });

  const count = sorted.length;
  const width = (count - 1) * options.spacing;
  const offset = options.center ? -width / 2 : 0;

  const result = nodes.map((node) => {
    if (!sorted.includes(node)) {
      return {
        ...node,
        hidden: true
      };
    }

    const index = sorted.indexOf(node);

    return {
      ...node,
      x: index * options.spacing + offset,
      y: 0,
      z: -10
    };
  });

  return result;
}

interface XROrderByLayoutOptions {
  field: string;
  spacing: number;
  increasing: boolean;
  center: boolean;
}

export const XROrderByLayout = {
  id: "orderBy",
  type: "xr",
  description: true,
  parameters: [
    {
      id: "field",
      type: "attribute",
      defaultValue: null,
    },
    {
      id: "spacing",
      type: "number",
      defaultValue: 0.5,
    },
    {
      id: "increasing",
      type: "boolean",
      defaultValue: true,
    },
    {
      id: "center",
      type: "boolean",
      defaultValue: false,
    },
  ],
  run: (nodes, options) => apply(nodes, options),
} as XRLayout<XROrderByLayoutOptions>;

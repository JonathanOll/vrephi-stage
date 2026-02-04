import { useXRInputSourceState } from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";

export function useXRJoystick() {
  const rightController = useXRInputSourceState("controller", "right");
  const [axes, setAxes] = useState<[number, number]>([0, 0]);

  useFrame(() => {
    if (!rightController?.gamepad) return;

    const gp = rightController.gamepad;

    const x: number = gp["xr-standard-thumbstick"]!.xAxis!;
    const y: number = gp["xr-standard-thumbstick"]!.yAxis!;

    setAxes([x, y]);
  });

  return axes;
}

import { useThree, useFrame } from "@react-three/fiber";
import { Container } from "@react-three/uikit";
import { Group, Vector3 } from "three";
import { useRef, useState, useEffect } from "react";
import { XRButton } from "./core/XRButton";
import { useXRJoystick } from "../../hooks/useXRJoystick";

export const XRWheel = ({
  onChoose
}: {
  onChoose: (result: string) => void;
}) => {
  const { camera } = useThree();
  const ref = useRef<Group>(null);

  const direction = useXRJoystick();
  const x = direction[0];
  const y = direction[1];

  const magnitude = Math.sqrt(x * x + y * y);

  const [selected, setSelected] = useState<"up" | "down" | "left" | "right" | null>(null);

  const wasActive = useRef(false);

  useFrame(() => {
    if (!ref.current) return;

    const distance = 5;
    const pos = new Vector3(0, 0, -distance).applyMatrix4(camera.matrixWorld);

    ref.current.position.copy(pos);
    ref.current.lookAt(camera.position);
  });

  useEffect(() => {
  if (magnitude < 0.2) {
    if (wasActive.current && selected) {
      onChoose(selected);
    }
    wasActive.current = false;
    setSelected(null);
    return;
  }

  wasActive.current = true;

  if (Math.abs(x) > Math.abs(y)) {
    setSelected(x > 0 ? "right" : "left");
  } else {
    setSelected(y > 0 ? "down" : "up");
  }
}, [x, y]);


  // Helper pour highlight
  const isSelected = (name: string) => selected === name;

  return (
    magnitude > 0.2 && (
    <group ref={ref} >
      <Container
        width={300}
        height={200}
        borderRadius={150}
        backgroundColor={"#eeeeee"}
        justifyContent="center"
        alignItems="center"
        renderOrder={20} 
        depthTest={false}
         depthWrite={false}
      >
        <Container
          width="100%"
          height="100%"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          padding={20}
        >
          {/* Haut */}
          <XRButton
            modifier={{backgroundColor: isSelected("up") ? "#aaaaaa" : "#eeeeee"}}
            hoverBackgroundColor="#eeeeee"
            onClick={() => {}}
          >
            Fermer
          </XRButton>

          {/* Centre */}
          <Container
            width="100%"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            paddingX={20}
          >
            <XRButton
              modifier={{backgroundColor: isSelected("left") ? "#aaaaaa" : "#eeeeee"}}
              hoverBackgroundColor="#eeeeee"
              onClick={() => {}}
            >
              Layouts
            </XRButton>

            <Container width={40} height={40} />

            <XRButton
              modifier={{backgroundColor: isSelected("right") ? "#aaaaaa" : "#eeeeee"}}
              hoverBackgroundColor="#eeeeee"
              onClick={() => {}}
            >
              Filtres
            </XRButton>
          </Container>

          {/* Bas */}
          <XRButton
            modifier={{backgroundColor: isSelected("down") ? "#aaaaaa" : "#eeeeee"}}
            hoverBackgroundColor="#eeeeee"
            onClick={() => {}}
          >
            Selection
          </XRButton>
        </Container>
      </Container>
    </group>
    )
  );
};

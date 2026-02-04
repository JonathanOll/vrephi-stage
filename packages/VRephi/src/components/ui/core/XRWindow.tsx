import { RoundedBox } from "@react-three/drei"
import { Handle, HandleStore, HandleTarget } from "@react-three/handle"
import { Container } from "@react-three/uikit";
import { FC, PointerEvent, ReactNode, useRef } from "react";
import { Euler, Mesh, Object3D, Vector3 } from "three";

interface XRWindowProps {
    children?: ReactNode;
    position?: number[] | undefined;
    rotation?: number[] | undefined;
    onHide?: () => void;
}

export const XRWindow: FC<XRWindowProps> = ({children, position, rotation, onHide = () => {} }: XRWindowProps) => {

    const handleTargetRef = useRef<Mesh | null>(null);
    const handleRef = useRef<HandleStore<unknown> | null>(null);

    const captureHandle = (event: PointerEvent<PointerEvent>) => {
      if (!handleRef.current || !handleTargetRef.current)
        return

      if (event.type === "pointerdown") 
        handleRef.current.capture(event.pointerId, handleTargetRef.current as unknown as Object3D)
      else  
        handleRef.current.cancel()
    }

    return (
      <HandleTarget>
        <group
          position={position ? new Vector3(position[0], position[1], position[2]) : new Vector3()} 
          rotation={rotation ? new Euler(rotation[0], rotation[1], rotation[2]) : new Euler()} 
        >
          <Container flexDirection={"column"} justifyContent={"center"} renderOrder={10} depthTest={false} depthWrite={false}>
            {children}

            <Container flexDirection={"row"} justifyContent={"center"} alignItems={"center"} width={"100%"}>
              <Container 
                backgroundColor={"gray"} 
                width={"50%"}
                height={30} 
                margin={15} 
                borderRadius={15} 
                hover={{backgroundColor: "lightgray"}}
                onPointerDown={(e) => captureHandle(e as unknown as PointerEvent<PointerEvent>)} 
                onPointerUp={(e) => captureHandle(e as unknown as PointerEvent<PointerEvent>)} />
              
              <Container 
                backgroundColor={"#ae1212"} 
                width={30}
                height={30} 
                margin={5} 
                borderRadius={50} 
                hover={{backgroundColor: "#fd5555"}} 
                onClick={onHide}/>
            </Container>
          </Container>

          <Handle 
            ref={handleRef} 
            targetRef={"from-context"}
          >
            <mesh ref={handleTargetRef} visible={false} />
          </Handle>
        </group>
      </HandleTarget>
    )
}
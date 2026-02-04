import { Container, Input, Text } from "@react-three/uikit";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, AccordionTriggerIcon, VanillaTextarea } from "@react-three/uikit-default";
import { FC, useState } from "react";
import { Layout } from "@gephi/gephi-lite/src/core/layouts/types";
import { LAYOUTS } from "@gephi/gephi-lite/src/core/layouts/collection";
import { XRButton } from "./core/XRButton";
import { XRWindow } from "./core/XRWindow";
import { XRLabel } from "./core/XRLabel";
import {  FontWeight, Padding } from "./core/Modifier";
import { XRLayout } from "../../core/layouts/XRLayout";
import { useXRLayout } from "../../hooks/useXRLayout";
import { capitalize } from "lodash";
import { t } from "i18next";
import { XR_LAYOUTS } from "../../core/layouts/constants";
import { useSigmaGraph } from "@gephi/gephi-lite/src/core/context/dataContexts";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { XRInput } from "./core/XRInput";
import { XRSelect } from "./core/XRSelect";
import { useXRAttributes } from "../../hooks/useXRAttributes";
import { XRSwitch } from "./core/XRSwitch";

function LayoutMenu({ setLayout } : { setLayout: (layout: Layout | XRLayout) => void }) {
    return (
        <Container
            flexDirection="column"
            backgroundColor={"white"}
            color={"black"}
            borderRadius={5}
            borderColor={"lightgray"}
            width={200}>
            <Accordion>
                <AccordionItem value="layout2d">
                    <AccordionTrigger hover={{backgroundColor: "grey"}}>
                        <XRLabel modifier={({ padding: Padding(5) })}> 2D Layouts </XRLabel>
                        <AccordionTriggerIcon />
                    </AccordionTrigger>

                    <AccordionContent flexDirection={"column"} gap={6}>
                        {LAYOUTS.map((layout) => (
                            <XRButton
                                key={layout.id}
                                onClick={() => {
                                    setLayout(layout);
                                }}>
                                {layout.id}
                            </XRButton>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion>
                <AccordionItem value="layout3d">
                    <AccordionTrigger hover={{backgroundColor: "grey"}}>
                        <XRLabel modifier={({ padding: Padding(5) })}> XR Layouts </XRLabel>
                        <AccordionTriggerIcon />
                    </AccordionTrigger>

                    <AccordionContent flexDirection={"column"} gap={6}>
                        {XR_LAYOUTS.map((layout) => (
                            <XRButton
                                key={layout.id}
                                onClick={() => {
                                    setLayout(layout);
                                }}>
                                {layout.id}
                            </XRButton>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Container>
    )
}

function getDefaultParams(layout: Layout | XRLayout): { [key: string]: unknown } {
  return layout.parameters.reduce((acc: { [key: string]: unknown }, el) => {
    acc[el.id] = el.defaultValue;
    return acc;
  }, {});
}

function ParametersPopup({ layout }: { layout: Layout | XRLayout }) {
  const [params, setParams] = useState(() => getDefaultParams(layout));

  const { applyLayout } = useXRLayout();
  const sigmaGraph = useSigmaGraph();
  const { attributes } = useXRAttributes();

  const updateParam = (key: string, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Container padding={5} flexDirection="column" width={300} gap={10} backgroundColor={"white"} color={"black"} borderRadius={5} borderColor={"lightgray"}>
      
      <XRLabel modifier={{fontSize: 25, fontWeight: FontWeight.BOLD}}>
        {capitalize(t(`layouts.${layout.id}.title`))}
      </XRLabel>

      {layout.description && (
        <XRLabel>{t(`layouts.${layout.id}.description`)}</XRLabel>
      )}

      <Container flexDirection={"column"} gap={8}>
        {layout.parameters.map((el) => (
          <Container key={el.id} flexDirection={"column"} gap={4}>
            <XRLabel modifier={{ fontWeight: FontWeight.SEMI_BOLD }}>
              {el.id}
            </XRLabel>

            {el.type === "attribute" ? (
              <XRSelect
                value={attributes.length > 0 ? attributes[0] : ""}
                options={attributes}
                onChange={(it) => updateParam(el.id, it)}
              />
            ) : el.type === "boolean" ? (
              <XRSwitch
                value={Boolean(params[el.id])}
                onChange={(v) => updateParam(el.id, v)}
              />
            ) : (
              <XRInput
                value={params[el.id] as any}
                onChange={(it) => updateParam(el.id, it)}
              />
            )}
          </Container>
        ))}
      </Container>

      <XRButton onClick={() => applyLayout(layout, sigmaGraph, params)}>
        Apply
      </XRButton>
    </Container>
  );
}


interface XRLayoutMenuProps {
  position: number[];
  rotation?: number[];
  onHide: () => void;
}


export const XRLayoutMenu: FC<XRLayoutMenuProps> = ({ 
    position,
    rotation = [0, 0, 0],
    onHide
}) => {

    const [ layout, setLayout ] = useState<Layout | XRLayout | null>(null);
    const { camera } = useThree();

    function computeFrontTransform() {
        const distance = 5;

        const pos = new Vector3(0, 0, -distance).applyMatrix4(camera.matrixWorld);
        const rot = camera.rotation.toArray();

        return {
        position: [pos.x, pos.y, pos.z] as number[],
        rotation: rot as number[],
        };
    }

    
    const [paramPos, setParamPos] = useState<number[]>([0,0,0]);
    const [paramRot, setParamRot] = useState<number[]>([0,0,0]);

    return (
        <group>
            <XRWindow position={position} rotation={rotation} onHide={onHide}>
                <LayoutMenu setLayout={(l) => {setLayout(l); setParamPos(computeFrontTransform().position); setParamRot(computeFrontTransform().rotation); }} />
            </XRWindow>
            {layout && 
            <XRWindow position={paramPos} rotation={paramRot} onHide={() => setLayout(null)}>
                <ParametersPopup layout={layout} />
            </XRWindow>}
        </group>

    );
};
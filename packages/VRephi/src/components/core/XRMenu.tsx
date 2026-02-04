import { useThree } from "@react-three/fiber";
import { FC, useState } from "react";
import { Vector3 } from "three";
import { XRWheel } from "../ui/XRWheel";
import { XRSelectedNodeMenu } from "../ui/XRSelectedNodeMenu";
import { XRLayoutMenu } from "../ui/XRLayoutMenu";
import { XRFilterMenu } from "../ui/XRFilterMenu";

export const XRMenu: FC = () => {
  const { camera } = useThree();

  const [showSelected, setShowSelected] = useState(false);
  const [showLayout, setShowLayout] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [selectedPos, setSelectedPos] = useState<number[] | null>(null);
  const [selectedRot, setSelectedRot] = useState<number[] | null>(null);

  const [layoutPos, setLayoutPos] = useState<number[] | null>(null);
  const [layoutRot, setLayoutRot] = useState<number[] | null>(null);

  const [filterPos, setFilterPos] = useState<number[] | null>(null);
  const [filterRot, setFilterRot] = useState<number[] | null>(null);

  function computeFrontTransform() {
    const distance = 5;

    const pos = new Vector3(0, 0, -distance).applyMatrix4(camera.matrixWorld);
    const rot = camera.rotation.toArray();

    return {
      position: [pos.x, pos.y, pos.z] as number[],
      rotation: rot as number[],
    };
  }

  function handleChoose(menu: string) {
    const { position, rotation } = computeFrontTransform();

    switch (menu) {
      case "down":
        setShowSelected(v => !v);
        setSelectedPos(position);
        setSelectedRot(rotation);
        break;

      case "left":
        setShowLayout(v => !v);
        setLayoutPos(position);
        setLayoutRot(rotation);
        break;

      case "right":
        setShowFilter(v => !v);
        setFilterPos(position);
        setFilterRot(rotation);
        break;
    }
  }

  return (
    <group>
      <XRWheel onChoose={handleChoose} />

      {showSelected && selectedPos && selectedRot && (
        <XRSelectedNodeMenu position={selectedPos} rotation={selectedRot} onHide={() => setShowSelected(false)} />
      )}

      {showLayout && layoutPos && layoutRot && (
        <XRLayoutMenu position={layoutPos} rotation={layoutRot} onHide={() => setShowLayout(false)} />
      )}

      {showFilter && filterPos && filterRot && (
        <XRFilterMenu position={filterPos} rotation={filterRot} onHide={() => setShowFilter(false)} />
      )}
    </group>
  );
};

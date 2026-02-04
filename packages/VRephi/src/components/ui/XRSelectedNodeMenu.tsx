import { FC } from "react";
import { FontWeight } from "./core/Modifier";
import { Container } from "@react-three/uikit";
import { XRWindow } from "./core/XRWindow";
import { XRLabel } from "./core/XRLabel";
import { useXRSelection } from "../../hooks/useXRSelection";
import { XRButton } from "./core/XRButton";

interface XRSelectedNodeMenuProps {
  position: number[];
  rotation?: number[];
  onHide: () => void;
}

export const XRSelectedNodeMenu: FC<XRSelectedNodeMenuProps> = ({
  position,
  rotation = [0, 0, 0],
  onHide
}) => {
  const { selected, makeNeighboursVisible } = useXRSelection();

  return (
    <XRWindow position={position} rotation={rotation} onHide={onHide}>
      <Container width={300} backgroundColor={"white"} padding={15}>
        {selected && (
          <Container flexDirection={"column"}>
            <Container alignItems={"center"}>
              <Container
                backgroundColor={selected.color}
                width={25}
                height={25}
                borderRadius={25}
              />
              <XRLabel
                modifier={{ fontSize: 25, fontWeight: FontWeight.BOLD }}
              >
                {selected.label}
              </XRLabel>
            </Container>

            {Object.keys(selected).map((field) =>
              selected[field] ? (
                <Container key={field} flexDirection={"column"}>
                  <XRLabel
                    modifier={{
                      fontSize: 18,
                      fontWeight: FontWeight.SEMI_BOLD
                    }}
                  >
                    {field}
                  </XRLabel>
                  <XRLabel modifier={{ fontSize: 16 }}>
                    {selected[field]}
                  </XRLabel>
                </Container>
              ) : null
            )}

            <XRButton 
              onClick={() => makeNeighboursVisible(selected.id)}
            >
              Rendre les voisins visibles
            </XRButton>
          </Container>
        )}

        {!selected && <XRLabel>Aucun noeud selectionne</XRLabel>}
      </Container>
    </XRWindow>
  );
};

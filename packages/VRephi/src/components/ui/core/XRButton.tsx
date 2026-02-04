import { FC, ReactNode } from "react";
import { Modifier, Padding } from "./Modifier";
import { Text } from "@react-three/uikit";
import {
  Button
} from '@react-three/uikit-default'

interface XRButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;  
  modifier?: Partial<Modifier>;
  hoverBackgroundColor? : string;
}

const defaultModifier = Modifier({
  fontColor: "#000000", // Default color
  backgroundColor: "#bbbbbb", // Default color
  borderRadius: 50,
  padding: Padding(10),
});

export const XRButton: FC<XRButtonProps> = ({
  children: text,
  onClick,
  disabled,
  modifier,
  hoverBackgroundColor
}) => {
  // Combine provided modifier with the default modifier
  const finalModifier = Modifier(modifier, defaultModifier);

    return (
        <Button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            disabled={disabled}
            backgroundColor = { finalModifier.backgroundColor}
            opacity = { finalModifier.opacity}
            paddingTop={finalModifier.padding.top}
            paddingRight={finalModifier.padding.right}
            paddingBottom={finalModifier.padding.bottom}
            paddingLeft={finalModifier.padding.left}
            borderRadius={finalModifier.borderRadius}
            marginTop={finalModifier.margin.top}
            marginRight={finalModifier.margin.right}
            marginBottom={finalModifier.margin.bottom}
            marginLeft={finalModifier.margin.left}
            hover={{ opacity: 1, backgroundColor: hoverBackgroundColor ?? "#888888" }}
        >
            <Text
                color = {finalModifier.fontColor}
                fontSize = {finalModifier.fontSize}
            >
                {text}
            </Text>
        </Button>   
    )
}
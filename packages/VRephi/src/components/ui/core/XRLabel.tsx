import { FC, ReactNode } from "react";
import {  Text } from "@react-three/uikit";
import { Modifier } from "./Modifier";

interface XRLabelProps {
    children: ReactNode;
    modifier?: Partial<Modifier>;
}

const defaultModifier = Modifier({
    fontColor: "#000000",
    backgroundColor: "#FFFFFF"
})

export const XRLabel: FC<XRLabelProps> = ({children, modifier}: XRLabelProps) => {
    const finalModifier = Modifier(modifier, defaultModifier)
  
    return (
            <Text 
                paddingTop={finalModifier.padding.top}
                paddingRight={finalModifier.padding.right}
                paddingBottom={finalModifier.padding.bottom}
                paddingLeft={finalModifier.padding.left} 
                marginTop={finalModifier.margin.top}
                marginRight={finalModifier.margin.right}
                marginBottom={finalModifier.margin.bottom}
                marginLeft={finalModifier.margin.left}
                color={finalModifier.fontColor} 
                opacity={finalModifier.opacity} 
                backgroundColor={finalModifier.backgroundColor} 
                fontSize={finalModifier.fontSize}
                fontWeight={finalModifier.fontWeight}
            > 
                {children} 
            </Text> 
  );
};
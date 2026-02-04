import { FC } from "react";
import { Container, Input, Text } from "@react-three/uikit";
import { Modifier, Padding } from "./Modifier";

interface XRInputProps {
    value: string;
    onChange: (v: string) => void;
    modifier?: Partial<Modifier>;
    width?: number;
    hoverBackgroundColor?: string;
}

const defaultModifier = Modifier({
    backgroundColor: "#dddddd",
    fontColor: "#000000",
    fontSize: 16,
    padding: Padding(8),
    borderRadius: 5,
});

export const XRInput: FC<XRInputProps> = ({
    value,
    onChange,
    modifier,
    width = 120,
    hoverBackgroundColor,
}) => {
    const finalModifier = Modifier(modifier, defaultModifier);

    return (
        <Container
            width={width}
            backgroundColor={finalModifier.backgroundColor}
            opacity={finalModifier.opacity}
            borderRadius={finalModifier.borderRadius}
            marginTop={finalModifier.margin.top}
            marginRight={finalModifier.margin.right}
            marginBottom={finalModifier.margin.bottom}
            marginLeft={finalModifier.margin.left}
            hover={{ opacity: 1, backgroundColor: hoverBackgroundColor ?? "#888888" }}
        >
            <Input
                width={width - finalModifier.padding.left - finalModifier.padding.right}
                color={finalModifier.fontColor}
                fontSize={finalModifier.fontSize}
                backgroundColor={finalModifier.backgroundColor}
                paddingTop={finalModifier.padding.top}
                paddingRight={finalModifier.padding.right}
                paddingBottom={finalModifier.padding.bottom}
                paddingLeft={finalModifier.padding.left}
                value={value}
                onValueChange={(v) => onChange(v)}
                hover={{ opacity: 1, backgroundColor: hoverBackgroundColor ?? "#888888" }}
            />
        </Container>
    );
};

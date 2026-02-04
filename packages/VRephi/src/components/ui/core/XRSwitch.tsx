import { FC } from "react";
import { Modifier, Padding } from "./Modifier";
import { Container, Text } from "@react-three/uikit";
import { Switch, Label } from "@react-three/uikit-default";

interface XRSwitchProps {
  label?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  modifier?: Partial<Modifier>;
}

const defaultModifier = Modifier({
  fontColor: "#000000",
  backgroundColor: "#dddddd",
  borderRadius: 15,
  padding: Padding(4),
});

export const XRSwitch: FC<XRSwitchProps> = ({
  label,
  value,
  onChange,
  disabled,
  modifier,
}) => {
  const finalModifier = Modifier(modifier, defaultModifier);

  return (
    <Container
      flexDirection="row"
      alignItems="center"
      gap={8}
    >
      <Switch
        checked={value}
        disabled={disabled}
        backgroundColor={value ? "#6eff4d" : "#ff4d4d"}
        onCheckedChange={(v) => onChange(v)}
        paddingTop={finalModifier.padding.top}
        paddingRight={finalModifier.padding.right}
        paddingBottom={finalModifier.padding.bottom}
        paddingLeft={finalModifier.padding.left}
        borderRadius={finalModifier.borderRadius}
        opacity={finalModifier.opacity}
        marginTop={finalModifier.margin.top}
        marginRight={finalModifier.margin.right}
        marginBottom={finalModifier.margin.bottom}
        marginLeft={finalModifier.margin.left}
        hover={{backgroundColor: value ? "#51c238" : "#c03a3a"}}
      />

      {label && (
        <Label>
          <Text color={finalModifier.fontColor} fontSize={finalModifier.fontSize}>
            {label}
          </Text>
        </Label>
      )}
    </Container>
  );
};

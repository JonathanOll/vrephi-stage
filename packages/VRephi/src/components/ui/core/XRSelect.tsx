import { FC, useState } from "react";
import { Container, Text } from "@react-three/uikit";
import { XRButton } from "./XRButton";

interface XRSelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const XRSelect: FC<XRSelectProps> = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container flexDirection="column" backgroundColor="#ddd" borderRadius={10}>
      {/* Bouton principal */}
      <XRButton 
        onClick={() => setOpen(!open)}
        modifier={{borderRadius: 0}}
      >
        {value}
      </XRButton>

      {/* Liste déroulante */}
      {open && (
        <Container
          flexDirection="column"
          backgroundColor="#eee"
          padding={10}
          gap={5}
        >
          {options.map((opt) => (
            <XRButton
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              modifier={{borderRadius: 0}}
            >
              {opt}
            </XRButton>
          ))}
        </Container>
      )}
    </Container>
  );
};

import { FC, useState } from "react";
import { XRWindow } from "./core/XRWindow";
import { Container } from "@react-three/uikit";
import { XRLabel } from "./core/XRLabel";
import { FontWeight, Padding } from "./core/Modifier";
import { useXRFilter } from "../../hooks/useXRFilter";
import { XRButton } from "./core/XRButton";
import { XRSelect } from "./core/XRSelect";
import { useXRAttributes } from "../../hooks/useXRAttributes";
import { XRInput } from "./core/XRInput";

type Operator = "not-null" | "null" | "==" | ">" | "<" | ">=" | "<=";

type FilterLine = {
    attribute: string;
    operator: Operator;
    value?: string;
};

const OPERATORS: Operator[] = [
    "not-null",
    "null",
    "==",
    ">",
    "<",
    ">=",
    "<="
];

interface XRFilterMenuProps {
  position: number[];
  rotation?: number[];
  onHide: () => void;
}

export const XRFilterMenu: FC<XRFilterMenuProps> = ({ 
    position,
    rotation = [0, 0, 0],
    onHide
}) => {
    const { filterNodes } = useXRFilter();
    const { attributes } = useXRAttributes();

    const [filters, setFilters] = useState<FilterLine[]>([]);

    const addFilter = () => {
        setFilters(prev => [
            ...prev,
            { attribute: attributes[0], operator: "not-null" }
        ]);
    };

    const updateFilter = (index: number, key: keyof FilterLine, value: any) => {
        setFilters(prev =>
            prev.map((f, i) => (i === index ? { ...f, [key]: value } : f))
        );
    };

    const removeFilter = (index: number) => {
        setFilters(prev => prev.filter((_, i) => i !== index));
    };

    const applyFilters = () => {
        filterNodes(node => {
            return filters.every(f => {
                const value = (node as any)[f.attribute];

                switch (f.operator) {
                    case "not-null":
                        return value != null;
                    case "null":
                        return value == null;
                    case "==":
                        return value == f.value;
                    case ">":
                        return Number(value) > Number(f.value);
                    case "<":
                        return Number(value) < Number(f.value);
                    case ">=":
                        return Number(value) >= Number(f.value);
                    case "<=":
                        return Number(value) <= Number(f.value);
                    default:
                        return true;
                }
            });
        });
    };

    const resetFilters = () => {
        filterNodes(() => true);
    };

    return (
        <XRWindow position={position} rotation={rotation} onHide={onHide}>
            <Container width={320} backgroundColor={"white"} padding={15}>
                <Container flexDirection="column" gap={10}>
                    <XRLabel modifier={{ fontSize: 25, fontWeight: FontWeight.BOLD }}>
                        Filtres
                    </XRLabel>

                    <XRButton onClick={addFilter}>+</XRButton>

                    {filters.map((filter, index) => (
                        <Container
                            key={index}
                            flexDirection="row"
                            gap={10}
                            marginTop={10}
                            alignItems="center"
                        >
                            {/* Attribut */}
                            <XRSelect
                                value={filter.attribute}
                                options={attributes}
                                onChange={v => updateFilter(index, "attribute", v)}
                            />

                            {/* Opérateur */}
                            <XRSelect
                                value={filter.operator}
                                options={OPERATORS}
                                onChange={v => updateFilter(index, "operator", v as Operator)}
                            />

                            {/* Champ value si nécessaire */}
                            {filter.operator !== "null" &&
                                filter.operator !== "not-null" && (
                                    <XRInput
                                        value={filter.value ?? ""}
                                        onChange={(v: any) => updateFilter(index, "value", v)}
                                        width={80}
                                    />
                                )}

                            {/* Supprimer */}
                            <XRButton
                                onClick={() => removeFilter(index)}
                                modifier={{
                                    padding: Padding(20),
                                    backgroundColor: "#ff5555"
                                }}
                                hoverBackgroundColor="#ff9595"
                            >
                                X
                            </XRButton>
                        </Container>
                    ))}

                    {filters.length > 0 && (
                        <XRButton onClick={applyFilters}>Appliquer</XRButton>
                    )}

                    <XRButton onClick={resetFilters}>Reinitialiser</XRButton>
                </Container>
            </Container>
        </XRWindow>
    );
};

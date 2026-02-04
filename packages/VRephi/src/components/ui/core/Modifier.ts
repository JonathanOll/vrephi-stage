import { ColorRepresentation } from "three";

// utilisation : <XRButton modifier={Modifier(size=Size.SMALL, opacity=0.5)} />
// utilisera le Modifier par défaut de button

// <XRLabel text="rouge" />
// <XRLabel text="bleu" modifier={Modifier(fontColor="blue")} />

export enum Fonts {
    ROBOTO = "Roboto"
}

export enum TextDecoration {
    NONE,
    UNDERLINED,
}

export interface Modifier {
    font: string;
    textDecoration: TextDecoration;
    fontColor: ColorRepresentation;
    fontSize: number;
    fontWeight: number;

    backgroundColor: ColorRepresentation;
    backgroundOpacity: number;

    opacity: number;

    padding: Padding;
    margin: Margin;

    wrapBehavior: "wrap" | "keep";

    size: number | "fit-content";

    borderRadius: number;
}

const defaultModifierBase: Modifier = {
    font: Fonts.ROBOTO,
    textDecoration: TextDecoration.NONE,
    fontColor: "#000000",
    fontSize: 16,
    fontWeight: 400,
    backgroundColor: "#eeeeee",
    backgroundOpacity: 1,
    opacity: 1,
    padding: Padding(2),
    margin: Margin(2),
    wrapBehavior: "keep",
    size: "fit-content",
    borderRadius: 0,
};

export function Modifier(
    overrides: Partial<Modifier> = {}, 
    defaultModifier?: Modifier
): Modifier {
    return {
        ...(defaultModifier ?? defaultModifierBase),
        ...overrides,
    }
}

export interface Padding {
    top: number
    right: number
    bottom: number
    left: number
}

export function Padding(all: number): Padding;
export function Padding(horizontal: number, vertical: number): Padding;
export function Padding(top: number, right: number, bottom: number, left: number): Padding;
export function Padding(a: number, b?: number, c?: number, d?: number): Padding {
    if (b === undefined && c === undefined && d === undefined) {
        return { top: a, right: a, bottom: a, left: a };
    }
    else if (c === undefined && d === undefined) {
        return { top: b!, right: a, bottom: b!, left: a }
    }
    return { top: a, right: b!, bottom: c!, left: d! };
}

export interface Margin {
    top: number
    right: number
    bottom: number
    left: number
}

export function Margin(all: number): Margin;
export function Margin(horizontal: number, vertical: number): Margin;
export function Margin(top: number, right: number, bottom: number, left: number): Margin;
export function Margin(a: number, b?: number, c?: number, d?: number): Margin {
    if (b === undefined && c === undefined && d === undefined) {
        return { top: a, right: a, bottom: a, left: a };
    }
    else if (c === undefined && d === undefined) {
        return { top: b!, right: a, bottom: b!, left: a }
    }
    return { top: a, right: b!, bottom: c!, left: d! };
}

export enum FontWeight {
    THIN = 100,
    EXTRA_LIGHT = 200,
    LIGHT = 300,
    NORMAL = 400,
    SEMI_BOLD = 600,
    BOLD = 700,
    EXTRA_BOLD = 800,
}





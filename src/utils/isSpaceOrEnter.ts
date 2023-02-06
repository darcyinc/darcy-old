export type ClickOrKeyboardEvent =
  | React.MouseEvent<HTMLElement | SVGElement>
  | React.KeyboardEvent<HTMLElement | SVGElement>;

export default function isSpaceOrEnter(e: ClickOrKeyboardEvent) {
  if (e.type === "click") return true;

  return ["Enter", " "].includes(
    (e as React.KeyboardEvent<HTMLDivElement>).key
  );
}

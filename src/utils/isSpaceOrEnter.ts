export type ClickOrKeyboardEvent =
  React.KeyboardEvent<HTMLElement | SVGElement> | React.MouseEvent<HTMLElement | SVGElement>;

export default function isSpaceOrEnter(e: ClickOrKeyboardEvent) {
  if (e.type === "click") return true;

  return ["Enter", " "].includes(
    (e as React.KeyboardEvent<HTMLDivElement>).key
  );
}

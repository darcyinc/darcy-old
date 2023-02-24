export type ClickOrKeyboardEvent =
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;

export default function isSpaceOrEnter(e: ClickOrKeyboardEvent) {
  if (e.type === "click") return true;

  return ["Enter", " "].includes(
    (e as React.KeyboardEvent<HTMLDivElement>).key
  );
}

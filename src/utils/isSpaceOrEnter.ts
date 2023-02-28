export type ClickOrKeyboardEvent = KeyboardEvent | MouseEvent;

export default function isSpaceOrEnter(e: ClickOrKeyboardEvent) {
  if (e.type === 'click') return true;

  return ['Enter', ' '].includes((e as KeyboardEvent).key);
}

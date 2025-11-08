
export const classNames = (
  cls: string,
  mods: Record<string, boolean | string>,
  additional: (string | undefined)[],
): string => {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods).filter(([_, value]) => Boolean(value)).map(([cls, _]) => cls)
  ].join(" ");
};
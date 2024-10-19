export function removeDuplicates<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set();

  return arr?.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) return false;

    seen.add(keyValue);
    return true;
  });
}

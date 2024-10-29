export function shuffleArray<T>(array: T[]): T[] {
  const newArray: T[] = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const indiceAleatorio = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[indiceAleatorio]] = [newArray[indiceAleatorio], newArray[i]];
  }

  return newArray;
}
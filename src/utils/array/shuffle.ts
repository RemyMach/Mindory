export function shuffleArray(inputArray: any[]): void{
    inputArray.sort(() => Math.random() - 0.5);
}

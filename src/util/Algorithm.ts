/**
 * Pseudo-randomly shuffle the given array. The given array is modified.
 * Shuffling uses the Durstenfeld algorithm, thanks to
 * {@link https://stackoverflow.com/a/12646864/2237467 this SO answer}.
 * @param arr The array to shuffle.
 */
export function shuffle<T>(arr: T[]): void {
    let randomChoiceIndex;
    for (let targetIndex = arr.length - 1; targetIndex > 0; --targetIndex) {
        randomChoiceIndex = randInt(targetIndex + 1);
        [arr[targetIndex], arr[randomChoiceIndex]] = [arr[randomChoiceIndex], arr[targetIndex]];
    }
}

/**
 * Return a pseudo-random integer between 0 inclusive and given ceiling exclusive.
 * @param ceiling The exclusive maximum value of the returned pseudo-random value.
 */
export function randInt(ceiling: number): number {
    return Math.floor(Math.random() * ceiling);
}

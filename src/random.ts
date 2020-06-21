function randomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function randomChoices<T>(arr: T[], n: number): T[] {
  if (arr.length < n) {
    return arr;
  }
  const options = arr.slice();
  const choices = [];
  while (choices.length < n) {
    let i = randomInt(options.length);
    choices.push(options[i]);
    options.splice(i, 1);
  }
  return choices;
}

export function shuffle<T>(arr: T[]): T[] {
  return randomChoices(arr, arr.length);
}

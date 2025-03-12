export function getFarewellMessage(language: string) {
  const options = [
    `Adios ${language}`,
    `Hasta la pasta ${language}`,
    `${language} it's been real!`,
    `${language} bites the dust`,
    `It was nice knowing you ${language}`,
    `Better ${language} than me`,
    `See you never ${language}`,
    `Oh no! Not ${language}`,
    `${language} never saw it coming`,
    `Better luck next time ${language}`,
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

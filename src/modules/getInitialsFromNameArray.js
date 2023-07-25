import getRandomInt from "./getRandomInt";

export default function getInitialsFromNameArray(peopleArray) {
  for (let person of peopleArray) {
    const nameParts = person.name.split(" ");

    const initials = nameParts.map((namePart) =>
      namePart.charAt(0).toUpperCase()
    );

    person.initials = initials.join("");
    person.color = getRandomInt(7);
  }
  return peopleArray;
}


import * as animals from '../data/json/animals.json';
import * as adjectives from '../data/json/adjectives.json';
import * as colors from '../data/json/colors.json';
export function generateTeamName() {

  const animal = animals.entries[Math.floor(Math.random() * animals.entries.length)];
  const descriptor = Math.floor(Math.random() * 2) === 0 ? getColor(animal['gender']) : getAdjective(animal['gender']);
  return `${animal.name} ${descriptor}`.toUpperCase();
}

function getColor(gender) {
  const color = colors.entries[Math.floor(Math.random() * colors.entries.length)];
  return (gender === 1 && color.f) ? color.f : color.m;
}

function getAdjective(gender) {
  const adjective = adjectives.entries[Math.floor(Math.random() * adjectives.entries.length)];
  return (gender === 1 && adjective.f) ? adjective.f : adjective.m;

}

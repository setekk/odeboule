import {deletePlayer, fetchPlayers, fetchPlayersByTeamId, insertPlayer} from "../queryDatabase";
import {Player} from "../models/player";

export async function getPlayers() {
  const rows = await fetchPlayers();
  const players = [];
  for(const dp of rows) {
    players.push(
      new Player(
        dp.name,
        dp.isFavorite,
        dp.id
      ))
  }
  return players;
}

export async function postPlayer(name) {
  const id = await insertPlayer(name, 0);
  return (id) ? new Player(name, 0, id) : null;
}

export async function removePlayer(id) {
  return await deletePlayer(id);
}

export async function getPlayersByTeam(id) {
  const players = [];
  const rows = await fetchPlayersByTeamId(id);
  for(const dp of rows) {
    players.push(
      new Player(
        dp.name,
        dp.isFavorite,
        dp.id
      ))
  }
  return players;
}
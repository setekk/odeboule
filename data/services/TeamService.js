import {
  deleteGameById,
  deleteTeam,
  deleteTeamPlayerByTeam, fetchGamesByTeamId,
  fetchTeamById,
  fetchTeamByName,
  fetchTeams,
  insertTeam,
  insertTeamPlayer
} from "../queryDatabase";
import {Team} from "../models/team";
import {generateTeamName} from "../../utils/generateTeamName";
import {shuffle} from "../../utils/shuffle";
import {TeamGameDTO} from "../dto/teamGameDTO";
import {getPlayersByTeam} from "./PlayerService";

export async function getTeams() {
  const rows = await fetchTeams();
  const teams = [];
  for(const dp of rows) {
    teams.push(
      new Team(
        dp.name,
        dp.isFavorite,
        dp.id
      ))
  }
  return teams;
}

export async function postTeam(name) {
  const id = await insertTeam(name, 0);
  return (id) ? new Team(name, 0, id) : null;
}

export async function getTeamById(id) {
  const row = await fetchTeamById(id);

  return new Team(
    row.name,
    row.isFavorite,
    row.id
  );
}

export async function postTeamPlayerByTeam(teamId, teamPlayerIds) {
  await deleteTeamPlayerByTeam(teamId)
  for(const playerId of teamPlayerIds) {
    await insertTeamPlayer(teamId, playerId)
  }
}

export async function removeTeam(id) {
  const gameIds = await fetchGamesByTeamId(id)
  await deleteTeam(id)
  //supprimer toutes les parties de la team
  for (const gameId of gameIds) {
    await deleteGameById(gameId.id)
  }
}

export async function generateRandomTeams(selectedPlayers) {
  const oddName = await generateUniqueTeamName()
  const oddTeamId = await insertTeam(oddName, 0)
  const evenName = await generateUniqueTeamName()
  const evenTeamId = await insertTeam(evenName, 0)
  const [oddPlayersTeam, evenPlayersTeam ] = await dispatchPlayers(selectedPlayers)
  const oddTeam = new TeamGameDTO(oddName, 1, oddPlayersTeam, 0,0, oddTeamId)
  await postTeamPlayerByTeam(oddTeamId, oddPlayersTeam.map(player => player.id))
  const evenTeam = new TeamGameDTO(evenName, 0, evenPlayersTeam, 0,0, evenTeamId)
  await postTeamPlayerByTeam(evenTeamId, evenPlayersTeam.map(player => player.id))
  return [{...oddTeam}, {...evenTeam}]
}

async function generateUniqueTeamName() {
  const generatedName = generateTeamName()
  const existingTeam = await fetchTeamByName(generatedName)
  if (existingTeam) {
    await generateUniqueTeamName()
  }
  return generatedName;
}

async function dispatchPlayers(selectedPlayers) {
  const shuffledPlayers = shuffle(selectedPlayers);
  const nbPlayers = shuffledPlayers.length
  return [shuffledPlayers.slice(0, nbPlayers / 2), shuffledPlayers.slice((nbPlayers/2))];
}

export async function getTeamGameWithPlayers(team, isOdd, score = 0, winner = 0) {
  const players = await getPlayersByTeam(team.id)
  return new TeamGameDTO(team.name, isOdd, players, score,winner, team.id)
}
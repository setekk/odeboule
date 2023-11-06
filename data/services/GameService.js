import {Game} from "../models/game";
import {
  deleteGameById,
  fetchGameById,
  fetchGames,
  fetchRoundsByGameId,
  fetchScoresByGameId, fetchTeamById,
  insertGame,
  insertRound,
  insertScore,
  updateFinishedAt,
  updateScore
} from "../queryDatabase";
import {Score} from "../models/score";
import {GameDTO} from "../dto/gameDTO";
import {TeamGameDTO} from "../dto/teamGameDTO";
import {getPlayersByTeam} from "./PlayerService";
import {RoundDTO} from "../dto/roundDTO";

export async function getGames() {
  const rows = await fetchGames();
  const games = [];
  for(const dp of rows) {
    games.push(
      new Game(
        dp.createdAt,
        dp.finishedAt,
        dp.id
      ))
  }
  return games;
}

export async function getGameById(id) {
  const row = await fetchGameById(id)
  return new Game(
    row.createdAt,
    row.finishedAt,
    row.id
  )
}

export async function getRoundsByGameId(teamId) {
  const rows = await fetchRoundsByGameId(teamId)
  const rounds = [];
  for(const dp of rows) {
    rounds.push(
      new RoundDTO(
        dp.number,
        dp.score,
        dp.game_id,
        dp.team_id,
        dp.isOdd,
        dp.id
      ))
  }
  return rounds;
}

export async function getScoresByGameId(id) {
  const rows = await fetchScoresByGameId(id)
  const scores = [];
  for(const dp of rows) {
    scores.push(
      new Score(
        dp.game_id,
        dp.team_id,
        dp.score,
        dp.winner,
        dp.isOdd,
        dp.team_id
      ))
  }
  return scores;
}

export async function postGame(teams) {
  const oddTeamId = teams.filter((team) => team.isOdd === 1)[0].id
  const evenTeamId = teams.filter((team) => team.isOdd === 0)[0].id
  const d = new Date();
  const createdAt = d.toISOString();
  const gameId = await insertGame(createdAt);
  await insertScore(gameId, oddTeamId, 1)
  await insertScore(gameId, evenTeamId, 0)
  return new Game(createdAt, null, gameId)
}

export async function postRound(gameId, teamId, score, numRound) {
  await insertRound(gameId, teamId, score, numRound)
}

export async function patchScore(score, winner, gameId, teamId) {
  await updateScore(score, winner, gameId, teamId);
}

export async function patchFinishedAt(game, scores){
  await updateFinishedAt(game.id, new Date().toISOString());
}

export async function removeGame(id) {
  return await deleteGameById(id)
}

export async function getTeamsByGame(id) {
  const scores = await getScoresByGameId(id)
  const teams = []
  let team = null
  for (const score of scores) {
    if (score.teamId) {
      team = await getTeamGameDTOByScore(score)
      teams.push({...team})
    }
  }
  return teams;
}

export async function getTeamGameDTOByScore(score) {
  const team = await fetchTeamById(score.teamId);
  const players = await getPlayersByTeam(score.teamId);
  return new TeamGameDTO(
    team.name,
    score.isOdd,
    players,
    score.score,
    score.winner,
    score.teamId
  )
}

export async function getGameDTOById(id) {
  const game = await getGameById(id)
  const teams = await getTeamsByGame(id)
  const rounds = await getRoundsByGameId(id)
  return new GameDTO(
    game.createdAt,
    teams,
    rounds,
    game.finishedAt,
    game.id,
  )
}


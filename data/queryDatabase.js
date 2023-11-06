import {DbInstance} from "./DbInstance";

const dbInstance = DbInstance.getInstance();

export const isTheVersionInstalled = async () => {
  //dbInstance.deleteDatabase();
  const result = await dbInstance.executeQuery('SELECT * FROM VERSION WHERE id = ?', [process.env.EXPO_PUBLIC_VERSION_DB]);
  return result.rows.length !== 0;
}

export const fetchPlayers = async () => {
  const result = await dbInstance.executeQuery('SELECT * FROM PLAYER ORDER BY id DESC');
  return result.rows._array;
}

export const insertPlayer = async (name, isFavorite) => {
  const result = await dbInstance.executeQuery(
    'INSERT INTO PLAYER (name, isFavorite) VALUES (?, ?)',
    [name, isFavorite]);
  return result.insertId;
}

export const deletePlayer = async (id) => {
  return await dbInstance.executeQuery(
    'DELETE FROM PLAYER WHERE id= ?',
    [id]);
}

export const fetchTeams = async () => {
  const result = await dbInstance.executeQuery('SELECT * FROM TEAM ORDER BY id DESC');
  return result.rows._array;
}

export const fetchTeamById = async (id) => {
  const result = await dbInstance.executeQuery('SELECT * FROM TEAM WHERE id = ?', [id]);
  return result.rows._array[0];
}

export const fetchTeamByName = async (name) => {
  const result = await dbInstance.executeQuery('SELECT * FROM TEAM WHERE name = ?', [name]);
  return result.rows._array[0];
}

export const fetchPlayersByTeamId = async (id) => {
  const result = await dbInstance.executeQuery(
    'SELECT * FROM PLAYER AS P INNER JOIN TEAM_PLAYER AS TP on TP.player_id=P.id WHERE TP.team_id= ?',
    [id]);
  return result.rows._array;
}

export const insertTeam = async (name, isFavorite) => {
  const result = await dbInstance.executeQuery(
    'INSERT INTO TEAM (name, isFavorite) VALUES (?, ?)',
    [name, isFavorite]);
  return result.insertId;
}

export const insertTeamPlayer = async (teamId, playerId) => {
  return await dbInstance.executeQuery(
    'INSERT INTO TEAM_PLAYER (team_id, player_id) VALUES (?, ?)',
    [teamId, playerId]);
}

export const deleteTeamPlayerByTeam = async (teamId) => {
  return await dbInstance.executeQuery(
    'DELETE FROM TEAM_PLAYER WHERE team_id= ?',
    [teamId]);
}

export const deleteTeam = async (id) => {
  return await dbInstance.executeQuery(
    'DELETE FROM TEAM WHERE id= ?',
    [id]);
}

export const fetchGames = async () => {
  const result = await dbInstance.executeQuery('SELECT * FROM GAME ORDER BY id DESC');
  return result.rows._array;
}

export const insertGame = async (createdAt) => {
  const result = await dbInstance.executeQuery(
    'INSERT INTO GAME (createdAt) VALUES (?)',
    [createdAt]);
  return result.insertId;
}

export const insertScore = async (gameId, teamId, isOdd) => {
  const result = await dbInstance.executeQuery(
    'INSERT INTO SCORE (game_id, team_id, isOdd) VALUES (?, ?, ?)',
    [
      gameId,
      teamId,
      isOdd
    ]);
  return result.insertId;
}

export const insertRound = async (gameId, teamId, score, number) => {
  const result = await dbInstance.executeQuery(
    'INSERT INTO ROUND (game_id, team_id, score, number) VALUES (?, ?, ?, ?)',
    [
      gameId,
      teamId,
      score,
      number
    ]);
  return result.insertId;
}

export const updateFinishedAt = async (gameId, finishedAt) => {
  return await dbInstance.executeQuery(
    'UPDATE GAME SET finishedAt = ? WHERE id = ?',
    [finishedAt, gameId]);
}

export const updateScore = async (score, winner, gameId, teamId) => {
  return await dbInstance.executeQuery(
    'UPDATE SCORE SET score = ?, winner = ? WHERE game_id = ? AND team_id = ?',
    [score, winner, gameId, teamId]);
}

export const fetchGameById = async (id) => {
  const result = await dbInstance.executeQuery('SELECT * FROM GAME WHERE id = ?', [id]);
  return result.rows._array[0];
}

export const fetchScoresByGameId = async (id) => {
  const result = await dbInstance.executeQuery('SELECT * FROM SCORE WHERE game_id = ?', [id]);
  return result.rows._array;
}

export const fetchRoundsByGameId = async (id) => {
  const result = await dbInstance.executeQuery(
    'SELECT R.*, S.isOdd FROM ROUND AS R INNER JOIN SCORE AS S on R.team_id=S.team_id WHERE R.game_id = ? GROUP BY R.id', [id]);
  return result.rows._array;
}

export const deleteGameById = async (id) => {
  return await dbInstance.executeQuery(
    'DELETE FROM GAME WHERE id= ?',
    [id]);
}

export const fetchGamesByTeamId = async (id) => {
  const result = await dbInstance.executeQuery(
    'SELECT id FROM GAME AS G INNER JOIN SCORE AS S on G.id=S.game_id WHERE S.team_id = ? GROUP BY G.id', [id]);
  return result.rows._array;
}




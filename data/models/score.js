export class Score {
  gameId = null;
  teamId = null;
  score = 0;
  winner = 0;
  isOdd = 0;
  id = null;
  constructor(gameId, teamId, score, winner = 0, isOdd = 0, id = null) {
    this.gameId = gameId;
    this.teamId = teamId;
    this.score = score;
    this.winner = winner;
    this.isOdd = isOdd;
    this.id = id;
  }
}
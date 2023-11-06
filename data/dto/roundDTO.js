export class RoundDTO {
  number = 1;
  score = 0;
  gameId = null;
  teamId = null;
  isOdd = null;
  id = null;
  constructor(number, score, gameId, teamId, isOdd, id) {
    this.number = number;
    this.score = score;
    this.gameId = gameId;
    this.teamId = teamId;
    this.isOdd = isOdd;
    this.id = id;
  }
}
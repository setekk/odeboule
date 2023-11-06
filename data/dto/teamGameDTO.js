export class TeamGameDTO {
  name = null;
  isOdd = 0;
  players = [];
  score = 0;
  winner = 0;
  id= null;

  constructor(name, isOdd, players, score, winner, id) {
    this.name = name;
    this.isOdd = isOdd;
    this.players = players;
    this.score = score;
    this.winner = winner;
    this.id = id;
  }
}
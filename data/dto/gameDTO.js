export class GameDTO {
  createdAt = null;
  teams = [];
  rounds = [];
  finishedAt = null;
  id = null;
  constructor(createdAt, teams, rounds, finishedAt, id) {
    this.createdAt = createdAt;
    this.teams = teams;
    this.rounds = rounds;
    this.finishedAt = finishedAt;
    this.id=id;
  }
}
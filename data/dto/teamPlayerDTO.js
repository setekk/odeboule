export class TeamPlayerDTO {
  name = null;
  isOdd = 0;
  players = [];
  id= null;

  constructor(name, isOdd, players, id) {
    this.name = name;
    this.isOdd = isOdd;
    this.players = players;
    this.id = id;
  }
}
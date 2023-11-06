export class Game {
  createdAt = null;
  finishedAt = null;
  id = null;
  constructor(createdAt, finishedAt, id = null) {
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
    this.id=id;
  }
}
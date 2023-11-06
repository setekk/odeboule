export class Team {
  name = null;
  isFavorite = 0;
  id= null;

  constructor(name, isFavorite, id) {
    this.id = id;
    this.isFavorite = isFavorite;
    this.name = name;
  }
}
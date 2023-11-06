export class Round {
    number = 1;
    score = 0;
    gameId = null;
    teamId = null;
    id = null;
    constructor(number, score, gameId, teamId, id) {
        this.number = number;
        this.score = score;
        this.gameId = gameId;
        this.teamId = teamId;
        this.id = id;
    }
}
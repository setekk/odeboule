import {DbInstance} from "./DbInstance";

const dbInstance = DbInstance.getInstance();

export const initDatabase = () => {
  //v1 de la base de données
  dbInstance.db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS TEAM_PLAYER;');
    tx.executeSql('DROP TABLE IF EXISTS PLAYER;');
    tx.executeSql('DROP TABLE IF EXISTS SCORE;');
    tx.executeSql('DROP TABLE IF EXISTS ROUND;');
    tx.executeSql('DROP TABLE IF EXISTS TEAM;');
    tx.executeSql('DROP TABLE IF EXISTS GAME;');

    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS VERSION ('
      + 'id INTEGER PRIMARY KEY NOT NULL); ',
      [],
      () => console.log('Version table created successfully'),
      (_, err) => console.log('Error creating version table', err)
    );

    tx.executeSql(
      'SELECT * FROM VERSION WHERE id = ?',
      [process.env.EXPO_PUBLIC_VERSION_DB],
      (_, result) => {
        if(result.rows.length === 0) {
          tx.executeSql(
            'INSERT INTO VERSION (id) VALUES (?)',
            [process.env.EXPO_PUBLIC_VERSION_DB],
            () => console.log('insert version successfully'),
            (_, err) => console.log('Error inserting version table', err)
          );
        }
      }, (_, err) => console.log('Error selecting version table', err));

    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS PLAYER ('
      + 'id INTEGER PRIMARY KEY NOT NULL, '
      + 'name TEXT NOT NULL UNIQUE, '
      + 'isFavorite INTEGER DEFAULT 0 NOT NULL); ',
      [],
      () => console.log('Player table created successfully'),
      (_, err) => console.log('Error creating players table', err)
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS TEAM ('
      + 'id INTEGER PRIMARY KEY NOT NULL, '
      + 'name TEXT NOT NULL UNIQUE, '
      + 'isFavorite INTEGER DEFAULT 0 NOT NULL); ',
      [],
      () => console.log('Team table created successfully'),
      (_, err) => console.log('Error creating teams table', err)
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS TEAM_PLAYER ('
      + 'team_id INTEGER NOT NULL references TEAM on delete cascade, '
      + 'player_id INTEGER NOT NULL references PLAYER on delete cascade, '
      + 'CONSTRAINT KEY PRIMARY KEY(team_id, player_id)); ',
      [],
      () => console.log('TeamPlayerDTO table created successfully'),
      (_, err) => console.log('Error creating games table', err)
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS GAME ( '
      + 'id INTEGER PRIMARY KEY NOT NULL, '
      + 'createdAt TEXT, '
      + 'finishedAt TEXT);',
      [],
      () => console.log('Game table created successfully'),
      (_, err) => console.log('Error creating games table', err)
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS SCORE ( '
      + 'game_id INTEGER NOT NULL references GAME on delete cascade, '
      + 'team_id INTEGER NOT NULL references TEAM on delete cascade, '
      + 'score INTEGER DEFAULT 0 NOT NULL, '
      + 'winner INTEGER DEFAULT 0 NOT NULL, '
      + 'isOdd INTEGER DEFAULT 0 NOT NULL, '
      + 'CONSTRAINT KEY PRIMARY KEY(game_id, team_id));',
      [],
      () => console.log('ScoreTeam table created successfully'),
      (_, err) => console.log('Error creating player_game table', err)
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ROUND ('
      + 'id INTEGER PRIMARY KEY NOT NULL, '
      + 'score INTEGER NOT NULL, '
      + 'game_id INTEGER NOT NULL references GAME on delete cascade, '
      + 'team_id INTEGER NOT NULL references TEAM on delete cascade, '
      + 'number INTEGER NOT NULL);',
      [],
      () => console.log('Round table created successfully'),
      (_, err) => console.log('Error creating team_game table', err)
    );
  });
}
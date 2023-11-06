import * as SQLite from 'expo-sqlite';

export class DbInstance {

  static instance;
  db;

  constructor() {
    this.db = SQLite.openDatabase('odeboule.db')
    this.db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>   console.log('Foreign keys turned on') );
  }

  static getInstance() {
    if (!DbInstance.instance) {
      DbInstance.instance = new DbInstance();
    }
    return DbInstance.instance;
  }

  async executeQuery(query, args = []) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          query,
          args,
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  };

  deleteDatabase() {
    this.db.closeAsync()
    this.db.deleteAsync()
  }
}
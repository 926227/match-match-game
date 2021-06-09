import { UserResultModel } from '../../models/user-model';
import { settings } from '../utils/settings';

export class DataBase {
  openRequest: IDBRequest;

  dataBase!: IDBDatabase;

  loaded = false;

  constructor() {
    if (!window.indexedDB) {
      window.alert(
        'Ваш браузер не поддерживает стабильную версию IndexedDB. Какие-то функции будут недоступны'
      );
    }

    this.openRequest = window.indexedDB.open(settings.dbName);

    this.openRequest.addEventListener('success', this.onSuccess.bind(this));
    this.openRequest.addEventListener(
      'upgradeneeded',
      this.onUpgradeNeeded.bind(this)
    );
  }

  addUserResult(userResult: UserResultModel): void {
    if (this.loaded) {
      const transaction = this.dataBase.transaction(
        'usersResults',
        'readwrite'
      );
      const users = transaction.objectStore('usersResults');
      users.add(userResult);
    } else
      this.openRequest.addEventListener(
        'success',
        this.addUserResult.bind(this, userResult),
        { once: true }
      );
  }

  getUserResult(quantityItems = 10): Promise<UserResultModel[]> {
    const promise: Promise<UserResultModel[]> = new Promise((resolve) => {
      const fetchResults = () => {
        const results: UserResultModel[] = [];
        let counter = 0;

        const transaction = this.dataBase.transaction(
          'usersResults',
          'readonly'
        );
        const store = transaction
          .objectStore('usersResults')
          .index('result')
          .openCursor(null, 'prev');

        store.onsuccess = () => {
          const cursor = store.result;

          if (cursor && counter < quantityItems) {
            results.push(cursor.value);
            counter++;
            cursor.continue();
          }
        };
        transaction.oncomplete = () => {
          resolve(results);
        };
      };
      this.openRequest.addEventListener('success', fetchResults, {
        once: true,
      });
    });

    return promise;
  }

  private onSuccess() {
    this.loaded = true;
    this.dataBase = this.openRequest.result;
  }

  private onUpgradeNeeded() {
    this.dataBase = this.openRequest.result;
    const store = this.dataBase.createObjectStore('usersResults', {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('firstName', 'firstName');
    store.createIndex('lastName', 'lastName');
    store.createIndex('email', 'email');
    store.createIndex('result', 'result');
  }
}

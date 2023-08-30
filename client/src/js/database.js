import { openDB } from 'idb';

//initializes a database
const initdb = async () =>
//initializes a database by the name of 'jate', version 1.
  openDB('jate', 1, {
    //if an object store of 'jate' already exists within the jate database, the initializing process is complete. 
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // else, an object store by the name 'jate' and a keyPath value of 'id' that autoincrements will be created. 
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//when called, this asynchronouse function will open 'jate', start a read write transaction, which beings by accessing the 'jate' object store,
//adding new content to the 'jate' object store, and returning the result
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, text: content });
  const result = await request;
  return result;
};

//When called, this asychronous function will access the 'jate' object store within the 'jate' database, get all of it's content, 
//which will be displayed upon the calling of result;
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log(result);
  return result?.text
};

initdb();

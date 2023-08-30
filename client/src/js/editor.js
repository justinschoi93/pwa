//imported getDb and putDb from database.js, and header from header.js
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    //saves content from local storage as localData
    const localData = localStorage.getItem('content');

    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    //
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    //The value of this.editor is set to either data, localData, or header, depending on what's available. 
    //If data is available, the value will be set to the value of data. If data is not available, 
    //the value will be set to the value oflocalData. 
    //If localData is not available, the value will be set to the value of header. 
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    //Whenever a change is made to the editor, 'content' of local storage will be set to the value of this.editor
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    //Whenever the editor "blurs", local storage will be set to the current value of this.editor. Like a backup. 
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}

import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

//the inner html of the div container with the id of main will be set to the value of an empty string. 
const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

//a new instance of Editor will be created. 
const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}


//If service workers are supported, a new Workbox service worker will be registered, based off the blueprints detailed in src-sw.js
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('./src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

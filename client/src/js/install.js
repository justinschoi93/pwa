const butInstall = document.getElementById('buttonInstall');

//before the install button is clicked, the value of deferredPrompt is set to event, and the hidden is removed from the class list of butInstall
window.addEventListener('beforeinstallprompt', (event) => {

    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);

});

//when the install button is clicked, set the value of promptEvent to window.deferredPrompt,
//call .prompt() on promptEvent, 
//set the value of window.deferredPrompt to null,
//and add the value of hidden to butInstall's class list. 
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent){
        return;
    }

    promptEvent.prompt();

    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

//when the app is installed, the value of window.defereredPrompt will be set to null. 
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});

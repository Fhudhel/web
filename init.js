async function init() { 
  const video = document.getElementById('video'); 
  const ui = video['ui']; 
  const config = {
    'seekBarColors': {
      base: 'blue',
      buffered: 'red',
      played: 'yellow',
    }
  }
  ui.configure(config);
  const controls = ui.getControls(); 
  const player = controls.getPlayer(); 
  player.configure({
    drm: {
      clearKeys: {
        keyid : key
      }
    }
  });

  window.player = player; 
  window.ui = ui; 

  player.addEventListener('error', onPlayerErrorEvent); 
  controls.addEventListener('error', onUIErrorEvent); 
  try{
    await player.load(punya_lsbtv); 
    console.log('The video has now been loaded!');
  } catch (error) {
    onPlayerError(error);
  }
} 
function onPlayerErrorEvent(errorEvent) {
  onPlayerError(event.detail);
} 
function onPlayerError(error) {
  console.error('Error code', error.code, 'object', error);
} 
function onUIErrorEvent(errorEvent) {
  onPlayerError(event.detail);
} 
function initFailed(errorEvent) {
  console.error('Unable to load the UI library!');
} 
document.addEventListener('shaka-ui-loaded', init); 
document.addEventListener('shaka-ui-load-failed', initFailed); 
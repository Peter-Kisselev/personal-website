const letDict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const FPS = 15;
const effectWait = 5000; // In milliseconds

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

String.prototype.setChar = function(ind, char) {
  return this.substring(0, ind) + char + this.substring(ind + 1);
}

function randStr(strLen) {
  return Array(strLen).join().split(',').map(function() { return letDict.charAt(Math.floor(Math.random() * letDict.length)); }).join('');
}

document.addEventListener('DOMContentLoaded', async function() {
  while(true) {
    runEl = document.getElementById("textRandLoad");
    oldText = runEl.innerText;

    effectText = randStr(oldText.length);
    runEl.innerText = effectText;
    runEl.style.display = 'unset';

    effectTime = Date.now();
    frameTime = Date.now();

    charInd = 0;
    frame = 0;
    while(charInd < oldText.length) {
      if(oldText[charInd] == " ") {charInd++; effectTime = Date.now()}

      const effectSpeed = 200; //In milliseconds
      effectText = (effectText.substring(0, charInd+1) + randStr(oldText.length - charInd - 1)).substring(0, oldText.length);
      runEl.innerText = effectText;

      if(Date.now() - effectSpeed >= effectTime) {
        effectText = (oldText.substring(0, charInd+1) + effectText.substring(charInd+1)).substring(0, oldText.length);
        runEl.innerText = effectText;
        charInd += 1;
        effectTime = Date.now();
      }

      if(Date.now() - 1000/FPS < frameTime) { await sleep(frameTime - Date.now() + 1000/FPS); frameTime = Date.now(); }
      frame += 1;
      // console.log(frame);
    }
    await sleep(effectInterval);
  }
});
(function(){
  'use strict';

  const cachedGamepads = {};

  function cloneGamepad(gamepad){
    let buttons = [];
    for(let i in gamepad.buttons){
      buttons[i] = gamepad.buttons[i].value;
    }
    let axes = [];
    for(let i in gamepad.axes){
      axes[i] = gamepad.axes[i];
    }
    return {
      "axes": axes,
      "buttons": buttons
    }
    // return {
    //   "axes": new Array(gamepad.axes.length).fill(0),
    //   "buttons": new Array(gamepad.buttons.length).fill(0)
    // };
  }

  function pollGamepad(){
    let gamepads = navigator.getGamepads();
    for(let g = 0; g < gamepads.length; g++){
      if(gamepads[g] === undefined) continue;
      if(cachedGamepads[g] === undefined) {
        cachedGamepads[g] = cloneGamepad(gamepads[g]);
      }
      let gamepad = gamepads[g], cachedGamepad = cachedGamepads[g];

      //Handle buton events
      let buttons = gamepad.buttons, cachedButtons = cachedGamepad.buttons;
      for(let i = 0; i < buttons.length; i++){
        if(cachedButtons[i] !== buttons[i].value){
          cachedButtons[i] = buttons[i].value;

          //Determine press or release
          let eventType = buttons[i].pressed ? "gamepad_button_pressed"
                                             : "gamepad_button_released";

          //Create an Event
          let event = new CustomEvent(eventType, {
            "bubbles": true,
            "cancalable": true,
            "detail": {
              gamepad: gamepad.index,
              button: i,
              pressed: buttons[i].pressed,
              value: buttons[i].value
            }
          });
          document.dispatchEvent(event);
        }
      }

      //Handle axis events
      let axes = gamepad.axes, cachedAxes = cachedGamepad.axes;
      for(let i = 0; i < axes.length; i++){
        if(cachedAxes[i] !== axes[i]){
          cachedAxes[i] = axes[i];

          //Create an Event
          let event = new CustomEvent("gamepad_axis_moved", {
            "bubbles": true,
            "cancalable": true,
            "detail": {
              gamepad: gamepad.index,
              axis: i,
              value: axes[i]
            }
          });
          document.dispatchEvent(event);
        }
      }
    }
    window.requestAnimationFrame(pollGamepad);
  }

  // setInterval(pollGamepad, 1000 / 60);
  window.requestAnimationFrame(pollGamepad);
})();

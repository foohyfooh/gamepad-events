# Gamepad Events
A simple library for gamepad API in the browser. Since there aren't any events
for button presses or axis movement, this fires events to simulate that.

For more information on the API check https://w3c.github.io/gamepad/

## Events
Event Name              | Description
---                     | ---
gamepad_button_pressed  | When a button is pressed
gamepad_button_released | When a button is released
gamepad_axis_moved      | When an axis is moved

### gamepad_button_pressed and gamepad_button_released

Property | Description
---      | ---
gamepad  | The index of the gamepad that fired the event
button   | The button pressed or released
pressed  | If the button is pressed or released
value    | The value indicating the magnitude to which the button is pressed or released

### gamepad_axis_moved
Property | Description
---      | ---
gamepad  | The index of the gamepad that fired the event
axis     | The axis moved
value    | The value indicating the magnitude to which the axis moved

Check [index.html](index.html) for an example of how to use the library.

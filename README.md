# Widget Ninja Code Test

Source code about a partial solution to proposed code test "build a hotspot widget"

## Try online

[click here](http://embed.plnkr.co/suLISkTCiKIBQ3RNWJA2/)

## How to test?

- Clone or dowloand this repo.
- Open index.html in your favorite browser
- Enjoy!

## How to add more test?
- Open `hotspot.js` file inside `test` folder
- You can see some examples about how to test the widget
- If you want to add more test, only copy and paste whathever example and change the names.

### Configuration for each instance

`el <string>`: Allows the Hotspot widget identify a node reference to determine where initial position will be.

`name <string>`: it is an identifier for each element inside the widget.

`hotspot <object>`: Allows to pass some configurations and information to the widget and it be used to set the position of the hotspot and also show that information in a popup dialog.
  - `position <object>`: you can specify a position in x and y for each hotspot.
    - `x <int>`: position in x measured from node reference (top:0|lef:0).
    - `y <int>`: position in y measured from node reference (top:0|lef:0).
  - `text <string>`: is used as a title for each hotspot.
  - `dialog <object>`: information passed to the dialog.
    - `content <string>`: text information to be shown in the dialog popup. You can use plane text or html information.


### example
```javascript

const settings = {
    el: 'hotspot',
    name: 'venus',
    hotspot: {
        position: {
            x: 100,
            y: 320,
        },
        text: '2',
        dialog: {
            content: `plane text or html`
        }
    }
};

//you need to create a new instance Hotspot class 
const hotspot = new Hotspot(settings);
//execute the hotspot widget
hotspot.runWidget();
```


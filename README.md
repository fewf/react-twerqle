Twerqle, in ReactJS
=============

This is an adaptation of the board game [Qwirkle](http://en.wikipedia.org/wiki/Qwirkle). The ReactJS user interface is a work-in-progress. All graphics are made using `SVG`. `localStorage` powers state saving, so a user doesn't have to finish a game in one sitting. 

Play it on it's [github page!](http://fewf.github.io/react-twerqle/)

Navigating the Code
-------------------

I used [https://github.com/newtriks/generator-react-webpack](react-webpack), a Yeoman generator, to enforce structure on the code. It comes bundled with handy Grunt commands. Cloning and running `grunt serve` will spin up a server on your local machine, `grunt build` bundles it up into `/dist` for web consumption

**src/components** is where to find the React user interface code.

**src/twerqle** contains the game logic.
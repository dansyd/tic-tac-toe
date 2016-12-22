#TIC TAC TOE

brought to you by Daniele Peviani

live [demo](http://dansyd.github.io/tic-tac-toe "Demo")

![Alt text](./Screenshot.png)

This is my take on recreating the world famous game of Tic Tac Toe. As you probably already know, the goal is to line up three of your "tokens" horizontally, vertically or diagonally. There is an initialization panel at the beginning of the game, where the 2 players have the option to chose the icon they want to use in the game.

I've used HTML and CSS to layout and style the game, Javascript to run the program operations and jQuery for DOM manipulation.

This is a brief diagram of a game turn logic:

st=>start: Start
e=>end
click=>operation: Click
symbol=>operation: Put icon
nothing=>operation: Do nothing
back=>subrutine: back
update=>operation: Update score
row=>operation: Check row
column=>operation: Check column
diagonal=>operation: Check diagonal
empty=>condition: Empty?
windraw=>condition: Win or Draw?
windraw2=>condition: Win or Draw?
windraw3=>condition: Win or Draw?

st->click->empty
empty(yes)->symbol->row->windraw(no)->column->windraw2(no)->diagonal->windraw3(no)->click
empty(no)->nothing(right)->click

# Playing the Sudoku Game

## From the console
1) Python 3 is required. Run `python3 main.py` to play the Sudoku game
2) Use the menu option '1' to fill numbers in by following the instructions. If you specify a co-ordinate that already has a number, it will be overwritten if possible. Note that numbers prefilled in the grid cannot be overwritten - if you try to do so, you will be presented with an error message.
3) With each update, the grid will be reprinted with a status message that indicates whether your grid is incomplete, complete but incorrect, or complete and correct. Thus when the grid is completed, it'll be printed together with a message that indicates whether your solution is correct or not.
4) If your solution is incorrect, feel free to overwrite your earlier inputs until you can get it right. Alternatively you can use the menu option '3' to reset the board to the initial state.
5) At any point you can use the menu option '2' to solve the puzzle and display the completed grid.

## On the internet

The game is much easier to play using the web app - https://sudokuchecker.herokuapp.com/ . All the above functionality is available.  

# Reduction.py

`reduction.py` illustrates how an instance of the 3x3 Latin Square Completion problem can be reduced to an instance of a corresponding Sudoku problem. 

Simple usage: running `python3 reduction.py` will show how the reduction of a predefined 3x3 latin square problem to a 9x9 sudoku grid.

Advanced usage:
1) Using Python 3, import the module: `import reduction as red`
2) Define your 3x3 latin square grid as a list of lists: `square = [[1, 2, None], [None, 3, 1], [3, None, 2]]`
3) Run `red.make_sudoku_from_square(square)` and view the reduction.
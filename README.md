# Playing the Sudoku Game
1) Python 3 is required. Run `python3 main.py` to play the Sudoku game
2) Use the menu options to fill in and remove numbers. Note that numbers prefilled in the grid cannot be removed
3) When the grid is completed, it'll be printed together with a message the indicates whether your solution is correct or not.
4) If your solution is incorrect, feel free to remove numbers and try to get it right.

# Reduction.py

`reduction.py` illustrates how an instance of the 3x3 Latin Square Completion problem can be reduced to an instance of a corresponding Sudoku problem. 

Simple usage: running `python3 reduction.py` will show how the reduction of a predefined 3x3 latin square problem to a 9x9 sudoku grid.

Advanced usage:
1) Using Python 3, import the module: `import reduction as red`
2) Define your 3x3 latin square grid as a list of lists: `square = [[1, 2, None], [None, 3, 1], [3, None, 2]]`
3) Run `red.make_sudoku_from_square(square)` and view the reduction.
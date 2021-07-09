# Animated Sudoku



Animated Sudoku is (surprise) a Sudoku game where you can choose between solving the puzzle yourself or watching the computer do it. 

Try it out at https://sudokuanimated.herokuapp.com/ - not yet optimised for mobiles.

[gif here]

Features include:

- `New Game` generates a random sudoku puzzle which is guaranteed to have a unique solution
- A helpful status message above the game tells you whether your solution is correct or not
- `Solve Game` shows an animated representation of the recursive backtracking algorithm that the computer uses to solve the puzzle



## Build Instructions

You can build the project from source. The back-end runs on Flask and the front-end uses React.

1. Make sure you have Python (tested on version 3.9) and `npm` (with `yarn`) installed.
2. Run `yarn install` to install the NPM dependencies
3. Run `pip install -r requirements.txt` to install the Python dependencies
4. Run `yarn build` to create the production files that the Flask server will serve
5. Enter the api directory: `cd api`  
6. Execute `flask run` (or `python -m flask run` if the `flask` command isn't found) and visit the address that Flask serves the application on



## Algorithmic Details

### How does `New Game` generate a random puzzle with one solution?

It's a two step process. The first step is to generate a random complete sudoku grid. We start with an empty grid, and manually fill in some amount of cells (12 by default) with random values that don't break the rules of Sudoku. Then we send the partially filled grid to the solver, and use whatever solution it finds as our random complete grid. Sometimes the solver fails to find a solution, in which case we restart the entire process - this is why pressing `New Game` occasionally involves a lag.

Once we have our complete grid, we randomly choose cells to clear from it. Each time we clear a cell we run what's left of the grid through the solver to make sure there's still just one unique solution - if not then we replace that cell and try another one. While clearing cells from it we make sure that our attempts are somewhat distributed between rows/columns.










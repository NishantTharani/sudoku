import api.sudoku as sudoku
from api.grid import Grid


def test_generate_completed_grid():
    for _ in range(50):
        path, grid = sudoku.generate_completed_grid(n=3, start_with=12)
        print(grid)
        assert Grid(grid).check_solution()


def test_generate_new_puzzle():
    for _ in range(50):
        grid = sudoku.generate_new_puzzle(difficulty=3)
        print(grid)

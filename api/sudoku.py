# Author: Nishant Tharani
# Description:

from grid import Grid
import random


def generate_completed_grid(n=3, start_with=11) -> tuple:
    """Generates a random completed sudoku grid
    """

    height = n ** 2
    empty_grid = [[0 * height] * height]
    grid = Grid(empty_grid)
    cells_to_fill = list(range(1, (n ** 2) + 1))
    random.shuffle(cells_to_fill)

    for i in range(start_with):
        idx = cells_to_fill[i]
        row = idx // height
        col = idx % height
        grid.fill_random_number(row, col)

    return get_solutions(grid.get_grid(), 1)


def generate_new_puzzle(completed_grid: None = list[list[int]], difficulty=3):
    """Generates a new puzzle by starting with a completed grid and then trying to delete cells one by one.

    The number of cells to delete is determined by the difficulty level. Given this number, we randomly choose cells
    to try and delete. A deletion is successful if it leaves the puzzle with just one unique solution. Note that if a
    deletion is unsuccessful, we never try to delete this cell again.
    """
    if completed_grid is None:
        completed_grid = generate_completed_grid(n=3, start_with=11)[0]

    grid = Grid(completed_grid)
    height = grid.n ** 2
    size = height ** 2
    left_in_row = [height] * height
    left_in_col = [height] * height

    if difficulty == 3:
        deletions = int(0.75 * size)
        min_per_row_col = 4
    else:
        raise ValueError

    cells_to_delete = list(range(1, height + 1))
    random.shuffle(cells_to_delete)
    deleted = 0

    while (deleted < deletions) and (len(cells_to_delete) > 0):
        idx = cells_to_delete.pop()
        row = idx // height
        col = idx % height

        # Would deleting this violate the lower bound on cells per row/col?
        if left_in_row[row] <= min_per_row_col or left_in_col[col] <= min_per_row_col:
            continue

        # remove the number at this position
        num = grid.remove_number(row, col)

        # check if there is a solution with any other number
        nums_to_check = [i for i in range(1, height + 1) if i != num]
        for num_to_check in nums_to_check:
            _, solutions = get_solutions(grid.get_grid(), 1)
            if len(solutions) > 0:
                # if so, put the number back and move on
                grid.fill_number(row, col, num)
                break
        # if not, increment 'deleted' and move on
        else:
            deleted += 1

    return grid.get_grid()


def get_solutions(original_grid_values: list[list[int]], stop_at: int = None) -> tuple:
    """Solves the sudoku puzzle, taking the provided values as ground truth

    Args:
        original_grid_values:   2D representation of sudoku grid to try and solve
        stop_at:                if set, the maximum number of solutions to find

    Returns a tuple:
        histories:      is a list[list[tuple]]. Each inner list is an ordered list of (row, col, value) tuples which
                        represent the steps taken by the backtracking process to find a single solution. This ordered
                        list can be used to render an animation showing the backtracking visually.

        solutions:      is a list of solved grids, each represented as a 2D list
    """
    histories = [[]]
    solutions = []
    grid = Grid(original_grid_values)
    rec_get_solutions(grid, 0, 0, histories, solutions, stop_at)
    return histories, solutions


def rec_get_solutions(grid: Grid, row: int, col: int, histories: list[list[tuple]],
                      solutions: list[list[list[int]]], stop_at: int):
    """Recursive helper function for get_solution

    The recursive function will only ever be operating on boxes that were empty to begin with, so no need to keep
    track of the original grid
    """
    row, col = grid.get_next_empty_pos(row, col)

    # If we've passed the end, we've found a solution
    if row is None:
        histories.append([])
        solutions.append(grid.get_grid())
        return

    # Test each possible value
    for val in range(1, grid.n ** 2 + 1):
        grid.fill_number(row, col, val)
        histories[-1].append((row, col, val))
        if grid.check_pos(row, col):
            # If the value seems to work, move on to checking the next cells
            rec_get_solutions(grid, row, col, histories, solutions)
            if stop_at is not None and len(solutions) >= stop_at:
                return

    # If none of the values work, return False so that we move back up in the stack and try another number in a
    # previous cell
    old_num = grid.get_pos(row, col)
    grid.remove_number(row, col)
    histories[-1].append((row, col, -old_num))











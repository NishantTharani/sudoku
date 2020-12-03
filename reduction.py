# This file illustrates the reduction from a latin square problem to a sudoku problem

from main import SudokuGame


# A helper function to compute the suduoku box values when reducing from latin square
def latin_square_reduction_step_two(i, j, n):
    """
    i, j are the zero-indexed co-ordinates of the boxes to compute the value for
    returns the value to fill in the box
    source: http://www-imai.is.s.u-tokyo.ac.jp/~yato/data2/MasterThesis.pdf
    """
    i1 = (i % n) * n
    i2 = i // n
    i3 = i1 + i2 + j
    i4 = i3 % (n * n)
    return i4 + 1


def make_sudoku_from_square(square):
    """
    square is a list of lists representing a 3x3 latin square candidate
    eg [[1, 2, None], [None, 3, 1], [3, None, 2]]
    this function prints the Sudoku problem that the latin square problem reduces to
    """
    print('Making a sudoku from this latin square candidate: ')
    print(square)
    print()
    print()
    grid = [[None for _ in range(9)] for _ in range(9)]
    for i in range(9):
        for j in range(9):
            if i in [0, 1, 2] and j in [0, 3, 6]:
                latin_value = square[i][j // 3]
                if latin_value is not None:
                    grid[i][j] = ((latin_value - 1) * 3) + 1
                else:
                    grid[i][j] = None
            else:
                grid[i][j] = latin_square_reduction_step_two(i, j, 3)
    sudoku = SudokuGame(n=3, grid=grid)
    print("Done. Your sudoku is: ")
    sudoku.print_grid(n=3)


if __name__ == '__main__':
    square = [[1, 2, None], [None, 3, 1], [3, None, 2]]
    make_sudoku_from_square(square)

# Author: Nishant Tharani
# Date: Nov 2020
# Description: a Sudoku player and solution verifier

from copy import deepcopy


class SudokuGame:
    """
    Represents the state of a 3x3 sudoku game.
    Methods allow for the game to be reset (including generation of a new game state), for a client
    to play the game, and for a solution to be verified.
    """

    def __init__(self, n=3, grid=None, original_grid=None):
        """
        Sets up a new sudoku game.

        self._state represents the state of the game: "INCOMPLETE", "INCORRECT", or "CORRECT"
        self._grid is a list of lists that represents the sudoku grid
        self._original_grid is a copy of the starting state of the sudoku grid
        """
        self._grid = self._get_new_grid(n=n) if grid is None else grid
        self._n = n
        self._original_grid = deepcopy(self._grid) if original_grid is None else original_grid
        self._unremovable_entries = [[val is not None for val in row] for row in self._original_grid]
        self._state = ""
        self.update_game_state()

    def reset_game(self, new_board=True, n=3, preference=None):
        """
        Resets the game, either to the original state of the current grid or with a new grid.

        :param new_board: True if a new board should be generated, else False
        :param n: the dimensions of the grid are n^2 by n^2
        """
        if new_board:
            self._grid = self._get_new_grid(n=n, preference=preference)
            self._unremovable_entries = [[val is not None for val in row] for row in self._grid]
            self._n = n
            self._original_grid = self._grid
            self._state = "INCOMPLETE"
        else:
            self._grid = self._original_grid
            self._state = "INCOMPLETE"

    def _get_new_grid(self, n, preference=None):
        """
        Returns a list of lists corresponding to the start of a new sudoku game. The grid is n^2 by n^2
        :param n: the grid dimensions of the grid are n^2 by n^2
        :return: list of lists of ints corresponding to the game state; blank squares are None
        """
        # TODO implement generation of a new grid
        if preference is None or preference == 'CHILDLIKE':
            grid = [[None, 9, 2, 3, 7, 8, 1, 4, 5],
                    [8, None, 5, 4, 2, 9, 6, 7, 3],
                    [7, 3, 4, 5, 6, 1, 2, 9, 8],
                    [5, 7, 3, 1, 9, 6, 8, 2, 4],
                    [9, 4, 6, 8, 3, 2, 5, 1, 7],
                    [1, 2, 8, 7, 4, 5, 9, 3, 6],
                    [4, 6, 9, 2, 5, 7, 3, 8, 1],
                    [3, 5, 1, 9, 8, 4, 7, 6, 2],
                    [2, 8, 7, 6, 1, 3, 4, 5, 9]]
        elif preference == 'EASY':
            grid = [[None, None, None, None, 7, 8, None, None, 5],
                    [None, None, 5, 4, 2, 9, None, None, None],
                    [7, 3, None, None, None, 1, None, 9, None],
                    [None, 7, None, None, None, None, None, 2, None],
                    [9, None, 6, None, None, None, 5, None, 7],
                    [1, 2, None, None, None, 5, 9, 3, 6],
                    [None, 6, 9, None, 5, 7, None, 8, 1],
                    [3, None, 1, 9, None, None, None, 6, None],
                    [2, None, None, 6, 1, None, 4, 5, None]]
        else:
            raise ValueError
        return grid

    def fill_number(self, row, col, num):
        """
        Fills 'num' in the cell corresponding to the indices 'row', 'col' - self._grid[row][col]

        :return: True if successful, else False
        """
        if (row < 0) or (col < 0) or (row >= self._n ** 2) or (col >= self._n ** 2):
            return False
        elif self._grid[row][col] is not None:
            removal_attempt = self.remove_number(row, col)
            if not removal_attempt:
                return False
        self._grid[row][col] = num
        self.update_game_state()
        return True

    def get_grid(self):
        return self._grid

    def get_n(self):
        return self._n

    def remove_number(self, row, col):
        """
        Removes the number filled in at self._grid[row][col]

        :return: True if successful, including if there was no number to remove; False if unsuccessful
        """
        if (row < 0) or (col < 0) or (row >= self._n ** 2) or (col >= self._n ** 2):
            return False
        elif self._unremovable_entries[row][col]:
            return False
        else:
            self._grid[row][col] = None
            self.update_game_state()
            return True

    def print_grid(self, n=3):
        """
        Prints a representation of the game grid to the console.
        Row 0 is printed at the top and Column 0 at the left.
        """

        def print_divider(n):
            if n == 3:
                print('  +' + '-' * 7 + '+' + '-' * 7 + '+' + '-' * 7 + '+  ')

        def print_col_headers(n):
            if n == 3:
                print(' ' * 4, end='')
                for box_num in range(n):
                    for cell_num in range(box_num * n, (box_num + 1) * n):
                        print(str(cell_num) + ' ', end='')
                    print('  ', end='')
                print()

        def print_row(idx, row):
            print(str(idx) + ' | ', end='')
            for box_num in range(n):
                for cell_num in range(box_num * n, (box_num + 1) * n):
                    val = str(row[cell_num]) if row[cell_num] is not None else '_'
                    print(val + ' ', end='')
                print('| ', end='')
            # print(str(idx), end='')
            print()

        print()
        print_col_headers(n)
        for idx, row in enumerate(self._grid):
            if idx in [n * i for i in range(n)]:
                print_divider(n)
            print_row(idx, row)
        print_divider(n)
        # print_col_headers(n)
        print()

    def update_game_state(self):
        """
        Updates self._state to the correct value given the current game state:
            'INCOMPLETE'
            'INCORRECT'
            'CORRECT'
        """
        n = self._n

        if any([None in l for l in self._grid]):
            self._state = 'INCOMPLETE'
            return

        # Now check the solution. First check that all the original numbers are the same
        for row_idx in range(len(self._grid)):
            for col_idx in range(len(self._grid[0])):
                if self._original_grid[row_idx][col_idx] is not None and self._grid[row_idx][col_idx] != \
                        self._original_grid[row_idx][col_idx]:
                    self._state = 'INCORRECT'
                    return

        # A helper method to check that a list of n^2 numbers is a valid sudoku line/column/minibox
        # Runs in O(n^2)
        def check_group(nums):
            if len(nums) != n ** 2:
                return False
            counters = [0] * 9
            for num in nums:
                if num < 1 or num > n ** 2:
                    return False
                counters[num - 1] += 1
            for c in counters:
                if c != 1:
                    return False
            return True

        # Pass each row, column, and minibox to the check_group subroutine

        # There are n^2 rows in total, so the overall runtime of this is O(n^4)
        for row in self._grid:
            is_correct = check_group(row)
            if not is_correct:
                self._state = 'INCORRECT'
                return

        # There are n^2 columns in total, and each column takes Theta(n^2) to build
        # So the overall runtime of this is Theta(n^4)
        for col_idx in range(n ** 2):
            col = []
            for row_idx in range(n ** 2):
                col.append(self._grid[row_idx][col_idx])
            is_correct = check_group(col)
            if not is_correct:
                self._state = 'INCORRECT'
                return

        # There are n^2 miniboxes in total, and each one takes Theta(n^2) to build
        # So the overall runtime of this is Theta(n^4)
        for row_idx in [n * i for i in range(n)]:
            for col_idx in [n * i for i in range(n)]:
                mini_box = []
                for i in range(n):
                    for j in range(n):
                        mini_box.append(self._grid[row_idx + i][col_idx + j])
                is_correct = check_group(mini_box)
                if not is_correct:
                    self._state = 'INCORRECT'
                    return

        # If we make it here, the grid is solved, congratulations!
        self._state = 'CORRECT'
        return

    def get_game_state(self):
        """
        Returns 'INCOMPLETE', 'INCORRECT', or 'CORRECT'
        """
        return self._state

    def get_original_grid(self):
        return self._original_grid

    def get_val_at(self, row, col):
        if (row < 0) or (col < 0) or (row >= self._n ** 2) or (col >= self._n ** 2):
            return None
        return self._grid[row][col]


class SudokuClient:
    """
    Provides a console text-based interface to the methods of SudokuGame
    """

    def __init__(self):
        self.game = SudokuGame()
        self.input = -1

    def play(self):
        while self.input != 0:
            self.update_input()
            if self.input == 1:
                valid_inputs = [0, 1, 2, 3, 4, 5, 6, 7, 8]
                row_idx = self.get_valid_user_input(valid_inputs,
                                                    "Sorry, that's not a valid row index",
                                                    "Please enter the row index of the grid entry to fill in [0-8]: ")
                col_idx = self.get_valid_user_input(valid_inputs,
                                                    "Sorry, that's not a valid col index",
                                                    "Please enter the col index of the grid entry to fill in [0-8]: ")
                valid_inputs = list(range(1, 10))
                num = self.get_valid_user_input(valid_inputs,
                                                "Sorry, that's not a valid number - please choose from 1-9",
                                                "Please enter the number to fill in [1-9]: ")
                success = self.game.fill_number(row_idx, col_idx, num)
                if not success:
                    print("You can't do that - maybe there's a number there which was part of the original setup")
            elif self.input == 2:
                valid_inputs = [0, 1, 2, 3, 4, 5, 6, 7, 8]
                row_idx = self.get_valid_user_input(valid_inputs,
                                                    "Sorry, that's not a valid row index",
                                                    "Please enter the row index of the grid entry to remove [0-8]: ")
                col_idx = self.get_valid_user_input(valid_inputs,
                                                    "Sorry, that's not a valid col index",
                                                    "Please enter the col index of the grid entry to remove [0-8]: ")
                success = self.game.remove_number(row_idx, col_idx)
                if not success:
                    print("You can't do that - maybe that grid entry is part of the original setup")

        print("Thank you for playing - goodbye!")

    def get_valid_user_input(self, valid_inputs: list, error_msg: str, input_prompt: str):
        """
        valid_inputs is a list of valid options - CANNOT include 'None'
        error_msg is printed if an invalid option is entered
        returns the final input
        """
        next_input = None
        while next_input not in valid_inputs:
            try:
                next_input = int(input(input_prompt))
                if next_input not in valid_inputs:
                    print(error_msg)
            except ValueError:
                print(error_msg)
        print()
        return next_input

    def update_input(self):
        self.game.print_grid()
        state = self.game.get_game_state()
        if state == 'INCOMPLETE':
            print("The game is not yet complete. Please select from the following options:")
        elif state == 'INCORRECT':
            print("Looks like you've filled in the grid...but it's not quite right\n"
                  "Please select from the following options:")
        elif state == 'CORRECT':
            print("Congratulations, you've solved the puzzle!\n"
                  "Select '0' to quit, unless you want to remove numbers and...fill them in again...for fun")
        print()
        print("0 - Quit\n"
              "1 - Fill in a number\n")
        print()

        valid_inputs = [0, 1]
        input_prompt = "Please select a menu option [0, 1]: "
        error_msg = "Sorry, not a valid option"
        next_input = self.get_valid_user_input(valid_inputs, error_msg, input_prompt)
        self.input = next_input


if __name__ == '__main__':
    game = SudokuClient()
    game.play()

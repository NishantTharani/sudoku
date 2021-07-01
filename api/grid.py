# Author: Nishant Tharani
# Description: data model for a sudoku grid with some useful helper functions

import math
import random


class Grid:
    def __init__(self, grid: list[list[int]]):
        height = len(grid)

        if height < 1:
            raise ValueError

        width = len(grid[0])

        if height != width:
            raise ValueError

        n = math.isqrt(height)

        if n ** 2 != height:
            raise ValueError

        self._grid = grid
        self.n = n

    def check_group(self, nums: list[int]):
        """
        # A helper method to check that a list of n^2 numbers is a valid sudoku line/column/minibox
        # Runs in O(n^2)
        # Ignores empty boxes
        """
        if len(nums) != self.n ** 2:
            return False
        counters = [0] * 9
        for num in nums:
            if num is None:
                continue
            elif num < 1 or num > self.n ** 2:
                return False
            counters[num - 1] += 1
        for c in counters:
            if c != 1 and c != 0:
                return False
        return True

    def check_pos(self, row_idx, col_idx):
        """
        Checks whether the value entered at row, col breaks any rules or not
        """
        if self._grid[row_idx][col_idx] is None:
            return True

        row = self.get_row(row_idx)
        col = self.get_col(col_idx)
        segment = self.get_segment(row_idx, col_idx)
        row_check = self.check_group(row)
        col_check = self.check_group(col)
        seg_check = self.check_group(segment)
        return row_check and col_check and seg_check

    def check_solution(self) -> bool:
        """A helper method to check that a list of n^2 numbers is a valid sudoku line/column/minibox

        Runs in O(n^2)
        """
        # Pass each row, column, and minibox to the check_group subroutine
        # There are n^2 rows in total, so the overall runtime of this is O(n^4)
        for row in self._grid:
            is_correct = self.check_group(row)
            if not is_correct:
                return False

        # There are n^2 columns in total, and each column takes Theta(n^2) to build
        # So the overall runtime of this is O(n^4)
        for col_idx in range(self.n ** 2):
            col = []
            for row_idx in range(self.n ** 2):
                col.append(self._grid[row_idx][col_idx])
            is_correct = self.check_group(col)
            if not is_correct:
                return False

        # There are n^2 miniboxes in total, and each one takes Theta(n^2) to build
        # So the overall runtime of this is O(n^4)
        for row_idx in [self.n * i for i in range(self.n)]:
            for col_idx in [self.n * i for i in range(self.n)]:
                mini_box = []
                for i in range(self.n):
                    for j in range(self.n):
                        mini_box.append(self._grid[row_idx + i][col_idx + j])
                is_correct = self.check_group(mini_box)
                if not is_correct:
                    return False

        # If we make it here, the grid is solved, congratulations!
        return True

    def fill_number(self, row, col, num):
        """
        Fills 'num' in the cell corresponding to the indices 'row', 'col' - self._grid[row][col]

        :return: True if successful, else False
        """
        if (row < 0) or (col < 0) or (row >= self.n ** 2) or (col >= self.n ** 2):
            raise ValueError
        self._grid[row][col] = num

    def fill_random_number(self, row, col):
        """Fills a random number into the grid, making sure that it doesn't break any of the rules
        """
        nums = list(range(1, (self.n ** 2) + 1))
        random.shuffle(nums)

        for num in nums:
            self.fill_number(row, col, num)
            if self.check_pos(row, col):
                return

    def get_grid(self):
        return self._grid

    def get_next_empty_pos(self, row: int, col: int):
        """
        Returns the co-ordinates of the next box that is empty, starting from (row,col),
         or None,None if that crosses the end of the puzzle
        """
        while self._grid[row][col] is not None:
            row, col = self.get_next_pos(row, col)
            if row is None:
                return None, None
        return row, col

    def get_next_pos(self, row: int, col: int):
        """
        Returns the (row, col) tuple for the next co-ordinate in row-major order, or None if we're at the end
        """
        if col < self.n ** 2 - 1:
            return row, col + 1

        if row < self.n ** 2 - 1:
            return row + 1, 0

        return None, None

    def get_prev_pos(self, row, col):
        if col > 0:
            return row, col - 1

        if row > 0:
            return row - 1, col

        return None, None

    def get_pos(self, row: int, col: int) -> int:
        return self._grid[row][col]

    def get_row(self, row):
        """
        Returns an array corresponding to the row at index 'row'
        """
        return self._grid[row]

    def get_col(self, col):
        """
        Returns an array corresponding to the column at index 'col'
        """
        nums = []
        for row_idx in range(self.n ** 2):
            nums.append(self._grid[row_idx][col])
        return nums

    def get_segment(self, row_idx, col_idx):
        """
        Returns an array corresponding to the segment that the value at (row_idx, col_idx) belongs to
        """
        row_idx = (row_idx // self.n) * self.n
        col_idx = (col_idx // self.n) * self.n
        mini_box = []
        for i in range(self.n):
            for j in range(self.n):
                mini_box.append(self._grid[row_idx + i][col_idx + j])
        return mini_box

    def remove_number(self, row: int, col: int) -> int:
        if (row < 0) or (col < 0) or (row >= self.n ** 2) or (col >= self.n ** 2):
            raise ValueError

        num = self._grid[row][col]
        self._grid[row][col] = 0
        return num

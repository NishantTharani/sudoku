# Author: Nishant Tharani
# Description: API for generating/playing/solving a sudoku game


from flask import Flask, jsonify, request
import time
from . import sudoku

app = Flask(__name__)


@app.route('/api/test_puzzle', methods=['GET'])
def get_test_puzzle():
    grid = [[0, 3, 5, 2, 6, 9, 7, 8, 1],
            [6, 8, 2, 5, 7, 1, 4, 9, 3],
            [1, 9, 7, 8, 3, 4, 5, 6, 2],
            [8, 2, 6, 1, 9, 5, 3, 4, 7],
            [3, 7, 4, 6, 8, 2, 9, 1, 5],
            [9, 5, 1, 7, 4, 3, 6, 2, 8],
            [5, 1, 9, 3, 2, 6, 8, 7, 4],
            [2, 4, 8, 9, 5, 7, 1, 3, 6],
            [7, 6, 3, 4, 1, 8, 2, 5, 9]]
    out = {'grid': grid, 'n': 3}
    return jsonify(out)


@app.route('/api/new_puzzle', methods=['GET'])
def get_new_puzzle():
    grid = sudoku.generate_new_puzzle()
    # grid = [[0] * 9] * 9
    out = {'grid': grid, 'n': 3}
    return jsonify(out)


@app.route('/api/check_puzzle', methods=['POST'])
def check_puzzle():
    grid = request.json['grid']
    status = sudoku.check_grid(grid)
    out = {'status': status}
    return jsonify(out)


@app.route('/api/time', methods=['GET'])
def get_time():
    return "100"

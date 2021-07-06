# Author: Nishant Tharani
# Description: API for generating/playing/solving a sudoku game


from flask import Flask, jsonify
import time
from api import sudoku

app = Flask(__name__)


@app.route('/api/new_puzzle', methods=['GET'])
def get_new_puzzle():
    grid = sudoku.generate_new_puzzle()
    # grid = [[0] * 9] * 9
    out = {'grid': grid, 'n': 3}
    return jsonify(out)


@app.route('/api/time', methods=['GET'])
def get_time():
    return "100"

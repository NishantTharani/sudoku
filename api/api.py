# Author: Nishant Tharani
# Description: API for generating/playing/solving a sudoku game


from flask import Flask
import time
import sudoku

app = Flask(__name__)


@app.route('/api/new_puzzle', methods=['GET'])
def get_new_puzzle():

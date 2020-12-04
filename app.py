from flask import Flask, render_template, g, session
from flask import request as req
import os
import urllib
from main import SudokuGame

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


@app.route('/')
def index():
    if 'game' not in session:
        session.game = SudokuGame()
    grid = session.game.get_grid()
    n = session.game.get_n()
    return render_template('sudoku.html', grid=grid, n=n)


if __name__ == '__main__':
    app.run(debug=True)

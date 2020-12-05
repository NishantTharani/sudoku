from flask import Flask, render_template, g, session
from flask import request as req
import os
import urllib
from main import SudokuGame

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


@app.route('/')
def index():
    if 'grid' not in session:
        game = SudokuGame()
        session['grid'] = game.get_grid()
        session['original_grid'] = game.get_original_grid()
        session['n'] = game.get_n()
    else:
        game = SudokuGame(session['n'], session['grid'], session['original_grid'])
    return render_template('sudoku.html',
                           grid=game.get_grid(),
                           original_grid=game.get_original_grid(),
                           n=game.get_n(),
                           game_status=game.get_game_state())


@app.route('/_keypress', methods=['POST'])
def keypress():
    data = req.get_json()
    game = SudokuGame(session['n'], session['grid'], session['original_grid'])
    row = int(data['row'])
    col = int(data['col'])
    key = data['key']
    if key not in ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'BACKSPACE']:
        return {
            'result': 'invalidKey'
        }
    if key == 'BACKSPACE':
        game.remove_number(row, col)
    else:
        game.fill_number(row, col, int(key))
    session['grid'] = game.get_grid()
    session['original_grid'] = game.get_original_grid()
    session['n'] = game.get_n()
    stateHTML = render_template('snippets/gamestatus.html', game_status=game.get_game_state())
    return {
        'result': 'success',
        'newVal': game.get_val_at(row, col),
        'row': row,
        'col': col,
        'stateHTML': stateHTML
    }

    if __name__ == '__main__':
        app.run(debug=True)

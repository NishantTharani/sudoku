from flask import Flask, render_template, g
from flask import request as req
import os
import urllib

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('sudoku.html')


if __name__ == '__main__':
    app.run(debug=True)

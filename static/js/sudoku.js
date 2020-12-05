$('.openSudokuCell').on('click', (event) => {
    console.log($(event.target).attr("class"));
    $('.activeSudokuCell').removeClass('activeSudokuCell');
    $(event.target).addClass('activeSudokuCell');
    console.log('hi');
});

// $('body').on('keypress', handler = keyHandler);

$('body').on('keydown', handler = keyHandler);

function keyHandlerTemplate(url, event) {
    let cell = $('.activeSudokuCell');
    let row = cell.data('row');
    let col = cell.data('col');
    let key = String.fromCharCode(event.which);
    if (event.which === 8) {
        key = 'BACKSPACE';
    }
    console.log(key);
    if (cell.length) {
        $.ajax(url, {
            contentType: "application/json",
            data: JSON.stringify({
                'row': row,
                'col': col,
                'key': key
            }),
            type: 'POST',
            success: function (data) {
                if (data.result === 'success') {
                    console.log('success');
                    let cellToUpdate = $(".sudokuCell[data-row=" + data.row + "][data-col=" + data.col + "]")[0]
                    cellToUpdate.textContent = data.newVal;
                    $('.gameStatus').html(data.stateHTML);
                }
            }
        })
    }
}


'use strict';

$(function () {
    let timerInterval;
    let minutesInterval;
    newGame();
    function timer() {
        minutesInterval = $('.time-minute')[0].innerHTML * 60;
        timerInterval = setInterval(() => {
            if (minutesInterval <= 0) {
                $('.modal-btn__close').on('click', function () {
                    location.reload();
                })
                clearTime();
                $('.modal-container').addClass('index');
                $('.modal-text')[0].innerHTML = `<span id="text">It's a pity, but you lost</span>`;
            } else {
                minutesInterval--;
                const minutes = Math.floor(minutesInterval / 60);
                let seconds = minutesInterval % 60;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                $('.time-minute').each(function (ind, elem) {
                    elem.innerHTML = 0 + `0`;
                })
                $('.time-second').each(function (ind, elem) {
                    elem.innerHTML = `${seconds}`;
                })
            }
        }, 1000)
    }
    function newGame() {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        array.sort(function (a, b) { return 0.5 - Math.random() });
        $('#start').html('');
        for (let i = 0; i < array.length; i++) {
            $("#start").append(`<div value='${array[i]}' class='box-puzzle puzzle${array[i]}'></div>`);
        }
        clearTime();
        $('.btn-start')[0].disabled = false;
        $('.btn-check')[0].disabled = true;
        $('.btn-check').addClass('filter');
        $('.btn-start').removeClass('filter');
    }
    function clearTime() {
        $('.time-minute')[0].innerHTML = '01';
        $('.time-second')[0].innerHTML = '00'
        clearInterval(timerInterval);
    }

    $('.btn-start').on('click', function () {
        $('.btn-start')[0].disabled = true;
        $('.btn-check')[0].disabled = false;
        $('.btn-check').removeClass('filter');
        $('.btn-start').addClass('filter');
        timer();
    });
    $('.btn-refresh').on('click', function () {
        location.reload()
        $('.btn-start')[0].disabled = true;
        $('.btn-start').addClass('filter');
        newGame();
    })
    $('.btn-check').on('click', function () {
        $('.modal-container').addClass('index');
    })
    $('.modal-btn__close').on('click', function () {
        $('.modal-container').removeClass('index');
    })
    $('.modal-btn__check').on('click', function () {
        let countRight = 0;
        $("#end > .box-puzzle2").each((index, elem) => {
            if ((index + 1) == elem.attributes.value.textContent) {
                countRight = countRight + 1;
            }
            if (countRight == 16) {
                clearTime();
                $('.modal-btn__check').hide();
                $('.modal-text')[0].innerHTML = `<span id="text">Woohoo, well done, you did it</span>`;
            }
        });
        if (countRight < 16) {
            clearTime();
            $('.modal-btn__check').hide()
            $('.modal-text')[0].innerHTML = `<span id="text">It's a pity, but you lost</span>`;
        }
        $('.modal-btn__close').on('click', function () {
            location.reload();
        })
    })
    $(".box-puzzle").draggable({
        zIndex: 6,
        grid: [80, 80],
        start: function (event, ui) {
            if (minutesInterval == undefined) {
                timer();
                $('.btn-check')[0].disabled = false;
                $('.btn-check').removeClass('filter');
                $('.btn-start')[0].disabled = true;
                $('.btn-start').addClass('filter');
            }
            console.log('start', event, ui);
        }
    })
    $('.box-puzzle2').droppable({
        drop: function (e, ui) {
            let m = $(ui.draggable).attr("value");
            console.log();
            console.log(m)
            $(this).attr("value", m)
            console.log(this)
        }
    })
})


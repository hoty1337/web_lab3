$(function() {
    const X_VALUES = [-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0];
    const Y_MIN = -3, Y_MAX = 3;
    const R_MIN = 0.1, R_MAX = 3.0;

    let xCoord = -5;
    let yCoord = 0;
    let rCoord = 1;
    let info = $('.info');
    let cnvs = document.getElementById('graph');
    let cnvsPts = $('#graph_points')
    let ctx = cnvs.getContext('2d');
    const h = 300, w = 300, xMax = 120, yMax = 120, gapSize = 5;
    cnvs.height = cnvs.width;

    function drawCanvas() {
        ctx.lineWidth = 2;
        ctx.moveTo(h / 2, 0);
        ctx.lineTo(h / 2, w);
        ctx.stroke();
        ctx.moveTo(0, w / 2);
        ctx.lineTo(h, w / 2);
        ctx.stroke();
        ctx.fillStyle = 'rgb(51,153,255)';
        ctx.fillRect(h / 2 - xMax / 2, w / 2 - yMax, xMax / 2, yMax);
        ctx.strokeRect(h / 2 - xMax / 2, w / 2 - yMax, xMax / 2, yMax);

        ctx.beginPath();
        ctx.moveTo(h / 2, w / 2 + yMax / 2);
        ctx.lineTo(h / 2 + xMax / 2, w / 2);
        ctx.lineTo(h / 2, w / 2);
        ctx.lineTo(h / 2, w / 2 + yMax / 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = 'rgb(51,153,255)';
        ctx.fill();

        ctx.moveTo(h / 2, w / 2);
        ctx.arc(h / 2, w / 2, xMax / 2, Math.PI, Math.PI * 0.5, 1);
        ctx.fillStyle = 'rgb(51,153,255)';
        ctx.fill();
        ctx.lineTo(h / 2, w / 2);
        ctx.stroke();

        ctx.font = "14px Calibri";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.moveTo(h / 2 + xMax / 2, w / 2 - gapSize);
        ctx.lineTo(h / 2 + xMax / 2, w / 2 + gapSize);
        ctx.stroke();
        ctx.fillText("R/2", h / 2 + xMax / 2, w / 2 - gapSize * 2);
        ctx.moveTo(h / 2 + xMax, w / 2 - gapSize);
        ctx.lineTo(h / 2 + xMax, w / 2 + gapSize);
        ctx.stroke();
        ctx.fillText("R", h / 2 + xMax, w / 2 - gapSize * 2);
        ctx.moveTo(h / 2 - xMax / 2, w / 2 - gapSize);
        ctx.lineTo(h / 2 - xMax / 2, w / 2 + gapSize);
        ctx.stroke();
        ctx.fillText("-R/2", h / 2 - xMax / 2, w / 2 - gapSize * 2);
        ctx.moveTo(h / 2 - xMax, w / 2 - gapSize);
        ctx.lineTo(h / 2 - xMax, w / 2 + gapSize);
        ctx.stroke();
        ctx.fillText("-R", h / 2 - xMax, w / 2 - gapSize * 2);

        ctx.textAlign = "left";
        ctx.moveTo(h / 2 - gapSize, w / 2 - yMax);
        ctx.lineTo(h / 2 + gapSize, w / 2 - yMax);
        ctx.stroke();
        ctx.fillText("R", h / 2 + gapSize * 2, w / 2 - yMax);
        ctx.moveTo(h / 2 - gapSize, w / 2 - yMax / 2);
        ctx.lineTo(h / 2 + gapSize, w / 2 - yMax / 2);
        ctx.stroke();
        ctx.fillText("R/2", h / 2 + gapSize * 2, w / 2 - yMax / 2);
        ctx.moveTo(h / 2 - gapSize, w / 2 + yMax / 2);
        ctx.lineTo(h / 2 + gapSize, w / 2 + yMax / 2);
        ctx.stroke();
        ctx.fillText("-R/2", h / 2 + gapSize * 2, w / 2 + yMax / 2);
        ctx.moveTo(h / 2 - gapSize, w / 2 + yMax);
        ctx.lineTo(h / 2 + gapSize, w / 2 + yMax);
        ctx.stroke();
        ctx.fillText("-R", h / 2 + gapSize * 2, w / 2 + yMax);
    }
    drawCanvas();

    function convertX(xTemp, rTemp) {
        return h / 2 + xTemp * (xMax / rTemp);
    }

    function convertY(yTemp, rTemp) {
        return w / 2 + -yTemp * (yMax / rTemp);
    }

    function drawDotOnGraph(tx, ty, tr, hit) {
        if(isNaN(tx) || isNaN(ty) || isNaN(tr)) return;
        console.log("x=" + tx);
        console.log("y=" + ty);
        let xx = convertX(tx, tr);
        let yy = convertY(ty, tr);
        ctx.fillStyle = hit.includes('Попадание') ? 'lime' : 'red';
        ctx.fillRect(xx - 1, yy - 1, 5, 5);
    }

    function loadTablePoints() {
        let rows = [];
        let headers = $(".ui-datatable th span");

        $(".ui-datatable tr").each(function(index) {
            let cells = $(this).find("td");
            rows[index] = {};
            cells.each(function(cellIndex) {
                rows[index][$(headers[cellIndex]).html()] = $(this).html().replace(/\s/g, "");
            });
        });

        for (let i = 0; i < rows.length; i++) {
            drawDotOnGraph(
                rows[i]['X'],
                rows[i]['Y'],
                rows[i]['R'],
                rows[i]['Результат']);
        }
    }
    loadTablePoints();

    function getMousePosition(e) {
        const rect = cnvs.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return {x: x, y: y};
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function validateX() {
        xCoord = $('input[name="j_idt9:j_idt11"]:checked').val();

        if (isNumeric(xCoord) && X_VALUES.includes(parseFloat(xCoord))) {
            info.text('Введите координаты точки')
            return true;
        } else {
            info.text('Выберите значение X!')
            return false;
        }
    }

    function validateY() {
        yCoord = $('.inputY').val();

        if (isNumeric(yCoord) && yCoord >= Y_MIN && yCoord <= Y_MAX) {
            info.text('Введите координаты точки')
            return true;
        } else {
            info.text(`Введите значение Y от ${Y_MIN} до ${Y_MAX}!`)
            return false;
        }
    }

    function validateR() {
        rCoord = $('.ui-spinner-input').val().replace(',', '.');
        if (isNumeric(rCoord) && rCoord >= R_MIN && rCoord <= R_MAX) {
            info.text('Введите координаты точки')
            return true;
        } else {
            info.text('Выберите значение R! (' + rCoord + ')');
            return false;
        }
    }

    function checkHit(x, y, r) {
        return (x<=0 && y>=0 && x>=-r/2 && y<=r) || (x<=0 && y<=0 && (x*x + y*y <= r*r/4)) || (x>=0 && y<=0 && (x-y<r/2));
    }

    function validateForm() {
        return validateX() && validateY() && validateR();
    }

    $('.submitButton').on('click', () => {
        validateForm();
        drawDotOnGraph(xCoord, yCoord, rCoord, checkHit(xCoord, yCoord, rCoord) ? 'Попадание' : 'Промах');
    });

    cnvs.addEventListener('click', (event) => {
        if (validateR()) {
            const x = getMousePosition(event).x;
            const y = getMousePosition(event).y;
            rCoord = $('.ui-spinner-input').val().replace(',', '.');

            let trueX = Math.round((x - h / 2) * rCoord / xMax * 1000) / 1000;
            let trueY = Math.round((y - w / 2) * -rCoord / yMax * 1000) / 1000;

            let minDiff = Infinity;
            let nearestX;
            for (let i = 0; i < X_VALUES.length; i++) {
                if (Math.abs(trueX - X_VALUES[i]) < minDiff) {
                    minDiff = Math.abs(trueX - X_VALUES[i]);
                    nearestX = X_VALUES[i];
                }
            }

            if (trueY < Y_MIN) {
                trueY = Y_MIN;
            } else if (trueY > Y_MAX) {
                trueY = Y_MAX;
            }
            drawDotOnGraph(nearestX, trueY, rCoord, checkHit(nearestX, trueY, rCoord) ? 'Попадание' : 'Промах');
            let xSelect = $('input[type="radio"][value="' + nearestX + '"]');
            $('input[name="j_idt9:j_idt11"]:checked').prop('checked', false);
            xSelect.prop('checked', true);
            $('.inputY').val(trueY.toString().substring(0, 10));
            $('.submitButton')[0].click();
        }
    });
});
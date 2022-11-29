displayTimer();

function displayTimer() {
    let refreshTime = 7000;
    let x = new Date();
    document.getElementById('time').innerHTML = x.toUTCString();
    setTimeout('displayTimer()', refreshTime);
}
const status_log = [];
const status_queue = [];
const status_div = document.getElementById('status');
const status_icon = document.getElementById('status-icon');
let status_timer = setInterval(status_update, 3000);
let status_fade_timer;

function status_add(text) {
    status_log.unshift('Day ' + day + ': ' + text);
    if (status_log.length > 100) status_log.shift();

    status_queue.push(text);
    if (status_queue.length > 100) status_queue.pop();
}

function status_update() {
    let text = status_queue.shift();
    if (text == undefined) text = '';
    status_div.innerText = text;
    status_icon.innerText = (status_queue.length == 0) ? '>' : status_queue.length;
    status_fade_timer = setTimeout(status_fade_out, 2000);
}

function status_fade_out() {
    status_div.className = 'text left fade';
    status_fade_timer = setTimeout(status_fade_in, 1000);
}

function status_fade_in() {
    status_div.className = 'text left';
}

function status_reset_timer() {
    clearInterval(status_timer);
    clearTimeout(status_fade_timer);
    status_timer = setInterval(status_update, 3000);
    status_update();
}


function openStatusLog() {
    popup_immediate(popup_create_list('Messages', status_log));
}
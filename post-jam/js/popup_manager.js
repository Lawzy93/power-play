const popup_div = document.getElementById('popup');
const popup_title = document.getElementById('popup-title');
const popup_content = document.getElementById('popup-content');
const popup_elements = [];
const popup_action_resolve = document.getElementById('popup-action-resolve');
const popup_action_reject = document.getElementById('popup-action-reject');
const popup_queue = [];
let popup_next = false;
let popup_queue_promise;

function popup_create(title, elements, resolve_text, reject_text, resolve, reject) {
    let popup = {
        title: title,
        elements: elements,
        resolve_text: resolve_text,
        reject_text: reject_text,
        resolve: resolve,
        reject: reject,
    }
    return popup;
}

function popup_create_input(title, query, prompt, resolve) {
    let popup = {
        title: title,
        elements: [{type: 'text', value: query}, {type: 'input', value: prompt}],
        resolve_text: 'Confirm',
        reject_text: 'Cancel',
        resolve: resolve,
        reject: function () {},
    }
    return popup;
}

function popup_create_list(title, items) {
    let popup = {
        title: title,
        elements: [],
        resolve_text: 'Close',
        reject_text: undefined,
        resolve: function () {},
        reject: function () {},
    }

    for (let i = 0; i < items.length; i++) {
        popup.elements.push({type: 'text', value: items[i]});
    }
    return popup;
}

function popup_enqueue(popup) {
    popup_queue.push(popup);
}

function popup_immediate(popup) {
    popup_queue.unshift(popup);
    popup_open(popup);
}

function popup_queue_start() {
    let finished;
    
    popup_queue_promise = new Promise((resolve, reject) => {
        if (popup_queue.length > 0) {
            popup_queue_next();
        } else {
            resolve();
        }

        finished = resolve;
    });

    popup_queue_promise.finish = finished;

    return popup_queue_promise;
}

function popup_queue_next() {
    popup_open(popup_queue[0]);
    popup_next = (popup_queue.length > 1) ? true : false;
}

function popup_resolve() {
    popup_div.style = 'display: none;';
    popup_queue[0].resolve();
    popup_queue.shift();
    if (popup_next) {
        popup_queue_next();
    } else {
        popup_queue_promise.finish();
    }
}

function popup_reject() {
    popup_div.style = 'display: none;';
    popup_queue[0].reject();
    popup_queue.shift();
    if (popup_next) {
        popup_queue_next();
    } else {
        popup_queue_promise.finish();
    }
}

function popup_open(popup) {
    popup_title.innerText = popup.title;
    popup_content.innerHTML = '';
    popup_elements.length = 0;

    for (let i = 0; i < popup.elements.length; i++) {
        let element = undefined;
        
        if (popup.elements[i].type == 'text') {
            element = element_text(popup.elements[i]);
        } else if (popup.elements[i].type == 'input') {
            element = element_input(popup.elements[i]);
        }

        popup_content.appendChild(element);
        popup_elements[i] = element;
    }

    if (popup.resolve_text == undefined) {
        popup_action_resolve.style = 'display: none;';
    } else {
        popup_action_resolve.innerText = popup.resolve_text;
        popup_action_resolve.style = 'display: inline-block;';
    }

    if (popup.reject_text == undefined) {
        popup_action_reject.style = 'display: none;';
    } else {
        popup_action_reject.innerText = popup.reject_text;
        popup_action_reject.style = 'display: inline-block;';
    }

    popup_div.style = 'display: block;';
}

function element_text(element) {
    let e = document.createElement('div');
    e.innerText = element.value;

    return e;
}

function element_input(element) {
    let e = document.createElement('input');
    e.type = 'text';
    e.defaultValue = element.value;

    return e;
}
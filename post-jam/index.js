const kingdom = new Kingdom();
const used_ids = {};
const player = new Player(getId(), kingdom);
player.setJob('Slave');

const cx = document.getElementById('canvas').getContext('2d');
const menu_d = document.getElementById('day');
const menu_h = document.getElementById('health');
const menu_$ = document.getElementById('money');
const menu_j = document.getElementById('job');
const menu_n = document.getElementById('name');
const panel_a0 = document.getElementById('action0_text');
const panel_a1 = document.getElementById('action1_text');
const panel_a2 = document.getElementById('action2_text');
const panel_ea = document.getElementById('extra-actions');
let open_level = player.location;
let day = 0;

function getId() {
    let id = '';
    let found = false;
    do {
        id = Math.floor(Math.random() * 1000000).toString();
        if (used_ids[id] != true) {
            found = true;
        }
    } while (!found);
    used_ids[id] = true;
    return id;
}

window.onload = () => {
    ai_init();
    loadMenu();
    loadMap(open_level);
}


function loadMenu() {
    menu_d.innerText = day;
    menu_h.innerText = player.health;
    menu_$.innerText = player.money;
    menu_j.innerText = player.job;
    menu_n.innerText = player.name;

    panel_a0.innerText = player.day_actions[0];
    panel_a1.innerText = player.day_actions[1];
    panel_a2.innerText = player.day_actions[2];

    panel_ea.innerHTML = '';
    for (let i = 0; i < player.actions_queue.length; i++) {
        let e = document.createElement('label');
        e.className = 'game-panel-select'

        let e_i = document.createElement('input');
        e_i.type = 'checkbox';
        e_i.name = 'extra-action';
        e_i.value = player.actions_queue[i];
        
        let e_d = document.createElement('div');
        e_d.innerText = ea_name(player.actions_queue[i]);

        e.appendChild(e_i);
        e.appendChild(e_d);
        
        panel_ea.appendChild(e);
    }
}

function loadMap(level) {
    open_level = level;
    //upgrade kingdom and town to draw a build-up of its elements
    for(let i = 0; i < 16; i++) {
        document.getElementById(i).onclick = null;
        if (level.map[i] != undefined) {
            draw_tile(level.map[i].sprite, i);
            if (level.map[i].type != 'building') {
                document.getElementById(i).onclick = (e) => {
                    loadMap(open_level.map[e.srcElement.id]);
                }
            }
        } else {
            draw_tile(img_empty, i);
        }
    }

    if (level.king != undefined) {
        draw_person(level.king, 'r');
    } else if (level.lord != undefined) {
        draw_person(level.lord, 'r');
    } else if (level.owner != undefined) {
        draw_person(level.owner, 'r');
    }

    if (level.manager != undefined) {
        draw_person(level.manager, 'r');
    }

    if (level.workers != undefined && level.slaves != undefined) {
        for (let i = 0; i < level.workers.length; i++) {
            draw_person(level.workers[i], 'r')
        }

        for (let i = 0; i < level.slaves.length; i++) {
            draw_person(level.slaves[i], 'r')
        }
    }

    for(let i = 0; i < 16; i++) {
        if (level.map[i] != undefined) {
            if (level.map[i].lord != undefined) {
                draw_person(level.map[i].lord, i);
            } else if (level.map[i].owner != undefined) {
                draw_person(level.map[i].owner, i);
            }
            if (level.map[i].manager != undefined) {
                draw_person(level.map[i].manager, i);
            }
        } 
    }
}

function goUpLevel() {
    if (open_level.parent != undefined) {
        loadMap(open_level.parent);
    }
}

function openInfluence() {
    let elements = [];
    
    switch (player.job) {
        case 'Slave':
        case 'Worker':
        case 'Manager':
            if (player.location.owner != undefined && player.location.owner != player) elements.push(inf_toText(player.location.owner));
            if (player.location.manager != undefined && player.location.owner != player) elements.push(inf_toText(player.location.manager));

            if (player.location.workers != undefined && player.location.slaves != undefined) {
                for (let i = 0; i < player.location.workers.length; i++) {
                    if (player.location.workers[i] != player) elements.push(inf_toText(player.location.workers[i]));
                }

                for (let i = 0; i < player.location.slaves.length; i++) {
                    if (player.location.slaves[i] != player) elements.push(inf_toText(player.location.slaves[i]));
                }
            }

            break;
        // TODO: Add cases for Owner, Lord and King
        //       Consider using averagerating for lower classes
    }

    popup_immediate(popup_create_list('Influence & Power', elements));
}

function inf_toText(person) {
    let influence = person.influence[player.id];
    if (influence == undefined) influence = 0;

    let power = person.power[player.id];
    if (power == undefined || power == 0.001) power = 0;

    let string = person.job + ' - ';
    string += person.name + ': ';
    string += 'Influence ' + influence + ' ';
    string += 'Power (Respect +/- Fear) ' + power;

    return string;
}

function nextDay() {
    day++;

    let checked_day_action = document.querySelector('input[name="day-action"]:checked');
    if (checked_day_action == null) checked_day_action = {value: '0', checked: true};
    player.processAction(checked_day_action.value);

    let checked_extra_actions = document.querySelectorAll('input[name="extra-action"]:checked');
    let extra_actions = [];
    for (let i = 0; i < checked_extra_actions.length; i++) {
        extra_actions.push(checked_extra_actions[i].value);
        checked_extra_actions[i].checked = false;
    }
    player.processExtraActions(extra_actions);
    popup_queue_start().then(() => {
        ai_process();
        player.dailyUpdate();
        loadMenu();
        loadMap(open_level);
        status_reset_timer();
    });
}

function gameOver() {

}
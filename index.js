const kingdom = new Kingdom();
const used_ids = {};
const player = new Player(getId(), kingdom);
player.setJob('Slave');
player.location.slaves.push(player);

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
let open_level = kingdom;
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
    resize();
    ai_init();
    loadMenu();
    loadMap(open_level);
}

window.onresize = () => {
    resize();
}

function resize() {
    let game_w = document.getElementById('header').offsetWidth;
    document.getElementById('body').style = 'margin: auto; width: ' + game_w + ';';
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
            draw_tile(level.map[i].sprite, i, 0, 0);
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

    for(let i = 0; i < 16; i++) {
        if (level.map[i] != undefined) {
            if (level.map[i].lord != undefined) {
                draw_person(level.map[i].lord, i);
            } else if (level.map[i].owner != undefined) {
                draw_person(level.map[i].owner, i);
            }
        } 
    }
}

function goUpLevel() {
    if (open_level.parent != undefined) {
        loadMap(open_level.parent);
    }
}

function nextDay() {
    day++;

    let checked_day_action = document.querySelector('input[name="day-action"]:checked');
    if (checked_day_action == null) checked_day_action = {value: '0', checked: true};
    player.processAction(checked_day_action.value);
    checked_day_action.checked = false;

    let checked_extra_actions = document.querySelectorAll('input[name="extra-action"]:checked');
    let extra_actions = [];
    for (let i = 0; i < checked_extra_actions.length; i++) {
        extra_actions.push(checked_extra_actions[i].value);
        checked_extra_actions[i].checked = false;
    }
    player.processExtraActions(extra_actions);

    player.dailyUpdate();
    if (player.health == 0) gameOver();

    if (kingdom.king != undefined) {
        kingdom.king.dailyUpdate();
    }
    
    for (let town = 0; town < 16; town++) {
        if (kingdom.map[town] != undefined) {
            if (kingdom.map[town].lord != undefined){
                kingdom.map[town].lord.dailyUpdate();
            }
            for (let plot = 0; plot < 16; plot++) {
                if (kingdom.map[town].map[plot] != undefined) {
                    if (kingdom.map[town].map[plot].owner != undefined) {
                        kingdom.map[town].map[plot].owner.dailyUpdate();
                    }
                    if (kingdom.map[town].map[plot].manager != undefined) {
                        kingdom.map[town].map[plot].manager.dailyUpdate();
                    }
                    for (let i = 0; i < kingdom.map[town].map[plot].workers.length; i++) {
                        kingdom.map[town].map[plot].workers[i].dailyUpdate();
                    }
                    for (let i = 0; i < kingdom.map[town].map[plot].slaves.length; i++) {
                        kingdom.map[town].map[plot].slaves[i].dailyUpdate();
                    }
                }
            }
        }
    }
    loadMenu();
    loadMap(open_level);
}

function gameOver() {

}
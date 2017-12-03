const kingdom = new Kingdom();

const used_ids = {};
const player = new Player(getId());

const ai_people = {};

const cx = document.getElementById('canvas').getContext('2d');
const menu_d = document.getElementById('day');
const menu_h = document.getElementById('health');
const menu_$ = document.getElementById('money');
const menu_j = document.getElementById('job');
const menu_n = document.getElementById('name');
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
}

function loadMap(level) {
    open_level = level;
    //upgrade kingdom and town to draw a build-up of its elements
    for(let i = 0; i < 16; i++) {
        document.getElementById(i).onclick = null;
        if (level.map[i] != undefined) {
            draw_tile(level.map[i].sprite, i, 0, 0);
            if (level.map[i].lord != undefined) {
                draw_person(level.map[i].lord, i);
            }
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
        draw_person(level.king, 0);
    } else if (level.lord != undefined) {
        draw_person(level.lord, 0);
    } else if (level.owner != undefined) {
        draw_person(level.owner, 0);
    }
}

function goUpLevel() {
    if (open_level.parent != undefined) {
        loadMap(open_level.parent);
    }
}

function nextDay() {
    day++;

    player.dailyUpdate();
    if (player.health == 0) gameOver();

    if (kingdom.king != undefined) {
        kingdom.king.dailyUpdate();
        if (kingdom.king.health == 0) kingdom.king = undefined;
    }
    
    for (let town = 0; town < 16; town++) {
        if (kingdom.map[town] != undefined) {
            if (kingdom.map[town].lord != undefined){
                kingdom.map[town].lord.dailyUpdate();
                if (kingdom.map[town].lord.health == 0) kingdom.map[town].lord = undefined;
            }
            for (let plot = 0; plot < 16; plot++) {
                if (kingdom.map[town].map[plot] != undefined) {
                    if (kingdom.map[town].map[plot].owner != undefined) {
                        kingdom.map[town].map[plot].owner.dailyUpdate();
                        if (kingdom.map[town].map[plot].owner.health == 0) kingdom.map[town].map[plot].owner = undefined;
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
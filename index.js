const kingdom = new Kingdom();

const used_ids = {};
const player = new Player(getId());

const cx = document.getElementById('canvas').getContext('2d');
const menu_h = document.getElementById('health');
const menu_$ = document.getElementById('money');
const menu_j = document.getElementById('job');
const menu_n = document.getElementById('name');
let open_level = kingdom;

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
    menu_h.innerText = player.health;
    menu_$.innerText = player.money;
    menu_n.innerText = player.name;
}

function loadMap(level) {
    open_level = level;
    //upgrade kingdom and town to draw a build-up of its elements
    for(let i = 0; i < 16; i++) {
        document.getElementById(i).onclick = null;
        if (level.map[i] != undefined) {
            drawImg(level.map[i].sprite, i);
            if (level.map[i].type != 'building') {
                document.getElementById(i).onclick = (e) => {
                    loadMap(open_level.map[e.srcElement.id]);
                }
            }
        } else {
            drawImg(img_empty, i);
        }
    }
}

function goUpLevel() {
    if (open_level.parent != undefined) {
        loadMap(open_level.parent);
    }
}

function drawImg(img, cell) {
    let x = (cell * 512) % 2048;
    let y = Math.floor((cell * 512) / 2048) * 512;
    cx.drawImage(img, x, y);
}
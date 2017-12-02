const kingdom = new Kingdom();
const cx = document.getElementById('canvas').getContext('2d');
let open_level = kingdom;

window.onload = () => {
    resize();
    loadMap(open_level);
}

window.onresize = () => {
    resize();
}

function resize() {
    let game_w = document.getElementById('header').offsetWidth;
    document.getElementById('body').style = 'margin: auto; width: ' + game_w + ';';
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
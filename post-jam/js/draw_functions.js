function draw_tile(img, cell) {
    let x = (cell * 512) % 2048;
    let y = Math.floor((cell * 512) / 2048) * 512;
    cx.drawImage(img, x, y);
}

function draw_person(person, cell) {
    if (cell == 'r') cell = Math.floor(Math.random() * 16);
    let x_off = Math.floor(Math.random() * 512);
    let y_off = Math.floor(Math.random() * 512);
    let x = ((cell * 512) % 2048) + x_off;
    let y = (Math.floor((cell * 512) / 2048) * 512) + y_off;
    cx.drawImage(person.sprite, x, y);
    cx.drawImage(img_clothes[person.job], x, y);
}
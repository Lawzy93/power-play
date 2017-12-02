function draw_image(img, cell) {
    let x = (cell * 512) % 2048;
    let y = Math.floor((cell * 512) / 2048) * 512;
    cx.drawImage(img, x, y);
}
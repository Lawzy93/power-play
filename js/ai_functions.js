function ai_init () {
    let king = new Ai(getId());
    king.setJob('King');
    kingdom.setKing(king);
    for(let town = 0; town < 16; town++) {
        if (kingdom.map[town] != undefined) {
            let lord = new Ai(getId());
            lord.setJob('Lord');
            kingdom.map[town].setLord(lord);
            for (let plot = 0; plot < 16; plot++) {
                if (kingdom.map[town].map[plot] != undefined) {
                    let owner = new Ai(getId());
                    owner.setJob('Owner');
                    kingdom.map[town].map[plot].setOwner(owner);
                    for (let building = 0; building < 16; building ++) {
        
                    }
                }
            }
        }
    }
}
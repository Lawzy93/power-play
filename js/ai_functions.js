function ai_init () {
    let king = new Ai(getId(), kingdom);
    king.setJob('King');
    kingdom.setKing(king);

    for(let town = 0; town < 16; town++) {
        if (kingdom.map[town] != undefined) {
            let lord = new Ai(getId(), kingdom.map[town]);
            lord.setJob('Lord');
            kingdom.map[town].setLord(lord);

            for (let plot = 0; plot < 16; plot++) {
                if (kingdom.map[town].map[plot] != undefined) {
                    let owner = new Ai(getId(), kingdom.map[town].map[plot]);
                    owner.setJob('Owner');
                    kingdom.map[town].map[plot].setOwner(owner);

                    let manager = new Ai(getId(), kingdom.map[town].map[plot]);
                    manager.setJob('Manager');
                    kingdom.map[town].map[plot].setManager(manager);

                    for (let building = 0; building < 16; building ++) {
                        if (kingdom.map[town].map[plot].map[building] != undefined) {
                            let r50 = Math.floor(Math.random() * 2);
                            if (r50 == 1) {
                                switch (kingdom.map[town].map[plot].map[building].name) {
                                    case 'House':
                                        let worker = new Ai(getId(), kingdom.map[town].map[plot]);
                                        worker.setJob('Worker');
                                        kingdom.map[town].map[plot].workers.push(worker);
                                        break;
                                    case 'Wood':
                                        let slave = new Ai(getId(), kingdom.map[town].map[plot]);
                                        slave.setJob('Slave');
                                        kingdom.map[town].map[plot].slaves.push(slave);
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
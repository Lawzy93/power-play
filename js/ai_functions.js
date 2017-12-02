function ai_init () {
    let king = new Ai(getID());
    king.setJob('king');
    kingdom.setKing(king);
    for(town in kingdom.map) {
        let lord = new Ai(getID());
        lord.setJob('lord');
        town.setLord(lord);
        for (plot in town.map) {
            let owner = new Ai(getId());
            owner.setJob('owner');
            plot.setOwner(owner);
            for (building in plot.map) {

            }
        }
    }
}

// SET ALL END POINTS AND TEST THIS FUNCTION
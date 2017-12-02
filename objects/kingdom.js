class Kingdom {
    constructor() {
        this.type = 'kingdom';
        this.map = [];
        let r = Math.floor(Math.random() * 5);
        for (let i = 0; i <= r; i++) {
            let map_loc_found = false;
            do {
                let map_loc = Math.floor(Math.random() * 16);
                if (this.map[map_loc] == undefined) {
                    this.map[map_loc] = new Town(this);
                    map_loc_found = true;
                }
            } while (!map_loc_found);

        }
    }
}
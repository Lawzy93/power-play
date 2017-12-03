class Plot {
    constructor(parent) {
        this.type = 'plot';
        this.sprite = img_plot;
        this.map = [];
        this.parent = parent;
        this.owner = undefined;
        this.manager = undefined;
        this.slaves = [];
        this.workers = [];
        this.slave_cap = 0;
        this.worker_cap = 0;
        
        this.build('House', 'r');

        let r = Math.floor(Math.random() * 5);
        for (let i = 0; i <= r; i++) {
            this.build('r', 'r');
        }
    }

    build(name, loc) {
        let buildings = {
            House: {type: 'building', name: 'House', pop: 'workers', sprite: img_house},
            Wood: {type: 'building', name: 'Wood', pop: 'slaves', sprite: img_wood},
        };

        if (name == 'r') {
            let keys = Object.keys(buildings);
            name = keys[Math.floor(Math.random() * keys.length)];
        }

        if (loc == 'r') {
            let map_loc_found = false;
            do {
                loc = Math.floor(Math.random() * 16);
                if (this.map[loc] == undefined) {
                    map_loc_found = true;
                }
            } while (!map_loc_found);
        }

        if (buildings[name].pop == 'slaves') {
            this.slave_cap++;
        } else if (buildings[name].pop == 'workers') {
            this.worker_cap++;
        }

        this.map[loc] = buildings[name];
    }

    setOwner(person) {
        this.owner = person;
    }

    setManager(person) {
        this.manager = person;
    }
}
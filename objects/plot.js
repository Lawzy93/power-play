class Plot {
    constructor(parent) {
        this.type = 'plot';
        this.sprite = img_plot;
        this.map = [];
        this.parent = parent;
        let r = Math.floor(Math.random() * 5);
        for (let i = 0; i <= r; i++) {
            let item = '';
            let r_item = Math.floor(Math.random() * 2);
            switch (r_item) {
                case 0:
                    item = {type: 'building', sprite: img_wood};
                    break;
                case 1: 
                    item = {type: 'building', sprite: img_house};
                    break;
            }

            let map_loc_found = false;
            do {
                let map_loc = Math.floor(Math.random() * 16);
                if (this.map[map_loc] == undefined) {
                    this.map[map_loc] = item;
                    map_loc_found = true;
                }
            } while (!map_loc_found);

        }
    }
}
class Player extends Person {
    constructor(id, kingdom) {
        let location_found = false;
        let location = undefined;
        let town = 0;
        let plot = 0;
        do {
            if (kingdom.map[town] != undefined && kingdom.map[town].map[plot] != undefined) {
                location = kingdom.map[town].map[plot];
                location_found = true;
            } else if (plot == 15) {
                plot = 0;
                town++;
            } else {
                plot++;
            }
        } while (!location_found);

        super(id, location);
        this.sprite = img_person_1;
    }

    setJob(job) {
        super.setJob(job);
        this.day_actions = Player.getDayActions(job);
    }

    adjustHealth(amount) {
        super.adjustHealth(amount);
        if (this.health == 0) {
            alert('You died');
            location.reload();
        }
    }

    changeName() {
        this.name = prompt('Enter New Name:', this.name);
    }

    getBribe() {
        return prompt('How much?', '0');
    }

    static getDayActions(job) {
        switch (job) {
            case 'Slave':
            case 'Worker':
                return ['Slack-Off', 'Work', 'Work-Hard'];
                break;
            case 'Manager':
                return ['Slack-Off', 'Work', 'Force Slave to Work-Hard'];
                break;
            case 'Owner':
                return ['Work', 'Force Slaves & Workers to Work-Hard', 'Campaign', ];
                break;
        }
    }
}
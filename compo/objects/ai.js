class Ai extends Person {
    constructor(id, location) {
        super(id, location);

        this.lazyness = Math.random();
    }
    
    adjustHealth(amount) {
        super.adjustHealth(amount);
        if (this.health == 0) {
            this.findReplacement();
            this.kill();
        }
    }

    changeName() {
        //name changing code for random gen
    }

    dailyUpdate() {
        super.dailyUpdate();

        let day_action = Math.floor(Math.random() * 3);
        if (this.lazyness > Math.random()) day_action = 0;
        this.processAction(day_action);

    }

    kill() {
        switch (this.job) {
            case 'Slave':
            case 'Worker':
            case 'Manager':
            case 'Owner':
            case 'Lord':
            case 'King':
                // the find replacement method will remove the person
                status_add(this.name + ', a ' + this.job + ', died.');
                break;
        }
    }
}
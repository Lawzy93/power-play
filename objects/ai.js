class Ai extends Person {
    constructor(id, location) {
        super(id, location);
    }
    
    adjustHealth(amount) {
        super.adjustHealth(amount);
        if (this.health == 0) {
            this.findReplacement();
            this.kill();
        }
    }

    kill() {
        let found = false;
        let i = 0;
        switch (this.job) {
            case 'Slave':
                do {
                    if (this.location.slaves[i].id == this.id) {
                        this.location.slaves.splice(i, 1);
                        console.log(this.name + ', a ' + this.job + ', died.');
                        found = true;
                    }
                } while (!found);
                break;
            case 'Worker':
                do {
                    if (this.location.workers[i].id == this.id) {
                        this.location.workers.splice(i, 1);
                        console.log(this.name + ', a ' + this.job + ', died.');
                        found = true;
                    }
                } while (!found);
                break;
            case 'Manager':
            case 'Owner':
            case 'Lord':
            case 'King':
                // the find replacement method will remove the person
                console.log(this.name + ', a ' + this.job + ', died.');
                break;
        }
    }
}
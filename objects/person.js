class Person {
    constructor(id, location) {
        this.sprite = img_person;
        this.health = Math.floor(Math.random()*20)+80;
        this.money = 0;
        this.influence = {};
        this.power = {};
        this.id = id;
        this.location = location;
        this.job = undefined;
        this.actions_queue = [];
    }

    adjustHealth(amount) {
        this.health += amount;
        this.health = Math.min(100, Math.max(0, this.health));
    }

    adjustInfluence(person_id, amount) {
        if (this.influence[person_id] == undefined) this.influence[person_id] = 0;
        this.influence[person_id] += amount;
        this.influence[person_id] = Math.min(10, Math.max(0, this.influence[person_id]));
    }

    adjustPower(person_id, amount) {
        if (this.power[person_id] == undefined) this.power[person_id] = 0;
        this.power[person_id] += amount;
        this.power[person_id] = Math.min(5, Math.max(-5, this.power[person_id]));
    }

    setJob(job) {
        if (this.job != undefined) {
            this.findReplacement();
        }
        this.job = job;
        if (job == 'Worker') this.location.workers.push(this);
        if (job == 'Slave') this.location.slaves.push(this);
        if (job == 'Manager') this.location.manager = this;
        if (job == 'Owner') this.location.owner = this;
        if (job == 'Lord') this.location.lord = this;
        if (job == 'King') this.location.king = this;

        if (job == 'Slave' || this.name == undefined) this.name = this.id;
    }

    findReplacement() {
        let best = undefined;
        let best_score = -1;
        let found = false; 
        let i = 0;
        switch (this.job) {
            case 'Slave':
                best = new Ai(getId(), this.location);
                best.setJob('Slave');
                console.log(best.name + ' was purchased as a new slave');
                do {
                    if (this.location.slaves[i].id == this.id) {
                        this.location.slaves.splice(i, 1);
                        found = true;
                    }
                    i++;
                } while (!found);
                break;
            case 'Worker':
                for (let i = 0; i < this.location.slaves.length; i++) {
                    if (this.location.slaves[i].location.manager.influence[this.location.slaves[i].id] == undefined) this.location.slaves[i].location.manager.influence[this.location.slaves[i].id] = 0;
                    if (this.location.slaves[i].location.manager.influence[this.location.slaves[i].id] > best_score) {
                        best = this.location.slaves[i];
                        best_score = this.location.slaves[i].location.manager.influence[this.location.slaves[i].id]
                    }
                }
                if (best == undefined) best = new Ai(getId(), this.location);
                best.setJob('Worker');
                console.log(best.name + ' became a worker');
                do {
                    if (this.location.workers[i].id == this.id) {
                        this.location.workers.splice(i, 1);
                        found = true;
                    }
                    i++;
                } while (!found);
                break;
            case 'Manager':
                for (let i = 0; i < this.location.workers.length; i++) {
                    if (this.location.workers[i].location.owner.influence[this.location.workers[i].id] == undefined) this.location.workers[i].location.owner.influence[this.location.workers[i].id] = 0;
                    if (this.location.workers[i].location.owner.influence[this.location.workers[i].id] > best_score) {
                        best = this.location.workers[i];
                        best_score = this.location.workers[i].location.owner.influence[this.location.workers[i].id];
                    }
                }
                if (best == undefined) best = new Ai(getId(), this.location);
                best.setJob('Manager');
                console.log(best.name + ' became a manager');
                break;
            case 'Owner':
                for (let i = 0; i < this.location.workers.length; i++) {
                    if (this.location.workers[i].location.owner.influence[this.location.workers[i].id] == undefined) this.location.workers[i].location.owner.influence[this.location.workers[i].id] = 0;
                    if (this.location.workers[i].location.owner.influence[this.location.workers[i].id] > best_score) {
                        best = this.location.workers[i];
                        best_score = this.location.workers[i].location.owner.influence[this.location.workers[i].id];
                    }
                }
                if (this.location.manager.location.owner.influence[this.location.manager.id] == undefined) this.location.manager.location.owner.influence[this.location.manager.id] = 0;
                if (this.location.manager.location.owner.influence[this.location.manager.id] > best_score) {
                    best = this.location.manager;
                    best_score = this.location.manager.location.owner.influence[this.location.manager.id];
                }
                if (best == undefined) best = new Ai(getId(), this.location);
                best.setJob('Owner');
                console.log(best.name + ' became an owner');
                break;
        }
    }

    dailyUpdate() {
        this.adjustHealth(Math.floor(Math.random() * 8) - 3);

        if (this.job != 'Slave' && this.id == this.name) {
            if(Math.random() > 0.33) {
                this.actions_queue.push('chname');
            }
        }

        if (this.job == 'Manager') {
            for (let i = 0; i < this.location.slaves.length; i++) {
                if (this.influence[this.location.slaves[i].id] > 8) {
                    if (this.location.worker_cap > this.location.workers.length) {
                        this.location.slaves[i].actions_queue.push('promwk');
                    }
                }
            }
        }
    }

    processAction(action) {
        switch (this.job) {
            case 'Slave':
                if (action == '0') {
                    this.location.owner.money += Math.floor(Math.random() * 3);
                    this.adjustHealth(Math.floor(Math.random() * 2) - 1);
                    this.location.manager.adjustInfluence(this.id, -1);
                } else if (action == '1') {
                    this.location.owner.money += Math.floor(Math.random() * 5) + 3;
                    this.adjustHealth(Math.floor(Math.random() * 4) - 5);
                    this.location.manager.adjustInfluence(this.id, 1);
                } else if (action == '2') {
                    this.location.owner.money += Math.floor(Math.random() * 3) + 8;
                    this.adjustHealth(Math.floor(Math.random() * 10) - 15);
                    this.location.manager.adjustInfluence(this.id, 1);
                    this.location.manager.adjustPower(this.id, 1);
                }
                break;
            case 'Worker':
                this.money += 2;
                this.location.owner.money += -2;
                if (action == '0') {
                    this.location.owner.money += Math.floor(Math.random() * 6);
                    this.location.manager.adjustInfluence(this.id, -2);
                    this.location.owner.adjustInfluence(this.id, -1);
                } else if (action == '1') {
                    this.location.owner.money += Math.floor(Math.random() * 10) + 6;
                    this.adjustHealth(Math.floor(Math.random() * 3) - 2);
                    this.location.manager.adjustInfluence(this.id, 1);
                } else if (action == '2') {
                    this.location.owner.money += Math.floor(Math.random() * 5) + 16;
                    if (Math.random() < 0.3) {
                        this.money += 2;
                        this.location.owner.money += -2;
                        if (this.id == player.id) console.log('You were payed a bonus of $2 for your hard work');
                    }
                    this.adjustHealth(Math.floor(Math.random() * 3) - 5);
                    this.location.manager.adjustInfluence(this.id, 1);
                    this.location.owner.adjustInfluence(this.id, 1);
                    this.location.manager.adjustPower(this.id, 1);
                }
                break;
        }
    }

    processExtraActions(actions) {
        this.actions_queue = [];
        for (let i = 0; i < actions.length; i++) {
            ea_action(actions[i], this);
        }
    }
}
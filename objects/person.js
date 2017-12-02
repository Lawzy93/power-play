class Person {
    constructor(id) {
        this.health = Math.floor(Math.random()*20)+80;
        this.money = 0;
        this.id = id;
        this.job = slave;
    }

    adjustHealth(amount) {
        this.health += amount;
        this.health = Math.min(100, Math.max(0, this.health));

        if (this.health == 0) {
            this.kill();
        }
    }

    setJob(job) {
        this.job = job;
    }

    kill() {

    }
}
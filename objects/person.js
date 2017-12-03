class Person {
    constructor(id) {
        this.sprite = img_person;
        this.health = Math.floor(Math.random()*20)+80;
        this.money = 0;
        this.id = id;
        this.job = 'Slave';
    }

    adjustHealth(amount) {
        this.health += amount;
        this.health = Math.min(100, Math.max(0, this.health));
    }

    setJob(job) {
        this.job = job;
    }

    dailyUpdate() {
        this.adjustHealth(Math.floor(Math.random() * 8) - 3);
    }
}
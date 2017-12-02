class Player extends Person {
    constructor(id) {
        super(id);
        this.position = 'slave';
        this.name = this.id;
    }
}
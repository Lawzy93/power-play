let extra_actions = {
    chname: {
        name: 'Change Name',
        effort: 0.1,
        evil: 0,
        action: function(e) {
            e.setInput('New Name', 'Enter New Name:', this.name, function () {
                this.name = this.getInput();
            });
        }
    },
    promwk: {
        name: 'Accept Promotion to Worker',
        effort: 0.1,
        evil: 0,
        action: function(e) {
            e.setJob('Worker');
        }
    },
    brmapr: {
        name: 'Bribe manager for a Promotion',
        effort: 0.2,
        evil: 0.3,
        action: function(e) {
            e.setInput('Bribe', 'How Much?', '0', function () {
                let bribe = this.getInput();
                if (bribe > this.money) {
                    status_add('Bribe failed: not enough money');
                } else if (bribe > (1/this.location.manager.power[this.id])*20) {
                    this.money -= bribe;
                    this.location.manager.money += bribe;
                    this.setJob('Worker');
                } else {
                    status_add('Your bribe insults ' + this.location.manager.name)
                    this.location.manager.adjustInfluence(this.id, -5);
                }
            });
        }
    }
};

function ea_name(id) {
    return extra_actions[id].name;
}

function ea_action(id, person) {
    extra_actions[id].action(person);
}
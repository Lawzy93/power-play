let extra_actions = {
    chname: {
        name: 'Change Name',
        effort: 0.1,
        evil: 0,
        action: function(e) {
            e.changeName();
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
            let bribe = e.getBribe();
            if (bribe > e.money) {
                status_add('Bribe failed: not enough money');
            } else if (bribe > (1/e.location.manager.power[e.id])*20) {
                e.money -= bribe;
                e.location.manager.money += bribe;
                e.setJob('Worker');
            } else {
                status_add('Your bribe insults ' + e.location.manager.name)
                e.location.manager.adjustInfluence(e.id, -5);
            }
        }
    }
};

function ea_name(id) {
    return extra_actions[id].name;
}

function ea_action(id, person) {
    extra_actions[id].action(person);
}
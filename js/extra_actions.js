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
};

function ea_name(id) {
    return extra_actions[id].name;
}

function ea_action(id, person) {
    extra_actions[id].action(person);
}
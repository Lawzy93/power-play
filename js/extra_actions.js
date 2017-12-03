let extra_actions = {
    chname: {name: 'Change Name', effort: 0.1, evil: 0},
};

function ea_name(id) {
    return extra_actions[id].name;
}
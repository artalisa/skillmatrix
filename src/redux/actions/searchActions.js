import sl from 'servicelocator';

export default {
    getSearchSkills: function(searchPart) {
        let smapi = sl.get('SkillMatrixAPI');

        return function(dispatch, getState) {
            smapi.getSkills(searchPart)
                .then(function(skills) {
                    dispatch({type:'SEARCH_GETSKILLS', searchSuggestions: skills});
                });
        }
    },

    getUsers: function(searchSkills) {
        let smapi = sl.get('SkillMatrixAPI');

        return function(dispatch, getState) {
            smapi.getUsers(searchSkills)
                .then(function(users) {
                    dispatch({type:'SEARCH_GETUSERS', users: {
                            users: users,
                            skillsRequired: searchSkills
                        }
                    });
                });
        }
    }
}
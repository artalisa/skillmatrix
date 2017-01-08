import base64 from 'base-64';
import Q from 'q';

class SkillMatrixAPIError extends Error {}

export default class SkillMatrixAPI {
    constructor(username, password, apiUrl) {
        this._username = username;
        this._password = password;
        this._apiUrl = apiUrl;
    }

    getQueryString(params) {
        var esc = encodeURIComponent;
        return Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
    }

    request(params) {
        const method = params.method || 'GET';
        let qs = '';
        let body;
        let headers = params.headers || {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(this._username + ':' + this._password)
            };

        if (['GET', 'DELETE'].indexOf(method.toUpperCase()) > -1) {
            if(params.data) {
                qs = '?' + this.getQueryString(params.data);
            }
        } else { // POST or PUT
            if(params.data instanceof Object) {
                body = JSON.stringify(params.data);
            }else{
                body = params.data;
            }
        }

        let url = this._apiUrl + params.url + qs;

        return fetch(url, {method, headers, body});
    }

    getUsers(skill) {
        if (!skill) {
            return this.getAllUsers();
        }


        return this.request({
            url: '/api/v1/users/profile/skills/search',
            method: 'get',
            data: {
                skillName: skill
            }
        }).then(this._parseResponse);

    }

    getAllUsers() {
        return this.request({
            url: '/api/v1/users/profile/',
            method: 'get'
        }).then(this._parseResponse);
    }

    getUserSkills(user) {
        return this.request({
            url: '/api/v1/user/skill',
            method: 'get'
        }).then(this._parseResponse);
    }
    addUserSkills(user, skills) {
        let promises = [];
        for(let i in skills) {
            if(skills[i]) {
                promises.push(this.addUserSkill(user, skills[i]));
            }
        }

        return Q.all(promises)
            .then(function(){
                console.log('Promisese!!!');
            })
            .catch(function(err){
                console.log(err);
            });
    }
    addUserSkill(user, skill) {
        return this.request({
            url: '/api/v1/user/skill',
            data: skill,
            method: 'post'
        }).then(this._parseResponse);
    }

    getUser(user) {
        const self = this;
        console.log('Get user');
        return this.request({
            url: '/api/v1/user/profile',
            method: 'get'
        })
            .then(this._parseResponse)
            .then(function(data) {
                return self.getUserSkills(user)
                    .then(function(skills){
                        data['__skills'] = skills;

                        return data;
                    });
            });
    }

    updateUser(user, data) {

        return this.request({
            url: '/api/v1/user/profile',
            method: 'post',
            data: data
        })
    }



    getSkills(search) {
        let data = {};

        if(search) {
            data = {
                skillName: search
            };
        }

        return this.request({
            url: "/api/v1/skills/list",
            method: 'GET',
            data: data
        })
        .then(this._parseResponse);
    }

    _parseResponse(response) {
        return response.json()
            .then(function(data){

                if(data.content) {
                    return data.content;
                }else if(data){
                    return data;
                }else{
                    throw new SkillMatrixAPIError('Failed to fetch result');
                }
            });
    }
}
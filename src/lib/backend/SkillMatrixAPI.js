import base64 from 'base-64';

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
                'Authorization' : 'Basic ' + base64.encode(this._username + ':' + this._password)
            };

        if (['GET', 'DELETE'].indexOf(method.toUpperCase()) > -1) {
            qs = '?' + this.getQueryString(params.data);
        } else { // POST or PUT
            body = JSON.stringify(params.data);
        }

        let url = this._apiUrl + params.url + qs;

        return fetch(url, { method, headers, body });
    }
    getUsers(skill) {
        if(!skill) {
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

                if(!data.content) {
                    throw new SkillMatrixAPIError('Failed to fetch result');
                }

                return data.content;
            });
    }
}
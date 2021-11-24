import $ from "jquery"
import axios from 'axios'

class SSO {
	//  constructor does nothing I guess
    constructor(attachOnInit) {
        // init variables
        this.attached = false

        // maybe do some attachment when started?
        try {
            // await on ajax request (serialize it)
            if (attachOnInit) {
                this.attach()
            }

            console.log('SSO SESSION ATTACHED!')
        } catch (e) {
            console.log('FAILED ATTACHING SSO SESSION')
        }
    }

    // attach, make it async
    async attach() {
        // clear session cookies first?
        console.log('clearing cookies. before: ', document.cookie)
        const cookie = require('cookie')

        document.cookie = cookie.serialize('sso_token_3','',{
            expires: new Date(0),
            sameSite: 'none'
        })

        console.log('cookies now: ', document.cookie)

        var me = this
        var ret = await $.ajax({
            url: '/sso/api.php?command=attach',
            crossDomain: true,
            dataType: 'jsonp'
        })
            .done((e) => {
                me.attached = true
            })

        return ret
    }

    // just login
    login(username, password) {
        const fd = new FormData()

        fd.set('username', username)
        fd.set('password', password)

        return axios({
            method: 'post',
            url: '/sso/api.php?command=login',
            data: fd,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        })
    }

    // logout using post
    logout() {
        return axios({
            method: 'get',
            url: '/sso/api.php?command=logout'
        })
    }

    // get user info
    getUserInfo() {
        return axios({
            method: 'get',
            url: '/sso/api.php?command=getUserInfo'
        })
    }

	// get users by role
    getUsersByRole(role, nama) {
        return axios({
            method: 'get',
            url: '/sso/api.php?command=getUserByRole&roles=' + role + '&nama=' + nama
        })
    }

	// get user by id
	getUserById(id) {
		return axios({
			method: 'get',
			url: '/sso/api.php?command=getUserById&id=' + id
		})
	}
}

export default SSO 
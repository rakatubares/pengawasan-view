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

		let token_name = 'sso_token_' + process.env.VUE_APP_ID
		document.cookie = cookie.serialize(token_name,'',{
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

	// test login
	login() {
		console.log('TEST LOGIN')
		const params = new URLSearchParams();
		params.append('username', process.env.VUE_APP_USERNAME);
		params.append('password', process.env.VUE_APP_PASSWORD);
		return axios({
			method: 'post',
			url: '/sso/api.php?command=login',
			data: params
		})
	}
}

export default SSO 
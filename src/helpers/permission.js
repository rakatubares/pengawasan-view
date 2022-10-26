import store from '../store.js'

class permission {
	getUserPermission() {
		this.userInfo = JSON.parse(JSON.stringify(store.getters.userInfo))
		this.userPermissions = this.userInfo['apps_data'][process.env.VUE_APP_ID]['permissions']
	}

	checkPermission(referencePermissions) {
		this.getUserPermission()
		let isPermitted = false
		if (typeof referencePermissions === 'string' || referencePermissions instanceof String) {
			if (this.userPermissions.indexOf(referencePermissions) > -1) {
				isPermitted = true
			}
		} else {
			referencePermissions.forEach(permission => {
				if (this.userPermissions.indexOf(permission) > -1) {
					isPermitted = true
				}
			});
		}
		return isPermitted
	}
}

export default new permission
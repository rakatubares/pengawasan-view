import store from '../store.js'
import nav from '../containers/_mynav.js'

class menuGenerator {
	constructor() {
		this.defaultNav = nav
		this.validNav = this.constructInitialNav()
		this.userInfo = JSON.parse(JSON.stringify(store.getters.userInfo))
		this.userPermissions = this.userInfo['apps_data'][process.env.VUE_APP_ID]['permissions']
	}

	constructInitialNav() {
		let nav = JSON.parse(JSON.stringify(this.defaultNav))
		nav[0]['_children'] = []
		return nav
	}

	generateMenu() {
		let menus = nav[0]['_children']
		menus.forEach(menu => {
			this.checkMenuType(menu)
		});
		return this.validNav
	}

	checkMenuType(menu) {
		let type = menu['_name']
		if (type == 'CSidebarNavTitle') {
			this.checkMenuTitle(menu)
		} else {
			this.checkMenuItems(menu)
		}
	}

	checkMenuTitle(menu) {
		let isPermitted = this.checkPermission(menu['permissions'])
		if (isPermitted) {
			this.validNav[0]['_children'].push(menu)
		}
	}

	checkMenuItems(menu) {
		let result = this.checkChildren(menu)
		if (result['permission'] == true) {
			this.validNav[0]['_children'].push(result['menu'])
		}
	}

	checkChildren(menu) {
		let isPermitted = false
		if ("_children" in menu) {
			let permittedChildren = []
			let children = menu['_children']
			children.forEach(child => {
				let result = this.checkChildren(child)
				if (result['permission'] == true) {
					permittedChildren.push(result['menu'])
					isPermitted = true
				}
				menu['_children'] = permittedChildren
			});
		} else {
			isPermitted = this.checkPermission(menu['permissions'])
		}
		return {'permission': isPermitted, 'menu': menu}
	}

	checkPermission(menuPermissions) {
		let isPermitted = false
		if (typeof menuPermissions === 'string' || menuPermissions instanceof String) {
			if (this.userPermissions.indexOf(menuPermissions) > -1) {
				isPermitted = true
			}
		} else {
			menuPermissions.forEach(permission => {
				if (this.userPermissions.indexOf(permission) > -1) {
					isPermitted = true
				}
			});
		}
		return isPermitted
	}
}

export default new menuGenerator
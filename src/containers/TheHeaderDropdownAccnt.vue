<template>
	<CDropdown
		inNav
		class="c-header-nav-items"
		placement="bottom-end"
		add-menu-classes="pt-0"
	>
		<template #toggler>
			<CHeaderNavLink>
				<div class="c-avatar">
					<img
						src="img/avatars/6.jpg"
						class="c-avatar-img "
					/>
				</div>
			</CHeaderNavLink>
		</template>
		<CDropdownHeader tag="div" class="text-center" color="light">
			<strong>Account</strong>
		</CDropdownHeader>
		<CDropdownItem disabled>
			<CIcon name="cil-user"/> {{ userInfo.name }}
		</CDropdownItem>
		<CDropdownItem disabled>
			<CIcon name="cil-barcode"/> {{ userInfo.nip }}
		</CDropdownItem>
		<CDropdownItem @click="logout">
			<CIcon name="cil-lock-locked" /> Logout
		</CDropdownItem>
	</CDropdown>
</template>

<script>
import { mapState } from 'vuex'

import store from '../store.js'

export default {
	name: 'TheHeaderDropdownAccnt',
	data () {
		return { 
			itemsCount: 42
		}
	},
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		logout() {
			console.log('logout')
			store.getters.sso.logout()
			this.$router.push('Home')
		}
	}
}
</script>

<style scoped>
	.c-icon {
		margin-right: 0.3rem;
	}
</style>
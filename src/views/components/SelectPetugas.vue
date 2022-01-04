<template>
	<div class="wrapper">
		<CRow>
			<CCol md="8" sm="12">
				<div class="form-group">
					<label>{{ label }}</label>
					<v-autocomplete
						v-model="value"
						outlined
						dense
						:items.sync="items"
						:search-input.sync="search"
						:disabled="currentUser == true"
						item-text="name"
						item-value="user_id"
						@change="changeValue"
					>
						<template v-slot:no-data>
							<v-list-item>
								<v-list-item-title>
									Data petugas tidak ditemukan
								</v-list-item-title>
							</v-list-item>
						</template>
						<template v-slot:item="{ item }">
							<v-list-item-content>
								<v-list-item-title v-text="item.name"></v-list-item-title>
								<v-list-item-subtitle v-text="item.nip"></v-list-item-subtitle>
							</v-list-item-content>
						</template>
					</v-autocomplete>
					<small class="form-text text-muted w-100">{{ description }}</small>
				</div>
			</CCol>
			<CCol md="3" sm="12">
				<CInput
					label="NIP"
					:value.sync="petugas.nip"
					disabled
				>
				</CInput>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import { mapState } from 'vuex'

import api from '../../router/api2.js'

const default_petugas = {
	user_id: null,
	name: null,
	nip: null
}

export default {
	name: 'SelectPetugas',
	props: {
		label: String,
		description: String,
		currentUser: {
			type: Boolean,
			default: false
		},
		role: String
	},
	computed: {
		...mapState(['userInfo'])
	},
	data() {
		return {
			items: [],
			value: null,
			search: null,
			petugas: JSON.parse(JSON.stringify(default_petugas))
		}
	},
	watch: {
		async search (val) {
			if (val != null) {
				let roles = {roles: [this.role]}
				this.items = await api.getUserByRole(roles)
			}
		}
	},
	methods: {
		changeValue(id, mounted=false) {
			this.getPetugas(id, mounted)
			this.$emit('update:id', id)
		},
		async getPetugas(id, mounted=false) {
			if (id != null) {
				this.petugas = await api.getUserById(id)
				if (mounted == true) {
					this.items = [this.petugas]
					this.value = this.items[0]
				}
				this.saveCache()
			} else {
				this.petugas = JSON.parse(JSON.stringify(default_petugas))
			}
		},
		saveCache() {
			api.saveUser(this.petugas)
		},
	},
	mounted() {
		if (this.currentUser == true) {
			this.changeValue(this.userInfo.user_id, true)
		}
	}
}
</script>

<style>

</style>
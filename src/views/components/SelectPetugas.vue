<template>
	<div class="wrapper">
		<CRow>
			<CCol md="8" sm="12">
				<div class="form-group">
					<label>{{ label }}</label>
					<v-autocomplete
						class="no-message"
						v-model="value"
						outlined
						dense
						:items.sync="items"
						:search-input.sync="search"
						:disabled="currentUser == true"
						item-text="name"
						item-value="nip"
						@change="changeOfficer"
						@keyup="searchOfficer"
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
								<v-list-item-title>{{ item.name }}</v-list-item-title>
								<v-list-item-subtitle>{{ item.nip }}</v-list-item-subtitle>
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
			<CCol  md="1" sm="12">
				<slot name="button"></slot>
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
		nip: {
			type: String,
			default: null
		},
	},
	computed: {
		...mapState(['userInfo'])
	},
	data() {
		return {
			items: [],
			value: null,
			search: null,
			petugas: JSON.parse(JSON.stringify(default_petugas)),
		}
	},
	watch: {
		nip(val) {
			this.getPetugas(val, true)
		},
	},
	methods: {
		async searchOfficer() {
			if ((this.search != null) & (this.search != "")) {
				this.items = await api.searchUser({query: this.search})
			}
		},
		async changeOfficer(nip, mounted=false) {
			await this.getPetugas(nip, mounted)
			this.$emit('update:nip', nip)
		},
		async getPetugas(nip, mounted=false) {
			if (nip != null) {
				this.petugas = await api.getUserByNip({nip: nip})
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
	async mounted() {
		if (this.currentUser == true) {
			this.changeOfficer(this.userInfo.nip, true)
		}
	}
}
</script>

<style>

</style>
<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol md="8" sm="12">
					<MySelectJabatan
						:state="state"
						:label="label.jabatan"
						:default_jabatan="default_jabatan"
						:jabatan.sync="selected_jabatan"
					/>
				</CCol>
				<CCol md="2" sm="12">
					<CSelect
						label="Tipe TTD"
						:options="options_ttd"
						:value.sync="selected_tipe_ttd"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="8" sm="12">
					<div class="form-group">
						<label>{{ label.nama }}</label>
						<v-autocomplete
							v-model="value"
							outlined
							dense
							:items.sync="items"
							:search-input.sync="search"
							item-text="name"
							item-value="nip"
							@change="changePejabat"
							@keyup="searchOfficer"
						>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-title>
										Data pejabat tidak ditemukan
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
			</CRow>
		</CForm>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../../router/api2.js'
import MySelectJabatan from './SelectJabatan.vue'

const default_petugas = {
	user_id: null,
	name: null,
	nip: null
}

const options_ttd = [
	{'label': '-', 'value': null},
	{'label': 'Plh.', 'value': 'plh'}, 
	{'label': 'Plt.', 'value': 'plt'},
]

export default {
	name: 'SelectPejabat',
	components: {
		MySelectJabatan,
	},
	props: {
		state: String,
		label: {
			type: Object,
			default() {
				return {
					jabatan: 'Jabatan',
					nama: 'Nama Pejabat'
				}
			}
		},
		description: String,
		default_jabatan: String,
		jabatan: String,
		tipe_ttd: String,
		nip: String,
		with_autofill: {
			type: Boolean,
			default() { return true }
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
			options_jabatan: [],
			options_ttd: options_ttd,
			selected_jabatan: null,
			selected_tipe_ttd: null,
		}
	},
	watch: {
		async jabatan(val1) {
			this.selected_jabatan = val1
		},
		async tipe_ttd(val2) {
			this.selected_tipe_ttd = val2
		},
		async nip(val3) {
			await this.getPetugas(val3, true)
		},
		async selected_tipe_ttd (val4) {
			// Change prop
			await this.setProps('tipe_ttd', val4)

			// Change officer
			if ((val4 == null) & (this.with_autofill)) {
				await this.autofillPejabat(this.jabatan)
			}
		},
		async selected_jabatan (val5) {
			// Change prop
			await this.setProps('jabatan', val5)

			// Change officer
			if (this.with_autofill) {
				if (this.selected_tipe_ttd == null) {
					await this.autofillPejabat(val5)	
				}	
			}
		},
	},
	methods: {
		async autofillPejabat(jabatan) {
			let pejabat = await api.getUserByPosition({positions: [jabatan]})
			this.changePejabat(pejabat[0].nip, true)
		},
		async setProps(prop, val6) {
			this.$emit(`update:${prop}`, val6)
		},
		async searchOfficer() {
			if ((this.search != null) & (this.search != "")) {
				this.items = await api.searchUser({query: this.search})
			}
		},
		async changePejabat(nip, mounted=false) {
			await this.getPetugas(nip, mounted)
			await this.setProps('nip', nip)
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
}
</script>

<style>

</style>
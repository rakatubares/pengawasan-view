<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol md="8" sm="12">
					<CSelect
						:label="label.jabatan"
						:options.sync="option_jabatan"
						:value.sync="selected_jabatan"
						@update:value="changeFilterJabatan($event, true)"
					>
						<template #append>
							<CDropdown
								:togglerText.sync="txt_plh"
								color="primary"
							>
								<CDropdownItem
									@click="togglePlh(false)"
								>
									Non-PLH
								</CDropdownItem>
								<CDropdownItem
									@click="togglePlh(true)"
								>
									PLH
								</CDropdownItem>
							</CDropdown>
						</template>
					</CSelect>
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
							item-value="user_id"
							@change="changePejabat"
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
		</CForm>
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
	name: 'SelectPejabat',
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
		selectable_jabatan: Array,
		selectable_plh: Array,
		id_pejabat: Number,
		jabatan: String,
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
			option_jabatan: [],
			selected_jabatan: null,
			filter_jabatan: [],
			plh: false,
			txt_plh: 'Non-PLH'
		}
	},
	watch: {
		async search (val) {
			if (val != null) {
				let positions = {positions: this.filter_jabatan}
				this.items = await api.getUserByPosition(positions)
			}
		},
	},
	methods: {
		async createOption() {
			let positions = {positions: this.selectable_jabatan}
			let list_jabatan = await api.getJabatanByCode(positions)

			// Create Options
			list_jabatan.forEach(j => {
				let option = {
					value: j.kode,
					label: j.jabatan
				}
				this.option_jabatan.push(option)
			});
			
			// Get default pejabat when creating new document
			if (this.state == 'insert') {
				var select = this.option_jabatan[0].value
				if (this.default_jabatan != null) {
					this.option_jabatan.forEach(o => {
						if (o.value == this.default_jabatan) {
							select = o.value
						}
					});	
				}

				this.changeFilterJabatan(select, false)
				await this.autofillPejabat(this.selected_jabatan)
			}
		},
		async autofillPejabat(kd_jabatan) {
			let pejabat = await api.getUserByPosition({positions: [kd_jabatan]})
			this.changePejabat(pejabat[0].user_id, true)
		},
		async changeFilterJabatan(val, autofill=true) {
			this.selected_jabatan = val
			this.filter_jabatan = [this.selected_jabatan]
			this.$emit('update:jabatan', this.selected_jabatan)
			if ((this.plh == false) && (autofill == true)) {
				await this.autofillPejabat(this.selected_jabatan)	
			}
		},
		changePejabat(id, mounted=false) {
			this.getPetugas(id, mounted)
			this.$emit('update:id_pejabat', id)
		},
		async togglePlh(val) {
			if (val == true) {
				this.plh = true
				this.txt_plh = 'PLH'
				this.filter_jabatan = this.selectable_plh
			} else {
				this.plh = false
				this.txt_plh = 'Non-PLH'
				this.filter_jabatan = [this.selected_jabatan]
				await this.autofillPejabat(this.selected_jabatan)
			}
			this.$emit('update:plh', this.plh)
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
		this.$nextTick(function() {
			this.createOption()	
		})
	}
}
</script>

<style>

</style>
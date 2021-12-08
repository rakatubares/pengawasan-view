<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol md="8" sm="12">
					<CSelect
						:label="label.jabatan"
						:options.sync="option_jabatan"
						:value.sync="selected_jabatan"
						
					>
					<!-- @update:value="changeFilterJabatan" -->
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
				<CCol md="4" sm=12>

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
		selectable_jabatan: Array,
		selectable_plh: Array,
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
		selected_jabatan(val) {
			this.filter_jabatan = [val]
			this.$emit('update:jabatan', val)
		}
	},
	methods: {
		async createOption() {
			let positions = {positions: this.selectable_jabatan}
			let list_jabatan = await api.getJabatanByCode(positions)
			list_jabatan.forEach(row => {
				let option = {
					value: row.kode,
					label: row.jabatan
				}
				this.option_jabatan.push(option)
			});
			this.selected_jabatan = this.option_jabatan[0].value
		},
		changeFilterJabatan() {
			this.filter_jabatan = [this.jabatan]
			this.$emit('update:jabatan', this.jabatan)
		},
		changePejabat(id, mounted=false) {
			this.getPetugas(id, mounted)
			this.$emit('update:id_pejabat', id)
		},
		togglePlh(val) {
			if (val == true) {
				this.plh = true
				this.txt_plh = 'PLH'
			} else {
				this.plh = false
				this.txt_plh = 'Non-PLH'
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
		this.createOption()
	}
}
</script>

<style>

</style>
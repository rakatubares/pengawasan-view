<template>
	<div class="wrapper">
		<CRow>
			<CCol sm="12">
				<label>{{ label }}</label>
				<v-combobox
					:messages="description"
					v-model="selected"
					outlined
					:items.sync="options"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import store from '../../store'

export default {
	name: 'ComboboxJabatan',
	props: {
		label: {
			type: String,
			default: 'Lokasi',
		},
		description: String,
		value: String,
		default_jabatan: {
			type: String,
			default: 'Kepala Bidang Penindakan dan Penyidikan',
		},
	},
	data() {
		return {
			selected: this.default_jabatan,
			options: [],
		}
	},
	watch: {
		selected(val) {
			this.$emit('update:value', val)
		},
		value(val) {
			this.selected = val
		}
	},
	methods: {
		async generateJabatanOptions() {
			if (store.getters.jabatanOptions == null) {
				await this.getListJabatan()
			}
			let list_jabatan = store.getters.jabatanOptions
			this.options = list_jabatan.map(function (jabatan) {
				return jabatan.label
			})
		},
		async getListJabatan() {
			var list_jabatan = []
			var r = await api.getListJabatan()

			r.data.data.forEach(j => {
				let option = {
					'value': j.kode,
					'label': j.jabatan
				}
				list_jabatan.push(option)
			});
			
			store.commit('set', ['jabatanOptions', list_jabatan])
		},
	},
	async mounted() {
		await this.generateJabatanOptions()
	}
}
</script>

<style>

</style>
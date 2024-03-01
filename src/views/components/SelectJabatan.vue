<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol>
					<CSelect
						:label="label"
						:options.sync="options_jabatan"
						:value.sync="selected_jabatan"
					/>
				</CCol>
			</CRow>
		</CForm>
	</div>
</template>

<script>
import api from "../../router/api2"
import store from '../../store'

export default {
	name: 'SelectJabatan',
	components: {
		api,
		store,
	},
	props: {
		state: String,
		label: {
			type: String,
			default() { return 'Jabatan' }
		},
		default_jabatan: String,
		jabatan: String,
	},
	data() {
		return {
			options_jabatan: [],
			selected_jabatan: null,
		}
	},
	watch: {
		jabatan(val) {
			this.selected_jabatan = val
		},
		selected_jabatan (val) {
			this.$emit(`update:jabatan`, val)
		},
	},
	methods: {
		async setProps(prop, val) {
			this.$emit(`update:${prop}`, val)
		},
		async generateJabatanOptions() {
			if (store.getters.jabatanOptions == null) {
				await this.getListJabatan()
			}
			this.options_jabatan = store.getters.jabatanOptions
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
		async selectInitialJabatan() {
			if (this.jabatan == null) {
				this.selected_jabatan = this.default_jabatan
				this.$emit(`update:jabatan`, this.selected_jabatan)
			} else {
				this.selected_jabatan = this.jabatan
			}

			if (this.tipe_ttd != null) {
				this.selected_tipe_ttd = this.tipe_ttd
			}
		},
	},
	async mounted() {
		await this.generateJabatanOptions()
		if (this.state == 'insert') {
			await this.selectInitialJabatan()
		}
	}
}
</script>

<style>

</style>
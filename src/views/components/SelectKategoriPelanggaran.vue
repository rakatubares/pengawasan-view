<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol sm="12">
					<CSelect
						:label="label"
						:options.sync="options"
						:value.sync="value"
					/>
				</CCol>
			</CRow>
		</CForm>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import store from '../../store'

export default {
	name: 'SelectKategoriPelanggaran',
	props: {
		id: Number,
		label: {
			type: String,
			default: 'Kategori Pelanggaran',
		}
	},
	data() {
		return {
			options: [],
			value: this.id,
		}
	},
	watch: {
		id(val) {
			this.value = val
		},
		value(val) {
			this.$emit('update:id', val)
		},
	},
	methods: {
		async generateKategoriPelanggaran() {
			if (store.getters.kategoriPelanggaran == null) {
				let response = await api.getKategoriPelanggaran()
				let kategori = response.data
				store.commit('set', ['kategoriPelanggaran', kategori])
			}
			await this.constructOptions()
		},
		async constructOptions() {
			let options = []
			store.getters.kategoriPelanggaran.forEach(element => {
				options.push({value: element.id, label: element.kategori})
			});
			this.options = options
		}
	},
	mounted() {
		this.generateKategoriPelanggaran()
	}
}
</script>

<style>

</style>
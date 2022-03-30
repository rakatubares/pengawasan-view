<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol sm="12">
					<CSelect
						label="Validitas informasi"
						:options.sync="options"
						:value.sync="selected_value"
					/>
				</CCol>
			</CRow>
		</CForm>
	</div>
</template>

<script>
import api from '../../router/api2.js'

const default_option_validitas = [
	{
		value: null,
		label: null
	}
]

export default {
	name: 'SelectKlasifikasiValiditas',
	props: {
		value: String
	},
	computed: {
		selected_value: {
			get() {return this.value},
			set(val) {this.$emit('update:value', val)}
		}
	},
	data() {
		return {
			options: JSON.parse(JSON.stringify(default_option_validitas))
		}
	},
	methods: {
		async getKlasifikasiValiditas() {
			let response = await api.getKlasifikasiValiditas()
			let klasifikasi = response.data.data
			this.options = klasifikasi.map((elm, idx) => {
				let label = `${elm.klasifikasi} - ${elm.keterangan}`
				return {value: elm.klasifikasi, label: label}
			})
			this.resetSelection()
		},
		resetSelection() {
			this.selected_value = this.options[0]['value']
		}
	},
	mounted() {
		this.getKlasifikasiValiditas()
	}
}
</script>

<style>

</style>
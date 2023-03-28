<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol sm="12">
					<CSelect
						label="Kepercayaan sumber informasi"
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

const default_option_kepercayaan = [
	{
		value: null,
		label: null
	}
]

export default {
	name: 'SelectKlasifikasiKepercayaan',
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
			options: JSON.parse(JSON.stringify(default_option_kepercayaan))
		}
	},
	methods: {
		async getKlasifikasiKepercayaan() {
			let response = await api.getKlasifikasiKepercayaan()
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
		this.getKlasifikasiKepercayaan()
	}
}
</script>

<style>

</style>
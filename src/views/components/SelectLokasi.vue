<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Grup Lokasi"
						:options.sync="option_lokasi"
						:value.sync="val_grup_lokasi_id"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CInput
						:label="label"
						:description="description"
						:is-valid="validatorRequired"
						:invalid-feedback="feedback"
						:value.sync="val_lokasi"
					/>
				</CCol>
			</CRow>
		</CForm>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import validators from '../../helpers/validator.js'

const default_option_lokasi = [
	{
		value: null,
		label: null
	}
]

export default {
	name: 'SelectLokasi',
	props: {
		state: String,
		grup_lokasi_id: Number,
		lokasi: String,
		label: String,
		description: String,
		feedback: String
	},
	computed: {
		val_grup_lokasi_id: {
			get() {return this.grup_lokasi_id},
			set(val) {this.$emit('update:grup_lokasi_id', val)}
		},
		val_lokasi: {
			get() {return this.lokasi},
			set(val) {this.$emit('update:lokasi', val)}
		}
	},
	data() {
		return {
			option_lokasi: JSON.parse(JSON.stringify(default_option_lokasi)),
		}
	},
	methods: {
		async getGrupLokasi() {
			let response = await api.getGrupLokasi()
			let lokasi = response.data.data
			this.option_lokasi = lokasi.map((elm, idx) => {return {value: elm.id, label: elm.lokasi}})

			if (this.state == 'insert') {
				this.val_grup_lokasi_id = this.option_lokasi[0]['value']
			}
		},
		validatorRequired(val) { return validators.required(val) },
	},
	mounted() {
		this.getGrupLokasi()
	}
}
</script>

<style>

</style>
<template>
	<div class="wrapper">
		<!-- Form input penindakan badan -->
		<CRow>
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectPilot"
								label="Nama nahkoda/pengemudi/pilot"
								:id.sync="data.entitas.id"
								:showTanggalLahir="true"
								:showWargaNegara="true"
								:showAlamat="true"
							>
							</MySelectEntitas>
						</CCol>
					</CRow>

					<!-- Button simpan -->
					<CRow>
						<CCol sm="12">
							<CButton
								color="success"
								@click="saveData()"
							>
								Simpan
							</CButton>
						</CCol>
					</CRow>
				</CForm>
			</CCol>
		</CRow>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import axios from "axios"
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import MyAlert from '../components/AlertSubmit.vue'
import MySelectEntitas from '../components/SelectEntitas.vue'
import api from '../../router/api.js'
import validators from '../../helpers/validator.js'

const data_default = {
	entitas: {id: null}
}

export default {
	name: 'FormDetailBadan',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas
	},
	props: {
		state: {
			type: String,
			default: 'input'
		},
		id: Number,
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			data: { ...data_default }
		}
	},
	methods: {
		getData() {
			if (this.state != 'input') {
				axios
					.get(api.getBadanById(this.doc_type, this.doc_id))
					.then(
						(response) => {
							this.data = response.data.data
						}
					)
			}
		},
		saveData() {
			let submit_url = api.getBadanById(this.doc_type, this.doc_id)
			axios
				.post(submit_url, this.data)
				.then(
					(response) => {
						this.alert('Penindakan badan berhasil disimpan')
						this.$emit('input-data')
					}
				)
		},
		alert(text) {
			this.$refs.alert.show_alert(text)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>

</style>
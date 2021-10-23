<template>
	<div class="wrapper">
		<!-- Form input penindakan sarana pengangkut -->
		<CRow>
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="8" sm="12">
							<CInput
								label="Nama sarana pengangkut"
								:value.sync="data.nama_sarkut"
								:is-valid="validatorRequired"
								invalid-feedback="Nama sarana pengangkut wajib diisi"
							/>
						</CCol>
						<CCol md="4" sm="12">
							<CInput
								label="Jenis sarana pengangkut"
								:value.sync="data.jenis_sarkut"
								:is-valid="validatorRequired"
								invalid-feedback="Jenis sarana pengangkut wajib diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="4" sm="12">
							<CInput
								label="Nomor voyage/penerbangan/trayek"
								:value.sync="data.no_flight_trayek"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="4" sm="8">
							<CInput
								label="Ukuran/kapasitas muatan"
								:value.sync="data.kapasitas"
							/>
						</CCol>
						<CCol md="2" sm="4">
							<CInput
								label="Satuan muatan"
								:value.sync="data.satuan_kapasitas"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="6" sm="12">
							<CInput
								label="Nama nahkoda/pengemudi/pilot"
								:value.sync="data.nama_pilot_pengemudi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="3" sm="12">
							<CInput
								label="Bendera"
								:value.sync="data.bendera"
							/>
						</CCol>
						<CCol md="3" sm="12">
							<CInput
								label="Nomor registrasi/polisi"
								:value.sync="data.no_reg_polisi"
							/>
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
		<MyAlert ref="alertSarkut"></MyAlert>
	</div>
</template>

<script>
import axios from "axios"

import MyAlert from '../components/AlertSubmit.vue'
import validators from '../../helpers/validator.js'

const data_default = {
	nama_sarkut: null,
	jenis_sarkut: null,
	no_flight_trayek: null,
	kapasitas_sarkut: null,
	nama_pilot_pengemudi: null,
	bendera: null,
	no_reg_polisi: null,
}

export default {
	name: 'FormDetailSarkut',
	components: {
		MyAlert
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
	computed: {
		API_SARKUT() { return process.env.VUE_APP_BASEAPI + '/' + this.doc_type + '/' + this.doc_id + '/sarkut' },
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
					.get(this.API_SARKUT)
					.then(
						(response) => {
							this.data = response.data.data
						}
					)
					.catch((error) => console.log(error))
			}
		},
		saveData() {
			let submit_url = this.API_SARKUT
			axios
				.post(submit_url, this.data)
				.then(
					(response) => {
						this.alert('Penindakan sarana pengangkut berhasil disimpan')
						this.$emit('input-data')
					}
				)
				.catch((error) => {console.error(error)})
		},
		alert(text, color, time) {
			this.$refs.alertSarkut.show_alert(text, color, time)
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
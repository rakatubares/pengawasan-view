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
								:value.sync="data.jumlah_kapasitas"
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
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectPilot"
								label="Nama nahkoda/pengemudi/pilot"
								:id.sync="data.pilot.id"
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
		<MyAlert ref="alertSarkut"></MyAlert>
	</div>
</template>

<script>
import axios from "axios"

import MyAlert from '../components/AlertSubmit.vue'
import MySelectEntitas from '../components/SelectEntitas.vue'
import api from '../../router/api.js'
import validators from '../../helpers/validator.js'

const data_default = {
	nama_sarkut: null,
	jenis_sarkut: null,
	no_flight_trayek: null,
	jumlah_kapasitas: null,
	satuan_kapasitas: null,
	pilot: {id: null},
	bendera: null,
	no_reg_polisi: null,
}

export default {
	name: 'FormDetailSarkut',
	components: {
		MyAlert,
		MySelectEntitas
	},
	props: {
		state: {
			type: String,
			default: 'insert'
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
			console.log('state', this.state)
			if (this.state == 'edit') {
				axios
					.get(api.getSarkutById(this.doc_type, this.doc_id))
					.then(
						(response) => {
							this.data = response.data.data
							this.$refs.selectPilot.getEntitas(this.data.pilot.id, true)
						}
					)
					.catch((error) => console.log(error))
			}
		},
		saveData() {
			let submit_url = api.getSarkutById(this.doc_type, this.doc_id)
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
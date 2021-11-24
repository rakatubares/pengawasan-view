<template>
	<div class="wrapper">
		<!-- Form BA Segel header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.sprint.id"
					>
					</MySelectSprint>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CInput
						label="Jenis Segel"
						description="Jenis segel yang digunakan (kertas, kunci, timah, lak, segel elektronik, dll)"
						:value.sync="data.jenis_segel"
						:is-valid="validatorRequired"
						invalid-feedback="Jenis segel wajib diisi"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Jumlah Segel"
						description="Jumlah segel yang digunakan"
						:value.sync="data.jumlah_segel"
						:is-valid="validatorNumber"
						invalid-feedback="Jumlah segel wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Lokasi Segel"
						description="Bagian / lokasi tempat segel ditempatkan / dilekatkan"
						:value.sync="data.lokasi_segel"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama lengkap pengangkut / kuasa barang / sarana pengangkut atau pemilik / yang menguasai bangunan atau tempat lain yang menyaksikan penyegelan"
						:showAlamat="true"
						:id.sync="data.saksi.id"
					>
					</MySelectEntitas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan penitipan"
						:id.sync="data.petugas1.user_id"
						:byUser="true"
					>
					</MySelectPetugas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas2"
						label="Nama Petugas 2"
						description="Nama Pejabat Bea dan Cukai yang melakukan penitipan"
						:id.sync="data.petugas2.user_id"
					>
					</MySelectPetugas>
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

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import axios from "axios"

import api from '../../../router/api.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const API = process.env.VUE_APP_BASEAPI + '/segel'

const data_default = {
	sprint: {id: null},
	tgl_sprint: null,
	jenis_segel: null,
	jumlah_segel: null,
	nomor_segel: null,
	lokasi_segel: null,
	saksi: {id: null},
	petugas1: {user_id: null},
	petugas2: {user_id: null},
}

export default {
	name: 'FormSegel',
	components: {
		MyAlert,
		MySelectEntitas,
		MySelectPetugas,
		MySelectSprint
	},
	props: {
		state: {
			Type: String,
			default: 'insert'
		},
		id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default)),
		}
	},
	methods: {
		getData() {
			if (this.state == 'edit') {
				axios
					.get(api.getSegelById(this.id))
					.then(
						(response) => {
							this.data = response.data.data

							// Show reference
							this.$refs.selectSprint.getSprint(this.data.sprint.id, true)
							this.$refs.selectSaksi.getEntitas(this.data.saksi.id, true)
							this.$refs.selectPetugas1.getPetugas(this.data.petugas1.user_id, true)
							if (response.data.data.petugas2 != null) {
								this.$refs.selectPetugas2.getPetugas(this.data.petugas2.user_id, true)	
							} else {
								this.data.petugas2 = {user_id: null}
							}
						}
					)
			}
		},
		saveData() {
			let submit_method
			let submit_url
			submit_method = this.state == 'insert' ? 'post' : 'put'
			submit_url = this.state == 'insert' ? 
				api.getSegel() : 
				api.getSegelById(this.id)

			axios({
				method: submit_method,
				url: submit_url,
				data: this.data,
			})
				.then((response) => {
					this.$emit('save-data', this.state)
					this.$emit('update:state', 'edit')
					if (submit_method == 'post') {
						this.$emit('update:id', response.data.id)
					}
					this.alert('Data header berhasil disimpan')
				})
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorNumber(val) { return validators.number(val) },
	},
	mounted() {
		this.getData(true)
	}
}
</script>

<style>
.row+.row {
	margin-top:0;
}
.v-text-field__details {
	display: none;
}
</style>
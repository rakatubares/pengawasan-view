<template>
	<div class="wrapper">
		<!-- Form input penindakan bangunan -->
		<CRow>
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="12">
							<CTextarea
								label="Alamat"
								description="Tempat/lokasi dilakukan penindakan"
								:value.sync="data.alamat"
								:is-valid="validatorRequired"
								invalid-feedback="Alamat wajib diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="6">
							<CInput
								label="Nomor registrasi"
								description="Nomor registrasi bangunan/NPPBKC/NPWP/dokumen lainnya yang berkaitan dengan bangunan/tempat lain yang terhadapnya dilakukan penindakan"
								:value.sync="data.no_reg"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="6">
							<CInput
								label="Nama pemilik/yang menguasai"
								description="Nama pemilik/yang menguasai tempat/bangunan"
								:value.sync="data.pemilik"
								:is-valid="validatorRequired"
								invalid-feedback="Nama pemilik wajib diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="2">
							<CInput
								label="Jenis identitas"
								description="Jenis Identitas pemilik/yang menguasai"
								:value.sync="data.jns_identitas"
							/>
						</CCol>
						<CCol md="4">
							<CInput
								label="Nomor identitas"
								description="Nomor Identitas pemilik/yang menguasai"
								:value.sync="data.no_identitas"
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
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import axios from "axios"

import MyAlert from '../components/AlertSubmit.vue'
import validators from '../../helpers/validator.js'

const data_default = {
	alamat: null,
	no_reg: null,
	pemilik: null,
	identitas: null,
}

export default {
	name: 'FormDetailBangunan',
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
		API_BANGUNAN() { return process.env.VUE_APP_BASEAPI + '/' + this.doc_type + '/' + this.doc_id + '/bangunan' },
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
					.get(this.API_BANGUNAN)
					.then(
						(response) => {
							this.data = response.data.data
						}
					)
					.catch((error) => console.error(error))
			}
		},
		saveData() {
			let submit_url = this.API_BANGUNAN
			axios
				.post(submit_url, this.data)
				.then(
					(response) => {
						this.alert('Penindakan bangunan berhasil disimpan')
						this.$emit('input-data')
					}
				)
				.catch((error) => {console.error(error)})
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
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
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
						<CCol md="12">
							<MySelectEntitas
								ref="selectPemilik"
								label="Nama pemilik/yang menguasai"
								description="Nama pemilik/yang menguasai tempat/bangunan"
								:id.sync="data.pemilik.id"
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

import MyAlert from '../components/AlertSubmit.vue'
import MySelectEntitas from '../components/SelectEntitas.vue'
import api from '../../router/api.js'
import validators from '../../helpers/validator.js'

const data_default = {
	alamat: null,
	no_reg: null,
	pemilik: {id: null},
}

export default {
	name: 'FormDetailBangunan',
	components: {
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
					.get(api.getBangunanById(this.doc_type, this.doc_id))
					.then(
						(response) => {
							this.data = response.data.data
							this.$refs.selectPemilik.getEntitas(this.data.pemilik.id, true)
						}
					)
					.catch((error) => console.error(error))
			}
		},
		saveData() {
			let submit_url = api.getBangunanById(this.doc_type, this.doc_id)
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
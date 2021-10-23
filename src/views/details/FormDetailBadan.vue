<template>
	<div class="wrapper">
		<!-- Form input penindakan badan -->
		<CRow>
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="12">
							<CInput
								label="Nama"
								description="Nama orang yang dilakukan penindakan"
								:value.sync="data.nama"
								:is-valid="validatorRequired"
								invalid-feedback="Nama wajib diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="6">
							<div class="form-group">
								<label class="w-100">Tanggal Lahir</label>
								<date-picker 
									v-model="data.tgl_lahir" 
									format="DD-MM-YYYY" 
									value-type="format"
									type="date"
								></date-picker>	
							</div>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="6">
							<CInput
								label="Kewarganegaraan"
								description="Warga negara orang yang dilakukan penindakan"
								:value.sync="data.warga_negara"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<CTextarea
								label="Alamat"
								description="Alamat orang yang dilakukan penindakan"
								:value.sync="data.alamat"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="2">
							<CInput
								label="Jenis identitas"
								description="Jenis identias orang yang dilakukan penindakan"
								:value.sync="data.jns_identitas"
							/>
						</CCol>
						<CCol md="4">
							<CInput
								label="Nomor identitas"
								description="Nomor identitas orang yang dilakukan penindakan"
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import MyAlert from '../components/AlertSubmit.vue'
import validators from '../../helpers/validator.js'

const API = process.env.VUE_APP_BASEAPI + '/sbp'

const data_default = {
	nama: null,
	tgl_lahir: null,
	warga_negara: null,
	alamat: null,
	jns_identitas: null,
	no_identitas: null,
}

export default {
	name: 'FormDetailBadan',
	components: {
		DatePicker,
		MyAlert
	},
	props: {
		state: {
			type: String,
			default: 'input'
		},
		id: Number,
		doc_id: Number,
	},
	computed: {
		API_BADAN() { return API + '/' + this.doc_id + '/badan' },
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
					.get(this.API_BADAN)
					.then(
						(response) => {
							this.data = response.data.data
						}
					)
			}
		},
		saveData() {
			let submit_url = this.API_BADAN
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
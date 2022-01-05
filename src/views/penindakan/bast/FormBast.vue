<template>
	<div class="wrapper">
		<!-- Form SBP header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="9" sm="12">
					<CInput
						label="No Sprint"
						description="Nomor Surat Perintah"
						:value.sync="data.no_sprint"
						:is-valid="validatorRequired"
						invalid-feedback="No SPRINT wajib diisi"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl Sprint</label>
						<date-picker 
							v-model="data.tgl_sprint" 
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
							@change="validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tgl_sprint', 'Tanggal SPRINT wajib diisi')"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.tgl_sprint.state,
										'is-invalid': !validasi.tgl_sprint.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.tgl_sprint.text}}</div>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>	
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Nama Penerima"
						description="Nama orang yang menerima serah terima"
						:value.sync="data.nama_penerima"
						:is-valid="validatorRequired"
						invalid-feedback="Nama penerima wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4">
					<CInput
						label="Jenis Identitas"
						:value.sync="data.jns_identitas"
					/>
				</CCol>
				<CCol md="8">
					<CInput
						label="Nomor Identitas"
						:value.sync="data.no_identitas"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Atas Nama"
						description="Nama pribadi/entitas/Kantor/Unit yang diwakili oleh pihak yang menerima penyerahan"
						:value.sync="data.atas_nama_penerima"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Dalam Rangka"
						description="Alasan dilakukan serah terima"
						:value.sync="data.dalam_rangka"
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

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import _ from 'lodash'
import axios from "axios"
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import MyAlert from '../../components/AlertSubmit.vue'
import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'

const API = process.env.VUE_APP_BASEAPI + '/bast'

const data_default = {
	no_sprint: null,
	tgl_sprint: null,
	nama_penerima: null,
	jns_identitas: null,
	no_identitas: null,
	atas_nama_penerima: null,
	dalam_rangka: null,
	pejabat: 'pemeriksa'
}

const custom_validations_default = {
	tgl_sprint: {
		state: false,
		text: 'Tanggal SPRINT wajib diisi'
	},
}

export default {
	name: 'FormBast',
	components: {
		DatePicker,
		MyAlert
	},
	props: {
		state: {
			type: String,
			default: 'insert'
		},
		id: Number
	},
	computed: {
		API_BAST_ID() { return API + '/' + this.id }
	},
	data() {
		return {
			data: { ...data_default },
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
		}
	},
	methods: {
		getData() {
			if (this.state == 'edit') {
				axios
					.get(this.API_BAST_ID)
					.then(
						(response) => {
							this.data = response.data.data
							this.validatorDatetime(this.data.tgl_sprint, 'DD-MM-YYYY', 'validasi.tgl_sprint', 'Tanggal SPRINT wajib diisi')	
						}
					)
			}
		},
		saveData() {
			let submit_method
			let submit_url
			submit_method = this.state == 'insert' ? 'post' : 'put'
			submit_url = this.state == 'insert' ? API : API + '/' + this.id
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
		validatorDatetime(val, format, validasiName, text) { 
			let dt = converters.date(val, format)
			let valid = validators.date(dt)
			_.set(this, validasiName+'.state', valid)
			_.set(this, validasiName+'.text', text)
		},
		validatorSequence(valInitial, valFinal, validasiNameInitial, validasiNameFinal, textInitial, textFinal, format) {
			if (valInitial != null && valFinal != null) {
				let dtInitial = converters.date(valInitial, format)
				let dtFinal = converters.date(valFinal, format)
				let valid = validators.dateSequence(dtInitial, dtFinal)
				_.set(this, validasiNameInitial+'.state', valid)
				_.set(this, validasiNameInitial+'.text', textInitial)
				_.set(this, validasiNameFinal+'.state', valid)
				_.set(this, validasiNameFinal+'.text', textFinal)
			}
		}
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>

</style>
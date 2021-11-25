<template>
	<div class="wrapper">

		<!-- Form SBP header -->
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
				<CCol sm="12">
					<CInput
						label="Lokasi Penindakan"
						description="Tempat / lokasi dilakukan penindakan"
						:value.sync="data.lokasi_penindakan"
						:is-valid="validatorRequired"
						invalid-feedback="Lokasi penindakan wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Uraian Penindakan"
						description="Uraian / kronologis singkat terkait penindakan"
						:value.sync="data.uraian_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Alasan Penindakan"
						description="Pertimbangan dan alasan dilakukannya penindakan"
						:value.sync="data.alasan_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4" sm="12">
					<CSelect
						label="Jenis Pelanggaran"
						description="Jenis dugaan pelanggaran"
						:options="jenis_pelanggaran_options"
						:value.sync="data.jenis_pelanggaran"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Waktu mulai penindakan</label>
						<date-picker 
							v-model="data.wkt_mulai_penindakan" 
							format="DD-MM-YYYY HH:mm" 
							value-type="format"
							type="datetime"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY HH:mm', 'validasi.wkt_mulai_penindakan', 'Waktu mulai penindakan wajib diisi')
								validatorSequence(
									$event, 
									data.wkt_selesai_penindakan, 
									'validasi.wkt_mulai_penindakan',
									'validasi.wkt_selesai_penindakan',
									'Waktu mulai penindakan sebelum waktu selesai',
									'Waktu selesai penindakan setelah waktu mulai',
									'DD-MM-YYYY HH:mm'
								)
							"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.wkt_mulai_penindakan.state,
										'is-invalid': !validasi.wkt_mulai_penindakan.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.wkt_mulai_penindakan.text}}</div>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Waktu selesai penindakan</label>
						<date-picker 
							v-model="data.wkt_selesai_penindakan" 
							format="DD-MM-YYYY HH:mm" 
							value-type="format"
							type="datetime"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY HH:mm', 'validasi.wkt_selesai_penindakan', 'Waktu selesai penindakan wajib diisi')
								validatorSequence(
									data.wkt_mulai_penindakan, 
									$event, 
									'validasi.wkt_mulai_penindakan',
									'validasi.wkt_selesai_penindakan',
									'Waktu mulai penindakan sebelum waktu selesai',
									'Waktu selesai penindakan setelah waktu mulai',
									'DD-MM-YYYY HH:mm'
								)
							"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.wkt_selesai_penindakan.state,
										'is-invalid': !validasi.wkt_selesai_penindakan.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.wkt_selesai_penindakan.text}}</div>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Hal yang terjadi"
						description="Hal-hal lain yang perlu diterangkan pada saat proses penindakan"
						:value.sync="data.hal_terjadi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Pengangkut/Pemilik/Kuasa/Saksi"
						description="Nama terang Pengangkut/Pemilik/Kuasa/Saksi yang menyaksikan penindakan"
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
import _ from 'lodash'
import axios from "axios"
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api.js'
import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const data_default = {
	sprint: {id: null},
	lokasi_penindakan: null,
	uraian_penindakan: null,
	alasan_penindakan: null,
	jenis_pelanggaran: 'Kepabeanan',
	wkt_mulai_penindakan: null,
	wkt_selesai_penindakan: null,
	hal_terjadi: null,
	saksi: {id: null},
	petugas1: {user_id: null},
	petugas2: {user_id: null},
}

const custom_validations_default = {
	tgl_sprint: {
		state: false,
		text: 'Tanggal SPRINT wajib diisi'
	},
	wkt_mulai_penindakan: {
		state: false,
		text: 'Waktu mulai penindakan wajib diisi'
	},
	wkt_selesai_penindakan: {
		state: false,
		text: 'Waktu selesai penindakan wajib diisi'
	},
}

const jenis_pelanggaran = ['Kepabeanan', 'Cukai']

export default {
	name: 'FormSbp',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas,
		MySelectPetugas,
		MySelectSprint,
	},
	props: {
		state: {
			type: String,
			default: 'insert'
		},
		id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			jenis_pelanggaran_options: [ ...jenis_pelanggaran ],
		}
	},
	methods: {
		getData(validate_first = false) {
			if (this.state == 'edit') {
				axios
					.get(api.sbpId(this.id))
					.then(
						(response) => {
							this.data = response.data.data
							if (validate_first) {
								this.validatorDatetime(this.data.tgl_sprint, 'DD-MM-YYYY', 'validasi.tgl_sprint', 'Tanggal SPRINT wajib diisi')	
								this.validatorDatetime(this.data.wkt_mulai_penindakan, 'DD-MM-YYYY HH:mm', 'validasi.wkt_mulai_penindakan', 'Waktu mulai penindakan wajib diisi')
								this.validatorDatetime(this.data.wkt_selesai_penindakan, 'DD-MM-YYYY HH:mm', 'validasi.wkt_selesai_penindakan', 'Waktu selesai penindakan wajib diisi')
								this.validatorSequence(
									this.data.wkt_mulai_penindakan, 
									this.data.wkt_selesai_penindakan, 
									'validasi.wkt_mulai_penindakan',
									'validasi.wkt_selesai_penindakan',
									'Waktu mulai penindakan sebelum waktu selesai',
									'Waktu selesai penindakan setelah waktu mulai',
									'DD-MM-YYYY HH:mm'
								)
							}

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
				api.sbp() : 
				api.sbpId(this.id)

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
<template>
	<div class="wrapper">

		<!-- Form SBP header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.penindakan.sprint.id"
					>
					</MySelectSprint>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Lokasi Penindakan"
						description="Tempat / lokasi dilakukan penindakan"
						:value.sync="data.penindakan.lokasi_penindakan"
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
						:value.sync="data.main.data.uraian_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Alasan Penindakan"
						description="Pertimbangan dan alasan dilakukannya penindakan"
						:value.sync="data.main.data.alasan_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4" sm="12">
					<CSelect
						label="Jenis Pelanggaran"
						description="Jenis dugaan pelanggaran"
						:options="jenis_pelanggaran_options"
						:value.sync="data.main.data.jenis_pelanggaran"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Waktu mulai penindakan</label>
						<date-picker 
							v-model="data.main.data.wkt_mulai_penindakan" 
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
							v-model="data.main.data.wkt_selesai_penindakan" 
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
						:value.sync="data.main.data.hal_terjadi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Pengangkut/Pemilik/Kuasa/Saksi"
						description="Nama terang Pengangkut/Pemilik/Kuasa/Saksi yang menyaksikan penindakan"
						:id.sync="data.penindakan.saksi.id"
					>
					</MySelectEntitas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						description="Nama Petugas Bea dan Cukai yang melakukan penindakan"
						:id.sync="data.penindakan.petugas1.user_id"
						role="p2vue.penindakan"
						:currentUser="true"
					>
					</MySelectPetugas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas2"
						label="Nama Petugas 2"
						description="Nama Petugas Bea dan Cukai yang melakukan penindakan"
						:id.sync="data.penindakan.petugas2.user_id"
						role="p2vue.penindakan"
					>
					</MySelectPetugas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPejabat"
						:label="{jabatan: 'Jabatan Atasan', nama: 'Nama Atasan'}"
						:selectable_jabatan="['bd.0503', 'bd.0504']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.dokumen.lptp.atasan.user_id"
						:jabatan.sync="data.dokumen.lptp.jabatan_atasan.kode"
						:plh.sync="data.dokumen.lptp.plh"
					>
					</MySelectPejabat>
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
import api2 from '../../../router/api2.js'
import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

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
		MySelectPejabat,
		MySelectPetugas,
		MySelectSprint,
	},
	props: {
		state: String,
		data: Object
	},
	data() {
		return {
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			jenis_pelanggaran_options: [ ...jenis_pelanggaran ],
		}
	},
	methods: {
		validateData() {
			this.validatorDatetime(this.data.main.data.wkt_mulai_penindakan, 'DD-MM-YYYY HH:mm', 'validasi.wkt_mulai_penindakan', 'Waktu mulai penindakan wajib diisi')
			this.validatorDatetime(this.data.main.data.wkt_selesai_penindakan, 'DD-MM-YYYY HH:mm', 'validasi.wkt_selesai_penindakan', 'Waktu selesai penindakan wajib diisi')
			this.validatorSequence(
				this.data.main.data.wkt_mulai_penindakan, 
				this.data.main.data.wkt_selesai_penindakan, 
				'validasi.wkt_mulai_penindakan',
				'validasi.wkt_selesai_penindakan',
				'Waktu mulai penindakan sebelum waktu selesai',
				'Waktu selesai penindakan setelah waktu mulai',
				'DD-MM-YYYY HH:mm'
			)
			this.$refs.selectSprint.getSprint(this.data.penindakan.sprint.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.penindakan.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.penindakan.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.penindakan.petugas2.user_id, true)
			this.$refs.selectPejabat.getPetugas(this.data.dokumen.lptp.atasan.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api2.storeDoc('sbp', this.data)
					let doc_id = response.main.data.id
					this.$emit('submit-data', doc_id)
					this.$emit('update:state', 'edit')
					this.alert('Data SBP berhasil disimpan')
				} catch (error) {
					console.log('form sbp - save data - error', JSON.parse(JSON.stringify(error)))
				}
			} else if (this.state == 'edit') {
				try {
					await api2.updateDoc('sbp', this.data.main.data.id, this.data)
					this.$emit('submit-data')
					this.alert('Data SBP berhasil diubah')
				} catch (error) {
					console.log('form sbp - update data - error', JSON.parse(JSON.stringify(response)))
				}
			}
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
	watch: {
		data: function(val) {
			this.validateData()
		}
	},
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
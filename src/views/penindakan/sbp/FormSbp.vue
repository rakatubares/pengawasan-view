<template>
	<div class="wrapper form-sbp">

		<!-- Form SBP header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.penindakan.sprint.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<!-- <CInput
						label="Lokasi Penindakan"
						description="Tempat / lokasi dilakukan penindakan"
						:value.sync="data.penindakan.lokasi_penindakan"
						:is-valid="validatorRequired"
						invalid-feedback="Lokasi penindakan wajib diisi"
					/> -->
					<MySelectLokasi
						:state.sync="state"
						:grup_lokasi_id.sync="data.penindakan.grup_lokasi.id"
						:lokasi.sync="data.penindakan.lokasi_penindakan"
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
				<CCol sm="12">
					<CTextarea
						label="Catatan LPTP"
						description="Catatan atasan Pejabat Bea dan Cukai yang melaksanakan penindakan"
						:value.sync="data.lptp.catatan"
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
					/>
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
					/>
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
					/>
				</CCol>
			</CRow>
			<CRow v-if="doc_type == 'sbp'">
				<CCol md="12">
					<MySelectPejabat
						ref="selectPejabat"
						:label="{jabatan: 'Jabatan Atasan', nama: 'Nama Atasan'}"
						:selectable_jabatan="['bd.0503', 'bd.0504']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.lptp.atasan.user.user_id"
						:jabatan.sync="data.lptp.atasan.jabatan.kode"
						:plh.sync="data.lptp.atasan.plh"
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectLokasi from '../../components/SelectLokasi.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const default_data = {
	uraian_penindakan: null,
	alasan_penindakan: null,
	jenis_pelanggaran: 'kepabeanan',
	wkt_mulai_penindakan: null,
	wkt_selesai_penindakan: null,
	hal_terjadi: null,
	penindakan: {
		grup_lokasi: {id: null},
		lokasi_penindakan: null,
		sprint: {id: null},
		saksi: {id: null},
		petugas1: {user_id: null},
		petugas2: {user_id: null}
	},
	lptp: {
		catatan: null,
		atasan: {
			jabatan: {
				kode: 'bd.0503',
				jabatan: null
			},
			plh: false,
			user: {
				user_id: null
			}
		}
	},
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
		MySelectLokasi,
		MySelectPejabat,
		MySelectPetugas,
		MySelectSprint,
	},
	props: {
		state: String,
		doc_type: String,
		tipe_surat: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			jenis_pelanggaran_options: [ ...jenis_pelanggaran ],
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById(this.doc_type, this.doc_id)
			this.data = response.data.data

			if (this.data.penindakan.petugas2 == null) {
				this.data.penindakan.petugas2 = {user_id: null}
			}
			
			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
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
			this.$refs.selectSprint.getSprint(this.data.penindakan.sprint.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.penindakan.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.penindakan.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.penindakan.petugas2.user_id, true)
			if (this.doc_type == 'sbp') {
				this.$refs.selectPejabat.getPetugas(this.data.lptp.atasan.user.user_id, true)	
			}
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)
					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert(`Data ${this.tipe_surat} berhasil disimpan`)
				} catch (error) {
					console.log(`form ${this.doc_type} - save data - error`, error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.alert(`Data ${this.tipe_surat} berhasil diubah`)
				} catch (error) {
					console.log(`form ${this.doc_type} - update data - error`, error)
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
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
.form-sbp .row+.row {
	margin-top:0;
}

.form-sbp .v-text-field__details {
	display: none;
}
</style>
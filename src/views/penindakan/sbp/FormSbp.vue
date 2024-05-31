<template>
	<div class="wrapper my-form">

		<!-- Form SBP header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MyToggleSearchDocument
						ref="ToggleSearchDocument"
						:doc_options="source_options"
						:doc_type.sync="data.jenis_sumber"
						:doc_id.sync="data.sumber_id"
						:doc_number.sync="data.nomor_sumber"
						:doc_date.sync="data.tanggal_sumber"
						:saved_doc_id.sync="saved_source_id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectSprint
						:id.sync="selected_sprint"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<MyComboboxLokasi
						label="Lokasi Penindakan"
						description="Tempat / lokasi dilakukan penindakan"
						:value.sync="data.penindakan.lokasi_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Uraian Penindakan"
						description="Uraian / kronologis singkat terkait penindakan"
						:value.sync="data.penindakan.uraian_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Alasan Penindakan"
						description="Pertimbangan dan alasan dilakukannya penindakan"
						:value.sync="data.penindakan.alasan_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CSelect
						label="Jenis Pelanggaran"
						description="Jenis dugaan pelanggaran"
						:options="jenis_pelanggaran_options"
						:value.sync="data.penindakan.jenis_pelanggaran"
					/>
				</CCol>
				<CCol md="6" sm="12">
					<MySelectKategoriPelanggaran
						label="Kategori Penindakan"
						:id.sync="data.penindakan.kategori_penindakan.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tanggal/Waktu Mulai Penindakan</label>
				<CCol md="3" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.penindakan.tanggal_mulai_penindakan"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
							class="w-100"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
								/>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
						<small class="form-text text-muted w-100">Tanggal</small>
					</div>
				</CCol>
				<CCol md="2" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.penindakan.waktu_mulai_penindakan"
							format="HH:mm" 
							value-type="format"
							type="time"
							class="w-100"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
								/>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
						<small class="form-text text-muted w-100">Jam</small>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tanggal/Waktu Selesai Penindakan</label>
				<CCol md="3" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.penindakan.tanggal_selesai_penindakan"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
							class="w-100"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
								/>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
						<small class="form-text text-muted w-100">Tanggal</small>
					</div>
				</CCol>
				<CCol md="2" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.penindakan.waktu_selesai_penindakan"
							format="HH:mm" 
							value-type="format"
							type="time"
							class="w-100"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
								/>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
						<small class="form-text text-muted w-100">Jam</small>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Hal yang terjadi"
						description="Hal-hal lain yang perlu diterangkan pada saat proses penindakan"
						:value.sync="data.penindakan.hal_terjadi"
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
					<MySelectEntitasOrang 
						state="insert"
						label="Nama Pengangkut/Pemilik/Kuasa/Saksi/Orang yang Diperiksa"
						description="Nama terang Pengangkut/Pemilik/Kuasa/Saksi yang menyaksikan penindakan/Orang yang Diperiksa"
						:entity_id.sync="data.penindakan.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 1"
						description="Nama Petugas Bea dan Cukai yang melakukan penindakan"
						:nip.sync="data.penindakan.petugas.petugas1.nip"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 2"
						description="Nama Petugas Bea dan Cukai yang melakukan penindakan"
						:nip.sync="data.penindakan.petugas.petugas2.nip"
					/>
				</CCol>
			</CRow>
			<CRow v-if="doc_type == 'sbp'">
				<CCol md="12">
					<MySelectPejabat
						ref="selectPejabat"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Atasan', 'nama': 'Nama Atasan'}"
						:default_jabatan.sync="default_atasan"
						:jabatan.sync="data.lptp.petugas.atasan.kode_jabatan"
						:tipe_ttd.sync="data.lptp.petugas.atasan.tipe_ttd"
						:nip.sync="data.lptp.petugas.atasan.nip"
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
	</div>
</template>

<script>
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyComboboxLokasi from '../../components/ComboboxLokasi.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectKategoriPelanggaran from '../../components/SelectKategoriPelanggaran.vue'
import MySelectLokasi from '../../components/SelectLokasi.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'
import MyToggleSearchDocument from '../../components/ToggleSearchDocument.vue'

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
		MyComboboxLokasi,
		MySearchDocument,
		MySelectEntitas,
		MySelectEntitasOrang,
		MySelectKategoriPelanggaran,
		MySelectLokasi,
		MySelectPejabat,
		MySelectPetugas,
		MySelectSprint,
		MyToggleSearchDocument,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
		source_options: {
			type: Object,
			default() {
				return {
					'nhi': {'label': 'NHI', 'state': 'search', 'filters': {'status_sbp': false}}, 
					'lap': {'label': 'LAP', 'state': 'search'},
				}
			}
		}
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			jenis_pelanggaran_options: [ ...jenis_pelanggaran ],
			default_atasan: 'bd.0503',
		}
	},
	computed: {
		saved_source_id: {
			get() { return this.data.sumber_id },
			set(val) { this.data.sumber_id = val }
		},
		selected_sprint: {
			get() { return this.data.penindakan.sprint.id },
			set(val) { this.data.penindakan.sprint.id = val },
		}
	},
	watch: {
		document(val) { this.data = val },
	},
	methods: {
		async saveData() {
			if (this.state == 'insert') {
				var data = await api.storeDoc(this.doc_type, this.data)
				this.$emit('update:state', 'edit')
			} else if (this.state == 'edit') {
				var data = await api.updateDoc(this.doc_type, this.data.id, this.data)
			}
			this.$emit('save-data', data)
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
}
</script>

<style>

</style>
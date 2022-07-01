<template>
	<div class="wrapper form-lppi">
		<CForm class="pt-3">
			<CRow>
				<CCol sm="12">
					<h5>Sumber Informasi</h5>
				</CCol>
			</CRow>
			
			<!-- Sumber Internal -->
			<CRow>
				<CCol sm="12">
					<b>
						<CInputCheckbox
							label="Internal"
							:checked.sync="data.flag_info_internal"
							@update:checked="toggleFlagInternal"
						/>
					</b>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="6">
					<CInput
						label="Media"
						description="Media informasi. Contoh: kajian / sms center / Nota lnformasi / LPTI / surat / nota dinas"
						:value.sync="data.media_info_internal"
						:disabled="data.flag_info_internal == false"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Terima</label>
						<date-picker
							v-model="data.tgl_terima_info_internal"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									:disabled="data.flag_info_internal == false"
								/>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="6">
					<CInput
						label="No. Dokumen"
						:value.sync="data.no_dok_info_internal"
						:disabled="data.flag_info_internal == false"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Dokumen</label>
						<date-picker
							v-model="data.tgl_dok_info_internal"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									:disabled="data.flag_info_internal == false"
								/>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>

			<!-- Sumber Eksternal -->
			<CRow>
				<CCol sm="12">
					<b>
						<CInputCheckbox
							label="Eksternal"
							:checked.sync="data.flag_info_eksternal"
							@update:checked="toggleFlagEksternal"
						/>
					</b>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="6">
					<CInput
						label="Media"
						description="Media informasi. Contoh: informasi dari institusi lain / pengaduan / masyarakat / surat informan"
						:value.sync="data.media_info_eksternal"
						:disabled="data.flag_info_eksternal == false"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Terima</label>
						<date-picker
							v-model="data.tgl_terima_info_eksternal"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									:disabled="data.flag_info_eksternal == false"
								/>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="6">
					<CInput
						label="No. Dokumen"
						:value.sync="data.no_dok_info_eksternal"
						:disabled="data.flag_info_eksternal == false"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Dokumen</label>
						<date-picker
							v-model="data.tgl_dok_info_eksternal"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									:disabled="data.flag_info_eksternal == false"
								/>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>

			<!-- Ikhtisar -->
			<CRow>
				<CCol sm="12">
					<h5>Ikhtisar</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<MyTableIkhtisar
						ref="tableIkhtisar"
						state="insert"
						:data_ikhtisar.sync="data.ikhtisar"
						@update-data="updateIkhtisar"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Kesimpulan"
						:value.sync="data.kesimpulan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Catatan"
						:value.sync="data.catatan"
					/>
				</CCol>
			</CRow>
			<CRow class="mb-2">
				<CCol sm="12" class="pb-0">
					<label class="w-100">Tindak Lanjut</label>
				</CCol>
				<CCol md="3" sm="12" class="pt-0">
					<CInputCheckbox
						label="Analisis"
						:checked.sync="data.flag_analisis"
					/>
				</CCol>
				<CCol md="3" sm="12" class="pt-0">
					<CInputCheckbox
						label="Arsip"
						:checked.sync="data.flag_arsip"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPenerima"
						label="Nama Penerima Informasi"
						description="Pegawai yang menerima informasi"
						:id.sync="data.penerima_info.user_id"
						role="p2vue.penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPenilai"
						label="Nama Penilai Informasi"
						description="Pegawai yang menilai informasi"
						:id.sync="data.penilai_info.user_id"
						role="p2vue.penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Disposisi</label>
						<date-picker
							v-model="data.tanggal_disposisi"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
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
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectDisposisi"
						label="Nama Penerima Disposisi"
						description="Pegawai yang menerima disposisi"
						:id.sync="data.disposisi.user_id"
						role="p2vue.penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPejabat"
						:state.sync="state"
						:default_jabatan.sync="default_jabatan"
						:selectable_jabatan="['bd.0501', 'bd.0502']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.pejabat.user.user_id"
						:jabatan.sync="data.pejabat.jabatan.kode"
						:plh.sync="data.pejabat.plh"
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MyTableIkhtisar from './TableIkhtisar.vue'

const default_data = {
	flag_info_internal: false,
	media_info_internal: null,
	tgl_terima_info_internal: null,
	no_dok_info_internal: null,
	tgl_dok_info_internal: null,
	flag_info_eksternal: false,
	media_info_eksternal: null,
	tgl_terima_info_eksternal: null,
	no_dok_info_eksternal: null,
	tgl_dok_info_eksternal: null,
	penerima_info: {user_id: null},
	penilai_info: {user_id: null},
	kesimpulan: null,
	disposisi: {user_id: null},
	tanggal_disposisi: null,
	flag_analisis: false,
	flag_arsip: false,
	catatan: null,
	pejabat: {
		jabatan: {kode: null},
		plh: false,
		user: {user_id: null},
	},
	ikhtisar: []
}

export default {
	name: 'FormLppi',
	components: {
		DatePicker,
		MyAlert,
		MySelectPejabat,
		MySelectPetugas,
		MyTableIkhtisar,
	},
	props: {
		state: String,
		tipe_surat: String,
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			default_jabatan: 'bd.0501'
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById(this.doc_type, this.doc_id)
			this.data = response.data.data

			if (this.data.penerima_info == null) {
				this.data.penerima_info = JSON.parse(JSON.stringify(default_data.penerima_info))
			}

			if (this.data.penilai_info == null) {
				this.data.penilai_info = JSON.parse(JSON.stringify(default_data.penilai_info))
			}

			if (this.data.disposisi == null) {
				this.data.disposisi = JSON.parse(JSON.stringify(default_data.disposisi))
			}

			if (this.data.pejabat == null) {
				this.data.pejabat = JSON.parse(JSON.stringify(default_data.pejabat))
			}

			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectPenerima.getPetugas(this.data.penerima_info.user_id, true)
			this.$refs.selectPenilai.getPetugas(this.data.penilai_info.user_id, true)
			this.$refs.selectDisposisi.getPetugas(this.data.disposisi.user_id, true)
			this.$refs.selectPejabat.selected_jabatan = this.data.pejabat.jabatan.kode
			this.$refs.selectPejabat.togglePlh(this.data.pejabat.plh)
			this.$refs.selectPejabat.getPetugas(this.data.pejabat.user.user_id, true)
			this.$refs.tableIkhtisar.list_ikhtisar = this.data.ikhtisar
		},
		updateIkhtisar(val) {
			this.data.ikhtisar = val
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)
					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert(`Data ${this.tipe_surat} berhasil disimpan`)
				} catch (error) {
					console.log(`form lppi - save data - error`, error)
				}
			} else if (this.state == 'edit') {
				try {
					let update_data = this.data
					update_data.ikhtisar = this.data.ikhtisar.map(function(ikhtisar) {
						let update_ikhtisar = ikhtisar
						delete update_ikhtisar.index
						return update_ikhtisar
					})
					this.data = await api.updateDoc(this.doc_type, update_data.id, update_data)
					this.$emit('update:doc_id', this.data.id)
					this.alert(`Data ${this.tipe_surat} berhasil diubah`)
				} catch (error) {
					console.log(`form lppi - update data - error`, error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		toggleFlagInternal(val) {
			this.data.flag_info_internal = val
			this.data.media_info_internal = null
			this.data.tgl_terima_info_internal = null
			this.data.no_dok_info_internal = null
			this.data.tgl_dok_info_internal = null
		},
		toggleFlagEksternal(val) {
			this.data.flag_info_eksternal = val
			this.data.media_info_eksternal = null
			this.data.tgl_terima_info_eksternal = null
			this.data.no_dok_info_eksternal = null
			this.data.tgl_dok_info_eksternal = null
		},
	},
	async mounted() {
		// Change jabatan option for LPPI-N
		if (this.doc_type == 'lppin') {
			this.default_jabatan = 'bd.0502'
		}

		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
.form-lppi .row+.row {
	margin-top:0;
}

.form-lppi .v-text-field__details {
	display: none;
}
/* V-AUTOCOMPLETE */
.form-lppi .v-input__slot {
	min-height: 34px !important;
	font-size: 14px;
}
.form-lppi .v-input__prepend-outer {
	margin: 0 !important;
} 
</style>
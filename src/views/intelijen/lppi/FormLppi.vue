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
							:checked.sync="flag_info_internal"
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
							:checked.sync="flag_info_eksternal"
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
						state="insert"
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
			<CRow>
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
						:id.sync="data.penerima_info_id"
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
						:id.sync="data.penilai_info_id"
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
						:id.sync="data.disposisi_id"
						role="p2vue.penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPejabat"
						:selectable_jabatan="['bd.0501', 'bd.0502']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.pejabat.user.user_id"
						:jabatan.sync="data.pejabat.jabatan.kode"
						:plh.sync="data.pejabat.plh"
					/>
				</CCol>
			</CRow>
		</CForm>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

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
	penerima_info_id: null,
	penilai_info_id: null,
	kesimpulan: null,
	disposisi_id: null,
	tanggal_disposisi: null,
	flag_analisis: false,
	flag_arsip: false,
	catatan: null,
	pejabat: {
		jabatan: {kode: null},
		plh: false,
		user: {user_id: null},
	}
}

export default {
	name: 'FormLppi',
	components: {
		DatePicker,
		MySelectPejabat,
		MySelectPetugas,
		MyTableIkhtisar,
	},
	watch: {
		flag_info_internal(val) {
			this.data.flag_info_internal = val
			this.data.media_info_internal = null
			this.data.tgl_terima_info_internal = null
			this.data.no_dok_info_internal = null
			this.data.tgl_dok_info_internal = null
		},
		flag_info_eksternal(val) {
			this.data.flag_info_eksternal = val
			this.data.media_info_eksternal = null
			this.data.tgl_terima_info_eksternal = null
			this.data.no_dok_info_eksternal = null
			this.data.tgl_dok_info_eksternal = null
		}
	},
	data() {
		return {
			console,
			data: JSON.parse(JSON.stringify(default_data)),
			flag_info_internal: false,
			flag_info_eksternal: false,
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
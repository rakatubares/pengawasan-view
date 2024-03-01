<template>
	<div class="wrapper my-form">
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
						:nip.sync="data.petugas.penerima_informasi.nip"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPenilai"
						label="Nama Penilai Informasi"
						description="Pegawai yang menilai informasi"
						:nip.sync="data.petugas.penilai_informasi.nip"	
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
						:nip.sync="data.petugas.penerima_disposisi.nip"	
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPejabat"
						:state.sync="state"
						:label="{'jabatan': 'Pejabat', 'nama': 'Nama Pejabat'}"
						:default_jabatan.sync="default_jabatan"
						:jabatan.sync="data.petugas.pejabat.kode_jabatan"
						:tipe_ttd.sync="data.petugas.pejabat.tipe_ttd"
						:nip.sync="data.petugas.pejabat.nip"
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
	kesimpulan: null,
	tanggal_disposisi: null,
	flag_analisis: false,
	flag_arsip: false,
	catatan: null,
	ikhtisar: [],
	petugas: {
		penerima_informasi: {nip: null},
		penilai_informasi: {nip: null},
		penerima_disposisi: {nip: null},
		pejabat: {
			kode_jabatan: null,
			tipe_ttd: null,
			nip: null,
			flag_pejabat: true,
		},
	}
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
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data = response.data

			this.fillNull()
		},
		fillNull() {
			let posisi =  Object.keys(this.data.petugas)
			for (const key in default_data.petugas) {
				if (!posisi.includes(key)) {
					this.data.petugas[key] = JSON.parse(JSON.stringify(default_data.petugas[key]))
				}
			}
		},
		updateIkhtisar(val) {
			this.data.ikhtisar = val
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)
					this.fillNull()

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
					this.fillNull()
					
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

</style>
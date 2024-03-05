<template>
	<div class="wrapper my-form">
		<CForm class="pt-4">
			<!-- Dokumen sumber -->
			<!-- LPPI -->
			<CRow>
				<CCol class="pb-0" sm="12">
					<h5>Dokumen Sumber</h5>
				</CCol>
			</CRow>
			<CRow class="mt-0">
				<CCol sm="12" md="2">
					<CRow class="mt-4">
						<CCol style="display: inherit">
							<CSwitch
								color="primary"
								:checked.sync="lppi_enabled"
								@update:checked="toggleLppi"
							/>
							<b class="ml-2">{{ doc_type == 'lkain' ? 'LPPI-N' : 'LPPI' }}</b>
						</CCol>
					</CRow>
				</CCol>
				<CCol sm="12" md="6">
					<div class="form-group">
						<label>Nomor {{ doc_type == 'lkain' ? 'LPPI-N' : 'LPPI' }}</label>
						<v-autocomplete
							class="no-message"
							v-model="lppi_search_value"
							outlined
							dense
							:items.sync="lppi_search_items"
							:search-input.sync="lppi_search_query"
							item-text="no_dok_lengkap"
							item-value="id"
							@change="changeValueLppi"
							:disabled="lppi_enabled == false"
						>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-title>
										Data {{ doc_type == 'lkain' ? 'LPPI-N' : 'LPPI' }} tidak ditemukan
									</v-list-item-title>
								</v-list-item>
							</template>
							<template v-slot:item="{ item }">
								<v-list-item-content>
									<h3><v-list-item-title>{{ item.no_dok_lengkap }}</v-list-item-title></h3>
									<v-list-item-subtitle>{{ item.tanggal_dokumen }}</v-list-item-subtitle>
								</v-list-item-content>
							</template>
						</v-autocomplete>
					</div>
				</CCol>
				<CCol sm="12" md="4">
					<div class="form-group">
						<label class="w-100">Tgl. {{ doc_type == 'lkain' ? 'LPPI-N' : 'LPPI' }}</label>
						<date-picker
							v-model="data.tanggal_lppi"
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
									disabled
								/>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<!-- LPTI -->
			<CRow class="mt-0">
				<CCol sm="12" md="2">
					<CRow class="mt-4">
						<CCol style="display: inherit">
							<CSwitch
								color="primary"
								:checked.sync="data.flag_lpti"
								@update:checked="toggleLpti"
							/>
							<b class="ml-2">LPT-I</b>
						</CCol>
					</CRow>
				</CCol>
				<CCol sm="12" md="6">
					<CInput
						label="Nomor LPT-I"
						:value.sync="data.nomor_lpti"
						:disabled="data.flag_lpti == false"
					/>
				</CCol>
				<CCol sm="12" md="4">
					<div class="form-group">
						<label class="w-100">Tgl. LPT-I</label>
						<date-picker
							v-model="data.tanggal_lpti"
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
									:disabled="data.flag_lpti == false"	
								/>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<!-- NPI -->
			<CRow class="mt-0">
				<CCol sm="12" md="2">
					<CRow class="mt-4">
						<CCol style="display: inherit">
							<CSwitch
								color="primary"
								:checked.sync="data.flag_npi"
								@update:checked="toggleNpi"
							/>
							<b class="ml-2">{{ doc_type == 'lkain' ? 'NPI-N' : 'NPI' }}</b>
						</CCol>
					</CRow>
				</CCol>
				<CCol sm="12" md="6">
					<CInput
						:label="`Nomor ${doc_type == 'lkain' ? 'NPI-N' : 'NPI'}`"
						:value.sync="data.nomor_npi"
						:disabled="data.flag_npi == false"
					/>
				</CCol>
				<CCol sm="12" md="4">
					<div class="form-group">
						<label class="w-100">Tgl. {{ doc_type == 'lkain' ? 'NPI-N' : 'NPI' }}</label>
						<date-picker
							v-model="data.tanggal_npi"
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
									:disabled="data.flag_npi == false"	
								/>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>

			<!-- Analisis -->
			<CRow>
				<CCol sm="12">
					<MyTableIkhtisar
						ref="tableIkhtisar"
						:state.sync="ikhtisar_state"
						:data_ikhtisar.sync="data.ikhtisar"
						@update-data="updateIkhtisar"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Prosedur Analisis"
						:value.sync="data.prosedur"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Hasil Analisis"
						:value.sync="data.hasil"
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

			<!-- Rekomendasi -->
			<CRow>
				<CCol class="pb-0" sm="12">
					<h5>Rekomendasi</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12" class="pt-0">
					<CInputCheckbox
						label="NHI"
						:checked.sync="data.flag_rekom_nhi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12" class="pt-0">
					<CInputCheckbox
						label="NI"
						:checked.sync="data.flag_rekom_ni"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Rekomendasi Lainnya"
						:value.sync="data.rekomendasi_lain"
					/>
				</CCol>
			</CRow>
			<CRow v-if="doc_type == 'lkai'">
				<CCol md="12">
					<CTextarea
						label="Informasi Lainnya"
						:value.sync="data.informasi_lain"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CInput
						label="Tujuan"
						:value.sync="data.tujuan"
					/>
				</CCol>
			</CRow>

			<!-- TTD -->
			<!-- Analis -->
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectAnalis"
						label="Analis"
						description="Pegawai yang melakukan analisis"
						:currentUser="true"
						:nip.sync="data.petugas.analis.nip"
					/>
				</CCol>
			</CRow>

			<!-- Eseleon IV -->
			<CRow>
				<CCol class="pb-0" sm="12">
					<h5>Eselon IV</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Keputusan"
						:options="[{value: true, label: 'Setuju'}, {value: false, label: 'Tidak Setuju'}]"
						:value.sync="data.keputusan_pejabat"
						@update:value="toggleKeputusan($event, 'pejabat')"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Catatan"
						:value.sync="data.catatan_pejabat"
					/>
					<!-- description="Catatan pejabat dalam hal keputusan tidak disetujui" -->
					<!-- :disabled="data.catatan_pejabat == true" -->
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Diterima</label>
						<date-picker
							v-model="data.tanggal_terima_pejabat"
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
					<MySelectPejabat
						ref="selectPejabat"
						:state.sync="state"
						:default_jabatan.sync="default_pejabat"
						:jabatan.sync="data.petugas.pejabat.kode_jabatan"
						:tipe_ttd.sync="data.petugas.pejabat.tipe_ttd"
						:nip.sync="data.petugas.pejabat.nip"
					/>
				</CCol>
			</CRow>

			<!-- Eseleon III -->
			<CRow>
				<CCol class="pb-0" sm="12">
					<h5>Eselon III</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Keputusan"
						:options="[{value: true, label: 'Setuju'}, {value: false, label: 'Tidak Setuju'}]"
						:value.sync="data.keputusan_atasan"
						@update:value="toggleKeputusan($event, 'atasan')"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Catatan"
						:value.sync="data.catatan_atasan"
					/>
					<!-- description="Catatan pejabat dalam hal keputusan tidak disetujui" -->
					<!-- :disabled="data.keputusan_atasan == true" -->
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Diterima</label>
						<date-picker
							v-model="data.tanggal_terima_atasan"
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
					<MySelectPejabat
						ref="selectAtasan"
						:state.sync="state"
						:default_jabatan.sync="default_atasan"
						:jabatan.sync="data.petugas.atasan.kode_jabatan"
						:tipe_ttd.sync="data.petugas.atasan.tipe_ttd"
						:nip.sync="data.petugas.atasan.nip"
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
import MyTableIkhtisar from '../lppi/TableIkhtisar.vue'

const default_data = {
	lppi_id: null, 
	nomor_lppi: null,
	tanggal_lppi: null,
	flag_lpti: false,
	nomor_lpti: null,
	tanggal_lpti: null,
	flag_npi: false,
	nomor_npi: null,
	tanggal_npi: null,
	prosedur: null,
	hasil: null,
	kesimpulan: null,
	flag_rekom_nhi: false,
	flag_rekom_ni: false,
	rekomendasi_lain: null,
	informasi_lain: null,
	tujuan: null,
	keputusan_pejabat: true,
	catatan_pejabat: null,
	tanggal_terima_pejabat: null,
	keputusan_atasan: true,
	catatan_atasan: null,
	tanggal_terima_atasan: null,
	ikhtisar: [],
	petugas: {
		analis: {nip: null},
		pejabat: {
			kode_jabatan: null,
			tipe_ttd: null,
			nip: null,
			flag_pejabat: true,
		},
		atasan: {
			kode_jabatan: null,
			tipe_ttd: null,
			nip: null,
			flag_pejabat: true,
		},
	}
}

export default {
	name: 'FormLkai',
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
			lppi_type: this.doc_type == 'lkain' ? 'lppin' : 'lppi',
			lppi_search_value: null,
			lppi_search_items: [],
			lppi_search_query: null,
			lppi_search_exception: null,
			lppi_enabled: false,
			default_pejabat: 'bd.0501',
			default_atasan: 'bd.05',
			ikhtisar_state: 'insert'
		}
	},
	watch: {
		async lppi_search_query (val) {
			await this.search_lppi(val)
		},
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data = response.data

			if (this.data.lppi_id != null) {
				this.lppi_enabled = true
				this.lppi_search_exception = this.data.lppi_id
				await this.search_lppi(this.data.nomor_lppi)
				this.lppi_search_value = this.lppi_search_items[0]
				this.ikhtisar_state = 'show'
			}
		},
		fillNull() {
			let posisi = Object.keys(this.data.petugas)
			for (const key in default_data.petugas) {
				if (!posisi.includes(key)) {
					this.data.petugas[key] = JSON.parse(JSON.stringify(default_data.petugas[key]))
				}
			}
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
					console.log(`form lkai - save data - error`, error)
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
					console.log(`form lkai - update data - error`, error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		async changeValueLppi(id) {
			if (id != null) {
				// Get data lppi
				let response = await api.getDocumentById(this.lppi_type, id)
				let lppi = response.data
				
				// Specify lppi data
				this.data.lppi_id = id
				this.data.tanggal_lppi = lppi.tanggal_dokumen

				// Data ikhtisar
				this.data.ikhtisar = lppi.ikhtisar
			} else {
				this.data.lppi_id = null
				this.data.tanggal_lppi = null
				this.data.ikhtisar = []
			}
		},
		async search_lppi(search) {
			let data = {
				'src': search, 
				'flt': {'kode_status': ['terbit']}, 
				'exc': this.lppi_search_exception
			}
			let responses = await api.searchDoc(this.lppi_type, data)
			this.lppi_search_items = responses.data.data
		},
		toggleLppi(val) {
			this.lppi_enabled = val
			this.lppi_search_value = null
			this.data.lppi_id = null
			this.data.tanggal_lppi = null
			this.data.ikhtisar = []
			if (val == true) {
				this.ikhtisar_state = 'show'
			} else {
				this.ikhtisar_state = this.state
			}
		},
		toggleLpti() {
			this.data.nomor_lpti = null
			this.data.tanggal_lpti = null
		},
		toggleNpi() {
			this.data.nomor_npi = null
			this.data.tanggal_npi = null
		},
		toggleKeputusan(val, level) {
			this.data[level]['keputusan'] = val
			this.data[level]['catatan'] = null
		},
		updateIkhtisar(val) {
			this.data.ikhtisar = val
		},
	},
	async mounted() {
		// Change jabatan option for LKAI-N
		if (this.doc_type == 'lkain') {
			this.default_jabatan = 'bd.0502'
		}

		if (this.state == 'edit') {
			await this.getData()
		} else if (this.doc_type == 'lkain') {
			delete this.data.informasi_lain
		}
	}
}
</script>

<style>

</style>
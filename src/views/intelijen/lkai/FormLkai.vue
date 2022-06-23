<template>
	<div class="wrapper form-lkai">
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
									<h3><v-list-item-title v-text="item.no_dok_lengkap"></v-list-item-title></h3>
									<v-list-item-subtitle v-text="item.tanggal_dokumen"></v-list-item-subtitle>
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
						:id.sync="data.analis.user_id"
						role="p2vue.penindakan"
						:currentUser="true"
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
						:value.sync="data.pejabat.keputusan"
						@update:value="toggleKeputusan($event, 'pejabat')"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Catatan"
						description="Catatan pejabat dalam hal keputusan tidak disetujui"
						:value.sync="data.pejabat.catatan"
						:disabled="data.pejabat.keputusan == true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Diterima</label>
						<date-picker
							v-model="data.pejabat.tanggal_terima"
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
						:selectable_jabatan="['bd.0501', 'bd.0502']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.pejabat.user.user_id"
						:jabatan.sync="data.pejabat.jabatan.kode"
						:plh.sync="data.pejabat.plh"
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
						:value.sync="data.atasan.keputusan"
						@update:value="toggleKeputusan($event, 'atasan')"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Catatan"
						description="Catatan pejabat dalam hal keputusan tidak disetujui"
						:value.sync="data.atasan.catatan"
						:disabled="data.atasan.keputusan == true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Diterima</label>
						<date-picker
							v-model="data.atasan.tanggal_terima"
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
						:selectable_jabatan="['bd.05']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.atasan.user.user_id"
						:jabatan.sync="data.atasan.jabatan.kode"
						:plh.sync="data.atasan.plh"
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
	analis: {user_id: null},
	pejabat: {
		jabatan: {kode: null},
		plh: false,
		user: {user_id: null},
		keputusan: true,
		catatan: null,
		tanggal_terima: null,
	},
	atasan: {
		jabatan: {kode: null},
		plh: false,
		user: {user_id: null},
		keputusan: true,
		catatan: null,
		tanggal_terima: null,
	},
	ikhtisar: []
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
			let response = await api.getFormDataById(this.doc_type, this.doc_id)
			this.data = response.data.data

			if (this.data.lppi_id != null) {
				this.lppi_enabled = true
				this.lppi_search_exception = this.data.lppi_id
				await this.search_lppi(this.data.nomor_lppi)
				this.lppi_search_value = this.lppi_search_items[0]
				this.ikhtisar_state = 'show'
			}

			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectPejabat.selected_jabatan = this.data.pejabat.jabatan.kode
			this.$refs.selectPejabat.plh = this.data.pejabat.plh
			this.$refs.selectPejabat.getPetugas(this.data.pejabat.user.user_id, true)
			this.$refs.selectAtasan.selected_jabatan = this.data.atasan.jabatan.kode
			this.$refs.selectAtasan.plh = this.data.atasan.plh
			this.$refs.selectAtasan.getPetugas(this.data.atasan.user.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)
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
				let lppi = await api.getDocumentById(this.lppi_type, id)
				
				// Specify lppi data
				this.data.lppi_id = id
				this.data.tanggal_lppi = lppi.main.data.tanggal_dokumen

				// Data ikhtisar
				this.data.ikhtisar = lppi.main.data.ikhtisar
			} else {
				this.data.lppi_id = null
				this.data.tanggal_lppi = null
				this.data.ikhtisar = []
			}
		},
		async search_lppi(search) {
			let data = {'src': search, 'sta': [200], 'exc': this.lppi_search_exception}
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
		if (this.state == 'edit') {
			await this.getData()
		} else if (this.doc_type == 'lkain') {
			delete this.data.informasi_lain
		}
	}
}
</script>

<style>
.form-lkai .bottom {
	bottom: 1rem;
	position: absolute;
}

.form-lkai .row+.row {
	margin-top:0;
}

.form-lkai .v-text-field__details {
	display: none;
}

/* V-AUTOCOMPLETE */
.form-lkai .v-input__slot {
	min-height: 34px !important;
	font-size: 14px;
}
.form-lkai .v-input__prepend-outer {
	margin: 0 !important;
} 
.form-lkai .v-input--is-disabled .v-input__slot {
	background-color: #d8dbe0;
}
</style>
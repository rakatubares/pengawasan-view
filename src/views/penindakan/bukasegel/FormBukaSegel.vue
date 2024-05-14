<template>
	<div class="wrapper my-form">
		<!-- Form BA Buka Segel header -->
		<CForm class="pt-3">
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tanggal Pembukaan Segel</label>
				<CCol md="3" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.tanggal_buka_segel"
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
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectSprint
						:id.sync="sprint_id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol>
					<MyToggleSearchDocument
						ref="ToggleSearchDocument"
						label="Asal Segel"	
						:doc_options="source_options"
						:doc_type.sync="data.asal_segel"
						:doc_id.sync="data.segel_id"
						:doc_number.sync="data.nomor_segel"
						:doc_date.sync="data.tanggal_segel"
						:saved_doc_id.sync="saved_source_id"
						@update:doc_type="updateSegelType"
						@update:doc_id="updateSegel"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Jenis Segel"
						description="Jenis segel yang digunakan"
						:options="['Kertas', 'Kunci', 'Timah', 'Lak', 'Segel Elektronik', 'Lainnya']"
						:value.sync="data.jenis_segel"
						:disabled="data.asal_segel != 'input'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Jumlah Segel"
						:value.sync="data.jumlah_segel"
						:disabled="data.asal_segel != 'input'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Satuan"
						:value.sync="data.satuan_segel"
						:disabled="data.asal_segel != 'input'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Penempatan Segel"
						description="Bagian / lokasi tempat segel ditempatkan / dilekatkan"
						:value.sync="data.tempat_segel"
						:disabled="data.asal_segel != 'input'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol class="col-12">
					<CInput
						label="Nomor Segel"
						:value.sync="data.nomor_segel"
						:disabled="data.asal_segel != 'input'"
					/>	
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitasOrang
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama terang pengangkut / pemilik / kuasa / saksi yang menyaksikan pembukaan segel"
						:entity_id.sync="data.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan segel"
						:nip.sync="data.petugas.petugas1.nip"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 2"
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan segel"
						:nip.sync="data.petugas.petugas2.nip"
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'
import MyToggleSearchDocument from '../../components/ToggleSearchDocument.vue'

export default {
	name: 'FormBukaSegel',
	components: {
		DatePicker,
		MySelectEntitasOrang,
		MySelectPetugas,
		MySelectSprint,
		MyToggleSearchDocument,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			source_options: {
				'segel': {'label': 'Load Segel', 'state': 'search'},
				'input': {'label': 'Input Segel', 'state': 'manual'},
			},
		}
	},
	computed: {
		sprint_id: {
			get() { return this.data.sprint.id },
			set(val) { this.data.sprint.id = val },
		},
		saved_source_id: {
			get() { return this.data.segel_id },
			set(val) { this.data.segel_id = val }
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
		updateSegelType(type) {
			if (type == 'input') {
				this.data.jenis_segel = 'Kertas'
				this.data.jumlah_segel = 1
				this.data.satuan_segel = 'lembar'
				this.data.tempat_segel = null
				this.data.nomor_segel = null
				this.data.tanggal_segel = null
			}
		},
		updateSegel(id) {
			if (this.data.asal_segel == 'segel') {
				if (id != null) {
					let data_dokumen = this.$refs.ToggleSearchDocument.getDataDocument()
					if (data_dokumen != null) {
						this.data.jenis_segel = data_dokumen.jenis_segel
						this.data.jumlah_segel = data_dokumen.jumlah_segel
						this.data.satuan_segel = data_dokumen.satuan_segel
						this.data.tempat_segel = data_dokumen.tempat_segel
						this.data.nomor_segel = data_dokumen.nomor_segel
						this.data.tanggal_segel = data_dokumen.tanggal_segel	
					}
				} else {
					this.data.jenis_segel = null
					this.data.jumlah_segel = null
					this.data.satuan_segel = null
					this.data.tempat_segel = null
					this.data.nomor_segel = null
					this.data.tanggal_segel = null
				}
			}
		},
		validatorRequired(val) { return validators.required(val) },
		validatorNumber(val) { return validators.number(val) },
	},
}
</script>

<style>

</style>
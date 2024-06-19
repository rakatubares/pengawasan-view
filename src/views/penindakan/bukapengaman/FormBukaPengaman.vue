<template>
	<div class="wrapper my-form">
		<!-- Form BA Buka Tanda Pengaman header -->
		<CForm class="pt-3">
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tanggal Pembukaan Tanda Pengaman</label>
				<CCol md="3" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.tanggal_buka_pengaman"
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
						:id.sync="data.sprint.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol>
					<MyToggleSearchDocument
						ref="ToggleSearchDocument"
						label="Asal Pengaman"	
						:doc_options="source_options"
						:doc_type.sync="data.asal_pengaman"
						:doc_id.sync="data.pengaman_id"
						:doc_number.sync="data.nomor_pengaman"
						:doc_date.sync="data.tanggal_pengaman"
						:saved_doc_id.sync="saved_source_id"
						@update:doc_type="updatePengamanType"
						@update:doc_id="updatePengaman"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Jenis Tanda Pengaman"
						description="Jenis tanda pengaman yang digunakan"
						:options="['Kertas', 'Kunci', 'Timah', 'Lak', 'Segel Elektronik', 'Lainnya']"
						:value.sync="data.jenis_pengaman"
						:disabled="data.asal_pengaman != 'input'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Jumlah"
						:value.sync="data.jumlah_pengaman"
						:disabled="data.asal_pengaman != 'input'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Satuan"
						:value.sync="data.satuan_pengaman"
						:disabled="data.asal_pengaman != 'input'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="8" sm="12">
					<CInput
						label="Tempat Tanda Pengaman"
						description="Bagian / lokasi tempat tanda pengaman ditempatkan / dilekatkan"
						:value.sync="data.tempat_pengaman"
						:disabled="data.asal_pengaman != 'input'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol class="col-12">
					<CInput
						label="Nomor Tanda Pengaman"
						:value.sync="data.nomor_pengaman"
						:disabled="data.asal_pengaman != 'input'"
					/>	
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Dasar Pengamanan"
						:value.sync="data.dasar_pengamanan"
						:disabled="data.asal_pengaman != 'input'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitasOrang
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama terang pengangkut / pemilik / kuasa / saksi yang menyaksikan pembukaan tanda pengaman"
						:entity_id.sync="data.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan tanda pengaman"
						:nip.sync="data.petugas.petugas1.nip"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 2"
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan tanda pengaman"
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
	name: 'FormBukaPengaman',
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
				'pengaman': {'label': 'Load BA Pengaman', 'state': 'search', 'filters': {'status_buka': false}},
				'input': {'label': 'Input BA Pengaman', 'state': 'manual'},
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
				var data = await api.updateDoc('buka_pengaman', this.data.id, this.data)
				this.$emit('update:state', 'edit')
			}
			this.$emit('save-data', data)
		},
		updatePengamanType(type) {
			if (type == 'input') {
				this.data.jenis_pengaman = 'Kertas'
				this.data.jumlah_pengaman = 1
				this.data.satuan_pengaman = 'lembar'
				this.data.tempat_pengaman = null
				this.data.nomor_pengaman = null
				this.data.tanggal_pengaman = null
				this.data.dasar_pengamanan = null
			}
		},
		updatePengaman(id) {
			if (this.data.asal_pengaman == 'pengaman') {
				if (id != null) {
					let data_dokumen = this.$refs.ToggleSearchDocument.getDataDocument()
					if (data_dokumen != null) {
						this.data.jenis_pengaman = data_dokumen.jenis_pengaman
						this.data.jumlah_pengaman = data_dokumen.jumlah_pengaman
						this.data.satuan_pengaman = data_dokumen.satuan_pengaman
						this.data.tempat_pengaman = data_dokumen.tempat_pengaman
						this.data.nomor_pengaman = data_dokumen.nomor_pengaman
						this.data.tanggal_pengaman = data_dokumen.tanggal_pengaman
						this.data.dasar_pengamanan = data_dokumen.dasar_pengamanan
					}
				} else {
					this.data.jenis_pengaman = null
					this.data.jumlah_pengaman = null
					this.data.satuan_pengaman = null
					this.data.tempat_pengaman = null
					this.data.nomor_pengaman = null
					this.data.tanggal_pengaman = null
					this.data.dasar_pengamanan = null
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
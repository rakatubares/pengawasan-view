<template>
	<div class="wrapper form-tolak1">
		<CForm class="pt-3">
			<CRow>
				<CCol>
					<MyToggleSearchDocument
						ref="ToggleSearchDocument"
						:doc_options="source_options"
						:doc_type.sync="data.sbp.type"
						:doc_id.sync="data.sbp.id"
						:doc_number.sync="data.sbp.no_dok_lengkap"
						:doc_date.sync="data.sbp.tanggal_dokumen"
						:saved_doc_id.sync="saved_source_id"
						@update:doc_id="updateSource"
					/>
				</CCol>
			</CRow>

			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Alasan Penolakan"
						description="Alasan menolak menandatangani Surat Bukti Penindakan atau berkas penindakan lainnya"
						:value.sync="data.alasan"
						:is-valid="validatorRequired"
						invalid-feedback="Alasan penolakan wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Entitas"
						:value.sync="data.penindakan.saksi.nama"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 1"
						:nip.sync="data.penindakan.petugas.petugas1.nip"
						:disabled="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 2"
						:nip.sync="data.penindakan.petugas.petugas2.nip"
						:disabled="true"
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
import api from '../../../router/api2.js'
import DefaultTolak1 from './DefaultTolak1'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSbp from '../sbp/SelectSbp.vue'
import MyToggleSearchDocument from '../../components/ToggleSearchDocument.vue'

export default {
	name: 'FormTolak1',
	components: {
		MyAlert,
		MySelectPetugas,
		MySelectSbp,
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
				'sbp': {'label': 'SBP Biasa', 'state': 'search', 'filters': {'status_tolak': false}}, 
				'sbpn': {'label': 'SBP-N', 'state': 'search', 'filters': {'status_tolak': false}},
			},
		}
	},
	computed: {
		saved_source_id: {
			get() { return this.data.sbp.id },
			set(val) { this.data.sbp.id = val }
		},
	},
	watch: {
		document(val) { 
			this.data = val
			if (this.data.sbp.id) {
				this.$refs.ToggleSearchDocument.getDataDocument()
			} 
		},
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
		async updateSource() {
			if (this.data.sbp.id) {
				let response = await api.getDocumentById(this.data.sbp.type, this.data.sbp.id)
				let sbp = response.data
				this.data.penindakan = JSON.parse(JSON.stringify(sbp.penindakan))
				if (sbp.penindakan.petugas.petugas2 == undefined) {
					this.data.penindakan.petugas.petugas2 = JSON.parse(JSON.stringify(DefaultTolak1.data.penindakan.petugas.petugas2))
				}
			} else {
				this.data.penindakan = JSON.parse(JSON.stringify(DefaultTolak1.data.penindakan))
			}
		}
	},
}
</script>

<style>
.form-tolak1 .row+.row {
	margin-top:0;
}

.form-tolak1 .v-text-field__details {
	display: none;
}
</style>
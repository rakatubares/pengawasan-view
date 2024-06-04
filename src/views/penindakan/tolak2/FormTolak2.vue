<template>
	<div class="wrapper form-tolak2">
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySearchDocument
						ref="SearchTolak1"
						doc_type="tolak1"
						label="BA Penolakan ttd SBP"
						:value.sync="data.tolak1.id"
						:filters="{'status_tolak': false, 'kode_status': 'terbit'}"
						:exceptions.sync="saved_tolak1_id"
						@update:value="updateSource"
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
						disabled
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 2"
						:nip.sync="data.penindakan.petugas.petugas2.nip"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitasOrang
						label="Saksi"
						description="Nama saksi yang menyaksikan penolakan tanda tangan"
						:entity_id.sync="data.saksi.id"
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
import api from '../../../router/api2.js'
import DefaultTolak2 from './DefaultTolak2'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'

export default {
	name: 'FormTolak2',
	components: {
		MyAlert,
		MySearchDocument,
		MySelectEntitasOrang,
		MySelectPetugas,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
		}
	},
	computed: {
		saved_tolak1_id: {
			get() { return this.data.tolak1.id },
			set(val) { this.data.tolak1.id = val }
		},
	},
	watch: {
		document(val) { 
			this.data = val
			if (this.data.tolak1.id) {
				console.log('FORM TOLAK 2 - WATCH DOCUMETN - GET SEARCH TOLAK1')
				this.$refs.SearchTolak1.getDocument(this.data.tolak1.id)
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
			if (this.data.tolak1.id) {
				let response = await api.getDocumentById('tolak1', this.data.tolak1.id)
				let tolak1 = response.data
				this.data.penindakan = JSON.parse(JSON.stringify(tolak1.penindakan))
				if (tolak1.penindakan.petugas.petugas2 == undefined) {
					this.data.penindakan.petugas.petugas2 = JSON.parse(JSON.stringify(DefaultTolak2.data.penindakan.petugas.petugas2))
				}
			} else {
				this.data.penindakan = JSON.parse(JSON.stringify(DefaultTolak2.data.penindakan))
			}
		}
	},
}
</script>

<style>
.form-tolak2 .row+.row {
	margin-top:0;
}

.form-tolak2 .v-text-field__details {
	display: none;
}
</style>
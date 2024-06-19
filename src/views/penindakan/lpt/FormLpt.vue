<template>
	<div class="wrapper my-form">
		<!-- Form LPT -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySearchDocument
						doc_type="sbp"
						label="No SBP"
						:value.sync="data.sbp.id"
						:exceptions.sync="saved_sbp"
						:filters="{'status_lpt': false}"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CInput
						label="Penindakan atas barang:"
						:value.sync="data.barang"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CInput
						label="Sarana prasarana"
						:value.sync="data.sarpras"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Kronologi"
						:value.sync="data.kronologi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Atasan', 'nama': 'Nama Atasan'}"
						:default_jabatan.sync="default_pejabat"
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
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

export default {
	name: 'FormLpt',
	components: {
		MySearchDocument,
		MySelectPejabat,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
		doc_name: String,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			default_pejabat: 'bd.0503',
		}
	},
	computed: {
		saved_sbp: {
			get() { return this.data.sbp.id },
			set(val) { this.data.sbp.id = val }
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
	},
}
</script>

<style>

</style>
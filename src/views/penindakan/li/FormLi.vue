<template>
	<div class="wrapper form-li">
		<CForm class="pt-3">
			<CRow>
				<CCol sm="12">
					<CInput
						label="Sumber / Media Informasi"
						:value.sync="data.sumber"
						:is-valid="validatorRequired"
						invalid-feedback="Sumber informasi wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Isi Informasi"
						:value.sync="data.informasi"
						:is-valid="validatorRequired"
						invalid-feedback="Isi informasi wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Tindak Lanjut"
						:value.sync="data.tindak_lanjut"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Catatan"
						:value.sync="data.catatan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPenerbit"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Penerbit', 'nama': 'Nama Penerbit'}"
						:default_jabatan.sync="default_penerbit"
						:jabatan.sync="data.petugas.penerbit.kode_jabatan"
						:tipe_ttd.sync="data.petugas.penerbit.tipe_ttd"
						:nip.sync="data.petugas.penerbit.nip"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Atasan', 'nama': 'Nama Atasan'}"
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
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import DefaultLi from './DefaultLi'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

export default {
	name: 'FormLi',
	components: {
		MyAlert,
		MySelectPejabat,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(DefaultLi.data)),
			default_penerbit: 'bd.0503',
			default_atasan: 'bd.05',
		}
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data = response.data
		},
		async saveData() {
			if (this.state == 'insert') {
				this.data = await api.storeDoc(this.doc_type, this.data)
				this.$emit('update:doc_id', this.data.id)
				this.$emit('update:state', 'edit')
				this.alert('Data LI-1 berhasil disimpan')
			} else if (this.state == 'edit') {
				this.data = await api.updateDoc(this.doc_type, this.data.id, this.data)
				this.alert('Data LI-1 berhasil diubah')
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
.form-li .row+.row {
	margin-top:0;
}
.form-li .v-text-field__details {
	display: none;
}
</style>
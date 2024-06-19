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
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MySelectPejabat from '../../components/SelectPejabat.vue'

export default {
	name: 'FormLi',
	components: {
		MySelectPejabat,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			default_penerbit: 'bd.0503',
			default_atasan: 'bd.05',
		}
	},
	watch: { 
		document(val) { this.data = val }
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
	},
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
<template>
	<div class="wrapper my-form">
		<!-- Form LPHP -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySearchDocument
						doc_type="lptp"
						label="No LPTP"
						:value.sync="data.lptp_id"
						:exceptions.sync="saved_lptp"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<div class="form-group">
						<label class="w-100">{{`Tanggal ${doc_name}`}}</label>
						<date-picker 
							v-model="data.tanggal_dokumen"
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
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Analisa hasil penindakan"
						description="Analisa penentuan hasil penindakan oleh atasan pejabat yang melakukan penindakan"
						:value.sync="data.analisa"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Catatan"
						description="Catatan atasan pejabat penyusun LPHP"
						:value.sync="data.catatan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPenyusun"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Penyusun', 'nama': 'Nama Penyusun'}"
						:default_jabatan.sync="default_penyusun"
						:jabatan.sync="data.petugas.penyusun.kode_jabatan"
						:tipe_ttd.sync="data.petugas.penyusun.tipe_ttd"
						:nip.sync="data.petugas.penyusun.nip"
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
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
// import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

const custom_validations_default = {
	tanggal_lphp: {
		state: false,
		text: 'Tanggal LPHP wajib diisi'
	},
}

export default {
	name: 'FormLphp',
	components: {
		DatePicker,
		MyAlert,
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
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			default_penyusun: 'bd.0503',
			default_atasan: 'bd.05',
		}
	},
	computed: {
		saved_lptp: {
			get() { return this.data.lptp_id },
			set(val) { this.data.lptp_id = val }
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
		validatorRequired(val) { return validators.required(val) },
	},
}
</script>

<style>

</style>
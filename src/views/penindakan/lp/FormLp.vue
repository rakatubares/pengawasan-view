<template>
	<div class="wrapper my-form">
		<!-- Form LP -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySearchDocument
						doc_type="lphp"
						label="No LPHP"
						:value.sync="data.lphp_id"
						:exceptions.sync="saved_lphp"
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
					<CInput
						label="Pasal"
						description="Pasal yang diduga terkait pelanggaran"
						:value.sync="data.pasal"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Modus"
						description="Uraian modus yang dilakukan terkait dengan pelanggaran"
						:value.sync="data.modus"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPenerbit"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Penerbit', 'nama': 'Nama Pejabat'}"
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

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

const custom_validations_default = {
	tanggal_lp: {
		state: false,
		text: 'Tanggal LP wajib diisi'
	},
}

export default {
	name: 'FormLp',
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
		sbp_type: String,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			default_pejabat: 'bd.0503',
		}
	},
	computed: {
		saved_lphp: {
			get() { return this.data.lphp_id },
			set(val) { this.data.lphp_id = val }
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
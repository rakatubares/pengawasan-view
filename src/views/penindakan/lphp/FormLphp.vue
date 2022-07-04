<template>
	<div class="wrapper form-lphp">
		<!-- Form LPHP -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSbp
						ref="selectSbp"
						:sbp_type="sbp_type"
						:id.sync="data.id_sbp"
						:filter="filter_sbp"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<div class="form-group">
						<label class="w-100">{{`Tanggal ${tipe_surat}`}}</label>
						<date-picker 
							v-model="data.tanggal_dokumen"
							format="DD-MM-YYYY"
							value-type="format"
							type="date"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_lphp', 'Tanggal LPHP wajib diisi')
							"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.tanggal_lphp.state,
										'is-invalid': !validasi.tanggal_lphp.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.tanggal_lphp.text}}</div>
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
						:label="{jabatan: 'Jabatan Penyusun', nama: 'Nama Penyusun'}"
						:selectable_jabatan="['bd.0503', 'bd.0504']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.penyusun.user.user_id"
						:jabatan.sync="data.penyusun.jabatan.kode"
						:plh.sync="data.penyusun.plh"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan"
						:state.sync="state"
						:label="{jabatan: 'Jabatan Atasan', nama: 'Nama Atasan'}"
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
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectSbp from '../sbp/SelectSbp.vue'

const default_data = {
	id_sbp: null,
	tanggal_dokumen: null,
	analisa: null,
	catatan: null,
	penyusun: {
		jabatan: {kode: 'bd.0503'},
		plh: false,
		user: {user_id: null}
	},
	atasan: {
		jabatan: {kode: 'bd.05'},
		plh: false,
		user: {user_id: null}
	},
}

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
		MySelectPejabat,
		MySelectSbp
	},
	props: {
		state: String,
		doc_type: String,
		tipe_surat: String,
		sbp_type: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			sbp_search_value: null,
			sbp_search_items: [],
			sbp_search_query: null,
			sbp_search_exception: null,
			filter_sbp: {
				kode_status: 200
			}
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById(this.doc_type, this.doc_id)
			this.data = response.data.data
			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.validatorDatetime(this.data.tanggal_dokumen, 'DD-MM-YYYY HH:mm', 'validasi.tanggal_lphp', 'Tanggal LPHP wajib diisi')
			this.$refs.selectSbp.getData(this.data.id_sbp, true)
			this.$refs.selectPenyusun.selected_jabatan = this.data.penyusun.jabatan.kode
			this.$refs.selectPenyusun.togglePlh(this.data.penyusun.plh)
			this.$refs.selectPenyusun.getPetugas(this.data.penyusun.user.user_id, true)
			this.$refs.selectAtasan.selected_jabatan = this.data.atasan.jabatan.kode
			this.$refs.selectAtasan.togglePlh(this.data.atasan.plh)
			this.$refs.selectAtasan.getPetugas(this.data.atasan.user.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)
					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert('Data LPHP berhasil disimpan')
				} catch (error) {
					console.log('form lphp - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.alert('Data LPHP berhasil diubah')
				} catch (error) {
					console.log('form lphp - update data - error', error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorDatetime(val, format, validasiName, text) { 
			let dt = converters.date(val, format)
			let valid = validators.date(dt)
			_.set(this, validasiName+'.state', valid)
			_.set(this, validasiName+'.text', text)
		},
	},
	watch: {
		async sbp_search_query (val) {
			let data = {'src': val, 'sta': 200}
			let responses = await api.searchDoc(this.sbp_type, data)
			this.sbp_search_items = responses.data.data
		},
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
.form-lphp .row+.row {
	margin-top:0;
}

.form-lphp .v-text-field__details {
	display: none;
}

/* V-AUTOCOMPLETE */
.form-lphp .v-input__slot {
	min-height: 34px !important;
	font-size: 14px;
}
.form-lphp .v-input__prepend-outer {
	margin: 0 !important;
} 
</style>
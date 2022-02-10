<template>
	<div class="wrapper form-lp">
		<!-- Form LP -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSbp
						ref="selectSbp"
						:id.sync="data.id_sbp"
						:status="202"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<div class="form-group">
						<label class="w-100">Tanggal LP</label>
						<date-picker 
							v-model="data.tanggal_dokumen" 
							format="DD-MM-YYYY"
							value-type="format"
							type="date"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_lp', 'Tanggal LP wajib diisi')
							"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.tanggal_lp.state,
										'is-invalid': !validasi.tanggal_lp.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.tanggal_lp.text}}</div>
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
						:label="{jabatan: 'Jabatan Penerbit', nama: 'Nama Pejabat'}"
						:selectable_jabatan="['bd.0503', 'bd.0504']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.pejabat.user.user_id"
						:jabatan.sync="data.pejabat.jabatan.kode"
						:plh.sync="data.pejabat.plh"
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
	tanggal_dokumen: null,
	pasal: null,
	modus: null,
	pejabat: {
		jabatan: {kode: 'bd.0503'},
		plh: false,
		user: {user_id: null}
	},
}

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
		MySelectPejabat,
		MySelectSbp,
	},
	props: {
		state: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById('lp', this.doc_id)
			this.data = response.data.data
			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.validatorDatetime(this.data.tanggal_dokumen, 'DD-MM-YYYY HH:mm', 'validasi.tanggal_lp', 'Tanggal LP wajib diisi')
			this.$refs.selectSbp.getData(this.data.id_sbp, true)
			this.$refs.selectPenerbit.selected_jabatan = this.data.pejabat.jabatan.kode
			this.$refs.selectPenerbit.getPetugas(this.data.pejabat.user.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.storeDoc('lp', this.data)
					this.$emit('update:doc_id', response.id)
					this.$emit('update:state', 'edit')
					this.alert('Data LP berhasil disimpan')
				} catch (error) {
					console.log('form lp - save data - error', JSON.parse(JSON.stringify(error)))
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('lp', this.data.id, this.data)
					this.alert('Data LP berhasil diubah')
				} catch (error) {
					console.log('form lp - update data - error', JSON.parse(JSON.stringify(error)))
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
		async changeValueSbp(id) {
			if (id != null) {
				// Get data SBP
				let sbp = await api.getDocumentById('sbp', id)
				
				// Change current data according to SBP
				this.data.id_sbp = sbp.main.data.id
				
				// Specify SBP id
				this.data.dokumen.sbp.id = id
			}
		}
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
.form-lp .row+.row {
	margin-top:0;
}

.form-lp .v-text-field__details {
	display: none;
}

/* V-AUTOCOMPLETE */
.form-lp .v-input__slot {
	min-height: 34px !important;
	font-size: 14px;
}
.form-lp .v-input__prepend-outer {
	margin: 0 !important;
} 
</style>
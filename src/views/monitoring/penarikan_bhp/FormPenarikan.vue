<template>
	<div class="wrapper form-bhp">
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<div class="form-group">
						<label class="w-100">Tanggal Penarikan</label>
						<date-picker 
							v-model="data.tanggal_penarikan"
							format="DD-MM-YYYY"
							value-type="format"
							type="date"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_penarikan', validasi.tanggal_penarikan.text)
							"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.tanggal_penarikan.state,
										'is-invalid': !validasi.tanggal_penarikan.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.tanggal_penarikan.text}}</div>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas"
						label="Nama Petugas"
						:id.sync="data.petugas_penarikan.user_id"
						role="p2vue.penindakan"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Lokasi Penyimpanan"
						:value.sync="data.lokasi_penyimpanan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Keterangan"
						:value.sync="data.keterangan_penarikan"
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
					<CButton 
						v-if="state == 'edit'"
						class="ml-1"
						color="danger"
						@click="cancelEdit()"
					>
						Batal
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
import MySelectPetugas from '../../components/SelectPetugas.vue'

const data_default = {
	tanggal_penarikan: null,
	lokasi_penyimpanan: null,
	keterangan_penarikan: null,
	petugas_penarikan: {user_id: null}
}

const custom_validations_default = {
	tanggal_penarikan: {
		state: false,
		text: 'Tanggal penarikan wajib diisi'
	},
}

export default {
	name: 'MyFormPenarikanBhp',
	components: {
		DatePicker,
		MyAlert,
		MySelectPetugas,
	},
	props: {
		state: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
		}
	},
	methods: {
		async getData() {
			this.data = await api.getDocumentById('sbp/tarik', this.doc_id)

			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.validatorDatetime(this.data.tanggal_penarikan, 'DD-MM-YYYY HH:mm', 'validasi.tanggal_penarikan', this.validasi.tanggal_penarikan.text)
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorDatetime(val, format, validasiName, text) { 
			let dt = converters.date(val, format)
			let valid = validators.date(dt)
			_.set(this, validasiName+'.state', valid)
			_.set(this, validasiName+'.text', text)
		},
		async saveData() {
			try {
				await api.updateDoc('sbp/tarik', this.doc_id, this.data)
				this.alert('Data penarikan BHP berhasil disimpan')
				this.$emit('save-data')
			} catch (error) {
				console.log('form bhp - update data - error', error)
			}
		},
		cancelEdit() {
			this.$emit('cancel-edit')
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
.form-bhp .row+.row {
	margin-top:0;
}

.form-bhp .v-text-field__details {
	display: none;
}
</style>
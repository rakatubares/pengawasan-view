<template>
	<div class="wrapper my-form">
		<!-- Form BA Reekspor -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="3" sm="12">
					<CInput
						label="Jenis dokumen asal"
						:value.sync="data.jenis_dok_asal"
						:is-valid="validatorRequired"
						invalid-feedback="Jenis dokumen asal wajib diisi"
					/>
				</CCol>
				<CCol md="6" sm="12">
					<CInput
						label="Nomor dokumen asal"
						:value.sync="data.nomor_dok_asal"
						:is-valid="validatorRequired"
						invalid-feedback="Nomor dokumen asal wajib diisi"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal dokumen asal</label>
						<date-picker 
							v-model="data.tanggal_dok_asal"
							format="DD-MM-YYYY"
							value-type="format"
							type="date"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_dok_asal', validasi.tanggal_dok_asal.text)
							"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.tanggal_dok_asal.state,
										'is-invalid': !validasi.tanggal_dok_asal.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.tanggal_dok_asal.text}}</div>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CInput
						label="Jenis dokumen ekspor"
						:value.sync="data.jenis_dok_ekspor"
						:is-valid="validatorRequired"
						invalid-feedback="Jenis dokumen ekspor wajib diisi"
					/>
				</CCol>
				<CCol md="6" sm="12">
					<CInput
						label="Nomor dokumen ekspor"
						:value.sync="data.nomor_dok_ekspor"
						:is-valid="validatorRequired"
						invalid-feedback="Nomor dokumen ekspor wajib diisi"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal dokumen ekspor</label>
						<date-picker 
							v-model="data.tanggal_dok_ekspor"
							format="DD-MM-YYYY"
							value-type="format"
							type="date"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_dok_ekspor', validasi.tanggal_dok_ekspor.text)
							"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.tanggal_dok_ekspor.state,
										'is-invalid': !validasi.tanggal_dok_ekspor.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.tanggal_dok_ekspor.text}}</div>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Nomor MAWB"
						:value.sync="data.nomor_mawb"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal MAWB</label>
						<date-picker
							v-model="data.tanggal_mawb"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
						>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Nomor HAWB"
						:value.sync="data.nomor_hawb"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal HAWB</label>
						<date-picker
							v-model="data.tanggal_hawb"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
						>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Nama sarana pengangkut"
						:value.sync="data.nama_sarkut"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Nomor registrasi sarkut"
						:value.sync="data.nomor_reg_sarkut"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Nomor penerbangan"
						:value.sync="data.nomor_flight"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal penerbangan</label>
						<date-picker
							v-model="data.tanggal_flight"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
						>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Hasil pemeriksaan"
						:value.sync="data.kedapatan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						:id.sync="data.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						:id.sync="data.petugas1.user_id"
						role="p2vue.penindakan"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas2"
						label="Nama Petugas 2"
						:id.sync="data.petugas2.user_id"
						role="p2vue.penindakan"
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
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'

const default_data = {
	jenis_dok_asal: null,
	nomor_dok_asal: null,
	tanggal_dok_asal: null,
	jenis_dok_ekspor: null,
	nomor_dok_ekspor: null,
	tanggal_dok_ekspor: null,
	nomor_mawb: null,
	tanggal_mawb: null,
	nomor_hawb: null,
	tanggal_hawb: null,
	nama_sarkut: null,
	nomor_flight: null,
	tanggal_flight: null,
	nomor_reg_sarkut: null,
	kedapatan: null,
	saksi: {id: null},
	petugas1: {user_id: null},
	petugas2: {user_id: null}
}

const custom_validations_default = {
	tanggal_dok_asal: {
		state: false,
		text: 'Tanggal dokumen asal wajib diisi'
	},
	tanggal_dok_ekspor: {
		state: false,
		text: 'Tanggal dokumen ekspor wajib diisi'
	},
}

export default {
	name: 'FormReekspor',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas,
		MySelectPetugas,
	},
	props: {
		state: String,
		doc_id: Number,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
		}
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById('reekspor', this.doc_id)
			this.data = response.data.data
			if (this.data.petugas2 == null) {
				this.data.petugas2 = {user_id: null}
			}
			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.validatorDatetime(this.data.tanggal_dok_asal, 'DD-MM-YYYY HH:mm', 'validasi.tanggal_dok_asal', this.validasi.tanggal_dok_asal.text)
			this.validatorDatetime(this.data.tanggal_dok_ekspor, 'DD-MM-YYYY HH:mm', 'validasi.tanggal_dok_ekspor', this.validasi.tanggal_dok_ekspor.text)
			this.$refs.selectSaksi.getEntitas(this.data.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc('reekspor', this.data)

					if (this.data.petugas2 == null) {
						this.data.petugas2 = {user_id: null}
					}

					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert('Data BA Reekspor berhasil disimpan')
				} catch (error) {
					console.log('form reekspor - save data - error', JSON.parse(JSON.stringify(error)))
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('reekspor', this.data.id, this.data)
					this.alert('Data BA Reekspor berhasil diubah')
				} catch (error) {
					console.log('form reekspor - update data - error', JSON.parse(JSON.stringify(error)))
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
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>

</style>
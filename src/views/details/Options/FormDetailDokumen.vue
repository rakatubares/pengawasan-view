<template>
	<div class="wrapper">
		<CForm>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Jenis Dokumen"
						:value.sync="data_objek.jns_dok"
						:is-valid="validatorRequired"
						invalid-feedback="Jenis dokumen wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Nomor Dokumen"
						:value.sync="data_objek.no_dok"
						:is-valid="validatorRequired"
						invalid-feedback="Jenis dokumen wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6">
					<div class="form-group">
						<label class="w-100">Tanggal dokumen</label>
						<date-picker 
							v-model="data_objek.tgl_dok" 
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
							@change="validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tgl_dok', 'Tanggal dokumen wajib diisi')"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.tgl_dok.state,
										'is-invalid': !validasi.tgl_dok.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.tgl_dok.text}}</div>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'

const data_default = {
	jns_dok: null,
	no_dok: null,
	tgl_dok: null
}

const custom_validations_default = {
	tgl_dok: {
		state: false,
		text: 'Tanggal dokumen wajib diisi'
	},
}

export default {
	name: 'FormDetailDokumen',
	components: {
		DatePicker,
		MyAlert,
	},
	props: {
		doc_type: String,
		doc_id: Number,
		data: Object
	},
	data() {
		return {
			state: 'insert',
			data_objek: JSON.parse(JSON.stringify(data_default)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
		}
	},
	watch: {
		data: {
			handler: function (val) {
				this.parseData(val.data)
			}
		}
	},
	methods: {
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.insertDetail(this.doc_type, this.doc_id, 'dokumen', this.data_objek)
					this.state = 'edit'
					this.$emit('update:data', response.data)
					this.alert('Data dokumen berhasil disimpan')
				} catch (error) {
					console.log(error)
				}
			} else {
				let response = await api.updateDetail(this.doc_type, this.doc_id, 'dokumen', this.data_objek.id, this.data_objek)
				this.$emit('update:data', response.data)
				this.alert('Data dokumen berhasil diubah')
			}
		},
		parseData(objek) {
			this.data_objek = objek
			this.validatorDatetime(this.data_objek.tgl_dok, 'DD-MM-YYYY', 'validasi.tgl_dok', 'Tanggal dokumen wajib diisi')
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
	mounted() {
		if (this.data.type == 'dokumen') {
			if (this.data.data != null) {
				this.parseData(this.data.data)
				this.state = 'edit'
			} else {
				this.data_objek = JSON.parse(JSON.stringify(data_default))
				this.state = 'insert'
			}	
		} else {
			this.data_objek = JSON.parse(JSON.stringify(data_default))
			this.state = 'insert'
		}
	}
}
</script>

<style>

</style>
<template>
	<div class="wrapper">
		<CModal
			title="Input Entitas"
			size="lg"
			:show.sync="show"
		>
			<CForm>
				<CRow>
					<CCol sm="12">
						<CInput
							label="Nama"
							description="Nama lengkap entitas"
							:value.sync="entitas.nama"
							:is-valid="validatorRequired('nama', entitas.nama)"
							invalid-feedback="Nama entitas wajib diisi"
							:disabled.sync="disable_name_edit"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CInput
							label="Alias"
							:value.sync="entitas.alias"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="6">
						<CInput
							label="Tempat Lahir"
							:value.sync="entitas.tempat_lahir"
						/>
					</CCol>
					<CCol sm="6">
						<div class="form-group">
							<label class="w-100">Tgl lahir</label>
							<date-picker
								v-model="entitas.tanggal_lahir"
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
							</date-picker>
						</div>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="6">
						<CSelect
							label="Jenis Kelamin"
							:value.sync="entitas.jenis_kelamin.kode"
							:options="[
								{value: 'M', label: 'Laki-laki'}, 
								{value: 'F', label: 'Perempuan'},
							]"
						/>
					</CCol>
					<CCol sm="6">
						<CInput
							label="Agama"
							:value.sync="entitas.agama"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<MySelectNegara
							ref="SelectNegara"
							label="Kewarganegaraan"
							:value.sync="entitas.warga_negara.kode_2"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CTextarea
							label="Alamat Identitas"
							:value.sync="entitas.alamat_identitas"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CTextarea
							label="Alamat Tinggal"
							:value.sync="entitas.alamat_tinggal"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CInput
							label="Pekerjaan"
							:value.sync="entitas.pekerjaan"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="6">
						<CInput
							label="No Telepon"
							:value.sync="entitas.nomor_telepon"
							:is-valid="validatorPhone('telepon', entitas.nomor_telepon)"
							invalid-feedback="Nomor telepon tidak valid"
						/>
					</CCol>
					<CCol sm="6">
						<CInput
							id='input-email'
							label="Email"
							:value.sync="entitas.email"
							:is-valid="validatorEmail('email', entitas.email)"
							invalid-feedback="Email tidak valid"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol>
						<MyTableIdentitas 
							:state.sync="state"
							:data.sync="entitas.identitas"
							:identity_types="['NPWP', 'PASPOR', 'KTP']"
						/>
					</CCol>
				</CRow>
			</CForm>

			<template #footer>
				<CButton 
					color="secondary"
					@click="closeModal"
				>
					Kembali
				</CButton>
				<CButton 
					color="success"
					@click="saveEntitas"
				>
					Simpan
				</CButton>
			</template>
		</CModal>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../router/api2'
import validators from '../../helpers/validator.js'
import MySelectNegara from './SelectNegara.vue'
import MyTableIdentitas from './TableIdentitas.vue'

const default_entitas = {
	nama: null,
	alias: null,
	tempat_lahir: null,
	tanggal_lahir: null,
	jenis_kelamin: { kode: 'M' },
	agama: null,
	warga_negara: { kode_2: null },
	alamat_identitas: null,
	alamat_tinggal: null,
	pekerjaan: null,
	nomor_telepon: null,
	email: null,
	identitas: [],
}

export default {
	name: 'ModalEntitasOrang',
	components: {
		api,
		DatePicker,
		MySelectNegara,
		MyTableIdentitas,
	},
	data() {
		return {
			show: false,
			state: null,
			entitas: JSON.parse(JSON.stringify(default_entitas)),
			disable_name_edit: false,
			validations: {
				nama: false,
				telepon: false,
				email: false,
			}
		}
	},
	computed: {
		allValid() {
			return validators.allValid(this.validations)
		},
	},
	watch: {
		show(val) {
			if (val == false) {
				this.resetModal()
			}
		}
	},
	methods: {
		async showModal(state, id=null) {
			this.state = state
			if (state == 'update') {
				// Get entity data
				let response = await api.getEntitasOrang(id)
				let entitas = response.data

				// Fill options data
				if (entitas.warga_negara != null) {
					this.$refs.SelectNegara.getData(entitas.warga_negara.kode_2)	
				} else {
					entitas.warga_negara = JSON.parse(JSON.stringify(default_entitas.warga_negara))
				}
				this.entitas = entitas

				// Prevent edit entity's name
				this.disable_name_edit = true
			}
			this.show = true
		},
		closeModal() {
			this.show = false	
		},
		resetModal() {
			this.entitas = JSON.parse(JSON.stringify(default_entitas))
			this.$refs.SelectNegara.getData(null)
			this.disable_name_edit = false
		},
		async saveEntitas() {
			if (this.allValid) {
				let response
				if (this.state == 'update') {
					response = await api.updateEntitasOrang(this.entitas, this.entitas.id)
				} else {
					response = await api.saveEntitasOrang(this.entitas)
				}
				let entitas = response.data
				this.$emit('save', this.state, entitas)
				this.closeModal()
			}
		},
		validatorRequired(field, val) { 
			let validation = validators.required(val) 
			this.validations[field] = validation
			return validation
		},
		validatorPhone(field, val) { 
			let validation = validators.phone(val, true)
			this.validations[field] = validation
			return validation
		},
		validatorEmail(field, val) { 
			let validation = validators.email(val) 
			this.validations[field] = validation
			return validation
		},
	}
}
</script>

<style>

</style>
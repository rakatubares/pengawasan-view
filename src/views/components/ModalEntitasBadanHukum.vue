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
						<CTextarea
							label="Alamat"
							:value.sync="entitas.alamat"
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
							:identity_types="['NPWP','API', 'NPPBKC']"
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
import api from '../../router/api2'
import validators from '../../helpers/validator.js'
import MyTableIdentitas from './TableIdentitas.vue'

const default_entitas = {
	nama: null,
	alamat: null,
	nomor_telepon: null,
	email: null,
	identitas: [],
}

export default {
	name: 'ModalEntitasBadanHukum',
	components: {
		api,
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
				let response = await api.getEntitasBadanHukum(id)
				let entitas = response.data

				// Fill options data
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
			this.disable_name_edit = false
		},
		async saveEntitas() {
			if (this.allValid) {
				let response
				if (this.state == 'update') {
					response = await api.updateEntitasBadanHukum(this.entitas, this.entitas.id)
				} else {
					response = await api.saveEntitasBadanHukum(this.entitas)
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
			let validation = validators.phone(val)
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
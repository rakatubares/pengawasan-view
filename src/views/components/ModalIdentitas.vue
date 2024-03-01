<template>
	<div class="wrapper">
		<CModal
			title="Input No Identitas"	
			:show.sync="show"	
		>
			<CForm>
				<CRow>
					<CCol md="4" sm="12">
						<CInput 
							ref="input_jenis"
							list="option-jenis-identitas"
							label="Jenis Identitas"
							:value.sync="identitas.jenis"
							:is-valid="validatorRequired('jenis', identitas.jenis)"
							invalid-feedback="Jenis identitas wajib diisi"
						/>
						<datalist id="option-jenis-identitas">
							<option 
								v-for="option in identity_types" 
								:value="option" 
								:key="option"
							>
								{{ option }}
							</option>
						</datalist>
					</CCol>
					<CCol md="8" sm="12">
						<CInput 
							ref="input_nomor"
							label="Nomor Identitas"
							:value.sync="identitas.nomor"
							:is-valid="validatorRequired('nomor', identitas.nomor)"
							invalid-feedback="Jenis identitas wajib diisi"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="12">
						<CInput
							label="Pejabat Penerbit"
							:value.sync="identitas.pejabat_penerbit"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="12">
						<CInput
							label="Tempat Penerbitan"
							:value.sync="identitas.tempat_penerbitan"
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
					@click="saveData"
				>
					Simpan
				</CButton>
			</template>
		</CModal>
	</div>
</template>

<script>
import validators from '../../helpers/validator.js'

const default_identitas = {
	id: null,
	jenis: null,
	nomor: null,
	pejabat_penerbit: null,
	tempat_penerbitan: null,
}

export default {
	name: 'ModalIdentitas',
	props: {
		identity_types: Array,
	},
	computed: {
		allValid() {
			return validators.allValid(this.validations)
		},
	},
	data() {
		return {
			state: null,
			show: false,
			identitas: JSON.parse(JSON.stringify(default_identitas)),
			validations: {
				jenis: false,
				nomor: false,
			}
		}
	},
	methods: {
		showModal(state, index=null, data=null) {
			this.state = state
			if (state=='update') {
				this.index = index
				this.identitas = JSON.parse(JSON.stringify(data))
			}
			this.show = true
		}, 
		closeModal() {
			this.show = false
			this.index = null
			this.identitas = JSON.parse(JSON.stringify(default_identitas))
		},
		saveData() {
			if (this.allValid) {
				this.$emit('save', this.state, this.identitas, this.index)
				this.closeModal()	
			}
		},
		validatorRequired(field, val) {
			let validation = validators.required(val) 
			this.validations[field] = validation
			return validation
		},
	}
}
</script>

<style>

</style>
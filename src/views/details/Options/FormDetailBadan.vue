<template>
	<div class="wrapper form-detail-badan">
		<!-- Form input penindakan badan -->
		<CRow>
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectOrang"
								label="Nama orang yang ditindak"
								:id.sync="orang_id"
								:showTanggalLahir="true"
								:showWargaNegara="true"
								:showAlamat="true"
							>
							</MySelectEntitas>
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
			</CCol>
		</CRow>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'

export default {
	name: 'FormDetailBadan',
	components: {
		MyAlert,
		MySelectEntitas
	},
	props: {
		doc_type: String,
		doc_id: Number,
		data: Object
	},
	data() {
		return {
			state: 'insert',
			orang_id: null
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
		async getDocument() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.orang_id = response.data.data.penindakan.saksi.id
		},
		async saveData() {
			let data = {orang_id: this.orang_id}
			let response = await api.insertDetail(this.doc_type, this.doc_id, 'orang', data)
			this.$emit('update:data', response.data)
			this.alert('Data orang berhasil disimpan')
		},
		parseData(objek) {
			console.log('form detail badan - parse data', objek)
			if (objek == null) {
				this.orang_id = null
			}
			this.$refs.selectOrang.getEntitas(this.orang_id, true)
		},
		alert(text) {
			this.$refs.alert.show_alert(text)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	async mounted() {
		if (this.data.type == 'orang') {
			if (this.data.data != null) {
				this.orang_id = this.data.data.id
				this.parseData(this.orang_id)
				this.state = 'edit'
			} else {
				this.orang_id = null
				this.state = 'insert'
			}
		} else {
			await this.getDocument()
			this.parseData(this.orang_id)
			this.state = 'insert'
		}
	}
}
</script>

<style>
.form-detail-badan .v-select__slot > input {
	font-size: 0.875rem;
	font-weight: 400;
	color: #768192;
}

.form-detail-badan .v-input__slot {
	min-height: calc(1.5em + 0.75rem) !important;
}

.form-detail-badan .v-input__slot > fieldset {
	border: 1px solid;
}

.form-detail-badan .v-text-field__details {
	display: none;
}
</style>
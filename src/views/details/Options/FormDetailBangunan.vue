<template>
	<div class="wrapper form-detail-bangunan">
		<!-- Form input penindakan bangunan -->
		<CRow>
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="12">
							<CTextarea
								label="Alamat"
								description="Tempat/lokasi dilakukan penindakan"
								:value.sync="data_objek.alamat"
								:is-valid="validatorRequired"
								invalid-feedback="Alamat wajib diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="6">
							<CInput
								label="Nomor registrasi"
								description="Nomor registrasi bangunan/NPPBKC/NPWP/dokumen lainnya yang berkaitan dengan bangunan/tempat lain yang terhadapnya dilakukan penindakan"
								:value.sync="data_objek.no_reg"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectPemilik"
								label="Nama pemilik/yang menguasai"
								description="Nama pemilik/yang menguasai tempat/bangunan"
								:id.sync="data_objek.pemilik.id"
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

const data_default = {
	alamat: null,
	no_reg: null,
	pemilik: {id: null},
}

export default {
	name: 'FormDetailBangunan',
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
			data_objek: JSON.parse(JSON.stringify(data_default))
		}
	},
	watch: {
		data: {
			handler: function(val) {
				this.parseData(val.data)
			}
		}
	},
	methods: {
		async getSaksiId() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			return response.data.data.penindakan.saksi.id
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.insertDetail(this.doc_type, this.doc_id, 'bangunan', this.data_objek)
					this.state = 'edit'
					this.$emit('update:data', response.data)
					this.alert('Data bangunan berhasil disimpan')
				} catch (error) {
					console.log(error)
				}
			} else {
				let response = await api.updateDetail(this.doc_type, this.doc_id, 'bangunan', this.data_objek.id, this.data_objek)
				this.$refs.selectPemilik.getEntitas(this.data_objek.pemilik.id, true)
				this.$emit('update:data', response.data)
				this.alert('Data bangunan berhasil diubah')
			}
		},
		parseData(objek) {
			if (objek.pemilik == null) {
				objek.pemilik = {
					id: null
				}
			}
			this.data_objek = objek
			this.$refs.selectPemilik.getEntitas(this.data_objek.pemilik.id, true)
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	async mounted() {
		if (this.data.type == 'bangunan') {
			if (this.data.data != null) {
				this.parseData(this.data.data)
				this.state = 'edit'
			} else {
				this.data_objek = JSON.parse(JSON.stringify(data_default))
				this.state = 'insert'
			}	
		} else {
			let saksi_id = await this.getSaksiId()
			this.data_objek = JSON.parse(JSON.stringify(data_default))
			this.data_objek.pemilik.id = saksi_id
			this.$refs.selectPemilik.getEntitas(this.data_objek.pemilik.id, true)
			this.state = 'insert'
		}
	}
}
</script>

<style>
.form-detail-bangunan .v-select__slot > input {
	font-size: 0.875rem;
	font-weight: 400;
	color: #768192;
}

.form-detail-bangunan .v-input__slot {
	min-height: calc(1.5em + 0.75rem) !important;
}

.form-detail-bangunan .v-input__slot > fieldset {
	border: 1px solid;
}

.form-detail-bangunan .v-text-field__details {
	display: none;
}
</style>
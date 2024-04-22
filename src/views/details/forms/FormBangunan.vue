<template>
	<div class="wrapper my-form">
		<!-- Form input penindakan bangunan -->
		<CRow class="mx-2 mt-2">
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol class="col-3" md="1">
							<CSwitch 
								class="mx-1" 
								color="success" 
								variant="3d" 
								v-bind="labelIcon" 
								:checked.sync="flag_bangunan"
							/>
						</CCol>
						<CCol class="col-9" md="6">
							<h5>Penindakan atas bangunan</h5>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<CTextarea
								label="Alamat"
								description="Tempat/lokasi dilakukan penindakan"
								:disabled="!flag_bangunan"
								:value.sync="objek.alamat"
								:is-valid="validatorRequired"
								invalid-feedback="Alamat wajib diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<CInput
								label="Nomor registrasi"
								description="Nomor registrasi bangunan/NPPBKC/NPWP/dokumen lainnya yang berkaitan dengan bangunan/tempat lain yang terhadapnya dilakukan penindakan"
								:disabled="!flag_bangunan"
								:value.sync="objek.no_reg"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitasOrang
								:state.sync="state"
								label="Nama pemilik/yang menguasai"
								description="Nama pemilik/yang menguasai tempat/bangunan"
								:entity_id.sync="objek.pemilik.id"
								:disabled="!flag_bangunan"
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
			</CCol>
		</CRow>

		<!-- Alert -->
		<MyAlert ref="alert"/>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'

const default_data = {
	alamat: null,
	no_reg: null,
	pemilik: {id: null},
}

export default {
	name: 'FormBangunan',
	components: {
		MyAlert,
		MySelectEntitasOrang
	},
	props: {
		penindakan: Object
	},
	data() {
		return {
			state: 'insert',
			flag_bangunan: false,
			objek: JSON.parse(JSON.stringify(default_data)),
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
		}
	},
	computed: {
		penindakan_id() {
			return this.penindakan.id
		},
	},
	methods: {
		async saveData() {
			if (this.state == 'insert') {
				try {
					let data = this.objek
					data['flag_bangunan'] = this.flag_bangunan
					let response = await api.savePenindakanBangunan(data, this.penindakan_id)
					this.updateDataObjek(response)
					this.alert('Data bangunan berhasil disimpan')
				} catch (error) {
					console.log(error)
				}
			} else {
				let data = this.objek
				data['flag_bangunan'] = this.flag_bangunan
				let response = await api.updatePenindakanBangunan(data, this.penindakan_id)
				this.updateDataObjek(response)
				this.alert('Data bangunan berhasil diubah')
			}
		},
		fillNull() {
			if (this.objek.pemilik == null) {
				this.objek.pemilik = JSON.parse(JSON.stringify(default_data.pemilik))
			}
		},
		updateDataObjek(response) {
			if (response != '') {
				this.state = 'edit'
				this.flag_bangunan = true
				let penindakan = this.penindakan
				penindakan.objek.bangunan = response.data
				this.$emit('update:penindakan', penindakan)
			} else {
				this.state = 'insert'
				this.flag_bangunan = false
				let penindakan = this.penindakan
				delete penindakan.objek.bangunan
				this.$emit('update:penindakan', penindakan)
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { 
			let validity = false
			if (this.flag_bangunan) {
				validity = validators.required(val)
			} else {
				validity = true
			}
			return validity
		},
	},
	beforeMount() {
		if (this.penindakan.objek.bangunan) {
			this.state = 'edit'
			this.flag_bangunan = true
			this.objek = JSON.parse(JSON.stringify(this.penindakan.objek.bangunan))
			this.fillNull()
		} else {
			this.state = 'insert'
			this.flag_bangunan = false
			this.objek = JSON.parse(JSON.stringify(default_data))
			if (this.penindakan.saksi) {
				this.objek.pemilik = {id: this.penindakan.saksi.id}
			}
		}
	}
}
</script>

<style>

</style>
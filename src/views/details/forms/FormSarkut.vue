<template>
	<div class="wrapper my-form">
		<!-- Form input penindakan sarana pengangkut -->
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
								:checked.sync="flag_sarkut"
							/>
						</CCol>
						<CCol class="col-9" md="6">
							<h5>Penindakan atas sarana pengangkut</h5>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="8" sm="12">
							<CInput
								label="Nama sarana pengangkut"
								:disabled="!flag_sarkut"
								:value.sync="objek.nama_sarkut"
								:is-valid="validatorRequired"
								invalid-feedback="Nama sarana pengangkut wajib diisi"
							/>
						</CCol>
						<CCol md="4" sm="12">
							<CInput
								label="Jenis sarana pengangkut"
								:disabled="!flag_sarkut"
								:value.sync="objek.jenis_sarkut"
								:is-valid="validatorRequired"
								invalid-feedback="Jenis sarana pengangkut wajib diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<CInput
								label="Nomor voyage/penerbangan/trayek"
								:disabled="!flag_sarkut"
								:value.sync="objek.nomor_sarkut"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="8">
							<CInput
								label="Ukuran/kapasitas muatan"
								:disabled="!flag_sarkut"
								:value.sync="objek.jumlah_kapasitas"
							/>
						</CCol>
						<CCol md="4">
							<CInput
								label="Satuan muatan"
								:disabled="!flag_sarkut"
								:value.sync="objek.satuan_kapasitas"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="6" sm="12">
							<MySelectNegara
								:state.sync="state"
								ref="SelectNegara"
								label="Bendera"
								:value.sync="objek.bendera.kode_2"
								:disabled="!flag_sarkut"
							/>
						</CCol>
						<CCol md="6" sm="12">
							<CInput
								label="Nomor registrasi/polisi"
								:disabled="!flag_sarkut"
								:value.sync="objek.registrasi_sarkut"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitasOrang 
								:state.sync="state"
								label="Nama nahkoda/pengemudi/pilot"
								:entity_id.sync="objek.pengemudi.id"
								:disabled="!flag_sarkut"
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
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectNegara from '../../components/SelectNegara.vue'

const default_data = {
	nama_sarkut: null,
	jenis_sarkut: null,
	nomor_sarkut: null,
	jumlah_kapasitas: null,
	satuan_kapasitas: null,
	pengemudi: {id: null},
	bendera: {kode_2: null},
	registrasi_sarkut: null,
}

export default {
	name: 'FormSarkut',
	components: {
		MyAlert,
		MySelectEntitasOrang,
		MySelectNegara,
	},
	props: {
		penindakan: Object
	},
	data() {
		return {
			state: 'insert',
			flag_sarkut: false,
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
					data['flag_sarkut'] = this.flag_sarkut
					let response = await api.savePenindakanSarkut(data, this.penindakan_id)
					this.updateDataObjek(response)
					this.alert('Data sarkut berhasil disimpan')
				} catch (error) {
					console.log(error)
				}
			} else {
				let data = this.objek
				data['flag_sarkut'] = this.flag_sarkut
				let response = await api.updatePenindakanSarkut(data, this.penindakan_id)
				this.updateDataObjek(response)
				this.alert('Data sarkut berhasil diubah')
			}
		},
		fillNull() {
			if (this.objek.bendera == null) {
				this.objek.bendera = JSON.parse(JSON.stringify(default_data.bendera))
			}

			if (this.objek.pengemudi == null) {
				this.objek.pengemudi = JSON.parse(JSON.stringify(default_data.pengemudi))
			}
		},
		updateDataObjek(response) {
			if (response != '') {
				this.state = 'edit'
				this.flag_sarkut = true
				let penindakan = this.penindakan
				penindakan.objek.sarkut = response.data
				this.$emit('update:penindakan', penindakan)
			} else {
				this.state = 'insert'
				this.flag_sarkut = false
				let penindakan = this.penindakan
				delete penindakan.objek.sarkut
				this.$emit('update:penindakan', penindakan)
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { 
			let validity = false
			if (this.flag_sarkut) {
				validity = validators.required(val)
			} else {
				validity = true
			}
			return validity
		},
	},
	beforeMount() {
		if (this.penindakan.objek.sarkut) {
			this.state = 'edit'
			this.flag_sarkut = true
			this.objek = JSON.parse(JSON.stringify(this.penindakan.objek.sarkut))
			this.fillNull()
		} else {
			this.state = 'insert'
			this.flag_sarkut = false
			this.objek = JSON.parse(JSON.stringify(default_data))
			this.objek.pengemudi = {id: this.penindakan.saksi.id}
		}
	}
}
</script>

<style>

</style>
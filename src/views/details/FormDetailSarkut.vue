<template>
	<div class="wrapper">
		<!-- Form input penindakan sarana pengangkut -->
		<CRow>
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="8" sm="12">
							<CInput
								label="Nama sarana pengangkut"
								:value.sync="data_objek.nama_sarkut"
								:is-valid="validatorRequired"
								invalid-feedback="Nama sarana pengangkut wajib diisi"
							/>
						</CCol>
						<CCol md="4" sm="12">
							<CInput
								label="Jenis sarana pengangkut"
								:value.sync="data_objek.jenis_sarkut"
								:is-valid="validatorRequired"
								invalid-feedback="Jenis sarana pengangkut wajib diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="4" sm="12">
							<CInput
								label="Nomor voyage/penerbangan/trayek"
								:value.sync="data_objek.no_flight_trayek"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="4" sm="8">
							<CInput
								label="Ukuran/kapasitas muatan"
								:value.sync="data_objek.jumlah_kapasitas"
							/>
						</CCol>
						<CCol md="2" sm="4">
							<CInput
								label="Satuan muatan"
								:value.sync="data_objek.satuan_kapasitas"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="3" sm="12">
							<CInput
								label="Bendera"
								:value.sync="data_objek.bendera"
							/>
						</CCol>
						<CCol md="3" sm="12">
							<CInput
								label="Nomor registrasi/polisi"
								:value.sync="data_objek.no_reg_polisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectPilot"
								label="Nama nahkoda/pengemudi/pilot"
								:id.sync="data_objek.pilot.id"
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
		<MyAlert ref="alertSarkut"></MyAlert>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import validators from '../../helpers/validator.js'
import MyAlert from '../components/AlertSubmit.vue'
import MySelectEntitas from '../components/SelectEntitas.vue'

const data_default = {
	nama_sarkut: null,
	jenis_sarkut: null,
	no_flight_trayek: null,
	jumlah_kapasitas: null,
	satuan_kapasitas: null,
	pilot: {id: null},
	bendera: null,
	no_reg_polisi: null,
}

export default {
	name: 'FormDetailSarkut',
	components: {
		MyAlert,
		MySelectEntitas
	},
	props: {
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
				this.parseData(val.objek.data)
			}
		}
	},
	methods: {
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.insertDetail(this.data.main.type, this.data.main.data.id, 'sarkut', this.data_objek)
					this.parseData(response.data.data)
					this.state = 'edit'
					this.$emit('submit-data')
					this.alert('Data sarkut berhasil disimpan')
				} catch (error) {
					console.log(error)
				}
			} else {
				api.updateDetail(this.data.main.type, this.data.main.data.id, 'sarkut', this.data_objek.id, this.data_objek)
				this.$refs.selectPilot.getEntitas(this.data_objek.pilot.id, true)
				this.$emit('submit-data')
				this.alert('Data sarkut berhasil diubah')
			}
		},
		parseData(objek) {
			if (objek.pilot == null) {
				objek.pilot = {
					id: null
				}
			}
			this.data_objek = objek
			this.$refs.selectPilot.getEntitas(this.data_objek.pilot.id, true)
		},
		alert(text, color, time) {
			this.$refs.alertSarkut.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	mounted() {
		if (this.data.objek.type == 'sarkut') {
			if (this.data.objek.data != null) {
				this.parseData(this.data.objek.data)
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
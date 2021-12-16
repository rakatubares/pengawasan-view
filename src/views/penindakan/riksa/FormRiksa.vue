<template>
	<div class="wrapper">
		<!-- Form BA Pemeriksaan -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.penindakan.sprint.id"
					>
					</MySelectSprint>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Lokasi Pemeriksaan"
						description="Tempat/lokasi/alamat di mana pemeriksaan dilakukan"
						:value.sync="data.penindakan.lokasi_penindakan"
						:is-valid="validatorRequired"
						invalid-feedback="Lokasi pemeriksaan wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama terang pemilik/kuasa barang atau sarana pengangkut yang menyaksikan pemeriksaan"
						:showAlamat="true"
						:id.sync="data.penindakan.saksi.id"
					>
					</MySelectEntitas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan pemeriksaan"
						:id.sync="data.penindakan.petugas1.user_id"
						role="p2vue.penindakan"
						:currentUser="true"
					>
					</MySelectPetugas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas2"
						label="Nama Petugas 2"
						description="Nama Pejabat Bea dan Cukai yang melakukan penyegelan"
						:id.sync="data.penindakan.petugas2.user_id"
						role="p2vue.penindakan"
					>
					</MySelectPetugas>
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
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

export default {
	name: 'FormRiksa',
	components: {
		MyAlert,
		MySelectEntitas,
		MySelectPetugas,
		MySelectSprint
	},
	props: {
		state: String,
		data: Object
	},
	methods: {
		validateData() {
			this.$refs.selectSprint.getSprint(this.data.penindakan.sprint.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.penindakan.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.penindakan.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.penindakan.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.storeDoc('riksa', this.data)
					let doc_id = response.main.data.id
					this.$emit('submit-data', doc_id)
					this.$emit('update:state', 'edit')
					this.alert('Data BA Pemeriksaan berhasil disimpan')
				} catch (error) {
					console.log('form riksa - save data - error', JSON.parse(JSON.stringify(error)))
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('riksa', this.data.main.data.id, this.data)
					this.$emit('submit-data')
					this.alert('Data BA Pemeriksaan berhasil diubah')
				} catch (error) {
					console.log('form riksa - update data - error', JSON.parse(JSON.stringify(error)))
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	watch: {
		data: function(val) {
			this.validateData()
		}
	},
}
</script>

<style>
.row+.row {
	margin-top:0;
}
.v-text-field__details {
	display: none;
}
</style>
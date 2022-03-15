<template>
	<div class="wrapper form-riksa">
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
					<MySelectLokasi
						:state.sync="state"
						:grup_lokasi_id.sync="data.penindakan.grup_lokasi.id"
						:lokasi.sync="data.penindakan.lokasi_penindakan"
						label="Lokasi Pemeriksaan"
						description="Tempat/lokasi/alamat di mana pemeriksaan dilakukan"
						feedback="Lokasi pemeriksaan wajib diisi"
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
					/>
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
					/>
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

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectLokasi from '../../components/SelectLokasi.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const default_data = {
	penindakan: {
		grup_lokasi: {id: null},
		sprint: {id: null},
		saksi: {id: null},
		petugas1: {user_id: null},
		petugas2: {user_id: null}
	},
}

export default {
	name: 'FormRiksa',
	components: {
		MyAlert,
		MySelectEntitas,
		MySelectLokasi,
		MySelectPetugas,
		MySelectSprint
	},
	props: {
		state: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById('riksa', this.doc_id)
			this.data = response.data.data

			if (this.data.penindakan.petugas2 == null) {
				this.data.penindakan.petugas2 = {user_id: null}
			}

			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectSprint.getSprint(this.data.penindakan.sprint.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.penindakan.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.penindakan.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.penindakan.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc('riksa', this.data)

					if (this.data.penindakan.petugas2 == null) {
						this.data.penindakan.petugas2 = {user_id: null}
					}

					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert('Data BA Pemeriksaan berhasil disimpan')
				} catch (error) {
					console.log('form riksa - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('riksa', this.doc_id, this.data)
					this.alert('Data BA Pemeriksaan berhasil diubah')
				} catch (error) {
					console.log('form riksa - update data - error', error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
.form-riksa .row+.row {
	margin-top:0;
}

.form-riksa .v-text-field__details {
	display: none;
}
</style>
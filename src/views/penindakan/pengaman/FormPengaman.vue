<template>
	<div class="wrapper">
		<!-- Form BA Tanda Pengaman header -->
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
				<CCol md="3" sm="12">
					<CInput
						label="Jenis Tanda Pengaman"
						description="Jenis tanda pengaman yang digunakan (kertas, kunci, timah, lak, segel elektronik, dll)"
						:value.sync="data.main.data.jenis_pengaman"
						:is-valid="validatorRequired"
						invalid-feedback="Jenis tanda pengaman wajib diisi"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Jumlah Tanda Pengaman"
						description="Jumlah tanda pengaman yang digunakan"
						:value.sync="data.main.data.jumlah_pengaman"
						:is-valid="validatorNumber"
						invalid-feedback="Jumlah tanda pengaman wajib diisi"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Satuan"
						:value.sync="data.main.data.satuan_pengaman"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Tempat Tanda Pengaman"
						description="Bagian / lokasi tempat tanda pengaman ditempatkan / dilekatkan"
						:value.sync="data.main.data.tempat_pengaman"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Lokasi Pengamanan"
						description="Tempat / lokasi dilakukan pengamanan"
						:value.sync="data.penindakan.lokasi_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Alasan Pengaman"
						description="Alasan dilakukan pengamanan"
						:value.sync="data.main.data.alasan_pengamanan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Keterangan"
						:value.sync="data.main.data.keterangan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama lengkap pengangkut / kuasa barang / sarana pengangkut atau pemilik / yang menguasai bangunan atau tempat lain yang menyaksikan pelekatan"
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
						description="Nama Pejabat Bea dan Cukai yang melakukan pelekatan tanda pengaman"
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
						description="Nama Pejabat Bea dan Cukai yang melakukan pelekatan tanda pengaman"
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
	name: 'FormPengaman',
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
					console.log('form pengaman - save data')
					let response = await api.storeDoc('pengaman', this.data)
					let doc_id = response.main.data.id
					this.$emit('submit-data', doc_id)
					this.$emit('update:state', 'edit')
					this.alert('Data BA Pelekatan Tanda Pengaman berhasil disimpan')
				} catch (error) {
					console.log('form pengaman - save data - error', JSON.parse(JSON.stringify(error)))
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('pengaman', this.data.main.data.id, this.data)
					this.$emit('submit-data')
					this.alert('Data BA Pelekatan Tanda Pengaman berhasil diubah')
				} catch (error) {
					console.log('form pengaman - update data - error', JSON.parse(JSON.stringify(response)))
				}
			}
		},
		alert(text, color, time) {
			console.log('form pengaman - alert')
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorNumber(val) { return validators.number(val) },
	},
	watch: {
		data: function(val) {
			this.validateData()
		}
	},
}
</script>

<style>

</style>
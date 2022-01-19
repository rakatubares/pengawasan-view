<template>
	<div class="wrapper">
		<!-- Form BA Tanda Pengaman header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.penindakan.sprint.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Jenis Tanda Pengaman"
						description="Jenis tanda pengaman yang digunakan"
						:options="['Kertas', 'Kunci', 'Timah', 'Lak', 'Segel Elektronik', 'Lainnya']"
						:value.sync="data.main.data.jenis_pengaman"
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
					/>
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
					/>
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
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const default_data = {
	main: {
		data: {
			jenis_pengaman: 'Kertas',
			jumlah_pengaman: null,
			satuan_pengaman: null,
			tempat_pengaman: null,
			alasan_pengamanan: null,
			keterangan: null,
		}
	},
	penindakan: {
		lokasi_penindakan: null,
		sprint: {id: null},
		saksi: {id: null},
		petugas1: {user_id: null},
		petugas2: {user_id: null}
	},
}

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
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
		}
	},
	methods: {
		async getData() {
			this.data = await api.getDocumentById('pengaman', this.doc_id)
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
					let response = await api.storeDoc('pengaman', this.data)
					this.$emit('update:doc_id', response.main.data.id)
					this.$emit('update:state', 'edit')
					this.alert('Data BA Pelekatan Tanda Pengaman berhasil disimpan')
				} catch (error) {
					console.log('form pengaman - save data - error', JSON.parse(JSON.stringify(error)))
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('pengaman', this.doc_id, this.data)
					this.alert('Data BA Pelekatan Tanda Pengaman berhasil diubah')
				} catch (error) {
					console.log('form pengaman - update data - error', JSON.parse(JSON.stringify(response)))
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorNumber(val) { return validators.number(val) },
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
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
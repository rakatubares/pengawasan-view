<template>
	<div class="wrapper form-contoh">
		<!-- Form BA Contoh Barang -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.sprint.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="9" sm="12">
					<CTextarea
						label="Lokasi Pengambilan Contoh"
						description="Lokasi tempat barang yang terhadapnya dilakukan pengambilan contoh"
						:value.sync="data.lokasi"
						:is-valid="validatorRequired"
						invalid-feedback="Lokasi pengambilan contoh wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama terang pemilik / kuasa barang yang menyaksikan pengambilan contoh"
						:showAlamat="true"
						:id.sync="data.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan pengambilan contoh"
						:id.sync="data.petugas1.user_id"
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
						description="Nama Pejabat Bea dan Cukai yang melakukan pengambilan contoh"
						:id.sync="data.petugas2.user_id"
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
	lokasi: null,
	sprint: {id: null},
	saksi: {id: null},
	petugas1: {user_id: null},
	petugas2: {user_id: null}
}

export default {
	name: 'FormContoh',
	components: {
		MyAlert,
		MySelectEntitas,
		MySelectPetugas,
		MySelectSprint
	},
	props: {
		state: String,
		doc_id: Number,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
		}
	},
	methods: {
		async getData() {
			this.data = await api.getDocumentById('contoh', this.doc_id)
			
			if (this.data.petugas2 == null) {
				this.data.petugas2 = {user_id: null}
			}

			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectSprint.getSprint(this.data.sprint.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.storeDoc('contoh', this.data)
					this.$emit('update:doc_id', response.id)
					this.$emit('update:state', 'edit')
					this.alert('Data BA Contoh Barang berhasil disimpan')
				} catch (error) {
					console.log('form contoh barang - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('contoh', this.doc_id, this.data)
					this.alert('Data BA Contoh Barang berhasil diubah')
				} catch (error) {
					console.log('form contoh barang - update data - error', JSON.parse(JSON.stringify(error)))
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
			this.renderData()
		},
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
.form-contoh .row+.row {
	margin-top:0;
}
.form-contoh .v-text-field__details {
	display: none;
}
</style>
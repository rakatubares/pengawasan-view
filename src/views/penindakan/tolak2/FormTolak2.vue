<template>
	<div class="wrapper form-tolak2">
		<CForm class="pt-3">
			<CRow>
				<CCol sm="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.sprint.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectTolak1
						ref="selectTolak1"
						:id.sync="data.id_tolak1"
						:filter="filter_tolak1"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Alasan Penolakan"
						description="Alasan menolak menandatangani Surat Bukti Penindakan atau berkas penindakan lainnya"
						:value.sync="data.alasan"
						:is-valid="validatorRequired"
						invalid-feedback="Alasan penolakan wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Saksi"
						description="Nama saksi yang menyaksikan penolakan tanda tangan"
						:id.sync="data.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
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
import MySelectTolak1 from '../tolak1/SelectTolak1.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const default_data = {
	sprint: {id: null},
	id_tolak1: null,
	alasan: null,
	saksi: {id: null},
	petugas1: {user_id: null},
	petugas2: {user_id: null}
}

export default {
	name: 'FormTolak2',
	components: {
		MyAlert,
		MySelectEntitas,
		MySelectPetugas,
		MySelectTolak1,
		MySelectSprint,
	},
	props: {
		state: String,
		doc_id: Number,
	},
	data() {
		return {
			doc_type: 'tolak2',
			data: JSON.parse(JSON.stringify(default_data)),
			filter_tolak1: {
				kode_status: 200,
				status_tolak: null
			}
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById(this.doc_type, this.doc_id)
			this.data = response.data.data
			
			if (this.data.petugas2 == null) {
				this.data.petugas2 = {user_id: null}
			}
			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectSprint.getSprint(this.data.sprint.id, true)
			this.$refs.selectTolak1.getData(this.data.id_tolak1, true)
			this.$refs.selectSaksi.getEntitas(this.data.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)

					if (this.data.petugas2 == null) {
						this.data.petugas2 = {user_id: null}
					}

					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert('Data BA Penolakan terhadap BA Penolakan TTD SBP berhasil disimpan')
				} catch (error) {
					console.log('form tolak2 - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.alert('Data BA Penolakan terhadap BA Penolakan TTD SBP berhasil diubah')
				} catch (error) {
					console.log('form tolak2 - update data - error', error)
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
.form-tolak2 .row+.row {
	margin-top:0;
}

.form-tolak2 .v-text-field__details {
	display: none;
}
</style>
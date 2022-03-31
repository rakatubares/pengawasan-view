<template>
	<div class="wrapper form-tolak1">
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
				<CCol md="3">
					<label>Tipe SBP</label>
					<CDropdown
						:togglerText.sync="txt_sbp_type"
						color="primary"
					>
						<CDropdownItem @click="toggleSbpType('sbp')">SBP Biasa</CDropdownItem>
						<CDropdownItem @click="toggleSbpType('sbpn')">SBP NPP</CDropdownItem>
					</CDropdown>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectSbp
						ref="selectSbp"
						:sbp_type.sync="data.sbp_type"
						:id.sync="data.id_sbp"
						:filter="filter_sbp"
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
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSbp from '../sbp/SelectSbp.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const default_data = {
	sprint: {id: null},
	sbp_type: 'sbp',
	id_sbp: null,
	alasan: null,
	petugas1: {user_id: null},
	petugas2: {user_id: null}
}

export default {
	name: 'FormTolak1',
	components: {
		MyAlert,
		MySelectPetugas,
		MySelectSbp,
		MySelectSprint,
	},
	props: {
		state: String,
		doc_id: Number,
	},
	data() {
		return {
			doc_type: 'tolak1',
			data: JSON.parse(JSON.stringify(default_data)),
			txt_sbp_type: null,
			filter_sbp: {
				kode_status: [102, 103, 200, 202, 203],
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
			this.$refs.selectSbp.getData(this.data.id_sbp, true)
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
					this.alert('Data BA Penolakan SBP berhasil disimpan')
				} catch (error) {
					console.log('form tolak1 - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.alert('Data BA Penolakan SBP berhasil diubah')
				} catch (error) {
					console.log('form tolak1 - update data - error', error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		toggleSbpType(val) {
			if (this.data.sbp_type != val) {
				this.$refs.selectSbp.getData(null, true)	
				this.data.id_sbp = null
			}

			this.data.sbp_type = val
			if (val == 'sbp') {
				this.txt_sbp_type = 'SBP Biasa'
			} else {
				this.txt_sbp_type = 'SBP NPP'
			}
		},
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
		this.toggleSbpType(this.data.sbp_type)
	}
}
</script>

<style>
.form-tolak1 .row+.row {
	margin-top:0;
}

.form-tolak1 .v-text-field__details {
	display: none;
}
</style>
<template>
	<div class="wrapper">
		<!-- Form BA Buka Segel header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.main.data.sprint.id"
					>
					</MySelectSprint>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Nomor Segel"
						description="Nomor segel yang digunakan dalam pembukaan segel"
						:value.sync="data.main.data.nomor_segel"
						:is-valid="validatorRequired"
						invalid-feedback="Nomor segel wajib diisi"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl Segel</label>
						<date-picker
							v-model="data.main.data.tanggal_segel"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
								/>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CInput
						label="Jenis Segel"
						description="Jenis segel yang digunakan (kertas, kunci, timah, lak, segel elektronik, dll)"
						:value.sync="data.main.data.jenis_segel"
						:is-valid="validatorRequired"
						invalid-feedback="Jenis segel wajib diisi"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Jumlah Segel"
						description="Jumlah segel yang digunakan"
						:value.sync="data.main.data.jumlah_segel"
						:is-valid="validatorNumber"
						invalid-feedback="Jumlah segel wajib diisi"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Satuan"
						:value.sync="data.main.data.satuan_segel"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Tempat Segel"
						description="Bagian / lokasi tempat segel ditempatkan / dilekatkan"
						:value.sync="data.main.data.tempat_segel"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama terang pengangkut / pemilik / kuasa / saksi yang menyaksikan pembukaan segel"
						:showAlamat="true"
						:id.sync="data.main.data.saksi.id"
					>
					</MySelectEntitas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan penitipan"
						:id.sync="data.main.data.petugas1.user_id"
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
						description="Nama Pejabat Bea dan Cukai yang melakukan penitipan"
						:id.sync="data.main.data.petugas2.user_id"
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

// const data_default = {
// 	sprint: {id: null},
// 	tgl_sprint: null,
// 	jenis_segel: null,
// 	jumlah_segel: null,
// 	nomor_segel: null,
// 	lokasi_segel: null,
// 	saksi: {id: null},
// 	petugas1: {user_id: null},
// 	petugas2: {user_id: null},
// }

export default {
	name: 'FormBukaSegel',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas,
		MySelectPetugas,
		MySelectSprint
	},
	props: {
		// state: {
		// 	Type: String,
		// 	default: 'insert'
		// },
		// id: Number
		state: String,
		data: Object
	},
	// data() {
	// 	return {
	// 		data: JSON.parse(JSON.stringify(data_default)),
	// 	}
	// },
	methods: {
		// getData() {
		// 	if (this.state == 'edit') {
		// 		axios
		// 			.get(api.bukaSegelId(this.id))
		// 			.then(
		// 				(response) => {
		// 					this.data = response.data.data
		// 					// Show reference
		// 					this.$refs.selectSprint.getSprint(this.data.sprint.id, true)
		// 					this.$refs.selectSaksi.getEntitas(this.data.saksi.id, true)
		// 					this.$refs.selectPetugas1.getPetugas(this.data.petugas1.user_id, true)
		// 					if (response.data.data.petugas2 != null) {
		// 						this.$refs.selectPetugas2.getPetugas(this.data.petugas2.user_id, true)	
		// 					} else {
		// 						this.data.petugas2 = {user_id: null}
		// 					}
		// 				}
		// 			)
		// 	}
		// },
		// saveData() {
		// 	let submit_method
		// 	let submit_url
		// 	submit_method = this.state == 'insert' ? 'post' : 'put'
		// 	submit_url = this.state == 'insert' ? 
		// 		api.bukaSegel() : 
		// 		api.bukaSegelId(this.id)

		// 	axios({
		// 		method: submit_method,
		// 		url: submit_url,
		// 		data: this.data,
		// 	})
		// 		.then((response) => {
		// 			this.$emit('save-data', this.state)
		// 			this.$emit('update:state', 'edit')
		// 			if (submit_method == 'post') {
		// 				this.$emit('update:id', response.data.id)
		// 			}
		// 			this.alert('Data header berhasil disimpan')
		// 		})
		// },
		validateData() {
			this.$refs.selectSprint.getSprint(this.data.main.data.sprint.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.main.data.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.main.data.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.main.data.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.storeDoc('bukasegel', this.data)
					let doc_id = response.main.data.id
					this.$emit('submit-data', doc_id)
					this.$emit('update:state', 'edit')
					this.alert('Data BA Buka Segel berhasil disimpan')
				} catch (error) {
					console.log('form buka segel - save data - error', JSON.parse(JSON.stringify(error)))
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('bukasegel', this.data.main.data.id, this.data)
					this.$emit('submit-data')
					this.alert('Data BA Buka Segel berhasil diubah')
				} catch (error) {
					console.log('form buka segel - update data - error', JSON.parse(JSON.stringify(response)))
				}
			}
		},
		alert(text, color, time) {
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
	// mounted() {
	// 	this.getData(true)
	// }
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
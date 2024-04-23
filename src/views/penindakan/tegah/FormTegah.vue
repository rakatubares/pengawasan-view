<template>
	<div class="wrapper my-form">
		<!-- Form BA Penegahan header -->
		<CForm class="pt-3">
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tanggal Penindakan</label>
				<CCol md="3" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.penindakan.tanggal_selesai_penindakan"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
							class="w-100"
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
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectSprint
						:id.sync="selected_sprint"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitasOrang
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama pemilik/importir/eksportir/kuasanya/saksi yang menyaksikan penegahan"
						:entity_id.sync="data.penindakan.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan penegahan"
						:nip.sync="data.penindakan.petugas.petugas1.nip"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 2"
						description="Nama Pejabat Bea dan Cukai yang melakukan penegahan"
						:nip.sync="data.penindakan.petugas.petugas2.nip"
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const default_data = {
	penindakan: {
		tanggal_selesai_penindakan: null,
		sprint: {id: null},
		saksi: {id: null},
		petugas: {
			petugas1: {nip: null},
			petugas2: {nip: null},
		},
	},
}

export default {
	name: 'FormTegah',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitasOrang,
		MySelectPetugas,
		MySelectSprint
	},
	props: {
		state: String,
		doc_type: String,
		tipe_surat: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			selected_sprint: null,
		}
	},
	watch: {
		selected_sprint(val) {
			this.data.penindakan.sprint.id = val
		}
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data = response.data
			this.selected_sprint = this.data.penindakan.sprint
				? this.data.penindakan.sprint.id : null
			this.fillNull()
		},
		fillNull() {
			if (this.data.penindakan.sprint == null) {
				this.data.penindakan.sprint = JSON.parse(JSON.stringify(default_data.penindakan.sprint))
			}

			if (this.data.penindakan.saksi == null) {
				this.data.penindakan.saksi = JSON.parse(JSON.stringify(default_data.penindakan.saksi))
			}

			if (
				(this.data.penindakan.petugas.petugas2 == null) ||
				(this.data.penindakan.petugas.petugas2 == undefined)
			) {
				this.data.penindakan.petugas.petugas2 = JSON.parse(JSON.stringify(default_data.penindakan.petugas.petugas2))
			}
		},
		async saveData() {
			if (this.state == 'insert') {
				this.data = await api.storeDoc(this.doc_type, this.data)
				this.fillNull()

				this.$emit('update:doc_id', this.data.id)
				this.$emit('update:state', 'edit')
				this.alert(`Data ${this.tipe_surat} berhasil disimpan`)
			} else if (this.state == 'edit') {
				await api.updateDoc(this.doc_type, this.doc_id, this.data)
				this.alert(`Data ${this.tipe_surat} berhasil diubah`)
			}

			this.$emit('save-data', this.data)
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		} else {
			this.data.penindakan.tanggal_selesai_penindakan = converters.currentDate()
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
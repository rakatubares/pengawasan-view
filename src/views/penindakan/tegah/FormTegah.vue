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
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

export default {
	name: 'FormTegah',
	components: {
		DatePicker,
		MySelectEntitasOrang,
		MySelectPetugas,
		MySelectSprint
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			selected_sprint: null,
		}
	},
	watch: {
		document(val) {
			this.data = val
		},
		selected_sprint(val) {
			this.data.penindakan.sprint.id = val
		},
	},
	methods: {
		async saveData() {
			if (this.state == 'insert') {
				var data = await api.storeDoc(this.doc_type, this.data)
				this.$emit('update:state', 'edit')
			} else if (this.state == 'edit') {
				var data = await api.updateDoc(this.doc_type, this.data.id, this.data)
			}
			this.$emit('save-data', data)
		},
		validatorRequired(val) { return validators.required(val) },
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
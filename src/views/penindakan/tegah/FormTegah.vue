<template>
	<div class="wrapper">
		<!-- Form BA Penegahan header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.sprint.id"
					>
					</MySelectSprint>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama pemilik/importir/eksportir/kuasanya/saksi yang menyaksikan penegahan"
						:id.sync="data.saksi.id"
					>
					</MySelectEntitas>
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
import axios from "axios"
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const data_default = {
	sprint: {id: null},
	saksi: {id: null},
	pejabat1: 'petugas'
}

export default {
	name: 'FormTegah',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas,
		MySelectSprint
	},
	props: {
		state: {
			Type: String,
			default: 'insert'
		},
		id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default)),
		}
	},
	methods: {
		getData() {
			if (this.state == 'edit') {
				axios
					.get(api.getPenegahanById(this.id))
					.then(
						(response) => {
							this.data = response.data.data
							// Show reference
							this.$refs.selectSprint.getSprint(this.data.sprint.id, true)
							this.$refs.selectSaksi.getEntitas(this.data.saksi.id, true)
						}
					)
			}
		},
		saveData() {
			let submit_method
			let submit_url
			submit_method = this.state == 'insert' ? 'post' : 'put'
			submit_url = this.state == 'insert' ? 
				api.getPenegahan() : 
				api.getPenegahanById(this.id)
			axios({
				method: submit_method,
				url: submit_url,
				data: this.data,
			})
				.then((response) => {
					this.$emit('save-data', this.state)
					this.$emit('update:state', 'edit')
					if (submit_method == 'post') {
						this.$emit('update:id', response.data.id)
					}
					this.alert('Data header berhasil disimpan')
				})
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	mounted() {
		this.getData(true)
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
<template>
	<div class="wrapper">
		<!-- Form input penindakan badan -->
		<CRow>
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectOrang"
								label="Nama orang yang ditindak"
								:id.sync="orang_id"
								:showTanggalLahir="true"
								:showWargaNegara="true"
								:showAlamat="true"
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
			</CCol>
		</CRow>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import axios from "axios"
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import MyAlert from '../components/AlertSubmit.vue'
import MySelectEntitas from '../components/SelectEntitas.vue'
import api from '../../router/api2.js'
import validators from '../../helpers/validator.js'

export default {
	name: 'FormDetailBadan',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas
	},
	props: {
		data: Object
	},
	data() {
		return {
			state: 'insert',
			orang_id: null
		}
	},
	watch: {
		data: {
			handler: function (val) {
				this.parseData(val.objek.data)
			}
		}
	},
	methods: {
		async saveData() {
			let data = {orang_id: this.orang_id}
			await api.insertDetail(this.data.main.type, this.data.main.data.id, 'orang', data)
			this.$emit('submit-data')
			this.alert('Data orang berhasil disimpan')
		},
		parseData(objek) {
			if (objek == null) {
				this.orang_id = null
			}
			this.$refs.selectOrang.getEntitas(this.orang_id, true)
		},
		alert(text) {
			this.$refs.alert.show_alert(text)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	mounted() {
		if (this.data.objek.type == 'orang') {
			if (this.data.objek.data != null) {
				this.orang_id = this.data.objek.data.id
				this.parseData(this.orang_id)
				this.state = 'edit'
			} else {
				this.orang_id = null
				this.state = 'insert'
			}
		} else {
			this.orang_id = null
			this.state = 'insert'
		}
	}
}
</script>

<style>

</style>
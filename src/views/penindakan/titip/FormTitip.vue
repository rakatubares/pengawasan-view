<template>
	<div class="wrapper">
		<!-- Form BA Penitipan header -->
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
				<CCol sm="12">
					<CInput
						label="Lokasi Penitipan"
						description="Lokasi/alamat tempat yang terhadapnya dilakukan penitipan"
						:value.sync="data.lokasi_titip"
						:is-valid="validatorRequired"
						invalid-feedback="Lokasi penitipan wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="9" sm="12">
					<CInput
						label="Nomor BA Penyegelan"
						description="Nomor BA Penyegelan sarana pengangkut/barang yang terhadapnya dilakukan penitipan"
						:value.sync="data.nomor_ba_segel"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal BA Segel</label>
						<date-picker
							v-model="data.tanggal_segel"
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
				<CCol md="12">
					<MySelectEntitas
						ref="selectPenerima"
						label="Nama Penerima"
						description="Nama orang yang menerima penitipan"
						:showPekerjaan="true"
						:showAlamat="true"
						:id.sync="data.penerima.id"
					>
					</MySelectEntitas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Orang yang menyaksikan penitipan"
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
import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const data_default = {
	sprint: {id: null},
	lokasi_titip: null,
	nomor_ba_segel: null,
	tanggal_segel: null,
	penerima: {id: null},
	saksi: {id: null},
	pejabat1: 'petugas'
}

const custom_validations_default = {
	tgl_sprint: {
		state: false,
		text: 'Tanggal SPRINT wajib diisi'
	},
}

export default {
	name: 'FormTitip',
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
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
		}
	},
	methods: {
		getData() {
			if (this.state == 'edit') {
				axios
					.get(api.getPenitipanById(this.id))
					.then(
						(response) => {
							this.data = response.data.data
							// Show reference
							this.$refs.selectSprint.getSprint(this.data.sprint.id, true)
							this.$refs.selectPenerima.getEntitas(this.data.penerima.id, true)
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
				api.getPenitipan() : 
				api.getPenitipanById(this.id)

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
		validatorDatetime(val, format, validasiName, text) { 
			let dt = converters.date(val, format)
			let valid = validators.date(dt)
			_.set(this, validasiName+'.state', valid)
			_.set(this, validasiName+'.text', text)
		},
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
<template>
	<div class="wrapper my-form">
		<!-- Form LP -->
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
					<MySelectSbp
						ref="selectSbp"
						sbp_type="sbpn"
						:id.sync="data.id_sbp"
						:filter="filter_sbp"
						:show_elements="['jenis_pelanggaran', 'uraian_penindakan', 'alasan_penindakan', 'hal_terjadi']"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<div class="form-group">
						<label class="w-100">Tanggal LP-N</label>
						<date-picker 
							v-model="data.tanggal_dokumen" 
							format="DD-MM-YYYY"
							value-type="format"
							type="date"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_lp', 'Tanggal LP-N wajib diisi')
							"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.tanggal_lp.state,
										'is-invalid': !validasi.tanggal_lp.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.tanggal_lp.text}}</div>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Kesimpulan"
						description="Catatan Pejabat penerbit LP-N"
						:value.sync="data.kesimpulan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPenyusun"
						:state.sync="state"
						:label="{jabatan: 'Jabatan Penyusun', nama: 'Nama Penyusun'}"
						:selectable_jabatan="['bd.0503', 'bd.0504']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.penyusun.user.user_id"
						:jabatan.sync="data.penyusun.jabatan.kode"
						:plh.sync="data.penyusun.plh"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPenerbit"
						:state.sync="state"
						:label="{jabatan: 'Jabatan Penerbit', nama: 'Nama Penerbit'}"
						:selectable_jabatan="['bd.05']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.penerbit.user.user_id"
						:jabatan.sync="data.penerbit.jabatan.kode"
						:plh.sync="data.penerbit.plh"
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
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectSbp from '../sbp/SelectSbp.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const default_data = {
	sprint: {id: null},
	tanggal_dokumen: null,
	kesimpulan: null,
	penyusun: {
		jabatan: {kode: 'bd.0503'},
		plh: false,
		user: {user_id: null}
	},
	penerbit: {
		jabatan: {kode: 'bd.05'},
		plh: false,
		user: {user_id: null}
	},
}

const custom_validations_default = {
	tanggal_lp: {
		state: false,
		text: 'Tanggal LP-N wajib diisi'
	},
}

export default {
	name: 'FormLpN',
	components: {
		DatePicker,
		MyAlert,
		MySelectPejabat,
		MySelectSbp,
		MySelectSprint,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			filter_sbp: {
				kode_status: 202
			}
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById(this.doc_type, this.doc_id)
			this.data = response.data.data
			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.validatorDatetime(this.data.tanggal_dokumen, 'DD-MM-YYYY HH:mm', 'validasi.tanggal_lp', 'Tanggal LP-N wajib diisi')
			this.$refs.selectSprint.getSprint(this.data.sprint.id, true)
			this.$refs.selectSbp.getData(this.data.id_sbp, true)
			this.$refs.selectPenyusun.selected_jabatan = this.data.penyusun.jabatan.kode
			this.$refs.selectPenyusun.togglePlh(this.data.penyusun.plh)
			this.$refs.selectPenyusun.getPetugas(this.data.penyusun.user.user_id, true)
			this.$refs.selectPenerbit.selected_jabatan = this.data.penerbit.jabatan.kode
			this.$refs.selectPenerbit.togglePlh(this.data.penerbit.plh)
			this.$refs.selectPenerbit.getPetugas(this.data.penerbit.user.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.storeDoc(this.doc_type, this.data)
					this.$emit('update:doc_id', response.id)
					this.$emit('update:state', 'edit')
					this.alert('Data LP-N berhasil disimpan')
				} catch (error) {
					console.log('form lpn - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.alert('Data LP-N berhasil diubah')
				} catch (error) {
					console.log('form lpn - update data - error', error)
				}
			}
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
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>

</style>
<template>
	<div class="wrapper">
		<CButton
			v-if="state == 'create'"
			color="success"
			shape="pill"
			@click="show_modal_lphp=true"
		>
			Buat LPHP	
		</CButton>
		<CButton
			v-if="state == 'edit'"
			color="success"
			shape="pill"
			@click="openModal"
		>
			Edit LPHP	
		</CButton>
		<CButton
			v-if="state == 'edit'"
			color="danger"
			shape="pill"
			@click="openModalDelete"
		>
			Hapus LPHP	
		</CButton>

		<!-- Modal LPHP -->
		<CModal
			class="modal-lphp"
			title="Data LPHP"
			size="lg"
			:show.sync="show_modal_lphp"
		>
			<CForm>
				<CRow>
					<CCol md="12">
						<div class="form-group">
							<label class="w-100">Tanggal LPHP</label>
							<date-picker 
								v-model="data_lphp.tanggal_dokumen" 
								format="DD-MM-YYYY"
								value-type="format"
								type="date"
								@change="
									validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_lphp', 'Tanggal LPHP wajib diisi')
								"
							>
								<template v-slot:input="slotProps">
									<input
										class="form-control" 
										type="text" 
										v-bind="slotProps.props" 
										v-on="slotProps.events"
										v-bind:class="{
											'is-valid': validasi.tanggal_lphp.state,
											'is-invalid': !validasi.tanggal_lphp.state
										}"
									/>
									<div class="invalid-feedback pb-1">{{validasi.tanggal_lphp.text}}</div>
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
							label="Analisa hasil penindakan"
							description="Analisa penentuan hasil penindakan oleh atasan pejabat yang melakukan penindakan"
							:value.sync="data_lphp.analisa"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CTextarea
							label="Catatan"
							description="Catatan atasan pejabat penyusun LPHP"
							:value.sync="data_lphp.catatan"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="12">
						<MySelectPejabat
							ref="selectPenyusun"
							:label="{jabatan: 'Jabatan Penyusun', nama: 'Nama Penyusun'}"
							:selectable_jabatan="['bd.0503', 'bd.0504']"
							:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
							:id_pejabat.sync="data_lphp.penyusun.user.user_id"
							:jabatan.sync="data_lphp.penyusun.jabatan.kode"
							:plh.sync="data_lphp.penyusun.plh"
						>
						</MySelectPejabat>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="12">
						<MySelectPejabat
							ref="selectAtasan"
							:label="{jabatan: 'Jabatan Atasan', nama: 'Nama Atasan'}"
							:selectable_jabatan="['bd.05']"
							:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
							:id_pejabat.sync="data_lphp.atasan.user.user_id"
							:jabatan.sync="data_lphp.atasan.jabatan.kode"
							:plh.sync="data_lphp.atasan.plh"
						>
						</MySelectPejabat>
					</CCol>
				</CRow>
			</CForm>

			<template #footer>
				<CButton
					color="success"
					@click="saveData"
				>
					Simpan
				</CButton>
				<CButton
					color="secondary"
					@click="closeModal"
				>
					Kembali
				</CButton>
			</template>
		</CModal>

		<!-- Modal delete -->
		<MyModalDelete
			v-if="modal_delete_props.show"
			doc_type="lphp"
			:doc_id="data_lphp.id"
			@close-modal="closeModalDelete"
			@delete-data="closeModalDelete"
		>
			<template #text>
				<span v-html="modal_delete_props.text"></span>
			</template>
		</MyModalDelete>

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
import MyModalDelete from '../../components/ModalDelete.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

const custom_validations_default = {
	tanggal_lphp: {
		state: false,
		text: 'Tanggal LPHP wajib diisi'
	},
}

const data_lphp_default = {
	tanggal_lphp: null,
	analisa: null,
	catatan: null,
	penyusun: {
		jabatan: {kode: 'bd.0503'},
		plh: false,
		user: {user_id: null}
	},
	atasan: {
		jabatan: {kode: 'bd.05'},
		plh: false,
		user: {user_id: null}
	},	
}

export default {
	name: 'ModalLphp',
	components: {
		DatePicker,
		MyAlert,
		MyModalDelete,
		MySelectPejabat
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
		doc_num: String,
		data: Object,
	},
	data() {
		return {
			show_modal_lphp: false,
			show_modal_delete: false,
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			data_lphp: JSON.parse(JSON.stringify(data_lphp_default)),
			modal_delete_props: {
				show: false,
				text: null
			}
		}
	},
	watch: {
		data: function(val) {
			if (val != undefined) {
				this.data_lphp = val
			} else {
				this.data_lphp = JSON.parse(JSON.stringify(data_lphp_default))
			}
			console.log('modal lphp - data lphp', JSON.parse(JSON.stringify(this.data_lphp)))
			this.validateData()
		}
	},
	methods: {
		openModal() {
			this.show_modal_lphp = true
		},
		closeModal() {
			this.show_modal_lphp = false
			this.data_lphp = JSON.parse(JSON.stringify(data_lphp_default))
		},
		async saveData() {
			console.log('save data - lphp', JSON.parse(JSON.stringify(this.data_lphp)))
			try {
				await api.storeLphp(this.doc_id, this.data_lphp)
				this.$emit('submit-data', this.doc_id)
				this.alert('Data LPHP berhasil disimpan')
			} catch (error) {
				console.log('form lphp - save data - error', JSON.parse(JSON.stringify(error)))
			}
		},
		openModalDelete() {
			let text = "Apakah Anda yakin untuk menghapus data LPHP"
				+ " atas " + this.doc_type.bold()
				+ " nomor " + this.doc_num.bold()
				+ "?"

			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		closeModalDelete() {
			this.modal_delete_props.text = null
			this.modal_delete_props.show = false
			this.$emit('submit-data', this.doc_id)
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validateData() {
			this.validatorDatetime(this.data_lphp.tanggal_dokumen, 'DD-MM-YYYY', 'validasi.tanggal_lphp', 'Tanggal LPHP wajib diisi')
			this.$refs.selectPenyusun.getPetugas(this.data_lphp.penyusun.user.user_id, true)
			this.$refs.selectAtasan.getPetugas(this.data_lphp.atasan.user.user_id, true)
		},
		validatorDatetime(val, format, validasiName, text) { 
			let dt = converters.date(val, format)
			let valid = validators.date(dt)
			_.set(this, validasiName+'.state', valid)
			_.set(this, validasiName+'.text', text)
		},
	},
}
</script>

<style>
.modal-lphp .modal-dialog {
	padding-top: 3rem !important
}
</style>
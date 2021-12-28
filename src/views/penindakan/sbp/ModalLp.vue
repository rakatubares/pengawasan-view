<template>
	<div class="wrapper">
		<CButton
			v-if="state == 'create'"
			color="success"
			shape="pill"
			@click="show_modal_lp=true"
		>
			Buat LP
		</CButton>
		<CButton
			v-if="state == 'edit'"
			color="success"
			shape="pill"
			@click="openModal"
		>
			Edit LP
		</CButton>
		<CButton
			v-if="state == 'edit'"
			color="danger"
			shape="pill"
			@click="openModalDelete"
		>
			Hapus LP
		</CButton>

		<!-- Modal LP -->
		<CModal
			class="modal-lp"
			title="Data LP"
			size="lg"
			:show.sync="show_modal_lp"
		>
			<CForm>
				<CRow>
					<CCol md="12">
						<div class="form-group">
							<label class="w-100">Tanggal LP</label>
							<date-picker 
								v-model="data_lp.tanggal_dokumen" 
								format="DD-MM-YYYY"
								value-type="format"
								type="date"
								@change="
									validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_lp', 'Tanggal LP wajib diisi')
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
						<CInput
							label="Pasal"
							description="Pasal yang diduga terkait pelanggaran"
							:value.sync="data_lp.pasal"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CTextarea
							label="Modus"
							description="Uraian modus yang dilakukan terkait dengan pelanggaran"
							:value.sync="data_lp.modus"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="12">
						<MySelectPejabat
							ref="selectPenerbit"
							:label="{jabatan: 'Jabatan Penerbit', nama: 'Nama Pejabat'}"
							:selectable_jabatan="['bd.0503', 'bd.0504']"
							:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
							:id_pejabat.sync="data_lp.pejabat.user.user_id"
							:jabatan.sync="data_lp.pejabat.jabatan.kode"
							:plh.sync="data_lp.pejabat.plh"
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
			doc_type="lp"
			:doc_id="data_lp.id"
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
	tanggal_lp: {
		state: false,
		text: 'Tanggal LP wajib diisi'
	},
}

const data_lp_default = {
	tanggal_lp: null,
	pasal: null,
	modus: null,
	pejabat: {
		jabatan: {kode: 'bd.0503'},
		plh: false,
		user: {user_id: null}
	},
}

export default {
	name: 'ModalLp',
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
			show_modal_lp: false,
			show_modal_delete: false,
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			data_lp: JSON.parse(JSON.stringify(data_lp_default)),
			modal_delete_props: {
				show: false,
				text: null
			}
		}
	},
	watch: {
		data: function(val) {
			if (val != undefined) {
				this.data_lp = val
			} else {
				this.data_lp = JSON.parse(JSON.stringify(data_lp_default))
			}
			this.validateData()
		}
	},
	methods: {
		openModal() {
			this.show_modal_lp = true
		},
		closeModal() {
			this.show_modal_lp = false
			this.data_lp = JSON.parse(JSON.stringify(data_lp_default))
		},
		async saveData() {
			try {
				await api.storeLp(this.doc_id, this.data_lp)
				this.$emit('submit-data', this.doc_id)
				this.alert('Data LP berhasil disimpan')
			} catch (error) {
				console.log('form lp - save data - error', JSON.parse(JSON.stringify(error)))
			}
		},
		openModalDelete() {
			let text = "Apakah Anda yakin untuk menghapus data LP"
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
			this.validatorDatetime(this.data_lp.tanggal_dokumen, 'DD-MM-YYYY', 'validasi.tanggal_lp', 'Tanggal LP wajib diisi')
			this.$refs.selectPenerbit.getPetugas(this.data_lp.pejabat.user.user_id, true)
		},
		validatorDatetime(val, format, validasiName, text) { 
			let dt = converters.date(val, format)
			let valid = validators.date(dt)
			_.set(this, validasiName+'.state', valid)
			_.set(this, validasiName+'.text', text)
		},
	},
	mounted() {
		if (this.data != undefined) {
			this.data_lp = this.data
		} else {
			this.data_lp = JSON.parse(JSON.stringify(data_lp_default))
		}
		console.log('modal lp - data lp mounted', JSON.parse(JSON.stringify(this.data_lp)))
		this.validateData()
	}
}
</script>

<style>
.modal-lp .modal-dialog {
	padding-top: 3rem !important
}
</style>
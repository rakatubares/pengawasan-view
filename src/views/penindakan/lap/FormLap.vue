<template>
	<div class="wrapper form-lap">
		<CForm class="pt-3">
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal {{ doc_name }}</label>
						<date-picker 
							v-model="data.tanggal_dokumen"
							format="DD-MM-YYYY"
							value-type="format"
							type="date"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_dokumen', validasi.tanggal_sumber.text)
							"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.tanggal_dokumen.state,
										'is-invalid': !validasi.tanggal_dokumen.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.tanggal_dokumen.text}}</div>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol>
					<MyToggleSearchDocument
						:doc_options="source_options"
						:doc_type.sync="data.jenis_sumber"
						:doc_id.sync="data.sumber_id"
						:doc_number.sync="data.nomor_sumber"
						:doc_date.sync="data.tanggal_sumber"
						:saved_doc_id.sync="saved_source_id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4" sm="12">
					<MySelectKategoriPelanggaran
						label="Dugaan Pelanggaran"
						:id.sync="data.dugaan_pelanggaran.id"
					/>
				</CCol>
			</CRow>

			<!-- URAIAN -->
			<CRow>
				<CCol sm="12">
					<h5>Uraian Pra-penindakan</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Pelaku"
						:options="[{value: 1, label: 'Diketahui'}, {value: 0, label: 'Tidak Diketahui'}]"
						:value.sync="data.flag_pelaku"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait pelaku pelanggaran"
						:value.sync="data.keterangan_pelaku"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Pelanggaran"
						:options="[{value: 1, label: 'Diketahui'}, {value: 0, label: 'Tidak Diketahui'}]"
						:value.sync="data.flag_pelanggaran"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait jenis pelanggaran"
						:value.sync="data.keterangan_pelanggaran"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Locus"
						:options="[{value: 1, label: 'Diketahui'}, {value: 0, label: 'Tidak Diketahui'}]"
						:value.sync="data.flag_locus"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait locus pelanggaran"
						:value.sync="data.keterangan_locus"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Tempus"
						:options="[{value: 1, label: 'Diketahui'}, {value: 0, label: 'Tidak Diketahui'}]"
						:value.sync="data.flag_tempus"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait tempus pelanggaran"
						:value.sync="data.keterangan_tempus"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Prosedural"
						:options="[{value: 1, label: 'Kewenangan DJBC'}, {value: 0, label: 'Bukan Kewenangan DJBC'}]"
						:value.sync="data.flag_kewenangan"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait kewenangan prosedural"
						:value.sync="data.keterangan_kewenangan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="SDM"
						:options="[{value: 1, label: 'Tersedia'}, {value: 0, label: 'Tidak tersedia'}]"
						:value.sync="data.flag_sdm"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait ketersediaan sumber daya manusia"
						:value.sync="data.keterangan_sdm"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Sarana Prasarana"
						:options="[{value: 1, label: 'Tersedia'}, {value: 0, label: 'Tidak tersedia'}]"
						:value.sync="data.flag_sarpras"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait ketersediaan sarana dan prasarana"
						:value.sync="data.keterangan_sarpras"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Anggaran"
						:options="[{value: 1, label: 'Tersedia'}, {value: 0, label: 'Tidak tersedia'}]"
						:value.sync="data.flag_anggaran"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait ketersediaan anggaran"
						:value.sync="data.keterangan_anggaran"
					/>
				</CCol>
			</CRow>

			<!-- KELAYAKAN -->
			<CRow>
				<CCol sm="12">
					<h5>Kelayakan Penindakan</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol class="col-3" md="1">
					<CSwitch 
						class="mx-1" 
						color="success" 
						variant="3d" 
						v-bind="labelIcon" 
						:checked.sync="data.flag_layak_penindakan"
						@update:checked="togglePenindakan"
					/>
				</CCol>
				<CCol class="col-9" md="6">
					Layak dilakukan penindakan
				</CCol>
			</CRow>
			<CRow v-if="data.flag_layak_penindakan">
				<CCol md="3" sm="12">
					<MySelectSkemaPenindakan
						:id.sync="data.skema_penindakan.id"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait pelaksanaan penindakan"
						:value.sync="data.keterangan_skema_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow v-else>
				<CCol md="3" sm="12">
					<CSelect
						label="Kelayakan Patroli"
						:options="[{value: 1, label: 'Layak'}, {value: 0, label: 'Tidak layak'}]"
						:value.sync="data.flag_layak_patroli"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait kelayakan patroli"
						:value.sync="data.keterangan_patroli"
					/>
				</CCol>
			</CRow>

			<!-- KESIMPULAN -->
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Kesimpulan"
						:value.sync="data.kesimpulan"
					/>
				</CCol>
			</CRow>

			<!-- PEJABAT -->
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPenerbit"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Penerbit', 'nama': 'Nama Penerbit'}"
						:default_jabatan.sync="default_penerbit"
						:jabatan.sync="data.petugas.penerbit.kode_jabatan"
						:tipe_ttd.sync="data.petugas.penerbit.tipe_ttd"
						:nip.sync="data.petugas.penerbit.nip"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Atasan', 'nama': 'Nama Atasan'}"
						:default_jabatan.sync="default_atasan"
						:jabatan.sync="data.petugas.atasan.kode_jabatan"
						:tipe_ttd.sync="data.petugas.atasan.tipe_ttd"
						:nip.sync="data.petugas.atasan.nip"
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
import MySelectKategoriPelanggaran from '../../components/SelectKategoriPelanggaran.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectSkemaPenindakan from '../../components/SelectSkemaPenindakan.vue'
import MyToggleSearchDocument from '../../components/ToggleSearchDocument.vue'
import DefaultLap from './DefaultLap.js'

const custom_validations_default = {
	tanggal_dokumen: {
		state: false,
		text: 'Tanggal wajib diisi'
	},
	tanggal_sumber: {
		state: false,
		text: 'Tanggal sumber informasi wajib diisi'
	},
}

export default {
	name: 'FormLap',
	components: {
		DatePicker,
		MyAlert,
		MySelectKategoriPelanggaran,
		MySelectPejabat,
		MySelectSkemaPenindakan,
		MyToggleSearchDocument,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
		doc_name: String,
		source_options: {
			type: Array,
			default() {
				return [
					{'type': 'nhi', 'label': 'NHI', 'state': 'search'}, 
					{'type': 'li', 'label': 'LI-1', 'state': 'search'},
					{'type': 'lainnya', 'label': 'Lainnya', 'state': 'manual'},
				]
			}
		}
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(DefaultLap.data)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			saved_source_id: null,
			default_penerbit: 'bd.0503',
			default_atasan: 'bd.05',
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
		}
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data = response.data
			this.saved_source_id = this.data.sumber_id

			this.fillNull()

			this.validatorDatetime(this.data.tanggal_dokumen, 'DD-MM-YYYY', 'validasi.tanggal_dokumen', this.validasi.tanggal_dokumen.text)
		},
		fillNull() {
			if (this.data.jenis_sumber == null) {
				this.data.jenis_sumber = DefaultLap.data.jenis_sumber
			}
			this.data.flag_layak_penindakan = this.data.flag_layak_penindakan == 1 ? true : false
		},
		async saveData() {
			if (this.state == 'insert') {
				this.data = await api.storeDoc(this.doc_type, this.data)
				this.saved_source_id = this.data.sumber_id
				this.fillNull()
				this.$emit('update:doc_id', this.data.id)
				this.$emit('update:state', 'edit')
				this.alert(`Data ${this.doc_name} berhasil disimpan`)
			} else if (this.state == 'edit') {
				this.data = await api.updateDoc(this.doc_type, this.data.id, this.data)
				this.saved_source_id = this.data.sumber_id
				this.fillNull()
				this.alert(`Data ${this.doc_name} berhasil diubah`)
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
		togglePenindakan(val) {
			if (val == true) {
				this.data.skema_penindakan = {id: 1}
				this.data.flag_layak_patroli = null
			} else {
				this.data.skema_penindakan = {id: null}
				this.data.flag_layak_patroli = 1
			}
			this.data.keterangan_skema_penindakan = null
			this.data.keterangan_layak_patroli = null
		}
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		} else {
			this.data.tanggal_dokumen = converters.currentDate()
			this.validatorDatetime(this.data.tanggal_dokumen, 'DD-MM-YYYY', 'validasi.tanggal_dokumen', this.validasi.tanggal_dokumen.text)
		}
	}
}
</script>

<style>
.form-lap .row+.row {
	margin-top:0;
}
.form-lap .v-text-field__details {
	display: none;
}

.form-lap .input-group .form-control {
	border-top-right-radius: 0.25rem !important;
	border-bottom-right-radius: 0.25rem !important;
}

/* V-AUTOCOMPLETE */
.form-lap .v-input__slot {
	min-height: 34px !important;
	font-size: 14px;
}
.form-lap .v-input__prepend-outer {
	margin: 0 !important;
} 
</style>
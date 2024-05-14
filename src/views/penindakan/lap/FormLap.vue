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
				<CCol>
					<MyToggleSearchDocument
						ref="ToggleSearchDocument"
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
	</div>
</template>

<script>
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MySelectKategoriPelanggaran from '../../components/SelectKategoriPelanggaran.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectSkemaPenindakan from '../../components/SelectSkemaPenindakan.vue'
import MyToggleSearchDocument from '../../components/ToggleSearchDocument.vue'

const custom_validations_default = {
	tanggal_sumber: {
		state: false,
		text: 'Tanggal sumber informasi wajib diisi'
	},
}

export default {
	name: 'FormLap',
	components: {
		DatePicker,
		MySelectKategoriPelanggaran,
		MySelectPejabat,
		MySelectSkemaPenindakan,
		MyToggleSearchDocument,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
		doc_name: String,
		source_options: {
			type: Object,
			default() {
				return {
					'nhi': {'label': 'NHI', 'state': 'search'}, 
					'li': {'label': 'LI-1', 'state': 'search'},
					'lainnya': {'label': 'Lainnya', 'state': 'manual'},
				}
			}
		}
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			default_penerbit: 'bd.0503',
			default_atasan: 'bd.05',
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
		}
	},
	computed: {
		saved_source_id: {
			get() { return this.data.sumber_id },
			set(val) { this.data.sumber_id = val }
		}
	},
	watch: { 
		document(val) { 
			this.data = val 
			if (this.data.sumber_id) {
				this.$refs.ToggleSearchDocument.getDataDocument()
			}
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
		},
	},
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
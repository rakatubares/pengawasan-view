<template>
	<div class="wrapper my-form">
		<!-- Form LP -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<div class="form-group">
						<label class="w-100">Tanggal LP-N</label>
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
				<CCol sm="12">
					<MySelectSprint
						:id.sync="sprint_id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySearchDocument
						doc_type="lphpn"
						label="No LPHP-N"
						:value.sync="data.lphp_id"
						:exceptions.sync="saved_lphp"
						@update:value="changeLphp"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="8" sm="12">
					<CInput
						label="Locus"
						:value.sync="data.penindakan.lokasi_penindakan"
						disabled
					/>
				</CCol>
				<CCol md="2" sm="6">
					<CInput
						label="Tempus"
						:value.sync="data.penindakan.tanggal_selesai_penindakan"
						disabled
					/>
				</CCol>
				<CCol md="2" sm="6">
					<CInput
						label="Jam"
						:value.sync="data.penindakan.waktu_selesai_penindakan"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Hal yang terjadi"
						:value.sync="data.penindakan.hal_terjadi"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Entitas"
						:value.sync="data.penindakan.saksi.nama"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Petugas"
						:value.sync="data.penindakan.petugas.petugas1.name"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Analisa hasil penindakan"
						:value.sync="data.analisa_lphp"
						disabled
					/>
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
						:default_jabatan.sync="default_penyusun"
						:jabatan.sync="data.petugas.penyusun.kode_jabatan"
						:tipe_ttd.sync="data.petugas.penyusun.tipe_ttd"
						:nip.sync="data.petugas.penyusun.nip"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPenerbit"
						:state.sync="state"
						:label="{jabatan: 'Jabatan Penerbit', nama: 'Nama Penerbit'}"
						:default_jabatan.sync="default_penerbit"
						:jabatan.sync="data.petugas.penerbit.kode_jabatan"
						:tipe_ttd.sync="data.petugas.penerbit.tipe_ttd"
						:nip.sync="data.petugas.penerbit.nip"
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
import converters from '../../../helpers/converter.js'
import DefaultLpN from './DefaultLpN'
import validators from '../../../helpers/validator.js'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

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
		MySearchDocument,
		MySelectPejabat,
		MySelectSprint,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			default_penyusun: 'bd.0502',
			default_penerbit: 'bd.05',
		}
	},
	computed: {
		sprint_id: {
			get() { return this.data.sprint.id },
			set(val) { this.data.sprint.id = val },
		},
		saved_lphp: {
			get() { return this.data.lphp_id },
			set(val) { this.data.lphp_id = val }
		},
	},
	watch: {
		document(val) { this.data = val },
	},
	methods: {
		async changeLphp(val) {
			if (val) {
				let response = await api.getDocumentById('lphpn', val)
				let lphp = response.data
				this.data.analisa_lphp = lphp.analisa
				this.data.penindakan = lphp.penindakan
			} else {
				this.data.analisa_lphp = null
				this.data.penindakan = JSON.parse(JSON.stringify(DefaultLpN.data.penindakan))
			}
		},
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

</style>
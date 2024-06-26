<template>
	<div class="wrapper my-form">
		<!-- Form BA Segel header -->
		<CForm class="pt-3">
			<CRow>
				<CCol>
					<MyToggleSearchDocument
						ref="ToggleSearchDocument"
						:doc_options="source_options"
						:doc_type.sync="data.lp.type"
						:doc_id.sync="data.lp.id"
						:doc_number.sync="data.lp.no_dok_lengkap"
						:doc_date.sync="data.lp.tanggal_dokumen"
						:saved_doc_id.sync="saved_source_id"
						@update:doc_id="updateSource"
					/>
				</CCol>
			</CRow>

			<CRow>
				<CCol sm="12">
					<CInput
						label="Asal Perkara"
						description="Nama unit/instansi yang menyerahkan perkara"
						:value.sync="data.asal_perkara"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Jenis Penindakan"
						:value.sync="data.jenis_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<MySelectKategoriPelanggaran
						label="Jenis Perkara"
						:id.sync="data.jenis_perkara.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tertangkap Tangan</label>
				<CCol class="col-2 text-right" md="1">
					Tidak
				</CCol>
				<CCol class="col-3" md="1">
					<CSwitch 
						class="mx-1" 
						color="success" 
						variant="3d" 
						v-bind="labelIcon" 
						:checked.sync="data.penyidikan.tertangkap_tangan"
					/>
				</CCol>
				<CCol class="col-6" md="10">
					Ya
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CSelect
						label="Jenis Pelanggaran"
						description="Jenis dugaan pelanggaran"
						:options="jenis_pelanggaran_options"
						:value.sync="data.penyidikan.jenis_pelanggaran"
					/>
				</CCol>
				<CCol md="6" sm="12">
					<CInput
						label="Pasal"
						description="Pasal yang diduga dilanggar"
						:value.sync="data.penyidikan.pasal"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Modus"
						description="Modus operandi pelanggaran"
						:value.sync="data.penyidikan.modus"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<MyComboboxLokasi
						label="Tempat"
						description="Tempat kejadian pelanggaran"
						:value.sync="data.penyidikan.tempat_pelanggaran"
					/>
				</CCol>
			</CRow>
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tanggal/Waktu Pelanggaran</label>
				<CCol md="3" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.penyidikan.tanggal_pelanggaran"
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
						<small class="form-text text-muted w-100">Tanggal</small>
					</div>
				</CCol>
				<CCol md="2" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.penyidikan.waktu_pelanggaran"
							format="HH:mm" 
							value-type="format"
							type="time"
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
						<small class="form-text text-muted w-100">Jam</small>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitasOrang
						ref="selectPelaku"
						label="Nama Pelaku"
						description="Nama orang yang diduga melakukan pelanggaran"
						:entity_id.sync="data.penyidikan.pelaku.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Catatan"
						description="Catatan atasan pembuat LPP"
						:value.sync="data.catatan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Pembuat LPP"
						description="Nama yang membuat LPP"
						:nip.sync="data.petugas.penyusun.nip"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan1"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Atasan Langsung Pembuat LPP', 'nama': 'Nama Atasan Langsung'}"
						:default_jabatan.sync="default_atasan1"
						:jabatan.sync="data.petugas.atasan1.kode_jabatan"
						:tipe_ttd.sync="data.petugas.atasan1.tipe_ttd"
						:nip.sync="data.petugas.atasan1.nip"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan2"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Atasan dari Atasan Langsung Pembuat LPP', 'nama': 'Nama Atasan'}"
						:default_jabatan.sync="default_atasan2"
						:jabatan.sync="data.petugas.atasan2.kode_jabatan"
						:tipe_ttd.sync="data.petugas.atasan2.tipe_ttd"
						:nip.sync="data.petugas.atasan2.nip"
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
import MyComboboxLokasi from '../../components/ComboboxLokasi.vue'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectKategoriPelanggaran from '../../components/SelectKategoriPelanggaran.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MyToggleSearchDocument from '../../components/ToggleSearchDocument.vue'

const jenis_pelanggaran = ['Kepabeanan', 'Cukai']

export default {
	name: 'FormLpp',
	components: {
		DatePicker,
		MyComboboxLokasi,
		MySelectEntitasOrang,
		MySelectKategoriPelanggaran,
		MySelectPejabat,
		MySelectPetugas,
		MyToggleSearchDocument,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			source_options: {
				'lp': {
					'label': 'LP Biasa', 
					'state': 'search', 
				}, 
				'lpn': {
					'label': 'LP-N', 
					'state': 'search', 
				},
			},
			jenis_pelanggaran_options: [ ...jenis_pelanggaran ],
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
			default_atasan1: 'bd.0505',
			default_atasan2: 'bd.05',
			saved_source_id: this.document.lp.id,
			saved_source_type: this.document.lp.type,
		}
	},
	methods: {
		async saveData() {
			if (this.state == 'insert') {
				var data = await api.storeDoc(this.doc_type, this.data)
				this.saved_source_id = data.lp.id
				this.saved_source_type = data.lp.type
				this.$emit('update:state', 'edit')
			} else if (this.state == 'edit') {
				var data = await api.updateDoc(this.doc_type, this.data.id, this.data)
			}
			this.$emit('save-data', data)
		},
		async updateSource() {
			if (this.data.lp.id) {
				if (
					(this.data.lp.id != this.saved_source_id) |
					(this.data.lp.type != this.saved_source_type)
				) {
					let response = await api.getDocumentById(this.data.lp.type, this.data.lp.id)
					let lp = response.data
					let penindakan = JSON.parse(JSON.stringify(lp.penindakan))

					// Fill data
					this.data.jenis_perkara = penindakan.kategori_penindakan
					this.data.jenis_pelanggaran = penindakan.jenis_pelanggaran
					this.data.penyidikan.tempat_pelanggaran = penindakan.lokasi_penindakan
					this.data.penyidikan.tanggal_pelanggaran = penindakan.tanggal_selesai_penindakan
					this.data.penyidikan.waktu_pelanggaran = penindakan.waktu_selesai_penindakan
					this.data.penyidikan.pelaku = penindakan.saksi
				}
			}
		}
	},
}
</script>

<style>

</style>
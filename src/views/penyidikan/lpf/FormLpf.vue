<template>
	<div class="wrapper my-form">
		<CForm class="pt-3">
			<CRow>
				<CCol>
					<MySearchDocument
						ref="SearchDocument"
						doc_type="lpp"
						label="LPP"
						:value.sync="data.lpp.id"
						:exceptions.sync="saved_source_id"
						@update:value="updateSource"
					/>
				</CCol>
			</CRow>
			
			<!-- Kelengkapan Dokumen Penindakan -->
			<CRow>
				<CCol sm="12">
					<MySelectEntitasOrang
						label="Nama Saksi"
						:entity_id.sync="data.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<div class="form-group">
						<label class="w-100">Tanggal BAP Saksi</label>
						<date-picker 
							v-model="data.tanggal_bap_saksi" 
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
					<MySelectEntitasOrang
						label="Nama Tersangka"
						:entity_id.sync="data.tersangka.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<div class="form-group">
						<label class="w-100">Tanggal BAP Tersangka</label>
						<date-picker 
							v-model="data.tanggal_bap_tersangka" 
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
				<CCol md="8" sm="12">
					<CInput
						label="No Resume Perkara"
						:value.sync="data.resume_perkara"
					/>
				</CCol>
				<CCol md="4">
					<div class="form-group">
						<label class="w-100">Tanggal Resume Perkara</label>
						<date-picker 
							v-model="data.tanggal_resume_perkara" 
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
				<CCol md="2" sm="12">
					<CInput
						label="Jenis Dokumen Lain"
						:value.sync="data.jenis_dokumen_lain"
					/>
				</CCol>
				<CCol md="6" sm="12">
					<CInput
						label="No Dokumen"
						:value.sync="data.nomor_dokumen_lain"
					/>
				</CCol>
				<CCol md="4">
					<div class="form-group">
						<label class="w-100">Tanggal Dokumen</label>
						<date-picker 
							v-model="data.tanggal_dokumen_lain" 
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

			<!-- Kesimpulan -->
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Kesimpulan"
						:value.sync="data.kesimpulan"
						description="diisi kesimpulan berupa status penangkapan, domain perkara, lengkap tidaknya berkas penindakan, cukup tidaknya barang bukti, cukup tidaknya alat bukti, keberadaan pelaku, keterkaitan alat bukti, barang bukti dan pelaku, serta ada tidaknya indikasi pelanggaran"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Usulan"
						:value.sync="data.usulan"
						description="diisi usulan tindak lanjut berupa penelitian, penyelidikan atau tindakan lain serta skema penanganan perkara"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Catatan/disposisi Atasan"
						:value.sync="data.catatan"
						description="diisi catatan/ disposisi dari atasan peneliti (bila ada)"
					/>
				</CCol>
			</CRow>

			<!-- Petugas -->
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Peneliti"
						description="Nama yang melakukan penelitian"
						:nip.sync="data.petugas.peneliti.nip"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan1"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Atasan Langsung Peneliti', 'nama': 'Nama Atasan Langsung'}"
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
						:label="{'jabatan': 'Jabatan Atasan dari Atasan Langsung Peneliti', 'nama': 'Nama Atasan'}"
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

		<!-- Alert -->
		<!-- <MyAlert ref="alert"/> -->
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
// import MyAlert from '../../components/AlertSubmit.vue'
// import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
// import MySelectLpp from '../lpp/SelectLpp.vue'
// import MyToggleSearchDocument from '../../components/ToggleSearchDocument.vue'
// import validators from '../../../helpers/validator.js'

// const default_data = {
// 	id_lpp: null,
// 	saksi: {id: null},
// 	tersangka: {id: null},
// 	peneliti: {user_id: null},
// 	atasan1: {
// 		jabatan: {kode: null},
// 		plh: null,
// 		user: {user_id: null},
// 	},
// 	atasan2: {
// 		jabatan: {kode: null},
// 		plh: null,
// 		user: {user_id: null},
// 	},
// }

export default {
	name: 'FormLpf',
	components: {
		DatePicker,
		// MyAlert,
		// MySelectEntitas,
		MySearchDocument,
		MySelectEntitasOrang,
		MySelectPejabat,
		MySelectPetugas,
		// MyToggleSearchDocument,
		// MySelectLpp,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			default_atasan1: 'bd.0505',
			default_atasan2: 'bd.05',
			saved_source_id: this.document.lpp.id,
		}
	},
	watch: {
		document(val) { 
			this.data = val
			if (this.data.lpp.id) {
				this.$refs.SearchDocument.getDocument(this.data.lpp.id)
			} 
		},
	},
	methods: {
		// async getData() {
		// 	let response = await api.getFormDataById(this.doc_type, this.doc_id)
		// 	this.data = response.data.data

		// 	if (this.data.saksi == null) {
		// 		this.data.saksi = {id: null}
		// 	}

		// 	if (this.data.tersangka == null) {
		// 		this.data.tersangka = {id: null}
		// 	}

		// 	this.$nextTick(function () {
		// 		this.renderData()
		// 	})
		// },
		// renderData() {
		// 	this.$refs.selectLpp.getData(this.data.id_lpp, true)
		// 	this.$refs.selectSaksi.getEntitas(this.data.saksi.id, true)
		// 	this.$refs.selectTersangka.getEntitas(this.data.tersangka.id, true)
		// 	this.$refs.selectPeneliti.getPetugas(this.data.peneliti.user_id, true)
		// 	this.$refs.selectAtasan1.selected_jabatan = this.data.atasan1.jabatan.kode
		// 	this.$refs.selectAtasan1.togglePlh(this.data.atasan1.plh)
		// 	this.$refs.selectAtasan1.getPetugas(this.data.atasan1.user.user_id, true)
		// 	this.$refs.selectAtasan2.selected_jabatan = this.data.atasan2.jabatan.kode
		// 	this.$refs.selectAtasan2.togglePlh(this.data.atasan2.plh)
		// 	this.$refs.selectAtasan2.getPetugas(this.data.atasan2.user.user_id, true)
		// },
		async saveData() {
			if (this.state == 'insert') {
				// try {
					var data = await api.storeDoc(this.doc_type, this.data)
					this.saved_source_id = data.lpp.id
					this.$emit('update:state', 'edit')
				// } catch (error) {
				// 	console.log(`form ${this.doc_type} - save data - error`, error)
				// }
			} else if (this.state == 'edit') {
				// try {
					var data = await api.updateDoc(this.doc_type, this.data.id, this.data)
				// 	this.alert(`Data LPF berhasil diubah`)
				// } catch (error) {
				// 	console.log(`form ${this.doc_type} - update data - error`, error)
				// }
			}
			this.$emit('save-data', data)
		},
		async updateSource() {
			if (this.data.lpp.id) {
				if (this.data.lpp.id != this.saved_source_id) {
					let response = await api.getDocumentById('lpp', this.data.lpp.id)
					let lpp = response.data

					// Fill data
					this.data.tersangka.id = lpp.penyidikan.pelaku.id
				}
			} else {
				this.data.tersangka.id = null
			}
		}
		// alert(text, color, time) {
		// 	this.$refs.alert.show_alert(text, color, time)
		// },
		// validatorRequired(val) { return validators.required(val) },
	},
	// async mounted() {
	// 	if (this.state == 'edit') {
	// 		await this.getData()
	// 	}
	// },
}
</script>

<style>

</style>
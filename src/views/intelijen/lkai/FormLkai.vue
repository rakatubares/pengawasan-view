<template>
	<div class="wrapper my-form">
		<CForm class="pt-4">
			<!-- Dokumen sumber -->
			<CRow>
				<CCol class="pb-0" sm="12">
					<h5>Dokumen Sumber</h5>
				</CCol>
			</CRow>
			<!-- LPPI -->
			<CRow>
				<CCol md="12">
					<MySearchDocument
						:doc_type="kode_lppi"
						:label="label_lppi"
						:value.sync="data.lppi_id"
						:exceptions.sync="saved_lppi"
						@update:value="updateInformasi"
					/>
				</CCol>
			</CRow>

			<!-- LPTI -->
			<CRow class="mt-0">
				<CCol sm="12" md="8">
					<CInput
						:label="`Nomor ${label_lpti}`"
						:value.sync="data.nomor_lpti"
					/>
				</CCol>
				<CCol sm="12" md="4">
					<div class="form-group">
						<label class="w-100">Tgl. {{ label_lpti }}</label>
						<date-picker
							v-model="data.tanggal_lpti"
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

			<!-- NPI -->
			<CRow class="mt-0">
				<CCol sm="12" md="8">
					<CInput
						:label="`Nomor ${label_npi}`"
						:value.sync="data.nomor_npi"
					/>
				</CCol>
				<CCol sm="12" md="4">
					<div class="form-group">
						<label class="w-100">Tgl. {{ label_npi }}</label>
						<date-picker
							v-model="data.tanggal_npi"
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

			<!-- Analisis -->
			<CRow>
				<CCol sm="12">
					<CTextarea
						v-if="show_informasi"
						label="Ikhtisar Informasi"
						:value.sync="data.informasi"
						rows="5"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Prosedur Analisis"
						:value.sync="data.prosedur"
						rows="5"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Hasil Analisis"
						:value.sync="data.hasil"
						rows="5"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Kesimpulan"
						:value.sync="data.kesimpulan"
						rows="5"
					/>
				</CCol>
			</CRow>

			<!-- Rekomendasi -->
			<CRow>
				<CCol class="pb-0" sm="12">
					<h5>Rekomendasi</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12" class="pt-0">
					<CInputCheckbox
						:label="label_nhi"
						:checked.sync="data.flag_rekom_nhi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12" class="pt-0">
					<CInputCheckbox
						:label="label_ni"
						:checked.sync="data.flag_rekom_ni"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CTextarea
						label="Rekomendasi Lainnya"
						:value.sync="data.rekomendasi_lain"
						rows="5"
					/>
				</CCol>
			</CRow>
			<CRow v-if="doc_type == 'lkai'">
				<CCol md="12">
					<CTextarea
						label="Informasi Lainnya"
						:value.sync="data.informasi_lain"
						rows="5"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<CInput
						label="Tujuan"
						:value.sync="data.tujuan"
					/>
				</CCol>
			</CRow>

			<!-- TTD -->
			<!-- Analis -->
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectAnalis"
						label="Analis"
						description="Pegawai yang melakukan analisis"
						:currentUser="true"
						:nip.sync="data.petugas.analis.nip"
					/>
				</CCol>
			</CRow>

			<!-- Eseleon IV -->
			<CRow>
				<CCol class="pb-0" sm="12">
					<h5>Eselon IV</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Keputusan"
						:options="[{value: true, label: 'Setuju'}, {value: false, label: 'Tidak Setuju'}]"
						:value.sync="data.keputusan_pejabat"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Catatan"
						:value.sync="data.catatan_pejabat"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Diterima</label>
						<date-picker
							v-model="data.tanggal_terima_pejabat"
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
					<MySelectPejabat
						ref="selectPejabat"
						:state.sync="state"
						:default_jabatan.sync="default_pejabat"
						:jabatan.sync="data.petugas.pejabat.kode_jabatan"
						:tipe_ttd.sync="data.petugas.pejabat.tipe_ttd"
						:nip.sync="data.petugas.pejabat.nip"
					/>
				</CCol>
			</CRow>

			<!-- Eseleon III -->
			<CRow>
				<CCol class="pb-0" sm="12">
					<h5>Eselon III</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Keputusan"
						:options="[{value: true, label: 'Setuju'}, {value: false, label: 'Tidak Setuju'}]"
						:value.sync="data.keputusan_atasan"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Catatan"
						:value.sync="data.catatan_atasan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl. Diterima</label>
						<date-picker
							v-model="data.tanggal_terima_atasan"
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
					<MySelectPejabat
						ref="selectAtasan"
						:state.sync="state"
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
						@click="saveData"
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import DefaultLkai from './DefaultLkai'
import MyAlert from '../../components/AlertSubmit.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MyTableIkhtisar from '../lppi/TableIkhtisar.vue'

export default {
	name: 'FormLkai',
	components: {
		DatePicker,
		MyAlert,
		MySearchDocument,
		MySelectPejabat,
		MySelectPetugas,
		MyTableIkhtisar,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
		kode_lppi: String,
		label_lkai: String,
		label_lppi: String,
		label_lpti: String,
		label_npi: String,
		label_nhi: String,
		label_ni: String,
		default_pejabat: String,
	},
	data() {
		return {
			is_mounting: false,
			data: JSON.parse(JSON.stringify(DefaultLkai)),
			saved_lppi: null,
			default_atasan: 'bd.05',
			ikhtisar_state: 'insert',
			show_informasi: true,
		}
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			if (this.doc_type == 'lkai') {
				this.data = response.data
				this.saved_lppi = this.data.lppi_id
			} else {
				let data = response.data
				this.$emit('get-data', data)
			}
		},
		fillNull() {
			let posisi = Object.keys(this.data.petugas)
			for (const key in DefaultLkai.petugas) {
				if (!posisi.includes(key)) {
					this.data.petugas[key] = JSON.parse(JSON.stringify(DefaultLkai.petugas[key]))
				}
			}
		},
		async getIkhtisarLppi(lppi_id) {
			let response = await api.getDocumentById(this.kode_lppi, lppi_id)
			let informasi = JSON.parse(JSON.stringify(response.data.informasi))
			let list_informasi = informasi.map(function (info) {
				return info.informasi
			})
			let ikhtisar = list_informasi.join('\n')
			return ikhtisar
		},
		async saveData() {
			if (this.state == 'insert') {
				if (this.doc_type == 'lkai') {
					this.data = await api.storeDoc(this.doc_type, this.data)
					this.$emit('update:doc_id', this.data.id)
					this.saved_lppi = this.data.lppi_id
				} else {
					this.$emit('insert-data', this.data)
				}
				
				this.fillNull()
				this.$emit('update:state', 'edit')
				var msg = `Data ${this.label_lkai} berhasil disimpan`
			} else if (this.state == 'edit') {
				if (this.doc_type == 'lkai') {
					this.data = await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.$emit('update:doc_id', this.data.id)
					this.saved_lppi = this.data.lppi_id
				} else {
					this.$emit('update-data', this.data)
				}
				
				this.fillNull()
				var msg = `Data ${this.label_lkai} berhasil diubah`
			}
			this.alert(msg)
		},
		updateData(data) {
			this.data = data
			this.$emit('update:doc_id', this.data.id)
			this.saved_lppi = this.data.lppi_id
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		async updateInformasi(val) {
			if (this.is_mounting == false) {
				if (val != null) {
					var ikhtisar = await this.getIkhtisarLppi(val)
				} else {
					var ikhtisar = null
				}
				this.data.informasi = ikhtisar
				this.refresh_informasi()
			}
		},
		refresh_informasi() {
			this.show_informasi = false
			this.$nextTick(() => {
				this.show_informasi = true
			})
		}
	},
	async beforeMount() {
		this.is_mounting = true
		if (this.state == 'edit') {
			await this.getData()
		}
		this.is_mounting = false
	}
}
</script>

<style>

</style>
<template>
	<div class="wrapper my-form">
		<CForm class="pt-3">
			<CRow>
				<CCol md="6" sm="12">
					<div class="form-group">
						<label>Nomor LKAI</label>
						<v-autocomplete
							class="no-message"
							v-model="lkai_search_value"
							outlined
							dense
							:items.sync="lkai_search_items"
							:search-input.sync="lkai_search_query"
							item-text="no_dok_lengkap"
							item-value="id"
							@change="changeValueLkai"
						>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-title>
										Data LKAI tidak ditemukan
									</v-list-item-title>
								</v-list-item>
							</template>
							<template v-slot:item="{ item }">
								<v-list-item-content>
									<h3><v-list-item-title>{{ item.no_dok_lengkap }}</v-list-item-title></h3>
									<v-list-item-subtitle>{{ item.tanggal_dokumen }}</v-list-item-subtitle>
								</v-list-item-content>
							</template>
						</v-autocomplete>
						<small class="form-text text-muted w-100">Nomor LKAI sebagai sumber penerbitan NHI</small>
					</div>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Tanggal LKAI"
						:value.sync="data.tanggal_lkai"
						disabled
					>
					</CInput>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4" sm="12">
					<CSelect
						label="Sifat"
						description="Kategori sifat NHI"
						:options="sifat_nhi_options"
						:value.sync="data.sifat"
					/>
				</CCol>
				<CCol md="4" sm="12">
					<CSelect
						label="Klasifikasi"
						description="Kategori klasifikasi NHI"
						:options="klasifikasi_nhi_options"
						:value.sync="data.klasifikasi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="8">
					<CInput
						label="Penerima"
						description="Jabatan penerima NHI"
						:value.sync="data.tujuan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="8">
					<CTextarea
						label="Tempat"
						description="Tempat terjadinya atau akan terjadinya indikasi pelanggaran"
						:value.sync="data.tempat_indikasi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tanggal/Waktu</label>
				<CCol md="3" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.waktu_indikasi"
							format="DD-MM-YYYY HH:mm" 
							value-type="format"
							type="datetime"
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
						<small class="form-text text-muted w-100">Tanggal dan/atau waktu indikasi pelanggaran</small>
					</div>
				</CCol>
				<CCol md="1" sm="12">
					<CSelect
						:options="zona_waktu_options"
						:value.sync="data.zona_waktu"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="8">
					<CInput
						label="Kantor Bea dan Cukai"
						description="Kantor Wilayah atau Kantor Pelayanan yang membawahi pengawasan atas wilayah terjadinya atau akan terjadinya indikasi pelanggaran"
						:value.sync="data.kantor"
					/>
				</CCol>
			</CRow>
			
			<CRow class="sep mt-3">
				<CCol sm="4">
					<CSelect
						label="Jenis Barang"
						:options="nhi_options"
						:value.sync="selected_nhi"
						@update:value="updateJenisBarang"
					/>
				</CCol>
			</CRow>

			<!-- Barang EXIM -->
			<div v-if="selected_nhi == 'exim'">
				<CRow>
					<CCol md="2" sm="12">
						<CInput
							label="Jenis Dokumen Pabean"
							:value.sync="data.jenis_dok_exim"
						/>
					</CCol>
					<CCol md="6" sm="12">
						<CInput
							label="Nomor Dokumen"
							:value.sync="data.nomor_dok_exim"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<div class="form-group">
							<label class="w-100">Tanggal Dokumen</label>
							<date-picker 
								v-model="data.tanggal_dok_exim"
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
						</div>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="Nama Sarana Pengangkut"
							:value.sync="data.nama_sarkut_exim"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<CInput
							label="Voy./Flight/Nopol"
							:value.sync="data.no_flight_trayek_exim"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="4" sm="12">
						<CInput
							label="No. BL/AWB"
							:value.sync="data.nomor_awb_exim"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<div class="form-group">
							<label class="w-100">Tanggal AWB</label>
							<date-picker 
								v-model="data.tanggal_awb_exim"
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
						</div>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="No. Container/Merek Koli"
							:value.sync="data.merek_koli_exim"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="Importir/Eksportir/PPJK"
							:value.sync="data.importir_ppjk"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="4" sm="12">
						<CInput
							label="NPWP"
							:value.sync="data.npwp"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<CTextarea
							label="Data Lainnya"
							:value.sync="data.data_lain_exim"
						/>
					</CCol>
				</CRow>
			</div>

			<!-- Barang BKC -->
			<div v-if="selected_nhi == 'bkc'">
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="Pabrik/Tempat Penyimpanan/Tempat Penimbunan"
							:value.sync="data.tempat_penimbunan"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="Penyalur"
							:value.sync="data.penyalur"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="Tempat Penjualan Eceran"
							:value.sync="data.tempat_penjualan"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="4" sm="12">
						<CInput
							label="NPPBKC"
							:value.sync="data.nppbkc"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="Nama Sarana Pengangkut"
							:value.sync="data.nama_sarkut_bkc"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<CInput
							label="Voy./Flight/Nopol"
							:value.sync="data.no_flight_trayek_bkc"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<CTextarea
							label="Data Lainnya"
							:value.sync="data.data_lain_bkc"
						/>
					</CCol>
				</CRow>
			</div>

			<!-- Barang Tertentu -->
			<div v-if="selected_nhi == 'tertentu'">
				<CRow>
					<CCol md="2" sm="12">
						<CInput
							label="Jenis Dokumen"
							:value.sync="data.jenis_dok_tertentu"
						/>
					</CCol>
					<CCol md="6" sm="12">
						<CInput
							label="Nomor Dokumen"
							:value.sync="data.nomor_dok_tertentu"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<div class="form-group">
							<label class="w-100">Tanggal Dokumen</label>
							<date-picker 
								v-model="data.tanggal_dok_tertentu"
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
						</div>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="Nama Sarana Pengangkut"
							:value.sync="data.nama_sarkut_tertentu"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<CInput
							label="Voy./Flight/Nopol"
							:value.sync="data.no_flight_trayek_tertentu"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="4" sm="12">
						<CInput
							label="No. BL/AWB"
							:value.sync="data.nomor_awb_tertentu"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<div class="form-group">
							<label class="w-100">Tanggal AWB</label>
							<date-picker 
								v-model="data.tanggal_awb_tertentu"
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
						</div>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="No. Container/Merek Koli"
							:value.sync="data.merek_koli_tertentu"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="Orang Pribadi/Badan Hukum"
							:value.sync="data.orang_badan_hukum"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<CTextarea
							label="Data Lainnya"
							:value.sync="data.data_lain_tertentu"
						/>
					</CCol>
				</CRow>
			</div>

			<CRow>
				<CCol md="8" sm="12">
					<CTextarea
						label="Indikasi"
						:value.sync="data.indikasi"
					/>
				</CCol>
			</CRow>

			<!-- Pejabat -->
			<CRow class="sep">
				<CCol md="12">
					<MySelectPejabat
						ref="selectPejabat"
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

			<!-- Tembusan -->
			<CRow class="sep">
				<CCol md="8">
					<label>Tembusan</label>
					<CRow>
						<CCol>
							<div class="input-container" v-for="(val,id) in data.tembusan" :key="id">
								<MyComboboxTembusan
									:value.sync="data.tembusan[id]"
									:except.sync="data.tembusan"
									@delete-data="delCc(id)"
								/>
							</div>
						</CCol>
					</CRow>
					<CRow>
						<CCol>
							<CButton color="primary" @click="addCc">+ Tambah</CButton>
						</CCol>
					</CRow>
				</CCol>
			</CRow>

			<!-- Button simpan -->
			<CRow class="mt-4">
				<CCol sm="12">
					<CButton
						color="success"
						@click="saveData()"
					>
						Simpan
					</CButton>
				</CCol>
			</CRow>

			<!-- Alert -->
			<MyAlert ref="alert"></MyAlert>
		</CForm>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MyComboboxTembusan from '../../components/ComboboxTembusan.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

const default_sifat_nhi_options = ['segera', 'sangat segera']
const default_klasifikasi_nhi_options = ['rahasia', 'sangat rahasia']
const default_zona_waktu_options = ['WIB', 'WITA', 'WIT']
const default_data = {
	lkai_id: null,
	nomor_lkai: null,
	tanggal_lkai: null,
	sifat: default_sifat_nhi_options[0],
	klasifikasi: default_klasifikasi_nhi_options[0],
	tujuan: null,
	tempat_indikasi: null,
	waktu_indikasi: null,
	zona_waktu: default_zona_waktu_options[0],
	kantor: null,
	flag_exim: true,
	jenis_dok_exim: null,
	nomor_dok_exim: null,
	tanggal_dok_exim: null,
	nama_sarkut_exim: null,
	no_flight_trayek_exim: null,
	nomor_awb_exim: null,
	tanggal_awb_exim: null,
	merek_koli_exim: null,
	importir_ppjk: null,
	npwp: null,
	data_lain_exim: null,
	flag_bkc: false,
	tempat_penimbunan: null,
	penyalur: null,
	tempat_penjualan: null,
	nppbkc: null,
	nama_sarkut_bkc: null,
	no_flight_trayek_bkc: null,
	data_lain_bkc: null,
	flag_tertentu: false,
	jenis_dok_tertentu: null,
	nomor_dok_tertentu: null,
	tanggal_dok_tertentu: null,
	nama_sarkut_tertentu: null,
	no_flight_trayek_tertentu: null,
	nomor_awb_tertentu: null,
	tanggal_awb_tertentu: null,
	merek_koli_tertentu: null,
	orang_badan_hukum: null,
	data_lain_tertentu: null,
	indikasi: null,
	penerbit: {
		jabatan: {kode: null},
		plh: false,
		user: {user_id: null},
	},
	tembusan: []
}
const default_nhi_options = [
	{value: 'exim', label: 'Barang Ekspor/Impor'}, 
	{value: 'bkc', label: 'Barang BKC'}, 
	{value: 'tertentu', label: 'Barang Tertentu'}
]

export default {
	name: 'FormNhi',
	components: {
		DatePicker,
		MyAlert,
		MyComboboxTembusan,
		MySelectPejabat,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			lkai_search_value: null,
			lkai_search_items: [],
			lkai_search_query: null,
			lkai_search_exception: null,
			sifat_nhi_options: JSON.parse(JSON.stringify(default_sifat_nhi_options)),
			klasifikasi_nhi_options: JSON.parse(JSON.stringify(default_klasifikasi_nhi_options)),
			zona_waktu_options: JSON.parse(JSON.stringify(default_zona_waktu_options)),
			nhi_options: JSON.parse(JSON.stringify(default_nhi_options)),
			selected_nhi: default_nhi_options[0].value,
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById('nhi', this.doc_id)
			this.data = response.data.data

			if (this.data.lkai_id != null) {
				this.lkai_search_exception = this.data.lkai_id
				await this.search_lkai(this.data.nomor_lkai)
				this.lkai_search_value = this.lkai_search_items[0]
			}

			if (this.data.flag_exim == true) {
				this.selected_nhi = 'exim'
				this.updateJenisBarang('exim')
			} else if (this.data.flag_bkc == true) {
				this.selected_nhi = 'bkc'
				this.updateJenisBarang('bkc')
			} else {
				this.selected_nhi = 'tertentu'
				this.updateJenisBarang('tertentu')
			}

			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectPejabat.selected_jabatan = this.data.penerbit.jabatan.kode
			this.$refs.selectPejabat.togglePlh(this.data.penerbit.plh)
			this.$refs.selectPejabat.getPetugas(this.data.penerbit.user.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc('nhi', this.data)
					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert(`Data NHI berhasil disimpan`)
				} catch (error) {
					console.log(`form nhi - save data - error`, error)
				}
			} else if (this.state == 'edit') {
				try {
					let update_data = this.data
					this.data = await api.updateDoc('nhi', update_data.id, update_data)
					this.$emit('update:doc_id', this.data.id)
					this.alert(`Data NHI berhasil diubah`)
				} catch (error) {
					console.log(`form nhi - update data - error`, error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		async changeValueLkai(id) {
			if (id != null) {
				// Get data LKAI
				let response = await api.getDisplayDataById('lkai', id)
				let lkai = response.data.data
				
				// Change current data according to lkai
				this.data.tanggal_lkai = lkai.tanggal_dokumen
				
				// Specify lkai id
				this.data.lkai_id = id
			}
		},
		async search_lkai(search) {
			let data = {'src': search, 'exc': this.lkai_search_exception, 'flt': {kode_status: 200}}
			let responses = await api.searchDoc('lkai', data)
			this.lkai_search_items = responses.data.data
		},
		updateJenisBarang(jenis) {
			switch (jenis) {
				case 'exim':
					this.data.flag_exim = true
					this.nullifyBkc()
					this.nullifyTertentu()
					break;

				case 'bkc':
					this.data.flag_bkc = true
					this.nullifyExim()
					this.nullifyTertentu()
					break;

				case 'tertentu':
					this.data.flag_tertentu = true
					this.nullifyExim()
					this.nullifyBkc()
					break;
			
				default:
					break;
			}
		},
		nullifyExim() {
			this.data.flag_exim = false
			this.data.jenis_dok_exim = null
			this.data.nomor_dok_exim = null
			this.data.tanggal_dok_exim = null
			this.data.nama_sarkut_exim = null
			this.data.no_flight_trayek_exim = null
			this.data.nomor_awb_exim = null
			this.data.tanggal_awb_exim = null
			this.data.merek_koli_exim = null
			this.data.importir_ppjk = null
			this.data.npwp = null
			this.data.data_lain_exim = null
		},
		nullifyBkc() {
			this.data.flag_bkc = false
			this.data.tempat_penimbunan = null
			this.data.penyalur = null
			this.data.tempat_penjualan = null
			this.data.nppbkc = null
			this.data.nama_sarkut_bkc = null
			this.data.no_flight_trayek_bkc = null
			this.data.data_lain_bkc = null
		},
		nullifyTertentu() {
			this.data.flag_tertentu = false
			this.data.jenis_dok_tertentu = null
			this.data.nomor_dok_tertentu = null
			this.data.tanggal_dok_tertentu = null
			this.data.nama_sarkut_tertentu = null
			this.data.no_flight_trayek_tertentu = null
			this.data.nomor_awb_tertentu = null
			this.data.tanggal_awb_tertentu = null
			this.data.merek_koli_tertentu = null
			this.data.orang_badan_hukum = null
			this.data.data_lain_tertentu = null
		},
		addCc() {
			this.data.tembusan.push(null)
		},
		delCc(id) {
			this.data.tembusan.splice(id,1)
		},
	},
	watch: {
		async lkai_search_query (val) {
			await this.search_lkai(val)
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
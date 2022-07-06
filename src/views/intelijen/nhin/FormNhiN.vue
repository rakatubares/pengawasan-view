<template>
	<div class="wrapper form-nhin">
		<CForm class="pt-3">
			<CRow>
				<CCol md="6" sm="12">
					<div class="form-group">
						<label>Nomor LKAI-N</label>
						<v-autocomplete
							v-model="lkain_search_value"
							outlined
							dense
							:items.sync="lkain_search_items"
							:search-input.sync="lkain_search_query"
							item-text="no_dok_lengkap"
							item-value="id"
							@change="changeValueLkaiN"
						>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-title>
										Data LKAI-N tidak ditemukan
									</v-list-item-title>
								</v-list-item>
							</template>
							<template v-slot:item="{ item }">
								<v-list-item-content>
									<h3><v-list-item-title v-text="item.no_dok_lengkap"></v-list-item-title></h3>
									<v-list-item-subtitle v-text="item.tanggal_dokumen"></v-list-item-subtitle>
								</v-list-item-content>
							</template>
						</v-autocomplete>
						<small class="form-text text-muted w-100">Nomor LKAI-N sebagai sumber penerbitan NHI-N</small>
					</div>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Tanggal LKAI-N"
						:value.sync="data.tanggal_lkain"
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
					<MySelectKantorBC
						ref="selectKantor"
						:kd_kantor.sync="data.kantor_bc.kd_kantor"
						default_kantor="050100"
					/>
				</CCol>
			</CRow>

			<CRow class="sep mt-3">
				<CCol sm="4">
					<CSelect
						label="Jenis Kegiatan"
						:options="nhi_options"
						:value.sync="selected_nhi"
						@update:value="updateJenisKegiatan"
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

			<!-- Sarkut -->
			<div v-if="selected_nhi == 'sarkut'">
				<CRow>
					<CCol sm="8">
						<CInput
							label="Nama Sarana Pengangkut"
							:value.sync="data.nama_sarkut"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="Jenis Sarana Pengangkut"
							:value.sync="data.jenis_sarkut"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<CInput
							label="Voy./Flight/Nopol"
							:value.sync="data.no_flight_trayek_sarkut"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<MySelectBandara 
							ref="selectAsalSarkut"
							label="Pelabuhan Asal"
							:iata_code.sync="data.pelabuhan_asal_sarkut.iata_code"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<MySelectBandara 
							ref="selectTujuanSarkut"
							label="Pelabuhan Tujuan"
							:iata_code.sync="data.pelabuhan_tujuan_sarkut.iata_code"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="IMO / MMSI"
							description="Nomor IMO (International Maritime Organization) / MMSI (Maritime Mobile Service Identity)"
							:value.sync="data.imo_mmsi_sarkut"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<CTextarea
							label="Data Lainnya"
							:value.sync="data.data_lain_sarkut"
						/>
					</CCol>
				</CRow>
			</div>

			<!-- Orang -->
			<div v-if="selected_nhi == 'orang'">
				<CRow>
					<CCol md="12">
						<MySelectEntitas
							ref="selectOrang"
							label="Nama Orang"
							:id.sync="data.orang.id"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="2" sm="12">
						<CInput
							label="Flight / Voyage"
							:value.sync="data.no_flight_trayek_sarkut"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<MySelectBandara 
							ref="selectAsalOrang"
							label="Pelabuhan / Bandara Asal"
							:iata_code.sync="data.pelabuhan_asal_orang.iata_code"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<MySelectBandara 
							ref="selectTujuanOrang"
							label="Pelabuhan / Bandara Tujuan"
							:iata_code.sync="data.pelabuhan_tujuan_orang.iata_code"
						/>
					</CCol>
				</CRow>
				<CRow>
					<label class="w-100 pl-3 pt-2 mb-0">Waktu Keberangkatan</label>
					<CCol md="3" sm="12">
						<div class="form-group">
							<date-picker 
								v-model="data.waktu_berangkat_orang"
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
						</div>
					</CCol>
				</CRow>
				<CRow>
					<label class="w-100 pl-3 pt-2 mb-0">Waktu Kedatangan</label>
					<CCol md="3" sm="12">
						<div class="form-group">
							<date-picker 
								v-model="data.waktu_datang_orang"
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
						</div>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<CTextarea
							label="Data Lainnya"
							:value.sync="data.data_lain_orang"
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
import MySelectBandara from '../../components/SelectBandara.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectKantorBC from '../../components/SelectKantorBC.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

const default_sifat_nhi_options = ['segera', 'sangat segera']
const default_klasifikasi_nhi_options = ['rahasia', 'sangat rahasia']
const default_zona_waktu_options = ['WIB', 'WITA', 'WIT']
const default_data = {
	lkain_id: null,
	nomor_lkain: null,
	tanggal_lkain: null,
	sifat: default_sifat_nhi_options[0],
	klasifikasi: default_klasifikasi_nhi_options[0],
	tujuan: null,
	tempat_indikasi: null,
	waktu_indikasi: null,
	zona_waktu: default_zona_waktu_options[0],
	kantor_bc: {kd_kantor: null},
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
	flag_sarkut: false,
	nama_sarkut: null,
	jenis_sarkut: null,
	no_flight_trayek_sarkut: null,
	pelabuhan_asal_sarkut: {iata_code: null},
	pelabuhan_tujuan_sarkut: {iata_code: null},
	imo_mmsi_sarkut: null,
	data_lain_sarkut: null,
	flag_orang: false,
	orang: {id: null},
	flight_voyage_orang: null,
	pelabuhan_asal_orang: {iata_code: null},
	pelabuhan_tujuan_orang: {iata_code: null},
	waktu_berangkat_orang: null,
	waktu_datang_orang: null,
	data_lain_orang: null,
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
		{value: 'sarkut', label: 'Sarana Pengangkut'}, 
		{value: 'orang', label: 'Orang'}
	]
export default {
	name: 'FormNhiN',
	components: {
		DatePicker,
		MyAlert,
		MyComboboxTembusan,
		MySelectBandara,
		MySelectEntitas,
		MySelectKantorBC,
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
			lkain_search_value: null,
			lkain_search_items: [],
			lkain_search_query: null,
			lkain_search_exception: null,
			sifat_nhi_options: JSON.parse(JSON.stringify(default_sifat_nhi_options)),
			klasifikasi_nhi_options: JSON.parse(JSON.stringify(default_klasifikasi_nhi_options)),
			zona_waktu_options: JSON.parse(JSON.stringify(default_zona_waktu_options)),
			nhi_options: JSON.parse(JSON.stringify(default_nhi_options)),
			selected_nhi: default_nhi_options[0].value,
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById('nhin', this.doc_id)
			this.data = response.data.data

			if (this.data.lkain_id != null) {
				this.lkain_search_exception = this.data.lkain_id
				await this.search_lkain(this.data.nomor_lkain)
				this.lkain_search_value = this.lkain_search_items[0]
			}

			if (this.data.flag_exim == true) {
				this.selected_nhi = 'exim'
				this.updateJenisKegiatan('exim')
			} else if (this.data.flag_sarkut == true) {
				this.selected_nhi = 'sarkut'
				this.updateJenisKegiatan('sarkut')
			} else {
				this.selected_nhi = 'orang'
				this.updateJenisKegiatan('orang')
			}

			this.fillNull()

			this.$nextTick(function() {
				this.renderData()
			})

			this.$emit('update:is_exim', this.data.flag_exim)
			this.$emit('show-data')
		},
		fillNull() {
			if (this.data.pelabuhan_asal_sarkut == null) {
				this.data.pelabuhan_asal_sarkut = {iata_code: null}
			}

			if (this.data.pelabuhan_tujuan_sarkut == null) {
				this.data.pelabuhan_tujuan_sarkut = {iata_code: null}
			}

			if (this.data.pelabuhan_asal_orang == null) {
				this.data.pelabuhan_asal_orang = {iata_code: null}
			}

			if (this.data.pelabuhan_tujuan_orang == null) {
				this.data.pelabuhan_tujuan_orang = {iata_code: null}
			}

			if (this.data.orang == null) {
				this.data.orang = {id: null}
			}
		},
		renderData() {
			// Get data kantor
			this.$refs.selectKantor.getData(this.data.kantor_bc.kd_kantor)

			// Get data orang
			if (this.data.orang) {
				this.$refs.selectOrang.getEntitas(this.data.orang.id, true)	
			}

			// Get data bandara
			if (this.data.pelabuhan_asal_sarkut.iata_code != null) {
				this.$refs.selectAsalSarkut.getData(this.data.pelabuhan_asal_sarkut.iata_code)
			}
			if (this.data.pelabuhan_tujuan_sarkut.iata_code != null) {
				this.$refs.selectTujuanSarkut.getData(this.data.pelabuhan_tujuan_sarkut.iata_code)
			}
			if (this.data.pelabuhan_asal_orang.iata_code != null) {
				this.$refs.selectAsalOrang.getData(this.data.pelabuhan_asal_orang.iata_code)
			}
			if (this.data.pelabuhan_tujuan_orang.iata_code != null) {
				this.$refs.selectTujuanOrang.getData(this.data.pelabuhan_tujuan_orang.iata_code)
			}

			// Get data pejabat
			this.$refs.selectPejabat.selected_jabatan = this.data.penerbit.jabatan.kode
			this.$refs.selectPejabat.togglePlh(this.data.penerbit.plh)
			this.$refs.selectPejabat.getPetugas(this.data.penerbit.user.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc('nhin', this.data)
					this.fillNull()
					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.$emit('update:is_exim', this.data.flag_exim)
					this.$emit('show-data')
					this.alert(`Data NHI-N berhasil disimpan`)
				} catch (error) {
					console.log(`form nhin - save data - error`, error)
				}
			} else if (this.state == 'edit') {
				try {
					let update_data = this.data
					this.data = await api.updateDoc('nhin', update_data.id, update_data)
					this.fillNull()
					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:is_exim', this.data.flag_exim)
					this.$emit('show-data')
					this.alert(`Data NHI-N berhasil diubah`)
				} catch (error) {
					console.log(`form nhin - update data - error`, error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		async changeValueLkaiN(id) {
			if (id != null) {
				// Get data LKAI
				let response = await api.getDisplayDataById('lkain', id)
				let lkain = response.data.data
				
				// Change current data according to lkai
				this.data.tanggal_lkain = lkain.tanggal_dokumen
				
				// Specify lkai id
				this.data.lkain_id = id
			}
		},
		async search_lkain(search) {
			let data = {'src': search, 'exc': this.lkain_search_exception, 'flt': {kode_status: 200}}
			let responses = await api.searchDoc('lkain', data)
			this.lkain_search_items = responses.data.data
		},
		updateJenisKegiatan(jenis) {
			switch (jenis) {
				case 'exim':
					this.data.flag_exim = true
					this.nullifySarkut()
					this.nullifyOrang()
					break;

				case 'sarkut':
					this.data.flag_sarkut = true
					this.nullifyExim()
					this.nullifyOrang()
					break;

				case 'orang':
					this.data.flag_orang = true
					this.nullifyExim()
					this.nullifySarkut()
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
		nullifySarkut() {
			this.data.flag_sarkut = false
			this.data.nama_sarkut = null
			this.data.jenis_sarkut = null
			this.data.no_flight_trayek_sarkut = null
			this.data.pelabuhan_asal_sarkut = {iata_code: null}
			this.data.pelabuhan_tujuan_sarkut = {iata_code: null}
			this.data.imo_mmsi_sarkut = null
			this.data.data_lain_sarkut = null
		},
		nullifyOrang() {
			this.data.flag_orang = false
			this.data.orang = {id: null}
			this.data.flight_voyage_orang = null
			this.data.pelabuhan_asal_orang = {iata_code: null}
			this.data.pelabuhan_tujuan_orang = {iata_code: null}
			this.data.waktu_berangkat_orang = null
			this.data.waktu_datang_orang = null
			this.data.data_lain_orang = null
		},
		addCc() {
			this.data.tembusan.push(null)
		},
		delCc(id) {
			this.data.tembusan.splice(id,1)
		},
	},
	watch: {
		async lkain_search_query (val) {
			await this.search_lkain(val)
		},
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	},
}
</script>

<style>
.form-nhin .row+.row {
	margin-top:0;
}

.form-nhin .v-text-field__details {
	display: none;
}

/* V-AUTOCOMPLETE */
.form-nhin .v-input__slot {
	min-height: 34px !important;
	font-size: 14px;
}
.form-nhin .v-input__prepend-outer {
	margin: 0 !important;
} 

/* V-COMBOBOX */
.form-nhin .v-input__slot[role=combobox] .v-input__append-inner {
	margin: 0 -12px 0 0;
}
.form-nhin .v-input__slot[role=combobox] .v-input__append-inner button {
	border-radius: 0 0.25rem 0.25rem 0;
}
</style>
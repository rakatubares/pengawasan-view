<template>
	<div class="wrapper my-form">
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySearchDocument
						doc_type="lkain"
						label="LKAI-N"
						description="Nomor LKAI-N sebagai sumber penerbitan NHI-N"
						:value.sync="data.lkain_id"
						:exceptions.sync="saved_lkain"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4" sm="12">
					<CSelect
						label="Sifat"
						description="Kategori sifat NHI-N"
						:options="sifat_nhin_options"
						:value.sync="data.sifat"
					/>
				</CCol>
				<CCol md="4" sm="12">
					<CSelect
						label="Klasifikasi"
						description="Kategori klasifikasi NHI-N"
						:options="klasifikasi_nhin_options"
						:value.sync="data.klasifikasi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<MyComboboxJabatan
						label="Penerima NHI-N"
						description="Tujuan penerima NHI-N"
						:value.sync="data.tujuan"
						:default_jabatan="default_tujuan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<MyComboboxLokasi
						label="Tempat Indikasi"
						description="Tempat terjadinya atau akan terjadinya indikasi pelanggaran"
						:value.sync="data.tempat_indikasi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tanggal/Waktu Indikasi</label>
				<CCol md="3" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.tanggal_indikasi"
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
							v-model="data.waktu_indikasi"
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
						<small class="form-text text-muted w-100">Waktu</small>
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
						:kode_kantor.sync="data.kantor.kode_kantor"
						:default_kantor="default_kantor"
						description="Kantor Wilayah atau Kantor Pelayanan yang membawahi pengawasan atas wilayah terjadinya atau akan terjadinya indikasi pelanggaran"
					/>
				</CCol>
			</CRow>

			<CRow class="sep mt-3">
				<CCol sm="4">
					<CSelect
						label="Jenis Kegiatan"
						:options="nhin_options"
						:value.sync="data.detail.type"
						@update:value="toggleJenisKegiatan"
					/>
				</CCol>
			</CRow>

			<!-- Barang EXIM -->
			<div v-if="data.detail.type == 'nhin-exim'">
				<CRow>
					<CCol md="4">
						<CSelect
							label="Tipe Kegiatan"
							:options="jenis_kegiatan"
							:value.sync="data.detail.data.tipe"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="2" sm="12">
						<CInput
							label="Jenis Dokumen Pabean"
							:value.sync="data.detail.data.jenis_dok"
						/>
					</CCol>
					<CCol md="6" sm="12">
						<CInput
							label="Nomor Dokumen"
							:value.sync="data.detail.data.nomor_dok"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<div class="form-group">
							<label class="w-100">Tanggal Dokumen</label>
							<date-picker 
								v-model="data.detail.data.tanggal_dok"
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
							:value.sync="data.detail.data.nama_sarkut"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<CInput
							label="Voy./Flight/Nopol"
							:value.sync="data.detail.data.nomor_sarkut"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="4" sm="12">
						<CInput
							label="No. BL/AWB"
							:value.sync="data.detail.data.nomor_awb"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<div class="form-group">
							<label class="w-100">Tanggal AWB</label>
							<date-picker 
								v-model="data.detail.data.tanggal_awb"
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
							:value.sync="data.detail.data.merek_koli"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="12">
						<MySelectEntitas
							label="Importir/Eksportir/PPJK"
							:entity_type.sync="data.detail.data.entitas.type"
							:entity_id.sync="data.detail.data.entitas.data.id"	
							default_type="entitas-badan-hukum"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<CTextarea
							label="Data Lainnya"
							:value.sync="data.detail.data.data_lain"
						/>
					</CCol>
				</CRow>
			</div>

			<!-- Sarkut -->
			<div v-if="data.detail.type == 'nhin-sarkut'">
				<CRow>
					<CCol sm="8">
						<CInput
							label="Nama Sarana Pengangkut"
							:value.sync="data.detail.data.nama_sarkut"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="Jenis Sarana Pengangkut"
							:value.sync="data.detail.data.jenis_sarkut"
						/>
					</CCol>
					<CCol md="2" sm="12">
						<CInput
							label="Voy./Flight/Nopol"
							:value.sync="data.detail.data.nomor_sarkut"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<MySelectBandara 
							ref="selectAsalSarkut"
							label="Pelabuhan Asal"
							:iata_code.sync="data.detail.data.pelabuhan_asal.iata_code"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<MySelectBandara 
							ref="selectTujuanSarkut"
							label="Pelabuhan Tujuan"
							:iata_code.sync="data.detail.data.pelabuhan_tujuan.iata_code"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6" sm="12">
						<CInput
							label="IMO / MMSI"
							description="Nomor IMO (International Maritime Organization) / MMSI (Maritime Mobile Service Identity)"
							:value.sync="data.detail.data.imo_mmsi"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<CTextarea
							label="Data Lainnya"
							:value.sync="data.detail.data.data_lain"
						/>
					</CCol>
				</CRow>
			</div>

			<!-- Orang -->
			<div v-if="data.detail.type == 'nhin-orang'">
				<CRow>
					<CCol md="12">
						<MySelectEntitasOrang
							ref="selectOrang"
							label="Nama Orang"
							:entity_id.sync="data.detail.data.entitas.id"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="2" sm="12">
						<CInput
							label="Flight / Voyage"
							:value.sync="data.detail.data.nomor_sarkut"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<MySelectBandara 
							ref="selectAsalOrang"
							label="Pelabuhan / Bandara Asal"
							:iata_code.sync="data.detail.data.pelabuhan_asal.iata_code"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8" sm="12">
						<MySelectBandara 
							ref="selectTujuanOrang"
							label="Pelabuhan / Bandara Tujuan"
							:iata_code.sync="data.detail.data.pelabuhan_tujuan.iata_code"
						/>
					</CCol>
				</CRow>
				<CRow>
					<label class="w-100 pl-3 pt-2 mb-0">Waktu Keberangkatan</label>
					<CCol md="3" sm="12">
						<div class="form-group">
							<date-picker 
								v-model="data.detail.data.tanggal_berangkat"
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
								v-model="data.detail.data.waktu_berangkat"
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
					<label class="w-100 pl-3 pt-2 mb-0">Waktu Kedatangan</label>
					<CCol md="3" sm="12">
						<div class="form-group">
							<date-picker 
								v-model="data.detail.data.tanggal_datang"
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
								v-model="data.detail.data.waktu_datang"
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
					<CCol md="8" sm="12">
						<CTextarea
							label="Data Lainnya"
							:value.sync="data.detail.data.data_lain"
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
						:label="{'jabatan': 'Jabatan Penerbit', 'nama': 'Nama Penerbit'}"
						:default_jabatan.sync="default_penerbit"
						:jabatan.sync="data.petugas.penerbit.kode_jabatan"
						:tipe_ttd.sync="data.petugas.penerbit.tipe_ttd"
						:nip.sync="data.petugas.penerbit.nip"
					/>
				</CCol>
			</CRow>

			<!-- Tembusan -->
			<CRow class="sep">
				<CCol md="8">
					<MyInputTembusan
						:value.sync="data.tembusan"
					/>
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
import store from '../../../store'
import DefaultNhiN from './DefaultNhiN'
import MyAlert from '../../components/AlertSubmit.vue'
import MyComboboxJabatan from '../../components/ComboboxJabatan.vue'
import MyComboboxLokasi from '../../components/ComboboxLokasi.vue'
import MyInputTembusan from '../../components/InputTembusan.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectBandara from '../../components/SelectBandara.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectKantorBC from '../../components/SelectKantorBC.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

const default_zona_waktu_options = ['WIB', 'WITA', 'WIT']
const default_nhin_options = [
		{value: 'nhin-exim', label: 'Barang Ekspor/Impor'}, 
		{value: 'nhin-sarkut', label: 'Sarana Pengangkut'}, 
		{value: 'nhin-orang', label: 'Orang'}
	]

export default {
	name: 'FormNhiN',
	components: {
		DatePicker,
		MyAlert,
		MyComboboxJabatan,
		MyComboboxLokasi,
		MyInputTembusan,
		MySearchDocument,
		MySelectBandara,
		MySelectEntitas,
		MySelectEntitasOrang,
		MySelectKantorBC,
		MySelectPejabat,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
		is_exim: Boolean,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(DefaultNhiN.data)),
			saved_lkain: null,
			jenis_kegiatan: JSON.parse(JSON.stringify(store.getters.jenisKegiatan)),
			sifat_nhin_options: JSON.parse(JSON.stringify(store.getters.sifatSurat)),
			klasifikasi_nhin_options: JSON.parse(JSON.stringify(store.getters.klasifikasiSurat)),
			zona_waktu_options: JSON.parse(JSON.stringify(default_zona_waktu_options)),
			nhin_options: JSON.parse(JSON.stringify(default_nhin_options)),
			selected_nhin: default_nhin_options[0].value,
			default_tujuan: DefaultNhiN.data.tujuan,
			default_penerbit: 'bd.05',
			default_kantor: '050100',
		}
	},
	watch: {
		is_exim(val) {
			console.log('FORM NHIN - WATCH - IS EXIM', val)
		}
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data = this.fillNull(response.data)
			this.saved_lkain = this.data.lkain_id
			this.updateTab()
		},
		async saveData() {
			if (this.state == 'insert') {
				var response = await api.storeDoc('nhin', this.data)
				this.$emit('update:state', 'edit')
				var msg = `Data NHI-N berhasil disimpan`
			} else if (this.state == 'edit') {
				var response = await api.updateDoc('nhin', this.data.id, this.data)
				var msg = `Data NHI-N berhasil diubah`
			}
			this.data = this.fillNull(response)
			this.saved_lkain = this.data.lkai_id
			this.$emit('update:doc_id', this.data.id)
			this.alert(msg)
			this.updateTab()
		},
		fillNull(response) {
			let detail_type = response.detail.type
			switch (detail_type) {
				case 'nhin-exim':
					if (response.detail.data.entitas == null) {
						response.detail.data.entitas = JSON.parse(JSON.stringify(DefaultNhiN.detail_exim.entitas))
					}
					break;

				case 'nhin-sarkut':
					if (response.detail.data.pelabuhan_asal == null) {
						response.detail.data.pelabuhan_asal = JSON.parse(JSON.stringify(DefaultNhiN.detail_sarkut.pelabuhan_asal))
					}
					if (response.detail.data.pelabuhan_tujuan == null) {
						response.detail.data.pelabuhan_tujuan = JSON.parse(JSON.stringify(DefaultNhiN.detail_sarkut.pelabuhan_tujuan))
					}
					break;

				case 'nhin-orang':
					if (response.detail.data.entitas == null) {
						response.detail.data.entitas = JSON.parse(JSON.stringify(DefaultNhiN.detail_orang.entitas))
					}
					if (response.detail.data.pelabuhan_asal == null) {
						response.detail.data.pelabuhan_asal = JSON.parse(JSON.stringify(DefaultNhiN.detail_orang.pelabuhan_asal))
					}
					if (response.detail.data.pelabuhan_tujuan == null) {
						response.detail.data.pelabuhan_tujuan = JSON.parse(JSON.stringify(DefaultNhiN.detail_orang.pelabuhan_tujuan))
					}
					break;
			
				default:
					break;
			}
			return response
		},
		updateTab() {
			if (this.data.detail.type == 'nhin-exim') {
				this.$emit('update:is_exim', true)	
			} else {
				this.$emit('update:is_exim', false)
			}
			this.$emit('show-data')
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		resetDetailNhiN() {
			switch (this.data.detail.type) {
				case 'nhin-exim':
					this.data.detail.data = JSON.parse(JSON.stringify(DefaultNhiN.detail_exim))
					break;

				case 'nhin-sarkut':
					this.data.detail.data = JSON.parse(JSON.stringify(DefaultNhiN.detail_sarkut))
					break;

				case 'nhin-orang':
					this.data.detail.data = JSON.parse(JSON.stringify(DefaultNhiN.detail_orang))
					break;
			
				default:
					break;
			}
		},
		toggleJenisKegiatan(val) {
			this.resetDetailNhiN()
		},
	},
	async beforeMount() {
		if (this.state == 'edit') {
			await this.getData()
		}
	},
}
</script>

<style>

</style>
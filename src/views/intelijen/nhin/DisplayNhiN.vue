<template>
	<div class="wrapper display-nhi">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_nhin }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_nhin }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>No LKAI-N</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lkain }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Sifat</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sifat }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Klasifikasi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_klasifikasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tujuan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tujuan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tempat</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempat }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Waktu</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_waktu }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Kantor</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_kantor }}
					</CCol>
				</CRow>

				<!-- Barang Exim -->
				<div class="sep" v-if="data_doc.flag_exim">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Kegiatan atas Barang Impor/Ekspor</b></h4>
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Nama/No Dok Kepabeanan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_dok_exim }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Eks/Untuk Kapal/PesawatAlat Angkut/Lainnya</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_sarkut_exim }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>BL/AWB</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_awb_exim }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>No Container/Merek Koli</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_merek_koli_exim }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Importir/Eksportir/PPJK</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_importir_ppjk }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>NPWP</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_npwp }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Data Lainnya</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_data_lain_exim }}
						</CCol>
					</CRow>
				</div>

				<!-- Sarkut -->
				<div class="sep" v-if="data_doc.flag_sarkut">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Kegiatan atas Sarana Pengangkut</b></h4>
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Nama</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_nama_sarkut }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Jenis Sarana Pengangkut</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_jenis_sarkut }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Voyage / Flight / No Pol</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_flight_trayek_sarkut }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Pelabuhan Asal</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_asal_sarkut }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Pelabuhan Tujuan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_tujuan_sarkut }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>IMO / MMSI</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_imo_mmsi }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Data Lainnya</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_data_lain_sarkut }}
						</CCol>
					</CRow>
				</div>

				<!-- Orang -->
				<div class="sep" v-if="data_doc.flag_orang">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Kegiatan atas Orang</b></h4>
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Nama</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_nama_orang }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Jenis Kelamin</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_jenis_kelamin }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Kewarganegaraan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_warga_negara }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>No Paspor</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_paspor }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Flight / Voyage</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_flight_voyage_orang }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Pelabuhan / Bandara Asal</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_pelabuhan_asal_orang }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Pelabuhan / Bandara Tujuan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_pelabuhan_tujuan_orang }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Waktu Keberangkatan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_waktu_berangkat_orang }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Waktu Kedatangan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_waktu_datang_orang }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Data Lainnya</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_data_lain_orang }}
						</CCol>
					</CRow>
				</div>

				<!-- INDIKASI -->
				<CRow class="mb-1 mt-2">
					<CCol md="3" class="py-1">
						<b>Indikasi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_indikasi }}
					</CCol>
				</CRow>
				<MyDisplayPejabat
					title="Penerbit"
					:data.sync="data_doc.penerbit"
				/>
				<div class="sep mt-4">
					<CRow class="mb-1 mt-2">
						<CCol md="3" class="py-1">
							<b>Tembusan</b>
						</CCol>
						<CCol md="9" class="py-1" v-if="data_tembusan != null">
							<div v-if="data_tembusan.length > 0">
								<p class="mb-1" v-for="(txt,id) in data_tembusan" :key="id">- {{txt}}</p>
							</div>
							<div v-else>
								-
							</div>
						</CCol>
						<CCol md="9" class="py-1" v-else>
							-
						</CCol>
					</CRow>
				</div>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

export default {
	name: 'DisplayNhiN',
	components: {
		MyDisplayPegawai,
		MyDisplayPejabat,
	},
	props: {
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			data_doc: {},
		}
	},
	computed: {
		disp_no_nhin() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_nhin() { return this.data_doc.tanggal_dokumen || '-' },
		disp_lkain() { 
			if (
				(this.data_doc.nomor_lkain != null) &&
				(this.data_doc.tanggal_lkain != null)
			) {
				let no_lkain = this.data_doc.nomor_lkain || '-'
				let tgl_lkain = this.data_doc.tanggal_lkain || '-'
				var lkain = `${no_lkain} tanggal ${tgl_lkain}`
			} else {
				var lkain = '-'
			}

			return lkain
		},
		disp_sifat() { return this.data_doc.sifat || '-' },
		disp_klasifikasi() { return this.data_doc.klasifikasi || '-' },
		disp_tujuan() { return this.data_doc.tujuan || '-' },
		disp_tempat() { return this.data_doc.tempat_indikasi || '-' },
		disp_waktu() { 
			if (this.data_doc.waktu_indikasi != null) {
				var waktu = `${this.data_doc.waktu_indikasi} ${this.data_doc.zona_waktu}`
			} else {
				var waktu = '-'
			}

			return waktu
		},
		disp_kantor() { 
			if (this.data_doc.kantor_bc) {
				return this.data_doc.kantor_bc.nama_kantor
			} else {
				return '-'
			}
		},
		disp_dok_exim() { return `${this.data_doc.jenis_dok_exim} ${this.data_doc.nomor_dok_exim} tanggal ${this.data_doc.tanggal_dok_exim}` },
		disp_sarkut_exim() { return `${this.data_doc.nama_sarkut_exim} Voy/Flight/No. Pol ${this.data_doc.no_flight_trayek_exim}` },
		disp_awb_exim() { return `${this.data_doc.nomor_awb_exim} tanggal ${this.data_doc.tanggal_awb_exim}`},
		disp_merek_koli_exim() { return this.data_doc.merek_koli_exim || '-' },
		disp_importir_ppjk() { return this.data_doc.importir_ppjk || '-' },
		disp_npwp() { return this.data_doc.npwp || '-' },
		disp_data_lain_exim() { return this.data_doc.data_lain_exim || '-' },
		disp_nama_sarkut() { return this.data_doc.nama_sarkut || '-' },
		disp_jenis_sarkut() { return this.data_doc.jenis_sarkut || '-' },
		disp_flight_trayek_sarkut() { return this.data_doc.no_flight_trayek_sarkut || '-' },
		disp_asal_sarkut() { 
			if (this.data_doc.pelabuhan_asal_sarkut) {
				return `${this.data_doc.pelabuhan_asal_sarkut.airport_name}, ${this.data_doc.pelabuhan_asal_sarkut.negara.nama_negara}`
			} else {
				return '-'
			}
		},
		disp_tujuan_sarkut() { 
			if (this.data_doc.pelabuhan_tujuan_sarkut) {
				return `${this.data_doc.pelabuhan_tujuan_sarkut.airport_name}, ${this.data_doc.pelabuhan_tujuan_sarkut.negara.nama_negara}`
			} else {
				return '-'
			}
		},
		disp_imo_mmsi() { return this.data_doc.imo_mmsi_sarkut || '-' },
		disp_data_lain_sarkut() { return this.data_doc.data_lain_sarkut || '-' },
		disp_nama_orang() { return this.data_doc.orang.nama || '-' },
		disp_jenis_kelamin() { return this.data_doc.orang.jenis_kelamin || '-' },
		disp_warga_negara() { return this.data_doc.orang.warga_negara || '-' },
		disp_paspor() { return this.data_doc.orang.nomor_identitas || '-' },
		disp_flight_voyage_orang() { return this.data_doc.flight_voyage_orang || '-' },
		disp_pelabuhan_asal_orang() {
			if (this.data_doc.pelabuhan_asal_orang) {
				return `${this.data_doc.pelabuhan_asal_orang.airport_name}, ${this.data_doc.pelabuhan_asal_orang.negara.nama_negara}`
			} else {
				return '-'
			}
		},
		disp_pelabuhan_tujuan_orang() {
			if (this.data_doc.pelabuhan_tujuan_orang) {
				return `${this.data_doc.pelabuhan_tujuan_orang.airport_name}, ${this.data_doc.pelabuhan_tujuan_orang.negara.nama_negara}`
			} else {
				return '-'
			}
		},
		disp_waktu_berangkat_orang() { return this.data_doc.waktu_berangkat_orang || '-' },
		disp_waktu_datang_orang() { return this.data_doc.waktu_datang_orang || '-' },
		disp_data_lain_orang() { return this.data_doc.data_lain_orang || '-' },
		disp_indikasi() { return this.data_doc.indikasi || '-' },
		data_tembusan() { return  this.data_doc.tembusan || null }
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			response.data.data.flag_exim = response.data.data.flag_exim == 1 ? true : false
			this.data_doc = response.data.data
			this.$emit('update:is_exim', response.data.data.flag_exim)
			this.$emit('show-data')
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>
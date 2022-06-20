<template>
	<div class="wrapper display-nhi">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_nhi }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_nhi }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>No LKAI</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lkai }}
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
							<h4><b>Barang Impor/Ekspor</b></h4>
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

				<!-- BKC -->
				<div class="sep" v-if="data_doc.flag_bkc">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Barang Kena Cukai</b></h4>
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Eks Pabrik/Tempat Penyimpanan/Tempat Penimbunan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_penimbunan }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Penyalur</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_penyalur }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Tempat Penjualan Eceran</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_tempat_penjualan }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>NPPBKC</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_nppbkc }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Eks/Untuk Kapal/Pesawat/Alat Angkut/Lainnya</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_sarkut_bkc }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Data Lainnya</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_data_lain_bkc }}
						</CCol>
					</CRow>
				</div>

				<!-- Barang Tertentu -->
				<div class="sep" v-if="data_doc.flag_tertentu">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Barang Tertentu</b></h4>
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Nama/No Dokumen</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_dok_tertentu }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Eks/Untuk Kapal/Pesawat/Alat Angkut/Lainnya</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_sarkut_tertentu }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>BL/AWB</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_awb_tertentu }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>No Container/Merek Koli</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_merek_koli_tertentu }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Orang Pribadi/Badan Hukum</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_orang_badan_hukum }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Data Lainnya</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_data_lain_tertentu }}
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

const default_data = {
	// objek: {data: {item: null}}
}

export default {
	name: 'DisplayNhi',
	components: {
		MyDisplayPegawai,
		MyDisplayPejabat,
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_doc: JSON.parse(JSON.stringify(default_data)),
		}
	},
	computed: {
		disp_no_nhi() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_nhi() { return this.data_doc.tanggal_dokumen || '-' },
		disp_lkai() { 
			if (
				(this.data_doc.nomor_lkai != null) &&
				(this.data_doc.tanggal_lkai != null)
			) {
				let no_lkai = this.data_doc.nomor_lkai || '-'
				let tgl_lkai = this.data_doc.tanggal_lkai || '-'
				var lkai = `${no_lkai} tanggal ${tgl_lkai}`
			} else {
				var lkai = '-'
			}

			return lkai
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
		disp_kantor() { return this.data_doc.kantor || '-' },
		disp_dok_exim() { return `${this.data_doc.jenis_dok_exim} ${this.data_doc.nomor_dok_exim} tanggal ${this.data_doc.tanggal_dok_exim}` },
		disp_sarkut_exim() { return `${this.data_doc.nama_sarkut_exim} Voy/Flight/No. Pol ${this.data_doc.no_flight_trayek_exim}` },
		disp_awb_exim() { return `${this.data_doc.nomor_awb_exim} tanggal ${this.data_doc.tanggal_awb_exim}`},
		disp_merek_koli_exim() { return this.data_doc.merek_koli_exim || '-' },
		disp_importir_ppjk() { return this.data_doc.importir_ppjk || '-' },
		disp_npwp() { return this.data_doc.npwp || '-' },
		disp_data_lain_exim() { return this.data_doc.data_lain_exim || '-' },
		disp_penimbunan() { return this.data_doc.tempat_penimbunan || '-' },
		disp_penyalur() { return this.data_doc.penyalur || '-' },
		disp_tempat_penjualan() { return this.data_doc.tempat_penjualan || '-' },
		disp_nppbkc() { return this.data_doc.nppbkc || '-' },
		disp_sarkut_bkc() { return `${this.data_doc.nama_sarkut_bkc} Voy/Flight/No. Pol ${this.data_doc.no_flight_trayek_bkc}` },
		disp_data_lain_bkc() { return this.data_doc.no_flight_trayek_bkc || '-' },
		disp_dok_tertentu() { return `${this.data_doc.jenis_dok_tertentu} ${this.data_doc.nomor_dok_tertentu} tanggal ${this.data_doc.tanggal_dok_tertentu}` },
		disp_sarkut_tertentu() { return `${this.data_doc.nama_sarkut_tertentu} Voy/Flight/No. Pol ${this.data_doc.no_flight_trayek_tertentu}` },
		disp_awb_tertentu() { return `${this.data_doc.nomor_awb_tertentu} tanggal ${this.data_doc.tanggal_awb_tertentu}`},
		disp_merek_koli_tertentu() { return this.data_doc.merek_koli_tertentu || '-' },
		disp_orang_badan_hukum() { return this.data_doc.orang_badan_hukum || '-' },
		disp_data_lain_tertentu() { return this.data_doc.data_lain_tertentu || '-' },
		disp_indikasi() { return this.data_doc.indikasi || '-' },
		data_tembusan() { return  this.data_doc.tembusan || null }
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_doc = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>
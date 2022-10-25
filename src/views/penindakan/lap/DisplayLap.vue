<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lap }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lap }}</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 mb-1">
					<CCol md="3" class="py-1">
						<b>Sumber Informasi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sumber }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Kategori Dugaan Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_kategori }}
					</CCol>
				</CRow>
				<div class="sep">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Uraian Pra-Penindakan</b></h4>
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Pelaku</b>
						</CCol>
						<CCol md="9" class="py-1">
							<b>[{{ disp_flag_pelaku }}]</b> - {{ disp_ket_pelaku }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Pelanggaran</b>
						</CCol>
						<CCol md="9" class="py-1">
							<b>[{{ disp_flag_pelanggaran }}]</b> - {{ disp_ket_pelanggaran }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Locus</b>
						</CCol>
						<CCol md="9" class="py-1">
							<b>[{{ disp_flag_locus }}]</b> - {{ disp_ket_locus }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Tempus</b>
						</CCol>
						<CCol md="9" class="py-1">
							<b>[{{ disp_flag_tempus }}]</b> - {{ disp_ket_tempus }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Prosedural</b>
						</CCol>
						<CCol md="9" class="py-1">
							<b>[{{ disp_flag_kewenangan }}]</b> - {{ disp_ket_kewenangan }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>SDM</b>
						</CCol>
						<CCol md="9" class="py-1">
							<b>[{{ disp_flag_sdm }}]</b> - {{ disp_ket_sdm }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Sara Prasana</b>
						</CCol>
						<CCol md="9" class="py-1">
							<b>[{{ disp_flag_sarpras }}]</b> - {{ disp_ket_sarpras }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Anggaran</b>
						</CCol>
						<CCol md="9" class="py-1">
							<b>[{{ disp_flag_anggaran }}]</b> - {{ disp_ket_anggaran }}
						</CCol>
					</CRow>
					<CRow class="mt-4 mb-1">
						<CCol md="3" class="py-1">
							<b>Kelayakan Pelaksanaan Penindakan</b>
						</CCol>
						<CCol md="9" class="py-1">
							<b>{{ disp_layak_penindakan }}</b>
						</CCol>
					</CRow>
					<div v-if="data_doc.flag_layak_penindakan">
						<CRow class="mt-2 mb-1">
							<CCol md="3" class="py-1">
								<b>Skema Penindakan</b>
							</CCol>
							<CCol md="9" class="py-1">
								{{ disp_skema }}
							</CCol>
						</CRow>
						<CRow class="mb-1">
							<CCol md="3" class="py-1">
								<b>Keterangan Penindakan</b>
							</CCol>
							<CCol md="9" class="py-1">
								{{ disp_ket_skema }}
							</CCol>
						</CRow>
					</div>
					<div v-else>
						<CRow class="mt-2 mb-1">
							<CCol md="3" class="py-1">
								<b>Kelayakan Patroli</b>
							</CCol>
							<CCol md="9" class="py-1">
								{{ disp_layak_patroli }}
							</CCol>
						</CRow>
						<CRow class="mb-1">
							<CCol md="3" class="py-1">
								<b>Keterangan Patroli</b>
							</CCol>
							<CCol md="9" class="py-1">
								{{ disp_ket_patroli }}
							</CCol>
						</CRow>
					</div>
					<CRow class="mt-4 mb-1">
						<CCol md="3" class="py-1">
							<b>Kesimpulan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_kesimpulan }}
						</CCol>
					</CRow>
				</div>
				<MyDisplayPejabat
					title="Penerbit"
					:data.sync="data_doc.penerbit"
				/>
				<MyDisplayPejabat
					title="Atasan"
					:data.sync="data_doc.atasan"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

const default_data = {
	no_dok_lengkap: null,
	tanggal_dokumen: null,
	nomor_sumber: null,
	tanggal_sumber: null,
	dugaan_pelanggaran: {kategori: null},
	flag_pelaku: null,
	keterangan_pelaku: null,
	flag_pelanggaran: null,
	keterangan_pelanggaran: null,
	flag_locus: null,
	keterangan_locus: null,
	flag_tempus: null,
	keterangan_tempus: null,
	flag_kewenangan: null,
	keterangan_kewenangan: null,
	flag_sdm: null,
	keterangan_sdm: null,
	flag_sarpras: null,
	keterangan_sarpras: null,
	flag_anggaran: null,
	keterangan_anggaran: null,
	flag_layak_penindakan: null,
	skema_penindakan: null,
	keterangan_skema_penindakan: null,
	flag_layak_patroli: null,
	keterangan_patroli: null,
	kesimpulan: null,
}

export default {
	name: 'DisplayLap',
	components: {
		MyDisplayPejabat
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			doc_type: 'lap',
			data_doc: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_lap() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_lap() { return this.data_doc.tanggal_dokumen || '-' },
		disp_sumber() { return ((this.data_doc.nomor_sumber || '') + ' tanggal ' + (this.data_doc.tanggal_sumber || '')) },
		disp_kategori() { return this.data_doc.dugaan_pelanggaran.kategori || '-' },
		disp_flag_pelaku() { return this.data_doc.flag_pelaku ? 'DIKETAHUI' : 'TIDAK DIKETAHUI' },
		disp_ket_pelaku() { return this.data_doc.keterangan_pelaku },
		disp_flag_pelanggaran() { return this.data_doc.flag_pelanggaran ? 'DIKETAHUI' : 'TIDAK DIKETAHUI' },
		disp_ket_pelanggaran() { return this.data_doc.keterangan_pelanggaran },
		disp_flag_locus() { return this.data_doc.flag_locus ? 'DIKETAHUI' : 'TIDAK DIKETAHUI' },
		disp_ket_locus() { return this.data_doc.keterangan_locus },
		disp_flag_tempus() { return this.data_doc.flag_tempus ? 'DIKETAHUI' : 'TIDAK DIKETAHUI' },
		disp_ket_tempus() { return this.data_doc.keterangan_tempus },
		disp_flag_kewenangan() { return this.data_doc.flag_kewenangan ? 'KEWENANGAN DJBC' : 'BUKAN KEWENANGAN DJBC' },
		disp_ket_kewenangan() { return this.data_doc.keterangan_kewenangan },
		disp_flag_sdm() { return this.data_doc.flag_sdm ? 'TERSEDIA' : 'TIDAK TERSEDIA' },
		disp_ket_sdm() { return this.data_doc.keterangan_sdm },
		disp_flag_sarpras() { return this.data_doc.flag_sarpras ? 'TERSEDIA' : 'TIDAK TERSEDIA' },
		disp_ket_sarpras() { return this.data_doc.keterangan_sarpras },
		disp_flag_anggaran() { return this.data_doc.flag_anggaran ? 'TERSEDIA' : 'TIDAK TERSEDIA' },
		disp_ket_anggaran() { return this.data_doc.keterangan_anggaran },
		disp_layak_penindakan() { return this.data_doc.flag_layak_penindakan ? 'LAYAK DILAKUKAN PENINDAKAN' : 'TIDAK / BELUM LAYAK DILAKUKAN PENINDAKAN'},
		disp_skema() {
			return this.data_doc.skema_penindakan != null
				? this.data_doc.skema_penindakan.skema.toUpperCase()
				: null
		},
		disp_ket_skema() { return this.data_doc.keterangan_skema_penindakan || '-' },
		disp_layak_patroli() { return this.data_doc.flag_layak_patroli == 1 ? 'LAYAK PATROLI' : 'TIDAK / BELUM LAYAK PATROLI' },
		disp_ket_patroli() { return this.data_doc.keterangan_patroli || '-' },
		disp_kesimpulan() { return this.data_doc.kesimpulan || '-' },
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
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
					<div v-if="document.flag_layak_penindakan">
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
					:data.sync="document.petugas.penerbit"
				/>
				<MyDisplayPejabat
					title="Atasan"
					:data.sync="document.petugas.atasan"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

export default {
	name: 'DisplayLap',
	components: {
		MyDisplayPejabat
	},
	props: {
		doc_type: String,
		document: Object,
	},
	computed: {
		disp_no_lap() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_lap() { return this.document.tanggal_dokumen || '-' },
		disp_sumber() { return ((this.document.nomor_sumber || '') + ' tanggal ' + (this.document.tanggal_sumber || '')) },
		disp_kategori() { return this.document.dugaan_pelanggaran.kategori || '-' },
		disp_flag_pelaku() { return this.document.flag_pelaku ? 'DIKETAHUI' : 'TIDAK DIKETAHUI' },
		disp_ket_pelaku() { return this.document.keterangan_pelaku },
		disp_flag_pelanggaran() { return this.document.flag_pelanggaran ? 'DIKETAHUI' : 'TIDAK DIKETAHUI' },
		disp_ket_pelanggaran() { return this.document.keterangan_pelanggaran },
		disp_flag_locus() { return this.document.flag_locus ? 'DIKETAHUI' : 'TIDAK DIKETAHUI' },
		disp_ket_locus() { return this.document.keterangan_locus },
		disp_flag_tempus() { return this.document.flag_tempus ? 'DIKETAHUI' : 'TIDAK DIKETAHUI' },
		disp_ket_tempus() { return this.document.keterangan_tempus },
		disp_flag_kewenangan() { return this.document.flag_kewenangan ? 'KEWENANGAN DJBC' : 'BUKAN KEWENANGAN DJBC' },
		disp_ket_kewenangan() { return this.document.keterangan_kewenangan },
		disp_flag_sdm() { return this.document.flag_sdm ? 'TERSEDIA' : 'TIDAK TERSEDIA' },
		disp_ket_sdm() { return this.document.keterangan_sdm },
		disp_flag_sarpras() { return this.document.flag_sarpras ? 'TERSEDIA' : 'TIDAK TERSEDIA' },
		disp_ket_sarpras() { return this.document.keterangan_sarpras },
		disp_flag_anggaran() { return this.document.flag_anggaran ? 'TERSEDIA' : 'TIDAK TERSEDIA' },
		disp_ket_anggaran() { return this.document.keterangan_anggaran },
		disp_layak_penindakan() { return this.document.flag_layak_penindakan ? 'LAYAK DILAKUKAN PENINDAKAN' : 'TIDAK / BELUM LAYAK DILAKUKAN PENINDAKAN'},
		disp_skema() {
			return this.document.skema_penindakan != null
				? this.document.skema_penindakan.skema != null
					? this.document.skema_penindakan.skema.toUpperCase()
					: null
				: null
		},
		disp_ket_skema() { return this.document.keterangan_skema_penindakan || '-' },
		disp_layak_patroli() { return this.document.flag_layak_patroli == 1 ? 'LAYAK PATROLI' : 'TIDAK / BELUM LAYAK PATROLI' },
		disp_ket_patroli() { return this.document.keterangan_patroli || '-' },
		disp_kesimpulan() { return this.document.kesimpulan || '-' },
	},
}
</script>

<style>

</style>
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
				<div class="sep" v-if="data_doc.detail.type == 'nhin-exim'">
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
							{{ disp_entitas_exim }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>NPWP</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_npwp_exim }}
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
				<div class="sep" v-if="data_doc.detail.type == 'nhin-sarkut'">
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
							{{ disp_nomor_sarkut }}
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
				<div class="sep" v-if="data_doc.detail.type == 'nhin-orang'">
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
							{{ disp_nomor_sarkut_orang }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Pelabuhan / Bandara Asal</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_asal_orang }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Pelabuhan / Bandara Tujuan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_tujuan_orang }}
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
					:data.sync="data_doc.petugas.penerbit"
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
import DefaultNhiN from './DefaultNhiN'
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
			data_doc: JSON.parse(JSON.stringify(DefaultNhiN.data)),
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
			var waktu = null
			if (this.data_doc.waktu_indikasi != null) {
				waktu = `${this.data_doc.waktu_indikasi} ${this.data_doc.zona_waktu}`
			}

			var tanggal_waktu = this.data_doc.tanggal_indikasi
			if (waktu != null) {
				tanggal_waktu = `${tanggal_waktu} ${waktu}`
			}

			return tanggal_waktu
		},
		disp_kantor() { return this.data_doc.kantor.nama_kantor || '-' },

		detail_type() { return this.data_doc.detail.type },
		detail_data() { return this.data_doc.detail.data },

		// Detail exim
		disp_dok_exim() { return (this.detail_type == 'nhin-exim') ? `${this.detail_data.jenis_dok || ''} ${this.detail_data.nomor_dok || '-'} tanggal ${this.detail_data.tanggal_dok || '-'}` : '-' },
		disp_sarkut_exim() { return (this.detail_type == 'nhin-exim') ?  `${this.detail_data.nama_sarkut || ''} Voy/Flight/No. Pol ${this.detail_data.nomor_sarkut} || '-'` : '-' },
		disp_awb_exim() { return (this.detail_type == 'nhin-exim') ? `${this.detail_data.nomor_awb || '-'} tanggal ${this.detail_data.tanggal_awb || '-'}` : '-' },
		disp_merek_koli_exim() { return (this.detail_type == 'nhin-exim') ? this.detail_data.merek_koli : '-' },
		disp_entitas_exim() { 
			let txt= '-'
			if (this.detail_type == 'nhin-exim') {
				if (this.detail_data.entitas != null) {
					txt = this.detail_data.entitas.data.nama
				}	
			}
			return txt
		},
		disp_npwp_exim() { 
			let txt = '-'
			if (this.detail_type == 'nhin-exim') {
				// Filter identitas dengan jenis NPWP
				let npwp = []
				if (this.detail_data.entitas) {
					if (this.detail_data.entitas.data.identitas != undefined) {
						npwp = this.detail_data.entitas.data.identitas.filter(function (id) {
							if (id.jenis == 'NPWP') {
								return id
							}
						})	
					}	
				}

				// Tampilkan NPWP bila ketemu
				if (npwp.length > 0) { txt = npwp[0].nomor }
			}
			return txt
		},
		disp_data_lain_exim() { return (this.detail_type == 'nhin-exim') ? this.detail_data.data_lain : '-' },

		// Detail sarkut
		disp_nama_sarkut() { return (this.detail_type == 'nhin-sarkut') ? this.detail_data.nama_sarkut : '-' },
		disp_jenis_sarkut() { return (this.detail_type == 'nhin-sarkut') ? this.detail_data.jenis_sarkut : '-' },
		disp_nomor_sarkut() { return (this.detail_type == 'nhin-sarkut') ? this.detail_data.nomor_sarkut : '-' },
		disp_asal_sarkut() { 
			let txt = '-'
			if (this.detail_type == 'nhin-sarkut') {
				if (this.detail_data.pelabuhan_asal) {
					txt = this.detail_data.pelabuhan_asal.airport_name
					if (this.detail_data.pelabuhan_asal.negara) {
						txt += `, ${this.detail_data.pelabuhan_asal.negara.kode_2}`
					}
				}
			}
			return txt
		},
		disp_tujuan_sarkut() { 
			let txt = '-'
			if (this.detail_type == 'nhin-sarkut') {
				if (this.detail_data.pelabuhan_tujuan) {
					txt = this.detail_data.pelabuhan_tujuan.airport_name
					if (this.detail_data.pelabuhan_tujuan.negara) {
						txt += `, ${this.detail_data.pelabuhan_tujuan.negara.kode_2}`
					}
				}
			}
			return txt
		},
		disp_imo_mmsi() { return (this.detail_type == 'nhin-sarkut') ? this.detail_data.imo_mmsi : '-' },
		disp_data_lain_sarkut() { return (this.detail_type == 'nhin-sarkut') ? this.detail_data.data_lain : '-' },

		// Detail orang
		entitas() { return (this.detail_type == 'nhin-orang') ? this.detail_data.entitas : null },
		disp_nama_orang() { return (this.entitas != null) ? this.entitas.nama : '-' },
		disp_jenis_kelamin() { 
			let txt = '-'
			if (this.entitas != null) {
				if (this.entitas.jenis_kelamin) {
					txt = this.detail_data.entitas.jenis_kelamin.uraian
				}
			}
			return txt
		},
		disp_warga_negara() { 
			let txt = '-'
			if (this.entitas != null) {
				if (this.entitas.warga_negara) {
					txt = this.entitas.warga_negara.nama_negara
				}
			}
			return txt
		},
		disp_paspor() { 
			let txt = '-'
			if (this.entitas != null) {
				// Filter identitas dengan jenis identitas
				let paspor = []
				if (this.entitas.identitas != undefined) {
					paspor = this.entitas.identitas.filter(function (id) {
						if (id.jenis == 'PASPOR') {
							return id
						}
					})
				}

				// Tampilkan identitas bila ketemu
				if (paspor.length > 0) { txt = paspor[0].nomor }
			}
			return txt
		},
		// disp_paspor() { return this.data_doc.orang.nomor_identitas || '-' },
		disp_nomor_sarkut_orang() { return (this.detail_type == 'nhin-orang') ? this.detail_data.nomor_sarkut : '-' },
		disp_asal_orang() { 
			let txt = '-'
			if (this.detail_type == 'nhin-orang') {
				if (this.detail_data.pelabuhan_asal) {
					txt = this.detail_data.pelabuhan_asal.airport_name
					if (this.detail_data.pelabuhan_asal.negara) {
						txt += `, ${this.detail_data.pelabuhan_asal.negara.kode_2}`
					}
				}
			}
			return txt
		},
		disp_tujuan_orang() { 
			let txt = '-'
			if (this.detail_type == 'nhin-orang') {
				if (this.detail_data.pelabuhan_tujuan) {
					txt = this.detail_data.pelabuhan_tujuan.airport_name
					if (this.detail_data.pelabuhan_tujuan.negara) {
						txt += `, ${this.detail_data.pelabuhan_tujuan.negara.kode_2}`
					}
				}
			}
			return txt
		},
		disp_waktu_berangkat_orang() { 
			let txt = '-'
			if (this.detail_type == 'nhin-orang') {
				if (this.detail_data.tanggal_berangkat) {
					txt = this.detail_data.tanggal_berangkat
					if (this.detail_data.waktu_berangkat) {
						txt += ` ${this.detail_data.waktu_berangkat}`
					}
				}
			}
			return txt
		},
		disp_waktu_datang_orang() { 
			let txt = '-'
			if (this.detail_type == 'nhin-orang') {
				if (this.detail_data.tanggal_datang) {
					txt = this.detail_data.tanggal_datang
					if (this.detail_data.waktu_datang) {
						txt += ` ${this.detail_data.waktu_datang}`
					}
				}
			}
			return txt
		},
		disp_data_lain_orang() { return (this.detail_type == 'nhin-orang') ? this.detail_data.data_lain : '-' },

		disp_indikasi() { return this.data_doc.indikasi || '-' },
		data_tembusan() { return  this.data_doc.tembusan || null }
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data_doc = response.data
			let flag_exim = this.data_doc.detail.type == 'nhin-exim' ? true : false
			this.$emit('update:is_exim', flag_exim)
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
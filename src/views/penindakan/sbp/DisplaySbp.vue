<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol>
						<h4>{{ disp_no_sbp }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol>
						<h5>{{ disp_tgl_sbp }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Surat Perintah</b>
					</CCol>
					<CCol md="9">
						{{ disp_sprint }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Lokasi Penindakan</b>
					</CCol>
					<CCol md="9">
						{{ disp_lokasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Uraian Penindakan</b>
					</CCol>
					<CCol md="9">
						{{ disp_uraian }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Alasan Penindakan</b>
					</CCol>
					<CCol md="9">
						{{ disp_alasan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Jenis Pelanggaran</b>
					</CCol>
					<CCol md="9">
						{{ disp_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Waktu Mulai Penindakan</b>
					</CCol>
					<CCol md="9">
						{{ disp_waktu_mulai }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Waktu Selesai Penindakan</b>
					</CCol>
					<CCol md="9">
						{{ disp_waktu_selesai }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Hal Terjadi</b>
					</CCol>
					<CCol md="9">
						{{ disp_hal_terjadi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Saksi/Pemilik</b>
					</CCol>
					<CCol md="9">
						{{ disp_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Petugas 1</b>
					</CCol>
					<CCol md="9">
						{{ disp_petugas1 }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Petugas 2</b>
					</CCol>
					<CCol md="9">
						{{ disp_petugas2 }}
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'

const data_default = {
	main:{
		data: {
			no_dok_lengkap: null,
			uraian_penindakan: null,
			alasan_penindakan: null,
			jenis_pelanggaran: null,
			wkt_mulai_penindakan: null,
			wkt_selesai_penindakan: null,
			hal_terjadi: null,
		},
	},
	penindakan: {
		tanggal_penindakan: null,
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null
		},
		saksi: {
			nama: null
		},
		petugas1: {
			name: null,
			nip: null
		},
		petugas2: {
			name: null,
			nip: null
		}
	}
	
}

export default {
	name: 'DisplaySbp',
	props: {
		id: Number
	},
	computed: {
		disp_no_sbp() { return this.data.main.data.no_dok_lengkap || '-' },
		disp_tgl_sbp() { return this.data.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return ((this.data.penindakan.sprint.nomor_sprint || '') + ' tanggal ' + (this.data.penindakan.sprint.tanggal_sprint || '')) },
		disp_lokasi() { return this.data.penindakan.lokasi_penindakan || '-' },
		disp_uraian() { return this.data.main.data.uraian_penindakan || '-' },
		disp_alasan() { return this.data.main.data.alasan_penindakan || '-' },
		disp_pelanggaran() { return this.data.main.data.jenis_pelanggaran || '-' },
		disp_waktu_mulai() { return this.data.main.data.wkt_mulai_penindakan || '-' },
		disp_waktu_selesai() { return this.data.main.data.wkt_selesai_penindakan || '-' },
		disp_hal_terjadi() { return this.data.main.data.hal_terjadi || '-' },
		disp_saksi() { return this.data.penindakan.saksi.nama || '-' },
		disp_petugas1() { return this.data.penindakan.petugas1.name || '-' },
		disp_petugas2() { 
			if (this.data.penindakan.petugas2 != null) {
				return this.data.penindakan.petugas2.name
			} else {
				return '-'
			}
		},
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default))
		}
	},
	methods: {
		async getData() { 
			this.data = await api.getDocumentById('sbp', this.id)
		}
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>

</style>
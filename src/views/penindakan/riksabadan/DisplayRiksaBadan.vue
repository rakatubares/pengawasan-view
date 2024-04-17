<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_riksa_badan }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_riksa_badan }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Surat Perintah</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sprint }}
					</CCol>
				</CRow>
				<CRow class="mt-2 sep">
					<CCol md="3">
						<b>Nama</b>
					</CCol>
					<CCol md="9">
						<p 
							v-if="disp_nama != null"
							class="a nav-link p-0 m-0"
							@click="showEntitas(data_doc.penindakan.objek.badan.entitas.id)"
						>{{ disp_nama }}</p>
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Asal</b>
					</CCol>
					<CCol md="9">
						{{disp_asal}}
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Tujuan</b>
					</CCol>
					<CCol md="9">
						{{disp_tujuan}}
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Pendamping</b>
					</CCol>
					<CCol md="9">
						<p 
							v-if="disp_pendamping != null"
							class="a nav-link p-0 m-0"
							@click="showEntitas(data_doc.penindakan.objek.badan.pendamping.id)"
						>{{ disp_pendamping }}</p>
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Nama Sarkut</b>
					</CCol>
					<CCol md="9">
						{{disp_nama_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Jenis Sarkut</b>
					</CCol>
					<CCol md="9">
						{{disp_jenis_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Nomor Sarkut</b>
					</CCol>
					<CCol md="9">
						{{disp_nomor_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Bendera Sarkut</b>
					</CCol>
					<CCol md="9">
						{{disp_bendera_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Registrasi Sarkut</b>
					</CCol>
					<CCol md="9">
						{{disp_registrasi_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Nahkoda/Pilot/Pengemudi</b>
					</CCol>
					<CCol md="9">
						<p 
							v-if="disp_pengemudi != null"
							class="a nav-link p-0 m-0"
							@click="showEntitas(data_doc.penindakan.objek.badan.pengemudi.id)"
						>{{ disp_pengemudi }}</p>
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Dokumen</b>
					</CCol>
					<CCol md="9">
						{{disp_dokumen}}
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Uraian Pemeriksaan</b>
					</CCol>
					<CCol md="9">
						{{disp_uraian_pemeriksaan}}
					</CCol>
				</CRow>
				<CRow class="mt-2">
					<CCol md="3">
						<b>Hasil Pemeriksaan</b>
					</CCol>
					<CCol md="9">
						{{disp_hasil_pemeriksaan}}
					</CCol>
				</CRow>
				<CRow class="sep">
					<CCol md="3">
						<h5><b>Saksi</b></h5>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0"
							@click="showEntitas(data_doc.penindakan.saksi.id)"
						>{{ disp_saksi }}</p>
					</CCol>
				</CRow>
				<MyDisplayPegawai
					title="Pejabat 1"
					:data.sync="data_doc.penindakan.petugas.petugas1"
				/>
				<MyDisplayPegawai
					title="Pejabat 2"
					:data.sync="data_doc.penindakan.petugas.petugas2"
				/>
			</CCol>
		</CRow>

		<MyModalEntitasOrang
			ref="modal_saksi"
			:show.sync="show_modal_saksi"
		/>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayEntitas from '../../components/DisplayEntitas.vue'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplaySarkut from '../../details/displays/DisplaySarkut.vue'
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

const default_data = {
	no_dok_lengkap: null,
	penindakan: {
		tanggal_penindakan: null,
		lokasi_penindakan: null,
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null
		},
		objek: {
			badan:{
				entitas: {nama: null},
				asal: null,
				pendamping: {nama: null},
				nama_sarkut: null,
				jenis_sarkut: null,
				nomor_sarkut: null,
				bendera_sarkut: null,
				registrasi_sarkut: null,
				pengemudi: {nama: null},
				jenis_dokumen: null,
				nomor_dokumen: null,
				tanggal_dokumen: null,
				uraian_pemeriksaan: null,
				hasil_pemeriksaan: null,
			}
		},
		saksi: {nama: null},
		petugas: {}
	},
}

export default {
	name: 'DisplayRiksaBadan',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai,
		MyDisplaySarkut,
		MyModalEntitasOrang,
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_doc: JSON.parse(JSON.stringify(default_data)),
			show_modal_saksi: false,
		}
	},
	computed: {
		disp_no_ba_riksa_badan() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_ba_riksa_badan() { return this.data_doc.tanggal_dokumen || '-' },
		disp_sprint() { return (
			(this.data_doc.penindakan.sprint.nomor_sprint || '') 
			+ ' tanggal ' 
			+ (this.data_doc.penindakan.sprint.tanggal_sprint || '')
		) },

		objek() { return this.data_doc.penindakan.objek.badan },
		disp_nama() { return this.objek.entitas.nama || '-'},
		disp_asal() { return this.objek.asal || '-'},
		disp_tujuan() { return this.objek.tujuan || '-' },
		disp_pendamping() { 
			let pendamping = this.objek.pendamping 
				? this.objek.pendamping.nama 
				: '-' 
			return pendamping
		},
		disp_nama_sarkut() { return this.objek.nama_sarkut || '-' },
		disp_jenis_sarkut() { return this.objek.jenis_sarkut || '-' },
		disp_nomor_sarkut() { return this.objek.nomor_sarkut || '-' },
		disp_bendera_sarkut() { 
			let bendera = this.objek.bendera 
				? this.objek.bendera.nama_negara 
				: '-'
			return bendera
		},
		disp_registrasi_sarkut() { return this.objek.registrasi_sarkut || '-' },
		disp_pengemudi() { 
			let pengemudi = this.objek.pengemudi 
				? this.objek.pengemudi.nama 
				: '-'
			return pengemudi
		},
		disp_dokumen() { 
			let dok = this.objek.jenis_dokumen
				? this.objek.nomor_dokumen
					? this.objek.tanggal_dokumen
						? `${this.objek.jenis_dokumen} ${this.objek.nomor_dokumen} tanggal ${this.objek.tanggal_dokumen}`
						: `${this.objek.jenis_dokumen} ${this.objek.nomor_dokumen}`
					: this.objek.tanggal_dokumen
						? `${this.objek.jenis_dokumen} tanggal ${this.objek.tanggal_dokumen}`
						: this.objek.jenis_dokumen
				: this.objek.nomor_dokumen
					? this.objek.tanggal_dokumen
						? `${this.objek.nomor_dokumen} tanggal ${this.objek.tanggal_dokumen}`
						: this.objek.nomor_dokumen
					: this.objek.tanggal_dokumen
						? this.objek.tanggal_dokumen
						: '-'
			
			return dok
		},
		disp_uraian_pemeriksaan() {
			let uraian = this.objek.uraian_pemeriksaan 
				? this.objek.uraian_pemeriksaan : '-'
			return uraian
		},
		disp_hasil_pemeriksaan() {
			let hasil = this.objek.hasil_pemeriksaan 
				? this.objek.hasil_pemeriksaan : '-'
			return hasil
		},
		disp_saksi() { 
			let txt = this.data_doc.penindakan.saksi
				? this.data_doc.penindakan.saksi.nama : '-'
			return txt
		}
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data_doc = response.data
		},
		showEntitas(saksi_id) {
			this.$refs.modal_saksi.showModal('show', saksi_id)
		},
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>
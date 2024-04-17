<template>
	<div class="wrapper">
		<CRow class="mx-2 mt-2">
			<CCol>
				<CRow>
					<CCol md="12">
						<h5>Badan / Orang</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nama</b>
					</CCol>
					<CCol md="9">
						<p 
							v-if="disp_nama != null"
							class="a nav-link p-0 m-0"
							@click="showEntitas(objek.entitas.id)"
						>&nbsp;{{ disp_nama }}</p>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Asal</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_asal}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Tujuan</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_tujuan}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Pendamping</b>
					</CCol>
					<CCol md="9">
						<p 
							v-if="disp_pendamping != null"
							class="a nav-link p-0 m-0"
							@click="showEntitas(objek.pendamping.id)"
						>&nbsp;{{ disp_pendamping }}</p>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nama Sarkut</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_nama_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jenis Sarkut</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_jenis_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nomor Sarkut</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_nomor_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Bendera Sarkut</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_bendera_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Registrasi Sarkut</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_registrasi_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nahkoda/Pilot/Pengemudi</b>
					</CCol>
					<CCol md="9">
						<p 
							v-if="disp_pengemudi != null"
							class="a nav-link p-0 m-0"
							@click="showEntitas(objek.pengemudi.id)"
						>&nbsp;{{ disp_pengemudi }}</p>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Dokumen</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_dokumen}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Uraian Pemeriksaan</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_uraian_pemeriksaan}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Hasil Pemeriksaan</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_hasil_pemeriksaan}}
					</CCol>
				</CRow>
			</CCol>
		</CRow>

		<MyModalEntitasOrang
			ref="modal_entitas"
		/>
	</div>
</template>

<script>
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

const default_data = {
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

export default {
	name: 'DisplayBadan',
	components: {
		MyModalEntitasOrang,
	},
	props: {
		penindakan: Object
	},
	computed: {
		objek() {
			let data = this.penindakan.objek.badan
				? JSON.parse(JSON.stringify(this.penindakan.objek.badan))
				: JSON.parse(JSON.stringify(default_data))
			
			return data
		},
		disp_nama() { return this.objek.entitas.nama || '-' },
		disp_asal() { return this.objek.asal || '-' },
		disp_tujuan() { return this.objek.tujuan || '-' },
		disp_pendamping() { return this.objek.pendamping.nama || '-' },
		disp_nama_sarkut() { return this.objek.nama_sarkut || '-' },
		disp_jenis_sarkut() { return this.objek.jenis_sarkut || '-' },
		disp_nomor_sarkut() { return this.objek.nomor_sarkut || '-' },
		disp_bendera_sarkut() { 
			let bendera = this.objek.bendera ? this.objek.bendera.nama_negara : '-'
			return bendera
		},
		disp_registrasi_sarkut() { return this.objek.registrasi_sarkut || '-' },
		disp_pengemudi() { return this.objek.pengemudi ? this.objek.pengemudi.nama : null },
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
			return this.objek.uraian_pemeriksaan ? this.objek.uraian_pemeriksaan : '-'
		},
		disp_hasil_pemeriksaan() {
			return this.objek.hasil_pemeriksaan ? this.objek.hasil_pemeriksaan : '-'
		},
	},
	methods: {
		showEntitas(entitas_id) {
			this.$refs.modal_entitas.showModal('show', entitas_id)
		},
	},
}
</script>

<style>

</style>
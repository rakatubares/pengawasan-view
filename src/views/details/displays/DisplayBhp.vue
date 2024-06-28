<template>
	<div class="wrapper">
		<CRow class="mx-2 mt-2">
			<CCol>
				<CRow>
					<CCol md="12">
						<h5>BHP</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jumlah/Jenis Kemasan</b>
					</CCol>
					<CCol md="9">
						{{disp_kemasan}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jenis/Nomor dan Tanggal Dokumen</b>
					</CCol>
					<CCol md="9">
						{{disp_dokumen}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Sarana Pengangkut</b>
					</CCol>
					<CCol md="9">
						{{disp_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nomor/Registrasi Sarana Pengangkut</b>
					</CCol>
					<CCol md="9">
						{{disp_no_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Kontainer</b>
					</CCol>
					<CCol md="9">
						{{disp_kontainer}}
					</CCol>
				</CRow>

				<!-- Tabel item barang -->
				<CRow>
					<CCol>
						<MyTableBarang
							state="show"
							doc_type="penyidikan-bhp"
							:doc_id.sync="bhp.id"
						/>
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import MyTableBarang from '../../components/barang/TableItemBarang.vue'

export default {
	name: 'DisplayBhp',
	components: {
		MyTableBarang
	},
	props: {
		doc_type: String,
		doc_id: Number,
		bhp: Object,
	},
	computed: {
		disp_kemasan() {
			let txt = this.bhp.jumlah_kemasan
				? this.bhp.kemasan
					? `${this.bhp.jumlah_kemasan} ${this.bhp.kemasan.kemasan}`
					: this.bhp.jumlah_kemasan
				: this.bhp.kemasan
					? this.bhp.kemasan.kemasan
					: ''
			return txt
		},
		disp_dokumen() { 
			let dok = this.bhp.jenis_dokumen
				? this.bhp.nomor_dokumen
					? this.bhp.tanggal_dokumen
						? `${this.bhp.jenis_dokumen} ${this.bhp.nomor_dokumen} tanggal ${this.bhp.tanggal_dokumen}`
						: `${this.bhp.jenis_dokumen} ${this.bhp.nomor_dokumen}`
					: this.bhp.tanggal_dokumen
						? `${this.bhp.jenis_dokumen} tanggal ${this.bhp.tanggal_dokumen}`
						: this.bhp.jenis_dokumen
				: this.bhp.nomor_dokumen
					? this.bhp.tanggal_dokumen
						? `${this.bhp.nomor_dokumen} tanggal ${this.bhp.tanggal_dokumen}`
						: this.bhp.nomor_dokumen
					: this.bhp.tanggal_dokumen
						? this.bhp.tanggal_dokumen
						: ''
			
			return dok
		},
		disp_sarkut() {
			let sarkut = this.bhp.nama_sarkut
				? this.bhp.jenis_sarkut
					? `${this.bhp.nama_sarkut} (${this.bhp.jenis_sarkut})`
					: this.bhp.nama_sarkut
				: this.bhp.jenis_sarkut
					? this.bhp.jenis_sarkut
					: ''

			return sarkut
		},
		disp_no_sarkut() {
			let no_sarkut = this.bhp.nomor_sarkut
				? this.bhp.registrasi_sarkut
					? `${this.bhp.nomor_sarkut} / ${this.bhp.registrasi_sarkut}`
					: this.bhp.registrasi_sarkut
				: this.bhp.nomor_sarkut
					? this.bhp.nomor_sarkut
					: ''

			return no_sarkut
		},
		disp_kontainer() {
			let kontainer = this.bhp.nomor_kontainer
				? this.bhp.ukuran_kontainer
					? `${this.bhp.nomor_kontainer} / ${this.bhp.ukuran_kontainer}`
					: this.bhp.nomor_kontainer
				: this.bhp.ukuran_kontainer
					? this.bhp.ukuran_kontainer
					: ''

			return kontainer
		},
	}
}
</script>

<style>

</style>
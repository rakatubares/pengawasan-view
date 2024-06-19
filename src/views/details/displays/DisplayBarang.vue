<template>
	<div class="wrapper">
		<CRow class="mx-2 mt-2">
			<CCol>
				<CRow>
					<CCol md="12">
						<h5>Barang</h5>
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
						<b>Pemilik/Importir/Eksportir/Kuasa</b>
					</CCol>
					<CCol md="9">
						<p 
							v-if="disp_pemilik != null"
							class="a nav-link p-0 m-0"
							@click="showEntitas(objek.pemilik.id)"
						>{{ disp_pemilik }}</p>
					</CCol>
				</CRow>

				<!-- Tabel item barang -->
				<CRow>
					<CCol>
						<MyTableBarang
							state="show"
							doc_type="penindakan-barang"
							:doc_id.sync="objek.id"
							:data_objek="objek"
							:bhp="bhp"
						/>
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
import MyTableBarang from '../../components/barang/TableItemBarang.vue'

export default {
	name: 'DisplayBarang',
	components: {
		MyModalEntitasOrang,
		MyTableBarang
	},
	props: {
		doc_type: String,
		doc_id: Number,
		penindakan: Object,
		bhp: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		objek() {
			let data = this.penindakan.objek.barang
				? JSON.parse(JSON.stringify(this.penindakan.objek.barang))
				: JSON.parse(JSON.stringify(default_data))
			
			return data
		},
		disp_kemasan() {
			let txt = this.objek.jumlah_kemasan
				? this.objek.kemasan
					? `${this.objek.jumlah_kemasan} ${this.objek.kemasan.kemasan}`
					: this.objek.jumlah_kemasan
				: this.objek.kemasan
					? this.objek.kemasan.kemasan
					: ''
			return txt
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
						: ''
			
			return dok
		},
		disp_pemilik() { return this.objek.pemilik ? this.objek.pemilik.nama : null },
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
<template>
	<div class="wrapper">
		<CRow class="mx-2 mt-2">
			<CCol>
				<CRow>
					<CCol md="12">
						<h5>Sarana Pengangkut</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nama Sarana Pengangkut</b>
					</CCol>
					<CCol md="9">
						{{disp_nama_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jenis Sarana Pengangkut</b>
					</CCol>
					<CCol md="9">
						{{disp_jenis_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>No Voyage/Penerbangan/Trayek</b>
					</CCol>
					<CCol md="9">
						{{disp_no_flight_trayek}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Ukuran/Kapasitas Muatan</b>
					</CCol>
					<CCol md="9">
						{{disp_kapasitas_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nahkoda/Pilot/Pengemudi</b>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0 m-0"
							@click="showEntitas(objek.pengemudi.id)"
						>{{ disp_nama_pilot }}</p>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Bendera</b>
					</CCol>
					<CCol md="9">
						{{disp_bendera}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nomor Register/Polisi</b>
					</CCol>
					<CCol md="9">
						{{disp_no_reg_polisi}}
					</CCol>
				</CRow>
			</CCol>
		</CRow>

		<MyModalEntitasOrang
			ref="modal_pengemudi"
			:show.sync="show_modal_pengemudi"
		/>
	</div>
</template>

<script>
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

const default_data = {
	nama_sarkut: null,
	jenis_sarkut: null,
	no_flight_trayek: null,
	jumlah_kapasitas: null,
	satuan_kapasitas: null,
	bendera: null,
	no_reg_polisi: null,
	pengemudi: {nama: null}
}

export default {
	name: 'DisplaySarkut',
	components: {
		MyModalEntitasOrang,
	},
	props: {
		penindakan: Object
	},
	data() {
		return {
			show_modal_pengemudi: false,
		}
	},
	computed: {
		objek() {
			let data = this.penindakan.objek.sarkut
				? JSON.parse(JSON.stringify(this.penindakan.objek.sarkut))
				: JSON.parse(JSON.stringify(default_data))

			if (!data.pengemudi) {
				data.pengemudi = JSON.parse(JSON.stringify(default_data.pengemudi))
			}
			
			return data
		},
		disp_nama_sarkut() {
			return this.objek.nama_sarkut || '-'
		},
		disp_jenis_sarkut() {
			return this.objek.jenis_sarkut || '-'
		},
		disp_no_flight_trayek() {
			return this.objek.no_flight_trayek || '-'
		},
		disp_kapasitas_sarkut() {
			return (this.objek.jumlah_kapasitas || '-') + ' ' + (this.objek.satuan_kapasitas || '')
		},
		disp_nama_pilot() {
			return this.objek.pengemudi.nama || '-'
		},
		disp_bendera() {
			return this.objek.bendera.nama_negara || '-'
		},
		disp_no_reg_polisi() {
			return this.objek.no_reg_polisi || '-'
		},
	},
	methods: {
		showEntitas(pengemudi_id) {
			this.$refs.modal_pengemudi.showModal('show', pengemudi_id)
		},
	},
}
</script>

<style>

</style>
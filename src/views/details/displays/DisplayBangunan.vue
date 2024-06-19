<template>
	<div class="wrapper">
		<CRow class="mx-2 mt-2">
			<CCol col="12">
				<CRow>
					<CCol md="12">
						<h5>Bangunan / Tempat</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Alamat</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_alamat}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>No Reg. Bangunan/NPPPBKC</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_no_reg}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Pemilik</b>
					</CCol>
					<CCol md="9">
						<p 
							class="a nav-link p-0 m-0"
							@click="showEntitas(objek.pemilik.id)"
						>{{ disp_pemilik }}</p>
					</CCol>
				</CRow>
			</CCol>
		</CRow>

		<MyModalEntitasOrang
			ref="modal_pemilik"
			:show.sync="show_modal_pemilik"
		/>
	</div>
</template>

<script>
import MyModalEntitasOrang from '../../components/ModalEntitasOrang.vue'

const default_data = {
	alamat: null,
	no_reg: null,
	pemilik: {nama: null},
}

export default {
	name: 'DisplayBangunan',
	components: {
		MyModalEntitasOrang
	},
	props: {
		penindakan: Object
	},
	data() {
		return {
			show_modal_pemilik: false,
		}
	},
	computed: {
		objek() {
			let data = this.penindakan.objek.bangunan
				? JSON.parse(JSON.stringify(this.penindakan.objek.bangunan))
				: JSON.parse(JSON.stringify(default_data))
			
			return data
		},
		disp_alamat() {
			return (this.objek.alamat || '-')
		},
		disp_no_reg() {
			return (this.objek.no_reg || '-')
		},
		disp_pemilik() {
			return (this.objek.pemilik.nama || '-')
		},
	},
	methods: {
		showEntitas(pemilik_id) {
			this.$refs.modal_pemilik.showModal('show', pemilik_id)
		},
	},
}
</script>

<style>

</style>
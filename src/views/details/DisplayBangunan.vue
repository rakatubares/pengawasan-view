<template>
	<div class="wrapper">
		<CRow 
			class="mt-3 mx-2 pt-3 border-top"
		>
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
						&nbsp;{{disp_pemilik}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Identitas Pemilik</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_identitas}}
					</CCol>
				</CRow>
				<CRow 
					v-if="(state==='insert') || (state==='edit')"
					class="mt-2 ml-1"
				>
					<CButton 
						class="mx-1"
						size="sm" 
						color="success"
						@click="editData"
					>
						<CIcon name="cil-pencil"/>&nbsp; Edit
					</CButton>
					<CButton 
						class="mx-1" 
						size="sm" 
						color="danger"
						@click="confirmDeleteData"
					>
						<CIcon name="cil-trash"/>&nbsp; Hapus
					</CButton>
				</CRow>
			</CCol>
		</CRow>

		<!-- Modal konfirmasi delete SBP -->
		<MyModalDelete
			v-if="modal_delete_props.show"
			:url.sync="modal_delete_props.url"
			@close-modal="closeModalDelete"
			@delete-data="deleteData"
		>
			<template #text>
				<span v-html="modal_delete_props.text"></span>
			</template>
		</MyModalDelete>
	</div>
</template>

<script>
import axios from "axios"

import MyModalDelete from '../components/ModalDelete.vue'

export default {
	name: 'DisplayBangunan',
	components: {
		MyModalDelete
	},
	props: {
		state: {
			type: String,
			default: 'insert'
		},
		doc_type: String,
		doc_id: Number,
	},
	computed: {
		API_BANGUNAN() { return process.env.VUE_APP_BASEAPI + '/' + this.doc_type + '/' + this.doc_id + '/bangunan' },
		disp_alamat() {
			return (this.data.alamat || '-')
		},
		disp_no_reg() {
			return (this.data.no_reg || '-')
		},
		disp_pemilik() {
			return (this.data.pemilik.nama || '-')
		},
		disp_identitas() {
			return (this.data.pemilik.jenis_identitas || '') + ' ' + (this.data.pemilik.nomor_identitas || '-')
		},
	},
	data() {
		return {
			data: {
				id: null,
				doc_id: null,
				alamat: null,
				no_reg: null,
				pemilik: {
					nama: null,
					jenis_identitas: null,
					nomor_identitas: null,
				}
			},
			modal_delete_props: {
				show: false,
				url: null,
				text: null
			}
		}
	},
	methods: {
		getData() {
			axios
				.get(this.API_BANGUNAN)
				.then(
					(response) => {
						this.data = response.data.data
					}
				)
		},
		editData() {
			this.$emit('edit-data')
		},
		confirmDeleteData() {
			let text = "Apakah Anda yakin untuk menghapus data <b>penindakan bangunan</b>?" 

			this.modal_delete_props.url = this.API_BANGUNAN
			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		closeModalDelete() {
			this.modal_delete_props.url = null
			this.modal_delete_props.text = null
			this.modal_delete_props.show = false
		},
		deleteData() {
			this.closeModalDelete()
			this.$emit('delete-data')
		}
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>

</style>
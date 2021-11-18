<template>
	<div class="wrapper">
		<CRow 
			class="mt-3 mx-2 pt-3 border-top"
		>
			<CCol col="12">
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
						&nbsp;{{disp_nama}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Tanggal Lahir</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_tanggal_lahir}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Kewarganegaraan</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_warga_negara}}
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
						<b>Nomor Identitas</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_identitas}}
					</CCol>
				</CRow>

				<!-- Button edit delete -->
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
	name: 'DisplayBadan',
	components: {
		MyModalDelete
	},
	props: {
		state: {
			type: String,
			default: 'insert'
		},
		doc_type: String,
		doc_id: Number
	},
	computed: {
		API_BADAN() { return process.env.VUE_APP_BASEAPI + '/' + this.doc_type + '/' + this.doc_id + '/badan' },
		disp_nama() {
			return this.data.nama || '-'
		},
		disp_tanggal_lahir() {
			return this.data.tanggal_lahir || '-'
		},
		disp_warga_negara() {
			return this.data.warga_negara || '-'
		},
		disp_alamat() {
			return this.data.alamat || '-'
		},
		disp_identitas() {
			return (this.data.jenis_identitas || '') + ' ' + (this.data.nomor_identitas || '-')
		},
	},
	data() {
		return {
			data: {
				id: null,
				doc_id: null,
				nama: null,
				tanggal_lahir: null,
				warga_negara: null,
				alamat: null,
				jns_identitas: null,
				no_identitas: null,
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
				.get(this.API_BADAN)
				.then(
					(response) => {
						this.data = response.data.data.entitas
					}
				)
		},
		editData() {
			this.$emit('edit-data')
		},
		confirmDeleteData() {
			let text = "Apakah Anda yakin untuk menghapus data <b>penindakan badan</b>?" 

			this.modal_delete_props.url = this.API_BADAN
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
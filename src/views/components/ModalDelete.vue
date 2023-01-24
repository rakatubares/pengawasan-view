<template>
	<div class="wrapper">
		<!-- Modal delete data -->
		<CModal
			class="modal-level-2"
			title="Konfirmasi Hapus Data"
			:show.sync="show"
			@update:show="show == false && closeModal()"
		>
			<slot name="text"></slot>

			<template #footer>
				<CButton
					color="secondary"
					@click="closeModal"
				>
					Kembali
				</CButton>
				<CButton
					color="danger"
					@click="deleteData"
				>
					Hapus
				</CButton>
			</template>
		</CModal>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import MyAlert from '../components/AlertSubmit.vue'

export default {
	name: 'ModalDelete',
	components: {
		MyAlert
	},
	props: {
		target: {
			type: String,
			default: 'doc'
		},
		doc_type: String,
		doc_id: Number,
		item_id: Number
	},
	data() {
		return {
			show: false
		}
	},
	methods: {
		async deleteData() {
			if (this.target == 'item') {
				await api.delItemBarang(this.doc_type, this.doc_id, this.item_id)
			} else if (this.target == 'bhp') {
				await api.delItemBhp(this.doc_type, this.doc_id, this.item_id)
			} else {
				await api.deleteDoc(this.doc_type, this.doc_id)
			}

			this.alert('Data berhasil dihapus.')
			this.$emit('delete-data')
		},
		alert(text) {
			this.$refs.alert.show_alert(text)
		},
		closeModal() {
			this.show = false
			this.$emit('close-modal')
		},
	},
	mounted() {
		this.show = true
	}
}
</script>

<style>

</style>
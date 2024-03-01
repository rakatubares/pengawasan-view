<template>
	<div class="wrapper">
		<CModal
			title="Delete Item Barang"
			:show.sync="show"
		>
			Apakah Anda yakin untuk menghapus barang <b>{{ uraian }}</b> ?

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
	</div>
</template>

<script>
import api from '../../../router/api2'

export default {
	name: 'ModalDeleteItemBarang',
	props: {
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			show: false,
			id: null,
			uraian: null,
		}
	},
	methods: {
		showModal(id, uraian) {
			this.id = id
			this.uraian = uraian
			this.show = true
		},
		closeModal() {
			this.id = null
			this.uraian = null
			this.show = false
		},
		async deleteData() {
			await api.deleteItemBarang(this.doc_type, this.doc_id, this.id)
			this.$emit('delete')
			this.closeModal()
		}
	}
}
</script>

<style>

</style>
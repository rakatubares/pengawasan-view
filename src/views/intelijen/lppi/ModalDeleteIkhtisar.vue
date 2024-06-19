<template>
	<div class="wrapper">
		<CModal
			class="modal-level-2"
			title="Input Ikhtisar"
			:show.sync="show"
			@update:show="$event == false && closeModal()"
		>
			Apakah Anda yakin untuk menghapus data ikhtisar:<br/>
			{{item.ikhtisar}}

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
const default_data = {
	ikhtisar: null,
	index: null
}

export default {
	name: 'ModalDeleteIkhtisar',
	data() {
		return {
			show: false,
			item: JSON.parse(JSON.stringify(default_data))
		}
	},
	methods: {
		showModal(item) {
			this.item = item
			this.show = true
		},
		deleteData() {
			this.$emit('delete-data', this.item.index)
			this.closeModal()
		},
		closeModal() {
			this.show = false
			this.item = JSON.parse(JSON.stringify(default_data))
		},
	}
}
</script>

<style>

</style>
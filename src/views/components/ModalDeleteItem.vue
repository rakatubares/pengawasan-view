<template>
	<div class="wrapper">
		<CModal
			:title.sync="title"
			:show.sync="show"
		>
			Apakah Anda yakin untuk menghapus data <b>{{ label }}</b>: <br/>
			<b>{{ text }}</b>

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
export default {
	name: 'ModalDeleteItem',
	props: {
		title: String,
		label: String,
	},
	data() {
		return {
			show: false,
			index: null,
			text: null,
		}
	},
	methods: {
		showModal(text, index) {
			this.index = index
			this.text = text
			this.show = true
		},
		closeModal() {
			this.show = false
			this.index = null,
			this.text = null
		},
		deleteData() {
			this.$emit('delete', this.index)
			this.closeModal()
		}
	}
}
</script>

<style>

</style>
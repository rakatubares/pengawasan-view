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
import axios from "axios"

import MyAlert from '../components/AlertSubmit.vue'

export default {
	name: 'ModalDelete',
	components: {
		MyAlert
	},
	props: {
		type: null,
		url: String
	},
	data() {
		return {
			show: false
		}
	},
	methods: {
		deleteData() {
			axios
				.delete(this.url)
				.then(
					(response) => {
						this.alert('Data berhasil dihapus.')
						this.$emit('delete-data', this.type)
					}
				)
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
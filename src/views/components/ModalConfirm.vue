<template>
	<CModal
		class="modal-level-2"
		:title="title"
		:text="text"
		:show="show"
		:centered="centered"
	>
	<span>{{text}}</span>
		<template #footer>
			<CButton
				class="btn"
				color="secondary"
				@click="closeModal"
			>
				Kembali
			</CButton>
			<CButton
				class="btn"
				:color="buttonColor"
				@click="deleteData" 
			>
				Hapus
			</CButton>
		</template>
	</CModal>
</template>

<script>
export default {
	name: 'ModalConfirm',
	props: {
		title: String,
		show: {
			type: Boolean,
			default: false
		},
		text: String,
		buttonColor: {
			type: String,
			default: "primary"
		}
	},
	methods: {
		closeModal() {
			this.show = false
		}
	}
}
</script>

<style>

</style>
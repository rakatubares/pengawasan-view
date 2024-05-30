<template>
	<div class="wrapper">
		<!-- Modal rollback data -->
		<CModal
			class="modal-level-2"
			title="Konfirmasi Rollback Data"
			:show.sync="show"
			@update:show="show == false && closeModal()"
		>
			

			<CForm>
				<CRow>
					<CCol sm="12">
						{{ confirm_text }}
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CTextarea 
							label="Alasan rollback"
							:value.sync="alasan_rollback"
						/>
					</CCol>
				</CRow>
			</CForm>

			<template #footer>
				<CButton
					color="secondary"
					@click="closeModal"
				>
					Kembali
				</CButton>
				<CButton
					color="success"
					@click="rollbackData"
				>
					Rollback
				</CButton>
			</template>
		</CModal>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import MyAlert from './AlertSubmit.vue'

export default {
	name: 'ModalRollback',
	components: {
		MyAlert
	},
	props: {
		target: {
			type: String,
			default: 'doc'
		},
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			show: false,
			alasan_rollback: null,
		}
	},
	computed: {
		confirm_text() {
			var text = "Apakah Anda yakin untuk rollback data " 
				+ this.document.no_dok_lengkap
				+ "?"
			return text
		}
	},
	methods: {
		async rollbackData() {
			await api.rollbackDoc(this.doc_type, this.document.id, {'keterangan': this.alasan_rollback})
			this.alert('Data berhasil dirollback.')
			this.$emit('rollback-data')
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
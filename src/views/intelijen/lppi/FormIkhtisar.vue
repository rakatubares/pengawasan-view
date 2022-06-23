<template>
	<div class="wrapper">
		<CModal
			class="modal-level-2"
			title="Input Ikhtisar"
			size="lg"
			:show.sync="show"
			@update:show="$event == false && closeModal()"
		>
			<CForm>
				<CRow>
					<CCol md="12">
						<CTextarea
							label="Ikhtisar Informasi"
							invalid-feedback="Ikhtisar informasi wajib diisi"
							:value.sync="form_data.value.ikhtisar"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="9">
						<MySelectKepercayaan
							ref="select_kepercayaan"
							:value.sync="form_data.value.kode_kepercayaan"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="9">
						<MySelectValiditas
							ref="select_validitas"
							:value.sync="form_data.value.kode_validitas"
						/>
					</CCol>
				</CRow>
			</CForm>

			<template #footer>
				<CButton
					class="mx-1"
					color="success"
					@click="saveData()"
				>
					Simpan
				</CButton>
				<CButton
					class="mx-1"
					color="secondary"
					@click="closeModal()"
				>
					Kembali
				</CButton>
			</template>
		</CModal>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectKepercayaan from '../../components/SelectKlasifikasiKepercayaan.vue'
import MySelectValiditas from '../../components/SelectKlasifikasiValiditas.vue'

const default_data = {
	index: null,
	value: {
		ikhtisar: null,
		kode_kepercayaan: null,
		kode_validitas: null,
	}
}

export default {
	name: 'FormIkhtisar',
	components: {
		MyAlert,
		MySelectKepercayaan,
		MySelectValiditas,
	},
	data() {
		return {
			show: false,
			state: 'insert',
			form_data: JSON.parse(JSON.stringify(default_data))
		}
	},
	methods: {
		saveData() {
			this.$emit('save-data', JSON.parse(JSON.stringify(this.form_data)))
			if (this.state == 'insert') {
				this.state = 'edit'
			}
			this.show = false
		},
		showModal(state, data=null) {
			this.state = state
			if (this.state == 'insert') {
				this.resetData()
			} else {
				this.form_data = data
			}
			this.show = true
		},
		closeModal() {
			this.show = false
			this.form_data = JSON.parse(JSON.stringify(default_data))
		},
		update_index(idx) {
			this.form_data.index = idx
		},
		resetData() {
			this.$refs.select_kepercayaan.resetSelection()
			this.$refs.select_validitas.resetSelection()
		}
	},
}
</script>

<style>

</style>
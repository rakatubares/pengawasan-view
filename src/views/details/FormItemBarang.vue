<template>
	<div class="wrapper">
		<CModal
			class="modal-level-2"
			title="Input Data Barang"
			:show="show"
			@update:show="$emit('update:show', $event)"
		>
			<CForm>
				<CRow>
					<CCol>
						<CTextarea
							label="Uraian barang"
							:value.sync="data.uraian_barang"
							:is-valid="validatorRequired"
							invalid-feedback="Uraian barang wajib diisi"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6">
						<CInput
							label="Jumlah"
							:value.sync="data.jumlah_barang"
							:is-valid="validatorNumber"
							invalid-feedback="Jumlah barang wajib diisi"
						/>
					</CCol>
					<CCol md="4">
						<CInput
							label="Satuan"
							:value.sync="data.satuan_barang"
							:is-valid="validatorRequired"
							invalid-feedback="Satuan barang wajib diisi"
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
					@click="cancel()"
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
import axios from "axios"

import MyAlert from '../components/AlertSubmit.vue'
import validators from '../../helpers/validator.js'

const data_default = {
	uraian_barang: null,
	jumlah_barang: null,
	satuan_barang: null
}

export default {
	name: 'FormItemBarang',
	components: {
		MyAlert
	},
	props: {
		show:{
			type: Boolean,
			default: false
		},
		state: {
			type: String,
			default: 'insert'
		},
		id: Number,
		doc_type: String,
		doc_id: Number,
	},
	computed: {
		API_BARANG() { return process.env.VUE_APP_BASEAPI + '/' + this.doc_type + '/' + this.doc_id + '/barang/item' },
		API_BARANG_ID() { return this.API_BARANG + '/' + this.id },
	},
	data() {
		return {
			data: { ...data_default }
		}
	},
	methods: {
		getData() {
			if (this.state == 'edit') {
				axios
					.get(this.API_BARANG_ID)
					.then(
						(response) => {
							this.data = response.data.data
						}
					)
					.catch((error) => {console.error(error)})
			}
		},
		saveData() {
			let submit_method
			let submit_url
			submit_method = this.state == 'insert' ? 'post' : 'put'
			submit_url = this.state == 'insert' ? this.API_BARANG : this.API_BARANG_ID

			axios({
				method: submit_method,
				url: submit_url,
				data: this.data,
			})
				.then((response) => {
					this.$emit('update:state', 'edit')
					if (submit_method == 'post') {
						this.$emit('update:id', response.data.data.id)
					}
					this.$emit('save-data')
					this.alert('Data item barang berhasil disimpan')
				})
				.catch((error) => (console.error(error)))
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		cancel() {
			this.$emit('update:show', false)
			this.data = { ...data_default }
		},
		validatorRequired(val) { return validators.required(val) },
		validatorNumber(val) { return validators.number(val) },
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>

</style>
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
							:is-valid="validatorRequired('uraian', data.uraian_barang)"
							invalid-feedback="Uraian barang wajib diisi"
						/>
					</CCol>
				</CRow>
				<CRow v-if="bhp">
					<CCol>
						<CInput
							label="Merk"
							:value.sync="data.merk"
						/>
					</CCol>
				</CRow>
				<CRow v-if="bhp">
					<CCol>
						<CInput
							label="Kondisi"
							:value.sync="data.kondisi"
						/>
					</CCol>
				</CRow>
				<CRow v-if="bhp">
					<CCol>
						<CInput
							label="Tipe"
							:value.sync="data.tipe"
						/>
					</CCol>
				</CRow>
				<CRow v-if="bhp">
					<CCol>
						<CTextarea
							label="Spesifikasi Lain"
							:value.sync="data.spesifikasi_lain"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8">
						<CInput
							label="Jumlah"
							:value.sync="data.jumlah_barang"
							:is-valid="validatorNumber('jumlah', data.jumlah_barang, true)"
							invalid-feedback="Jumlah barang wajib diisi"
						/>
					</CCol>
					<CCol md="4">
						<MySelectSatuan
							ref="select_satuan"
							:id.sync="data.satuan.id"
							:is-valid.sync="validations.satuan_jumlah"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="8">
						<CInput
							label="Berat"
							append="KG"
							:value.sync="data.berat"
							:is-valid="validatorNumber('berat', data.berat)"
							invalid-feedback="Berat tidak valid"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol>
						<MySelectKategoriBarang
							ref="select_kategori"
							:id.sync="data.kategori.id"
						/>
					</CCol>
				</CRow>

				<!-- Upload image -->
				<MyUploadImage 
					v-if="render_image & with_photo"
					:images.sync="data.image_list"
				/>
			</CForm>

			<template #footer>
				<CButton
					class="mx-1"
					color="secondary"
					@click="closeModal()"
				>
					Kembali
				</CButton>
				<CButton
					class="mx-1"
					color="success"
					@click="saveData()"
				>
					Simpan
				</CButton>
			</template>
		</CModal>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import axios from "axios"

import api from '../../../router/api2'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectKategoriBarang from '../../components/SelectKategoriBarang.vue'
import MySelectSatuan from '../../components/SelectSatuan.vue'
import MyUploadImage from '../../components/UploadImage.vue'

const data_default = {
	uraian_barang: null,
	jumlah_barang: null,
	berat: null,
	merk: null,
	tipe: null,
	spesifikasi_lain: null,
	satuan: {id: null},
	kategori: {id: null},
	image_list: []
}

export default {
	name: 'FormItemBarang',
	components: {
		MyAlert,
		MySelectKategoriBarang,
		MySelectSatuan,
		MyUploadImage
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
		with_photo: Boolean,
		id: Number,
		doc_type: String,
		doc_id: Number,
		bhp: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		API_BARANG() { 
			let api = null
			if (!this.bhp) {
				api = process.env.VUE_APP_BASEAPI + '/' + this.doc_type + '/' + this.doc_id + '/barang/item'
			} else {
				api = process.env.VUE_APP_BASEAPI + '/' + this.doc_type + '/' + this.doc_id + '/bhp/item'
			}
			return api
		},
		API_BARANG_ID() { return this.API_BARANG + '/' + this.id },
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default)),
			render_image: false,
			validations: {
				uraian: false,
				jumlah: false,
				satuan_jumlah: false,
				berat: true,
			}
		}
	},
	computed: {
		allValid() {
			return validators.allValid(this.validations)
		}
	},
	methods: {
		async getData() {
			// if (this.state == 'edit') {
			// 	axios
			// 		.get(this.API_BARANG_ID)
			// 		.then(
			// 			(response) => {
			// 				this.data = response.data.data

			// 				if (this.data.kategori == null) {
			// 					this.data.kategori = {id: null}
			// 				}

			// 				this.$nextTick(function () {
			// 					this.$refs.select_satuan.getData(this.data.satuan.id)
			// 					this.$refs.select_kategori.value = this.data.kategori.id
			// 					this.render_image = true
			// 				})
			// 			}
			// 		)
			// 		.catch((error) => {console.error(error)})
			// } else {
			// 	this.$nextTick(function () {
			// 		this.render_image = true
			// 	})
			// }
			if (this.state == 'edit') {
				let response = await api.getItemBarang(this.doc_type, this.doc_id, this.id)
				console.log('FORM ITEM BARANG - GET DATA - RESPONSE', JSON.parse(JSON.stringify(response)))
				this.data = response.data
				console.log('FORM ITEM BARANG - GET DATA - DATA', JSON.parse(JSON.stringify(this.data)))
			}
		},
		async saveData() {
			if (this.allValid) {
				console.log('FORM ITEM BARANG - SAVE DATA - ALLVALID')
				// let submit_method
				// let submit_url
				// submit_method = this.state == 'insert' ? 'post' : 'put'
				// submit_url = this.state == 'insert' ? this.API_BARANG : this.API_BARANG_ID

				// axios({
				// 	method: submit_method,
				// 	url: submit_url,
				// 	data: this.data,
				// })
				// 	.then((response) => {
				// 		this.$emit('update:state', 'edit')
				// 		if (submit_method == 'post') {
				// 			this.$emit('update:id', response.data.data.id)
				// 		}
				// 		this.$emit('submit-data')
				// 		this.alert('Data item barang berhasil disimpan')
				// 	})
				// 	.catch((error) => (console.error(error)))	

				if (this.state == 'edit') {
					await api.updateItemBarang(this.data, this.doc_type, this.doc_id, this.id)
				} else {
					await api.saveItemBarang(this.data, this.doc_type, this.doc_id)
				}
				this.closeModal()
				this.$emit('save')
			} else {
				console.log('FORM ITEM BARANG - SAVE DATA - inVALID', JSON.parse(JSON.stringify(this.validations)))
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		closeModal() {
			this.$emit('update:show', false)
			this.data = JSON.parse(JSON.stringify(data_default))
		},
		validatorRequired(field, val) { 
			let validation = validators.required(val)
			this.validations[field] = validation
			return validation
		},
		validatorNumber(field, val, required=false) { 
			let validation = validators.number(val, required)
			this.validations[field] = validation
			return validation
		},
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>

</style>
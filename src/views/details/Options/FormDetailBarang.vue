<template>
	<div class="wrapper">
		<!-- Form input penindakan barang -->
		<CRow>
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="4">
							<CInput
								label="Jumlah kemasan"
								:value.sync="data.jumlah_kemasan"
								:is-valid="validatorInteger"
								invalid-feedback="Jumlah kemasan wajib diisi"
							/>
						</CCol>
						<CCol md="2">
							<CInput
								label="Satuan kemasan"
								:value.sync="data.satuan_kemasan"
								:is-valid="validatorRequired"
								invalid-feedback="Satuan kemasan wajib diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="2">
							<CInput
								label="Jenis dokumen"
								description="Jenis dokumen yang menyertai barang"
								:value.sync="data.dokumen.jns_dok"
							/>
						</CCol>
						<CCol md="4">
							<CInput
								label="Nomor dokumen"
								description="Nomor dokumen yang menyertai barang"
								:value.sync="data.dokumen.no_dok"
							/>
						</CCol>
						<CCol md="2">
							<div class="form-group">
								<label class="w-100">Tanggal dokumen</label>
								<date-picker 
									v-model="data.dokumen.tgl_dok" 
									format="DD-MM-YYYY" 
									value-type="format"
									type="date"
								></date-picker>
							</div>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectPemilik"
								label="Nama pemilik/importir/eksportir/kuasa"
								:id.sync="data.pemilik.id"
							>
							</MySelectEntitas>
						</CCol>
					</CRow>

					<!-- Button simpan -->
					<CRow>
						<CCol sm="12">
							<CButton
								color="success"
								@click="saveData()"
							>
								Simpan
							</CButton>
						</CCol>
					</CRow>
				</CForm>
			</CCol>
		</CRow>

		<MyTableItemBarang
			v-if="state == 'edit'"
			:doc_type="doc_type"
			:doc_id="doc_id"
			:detail.sync="data"
			state="insert"
			@submit-data="$emit('submit-data')"
		>
		</MyTableItemBarang>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MyTableItemBarang from './TableItemBarang.vue'
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'

const data_default = {
	jumlah_kemasan: null,
	satuan_kemasan: null,
	dokumen: {
		jns_dok: null,
		no_dok: null,
		tgl_dok: null
	},
	pemilik: {id: null},
}

export default {
	name: 'FormDetailBarang',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas,
		MyTableItemBarang,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default))
		}
	},
	methods: {
		async getData() {
			if (this.state == 'edit') {
				let detail_barang = await api.getDetailByDocId(this.doc_type, this.doc_id, 'barang')
				this.data = JSON.parse(JSON.stringify(detail_barang))
				this.$refs.selectPemilik.getEntitas(this.data.pemilik.id, true)
			}
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.insertDetail(this.doc_type, this.doc_id, 'barang', this.data)
					this.data = response.data.data
					if (this.data.dokumen == null) {
						this.data.dokumen = {
							jns_dok: null,
							no_dok: null,
							tgl_dok: null
						}
					}
					this.alert('Data barang berhasil disimpan')
					this.$emit('update:state', 'edit')
					this.$emit('submit-data')
				} catch (error) {
					console.log(error)
				}
			} else {
				api.updateDetail(this.doc_type, this.doc_id, 'barang', this.data.id, this.data)
				this.$emit('submit-data')
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorInteger(val) { return validators.integer(val) },
	},
	mounted() {
		console.log('form detail barang', this.doc_type, this.doc_id)
		this.getData()
	}
}
</script>

<style>

</style>
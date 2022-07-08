<template>
	<div class="wrapper my-form">
		<!-- Form input penindakan barang -->
		<CRow>
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="4">
							<CInput
								label="Jumlah kemasan"
								:value.sync="data_objek.jumlah_kemasan"
								:is-valid="validatorInteger"
								invalid-feedback="Jumlah kemasan wajib diisi"
							/>
						</CCol>
						<CCol md="2">
							<MySelectKemasan
								ref="selectKemasan"
								:id.sync="data_objek.kemasan.id"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="2">
							<CInput
								label="Jenis dokumen"
								description="Jenis dokumen yang menyertai barang"
								:value.sync="data_objek.dokumen.jns_dok"
							/>
						</CCol>
						<CCol md="4">
							<CInput
								label="Nomor dokumen"
								description="Nomor dokumen yang menyertai barang"
								:value.sync="data_objek.dokumen.no_dok"
							/>
						</CCol>
						<CCol md="2">
							<div class="form-group">
								<label class="w-100">Tanggal dokumen</label>
								<date-picker 
									v-model="data_objek.dokumen.tgl_dok" 
									format="DD-MM-YYYY" 
									value-type="format"
									type="date"
								/>
							</div>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectPemilik"
								label="Nama pemilik/importir/eksportir/kuasa"
								:id.sync="data_objek.pemilik.id"
							/>
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
			:data_objek.sync="data_objek"
			state="insert"
			@submit-data="$emit('submit-data')"
		/>

		<!-- Alert -->
		<MyAlert ref="alert"/>
	</div>
</template>

<script>
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectKemasan from '../../components/SelectKemasan.vue'
import MyTableItemBarang from './TableItemBarang.vue'

const data_default = {
	jumlah_kemasan: null,
	kemasan: {id: null},
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
		MySelectKemasan,
		MyTableItemBarang,
	},
	props: {
		doc_type: String,
		doc_id: Number,
		data: Object
	},
	data() {
		return {
			state: 'insert',
			data_objek: JSON.parse(JSON.stringify(data_default))
		}
	},
	watch: {
		data: {
			handler: function(val) {
				this.parseData(val.data)
			}
		}
	},
	methods: {
		async getSaksiId() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			return response.data.data.penindakan.saksi.id
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.insertDetail(this.doc_type, this.doc_id, 'barang', this.data_objek)
					this.state = 'edit'
					this.$emit('update:data', response.data)
					this.alert('Data barang berhasil disimpan')
				} catch (error) {
					console.log(error)
				}
			} else {
				let response = await api.updateDetail(this.doc_type, this.doc_id, 'barang', this.data_objek.id, this.data_objek)
				this.$refs.selectPemilik.getEntitas(this.data_objek.pemilik.id, true)
				this.$emit('update:data', response.data)
				this.alert('Data barang berhasil diubah')
			}
		},
		parseData(objek) {
			if (objek.kemasan == null) {
				objek.kemasan = {id: null}
			}
			if (objek.dokumen == null) {
				objek.dokumen = {
					jns_dok: null,
					no_dok: null,
					tgl_dok: null
				}
			}
			if (objek.pemilik == null) {
				objek.pemilik = {id: null}
			}
			
			this.data_objek = objek
			this.$refs.selectPemilik.getEntitas(this.data_objek.pemilik.id, true)
			this.$refs.selectKemasan.getData(this.data_objek.kemasan.id)
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorInteger(val) { return validators.integer(val) },
	},
	async mounted() {
		if (this.data.type == 'barang') {
			if (this.data.data != null) {
				this.parseData(this.data.data)
				this.state = 'edit'
			} else {
				this.data_objek = JSON.parse(JSON.stringify(data_default))
				this.state = 'insert'
			}	
		} else {
			let saksi_id = await this.getSaksiId()
			this.data_objek = JSON.parse(JSON.stringify(data_default))
			this.data_objek.pemilik.id = saksi_id
			this.$refs.selectPemilik.getEntitas(this.data_objek.pemilik.id, true)
			this.state = 'insert'
		}
	}
}
</script>

<style>
</style>
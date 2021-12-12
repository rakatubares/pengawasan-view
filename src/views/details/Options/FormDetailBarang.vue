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
								:value.sync="data_objek.jumlah_kemasan"
								:is-valid="validatorInteger"
								invalid-feedback="Jumlah kemasan wajib diisi"
							/>
						</CCol>
						<CCol md="2">
							<CInput
								label="Satuan kemasan"
								:value.sync="data_objek.satuan_kemasan"
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
								></date-picker>
							</div>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectPemilik"
								label="Nama pemilik/importir/eksportir/kuasa"
								:id.sync="data_objek.pemilik.id"
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
			:doc_type="data.main.type"
			:doc_id="data.main.data.id"
			:detail.sync="data_objek"
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

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MyTableItemBarang from './TableItemBarang.vue'

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
				this.parseData(val.objek.data)
			}
		}
	},
	methods: {
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.insertDetail(this.data.main.type, this.data.main.data.id, 'barang', this.data_objek)
					this.parseData(response.data.data)
					this.state = 'edit'
					this.$emit('submit-data')
					this.alert('Data barang berhasil disimpan')
				} catch (error) {
					console.log(error)
				}
			} else {
				api.updateDetail(this.data.main.type, this.data.main.data.id, 'barang', this.data_objek.id, this.data_objek)
				this.$emit('submit-data')
				this.alert('Data barang berhasil diubah')
			}
		},
		parseData(objek) {
			if (objek.dokumen == null) {
				objek.dokumen = {
					jns_dok: null,
					no_dok: null,
					tgl_dok: null
				}
			}
			this.data_objek = objek
			this.$refs.selectPemilik.getEntitas(this.data_objek.pemilik.id, true)
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorInteger(val) { return validators.integer(val) },
	},
	mounted() {
		if (this.data.objek.type == 'barang') {
			if (this.data.objek.data != null) {
				this.parseData(this.data.objek.data)
				this.state = 'edit'
			} else {
				this.data_objek = JSON.parse(JSON.stringify(data_default))
				this.state = 'insert'
			}	
		} else {
			this.data_objek = JSON.parse(JSON.stringify(data_default))
			this.state = 'insert'
		}
	}
}
</script>

<style>

</style>
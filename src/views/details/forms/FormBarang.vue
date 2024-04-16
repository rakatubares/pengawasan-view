<template>
	<div class="wrapper my-form">
		<!-- Form input penindakan barang -->
		<CRow class="mx-2 mt-2">
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol class="col-3" md="1">
							<CSwitch 
								class="mx-1" 
								color="success" 
								variant="3d" 
								v-bind="labelIcon" 
								:checked.sync="flag_barang"
							/>
						</CCol>
						<CCol class="col-9" md="6">
							<h5>Penindakan atas barang</h5>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="3" sm="12">
							<CInput
								label="Jumlah kemasan"
								:disabled="!flag_barang"
								:value.sync="objek.jumlah_kemasan"
								:is-valid="validatorInteger"
								invalid-feedback="Jumlah kemasan wajib diisi"
							/>
						</CCol>
						<CCol md="3" sm="12">
							<MySelectKemasan
								ref="selectKemasan"
								:disabled="!flag_barang"
								:id.sync="objek.kemasan.id"
							/>
						</CCol>
						<CCol md="6" sm="12">
							<CInput
								label="Nomor kemasan"
								:disabled="!flag_barang"
								:value.sync="objek.nomor_kemasan"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="2">
							<CInput
								label="Jenis dokumen"
								description="Jenis dokumen yang menyertai barang"
								:disabled="!flag_barang"
								:value.sync="objek.jenis_dokumen"
							/>
						</CCol>
						<CCol md="4">
							<CInput
								label="Nomor dokumen"
								description="Nomor dokumen yang menyertai barang"
								:disabled="!flag_barang"
								:value.sync="objek.nomor_dokumen"
							/>
						</CCol>
						<CCol md="2">
							<div class="form-group">
								<label class="w-100">Tanggal dokumen</label>
								<date-picker 
									v-model="objek.tanggal_dokumen" 
									format="DD-MM-YYYY" 
									value-type="format"
									type="date"
									:disabled="!flag_barang"
								>
									<template v-slot:input="slotProps">
										<input
											class="form-control" 
											type="text" 
											v-bind="slotProps.props" 
											v-on="slotProps.events"
										/>
									</template>
									<i slot="icon-calendar"></i>
									<i slot="icon-clear"></i>
								</date-picker>
							</div>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitasOrang
								ref="selectPemilik"
								label="Nama pemilik/importir/eksportir/kuasa"
								:entity_id.sync="objek.pemilik.id"
								:disabled="!flag_barang"
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
			doc_type="penindakan-barang"
			:doc_id.sync="objek.id"
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
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectKemasan from '../../components/SelectKemasan.vue'
import MyTableItemBarang from '../../components/barang/TableItemBarang.vue'

const default_data = {
	jumlah_kemasan: null,
	kemasan: {id: null},
	nomor_kemasan: null,
	jenis_dokumen: null,
	nomor_dokumen: null,
	tanggal_dokumen: null,
	pemilik: {id: null},
}

export default {
	name: 'FormDetailBarang',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitasOrang,
		MySelectKemasan,
		MyTableItemBarang,
	},
	props: {
		penindakan: Object,
	},
	data() {
		return {
			state: 'insert',
			flag_barang: false,
			objek: JSON.parse(JSON.stringify(default_data)),
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
			tanggal_dokumen: null,
		}
	},
	computed: {
		penindakan_id() {
			return this.penindakan.id
		},
	},
	methods: {
		async saveData() {
			if (this.state == 'insert') {
				try {
					let data = this.objek
					data['flag_barang'] = this.flag_barang
					let response = await api.savePenindakanBarang(data, this.penindakan_id)
					this.updateDataObjek(response)
					this.alert('Data barang berhasil disimpan')
				} catch (error) {
					console.log(error)
				}
			} else {
				let data = this.objek
				data['flag_barang'] = this.flag_barang
				let response = await api.updatePenindakanBarang(data, this.penindakan_id)
				this.updateDataObjek(response)
				this.alert('Data barang berhasil diubah')
			}
		},
		fillNull() {
			if (this.objek.kemasan == null) {
				this.objek.kemasan = JSON.parse(JSON.stringify(default_data.kemasan))
			}

			if (this.objek.pemilik == null) {
				this.objek.pemilik = JSON.parse(JSON.stringify(default_data.pemilik))
			}
		},
		updateDataObjek(response) {
			if (response != '') {
				this.state = 'edit'
				this.flag_barang = true
				this.objek = response.data
				let penindakan = this.penindakan
				penindakan.objek.barang = response.data
				this.$emit('update:penindakan', penindakan)
			} else {
				this.state = 'insert'
				this.flag_barang = false
				this.objek = JSON.parse(JSON.stringify(default_data))
				let penindakan = this.penindakan
				delete penindakan.objek.barang
				this.$emit('update:penindakan', penindakan)
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { 
			let validity = false
			if (this.flag_barang) {
				validity = validators.required(val)
			} else {
				validity = true
			}
			return validity
		},
		validatorInteger(val) { 
			let validity = false
			if (this.flag_barang) {
				validity = validators.integer(val)
			} else {
				validity = true
			}
			return validity
		},
	},
	beforeMount() {
		if (this.penindakan.objek.barang) {
			this.state = 'edit'
			this.flag_barang = true
			this.objek = JSON.parse(JSON.stringify(this.penindakan.objek.barang))
			this.fillNull()
		} else {
			this.state = 'insert'
			this.flag_barang = false
			this.objek = JSON.parse(JSON.stringify(default_data))
			this.objek.pemilik = {id: this.penindakan.saksi.id}
		}
	},
}
</script>

<style>
</style>
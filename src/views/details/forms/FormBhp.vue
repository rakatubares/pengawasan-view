<template>
	<div class="wrapper my-form">
		<!-- Form input BHP -->
		<CRow class="mx-2 mt-2">
			<CCol col="12">
				<CForm>
					<CRow>
						<CCol md="4">
							<CInput
								label="Jumlah kemasan"
								:value.sync="bhp.jumlah_kemasan"
								:is-valid="validatorInteger"
								invalid-feedback="Jumlah kemasan wajib diisi"
							/>
						</CCol>
						<CCol md="2">
							<MySelectKemasan
								ref="selectKemasan"
								:id.sync="bhp.kemasan.id"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="2">
							<CInput
								label="Jenis dokumen"
								description="Jenis dokumen yang menyertai barang"
								:value.sync="bhp.jenis_dokumen"
							/>
						</CCol>
						<CCol md="4">
							<CInput
								label="Nomor dokumen"
								description="Nomor dokumen yang menyertai barang"
								:value.sync="bhp.nomor_dokumen"
							/>
						</CCol>
						<CCol md="2">
							<div class="form-group">
								<label class="w-100">Tanggal dokumen</label>
								<date-picker 
									v-model="bhp.tanggal_dokumen" 
									format="DD-MM-YYYY" 
									value-type="format"
									type="date"
								/>
							</div>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="8" sm="12">
							<CInput
								label="Nama sarana pengangkut"
								:value.sync="bhp.nama_sarkut"
							/>
						</CCol>
						<CCol md="4" sm="12">
							<CInput
								label="Jenis sarana pengangkut"
								:value.sync="bhp.jenis_sarkut"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="6" sm="12">
							<CInput
								label="Nomor voyage/penerbangan/trayek"
								:value.sync="bhp.nomor_sarkut"
							/>
						</CCol>
						<CCol md="6" sm="12">
							<CInput
								label="Nomor registrasi/polisi"
								:value.sync="bhp.registrasi_sarkut"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="6" sm="12">
							<CInput
								label="No. kontainer"
								:value.sync="bhp.nomor_kontainer"
							/>
						</CCol>
						<CCol md="6" sm="12">
							<CInput
								label="Ukuran kontainer"
								:value.sync="bhp.ukuran_kontainer"
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
			doc_type="penyidikan-bhp"
			:doc_id="bhp.id"
			state="insert"
			@submit-data="$emit('submit-data')"
		/>

		<!-- Alert -->
		<MyAlert ref="alert"/>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectKemasan from '../../components/SelectKemasan.vue'
import MyTableItemBarang from '../../components/barang/TableItemBarang.vue'

const data_default = {
	jumlah_kemasan: null,
	kemasan: {id: null},
	nomor_kemasan: null,
	jenis_dokumen: null,
	nomor_dokumen: null,
	tanggal_dokumen: null,
	nama_sarkut: null,
	jenis_sarkut: null,
	nomor_sarkut: null,
	registrasi_sarkut: null,
	nomor_kontainer: null,
	ukuran_kontainer: null,
}

export default {
	name: 'FormBhp',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitasOrang,
		MySelectKemasan,
		MyTableItemBarang,
	},
	props: {
		bhp: {
			type: Object,
			default() { return JSON.parse(JSON.stringify(data_default)) },
		}
	},
	data() {
		return {
			state: 'insert',
		}
	},
	methods: {
		async saveData() {
			let response = await api.updateBhp(this.bhp, this.bhp.id)
			this.$emit('update:bhp', response.data)
			this.alert('Data BHP berhasil diubah')
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorInteger(val) { return validators.integer(val) },
	},
}
</script>

<style>

</style>
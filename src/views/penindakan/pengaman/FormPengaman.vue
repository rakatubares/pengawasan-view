<template>
	<div class="wrapper my-form">
		<!-- Form BA Tanda Pengaman header -->
		<CForm class="pt-3">
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tanggal Pengamanan</label>
				<CCol md="3" sm="12">
					<div class="form-group">
						<date-picker 
							v-model="data.penindakan.tanggal_selesai_penindakan"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
							class="w-100"
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
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.penindakan.sprint.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Jenis Tanda Pengaman"
						description="Jenis tanda pengaman yang digunakan"
						:options="['Kertas', 'Kunci', 'Timah', 'Lak', 'Segel Elektronik', 'Lainnya']"
						:value.sync="data.jenis_pengaman"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Jumlah Tanda Pengaman"
						description="Jumlah tanda pengaman yang digunakan"
						:value.sync="data.jumlah_pengaman"
						:is-valid="validatorNumber"
						invalid-feedback="Jumlah tanda pengaman wajib diisi"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Satuan"
						:value.sync="data.satuan_pengaman"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Tempat Tanda Pengaman"
						description="Bagian / lokasi tempat tanda pengaman ditempatkan / dilekatkan"
						:value.sync="data.tempat_pengaman"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<MyComboboxLokasi
						label="Lokasi Pengamanan"
						description="Tempat / lokasi dilakukan pengamanan"
						:value.sync="data.penindakan.lokasi_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Alasan Pengaman"
						description="Alasan dilakukan pengamanan"
						:value.sync="data.alasan_pengamanan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Keterangan"
						:value.sync="data.keterangan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitasOrang
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama lengkap pengangkut / kuasa barang / sarana pengangkut atau pemilik / yang menguasai bangunan atau tempat lain yang menyaksikan pelekatan"
						:entity_id.sync="data.penindakan.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 1"
						description="Nama Petugas Bea dan Cukai yang melakukan pelekatan tanda pengaman"
						:nip.sync="data.penindakan.petugas.petugas1.nip"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 2"
						description="Nama Petugas Bea dan Cukai yang melakukan pelekatan tanda pengaman"
						:nip.sync="data.penindakan.petugas.petugas2.nip"
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
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyComboboxLokasi from '../../components/ComboboxLokasi.vue'
import MySelectEntitasOrang from '../../components/SelectEntitasOrang.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

export default {
	name: 'FormPengaman',
	components: {
		DatePicker,
		MyComboboxLokasi,
		MySelectEntitasOrang,
		MySelectPetugas,
		MySelectSprint
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			selected_sprint: null,
		}
	},
	watch: {
		document(val) {
			this.data = val
		},
		selected_sprint(val) {
			this.data.penindakan.sprint.id = val
		},
	},
	methods: {
		async saveData() {
			if (this.state == 'insert') {
				var data = await api.storeDoc(this.doc_type, this.data)
				this.$emit('update:state', 'edit')
			} else if (this.state == 'edit') {
				var data = await api.updateDoc(this.doc_type, this.data.id, this.data)
			}
			this.$emit('save-data', data)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorNumber(val) { return validators.number(val) },
	},
}
</script>

<style>

</style>
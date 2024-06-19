<template>
	<div class="wrapper my-form">
		<!-- Form input penindakan badan -->
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
								:checked.sync="flag_badan"
							/>
						</CCol>
						<CCol class="col-9" md="6">
							<h5>Penindakan atas badan</h5>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitasOrang
								:state.sync="state"
								label="Nama orang yang ditindak"
								:entity_id.sync="objek.entitas.id"
								:disabled="!flag_badan"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<CTextarea
								label="Datang dari"
								description="Tempat asal perjalanan"
								:disabled="!flag_badan"
								:value.sync="objek.asal"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<CTextarea
								label="Tempat tujuan"
								description="Tempat tujuan perjalanan"
								:disabled="!flag_badan"
								:value.sync="objek.tujuan"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitasOrang
								:state.sync="state"
								label="Nama orang yang bepergian bersama"
								:entity_id.sync="objek.pendamping.id"
								:disabled="!flag_badan"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="8" sm="12">
							<CInput
								label="Nama sarana pengangkut"
								:disabled="!flag_badan"
								:value.sync="objek.nama_sarkut"
							/>
						</CCol>
						<CCol md="4" sm="12">
							<CInput
								label="Jenis sarana pengangkut"
								:disabled="!flag_badan"
								:value.sync="objek.jenis_sarkut"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<CInput
								label="Nomor voyage/penerbangan/trayek"
								:disabled="!flag_badan"
								:value.sync="objek.nomor_sarkut"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="6" sm="12">
							<MySelectNegara
								:state.sync="state"
								ref="SelectNegara"
								label="Bendera sarkut"
								:value.sync="objek.bendera.kode_2"
								:disabled="!flag_badan"
							/>
						</CCol>
						<CCol md="6" sm="12">
							<CInput
								label="Nomor registrasi/polisi"
								:disabled="!flag_badan"
								:value.sync="objek.registrasi_sarkut"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitasOrang
								:state.sync="state"
								label="Nama nahkoda/pengemudi/pilot"
								:entity_id.sync="objek.pengemudi.id"
								:disabled="!flag_badan"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="2" sm="12">
							<CInput
								label="Jenis Dokumen Pabean"
								:disabled="!flag_badan"
								:value.sync="objek.jenis_dokumen"
							/>
						</CCol>
						<CCol md="6" sm="12">
							<CInput
								label="Nomor Dokumen"
								:disabled="!flag_badan"
								:value.sync="objek.nomor_dokumen"
							/>
						</CCol>
						<CCol md="2" sm="12">
							<div class="form-group">
								<label class="w-100">Tanggal Dokumen</label>
								<date-picker 
									v-model="objek.tanggal_dokumen"
									format="DD-MM-YYYY" 
									value-type="format"
									type="date"
									class="w-100"
									:disabled="!flag_badan"
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
							<CTextarea
								label="Uraian pemeriksaan"
								description="Uraian pakaian yang dibuka / pemeriksaan medis yang dilakukan terhadap orang yang dilakukan pemeriksaan badan"
								:disabled="!flag_badan"
								:value.sync="objek.uraian_pemeriksaan"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<CTextarea
								label="Hasil pemeriksaan"
								description="Hasi1 pemeriksaan badan"
								:disabled="!flag_badan"
								:value.sync="objek.hasil_pemeriksaan"
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
import MySelectNegara from '../../components/SelectNegara.vue'

const default_data = {
	entitas: {id: null},
	asal: null,
	tujuan: null,
	pendamping: {id: null},
	nama_sarkut: null,
	jenis_sarkut: null,
	nomor_sarkut: null,
	pengemudi: {id: null},
	bendera: {kode_2: null},
	registrasi_sarkut: null,
	jenis_dokumen: null,
	nomor_dokumen: null,
	tanggal_dokumen: null,
	uraian_pemeriksaan: null,
	hasil_pemeriksaan: null,
}

export default {
	name: 'FormBadan',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitasOrang,
		MySelectNegara,
	},
	props: {
		penindakan: Object
	},
	data() {
		return {
			state: 'insert',
			flag_badan: false,
			objek: JSON.parse(JSON.stringify(default_data)),
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
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
					data['flag_badan'] = this.flag_badan
					let response = await api.savePenindakanBadan(data, this.penindakan_id)
					this.updateDataObjek(response)
					this.alert('Data badan berhasil disimpan')
				} catch (error) {
					console.log(error)
				}
			} else {
				let data = this.objek
				data['flag_badan'] = this.flag_badan
				let response = await api.updatePenindakanBadan(data, this.penindakan_id)
				this.updateDataObjek(response)
				this.alert('Data badan berhasil diubah')
			}
		},
		fillNull() {
			if (this.objek.entitas == null) {
				this.objek.entitas = JSON.parse(JSON.stringify(default_data.entitas))
			}

			if (this.objek.pendamping == null) {
				this.objek.pendamping = JSON.parse(JSON.stringify(default_data.pendamping))
			}

			if (this.objek.pengemudi == null) {
				this.objek.pengemudi = JSON.parse(JSON.stringify(default_data.pengemudi))
			}

			if (this.objek.bendera == null) {
				this.objek.bendera = JSON.parse(JSON.stringify(default_data.bendera))
			}
		},
		updateDataObjek(response) {
			if (response != '') {
				this.state = 'edit'
				this.flag_badan = true
				this.objek = response.data
				this.fillNull()
				let penindakan = this.penindakan
				penindakan.objek.badan = this.objek
				this.$emit('update:penindakan', penindakan)
			} else {
				this.state = 'insert'
				this.flag_badan = false
				this.objek = JSON.parse(JSON.stringify(default_data))
				let penindakan = this.penindakan
				delete penindakan.objek.badan
				this.$emit('update:penindakan', penindakan)
			}
		},
		alert(text) {
			this.$refs.alert.show_alert(text)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	beforeMount() {
		if (this.penindakan.objek.badan) {
			this.state = 'edit'
			this.flag_badan = true
			this.objek = JSON.parse(JSON.stringify(this.penindakan.objek.badan))
			this.fillNull()
		} else {
			this.state = 'insert'
			this.flag_badan = false
			this.objek = JSON.parse(JSON.stringify(default_data))
			this.objek.entitas = {id: this.penindakan.saksi.id}
		}
	}
}
</script>

<style>

</style>
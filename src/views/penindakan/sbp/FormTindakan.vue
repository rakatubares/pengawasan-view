<template>
	<div class="wrapper sep mt-4 pt-2">
		<CForm>
			<CRow>
				<CCol sm="12">
					<h4>Tindakan yang Dilakukan</h4>
				</CCol>
			</CRow>

			<!-- Toggle Pemeriksaan -->
			<CRow v-if="data_tindakan.show.riksa">
				<CCol class="col-3" md="1">
					<CSwitch 
						class="mx-1" 
						color="success" 
						variant="3d" 
						v-bind="labelIcon" 
						:checked.sync="data_tindakan.data.riksa"
					/>
				</CCol>
				<CCol class="col-9" md="11">
					Pemeriksaan
				</CCol>
			</CRow>

			<!-- Toggle Penegahan -->
			<CRow v-if="data_tindakan.show.tegah">
				<CCol class="col-3" md="1">
					<CSwitch 
						class="mx-1" 
						color="success" 
						variant="3d" 
						v-bind="labelIcon" 
						:checked.sync="data_tindakan.data.tegah"
					/>
				</CCol>
				<CCol class="col-9" md="11">
					Penegahan
				</CCol>
			</CRow>

			<!-- Toggle Penyegelan -->
			<CRow v-if="data_tindakan.show.segel">
				<CCol class="col-3" md="1">
					<CSwitch 
						class="mx-1" 
						color="success" 
						variant="3d" 
						v-bind="labelIcon" 
						:checked.sync="data_tindakan.data.segel"
					/>
				</CCol>
				<CCol class="col-9" md="2">
					Penyegelan
				</CCol>
			</CRow>
			<CRow v-if="data_tindakan.data.segel">
				<CCol class="col-12">
					<CRow>
						<CCol class="col-12" md="3">
							<CSelect
								label="Jenis Segel"
								:options="['Kertas', 'Kunci', 'Timah', 'Lakban', 'Segel Elektronik', 'Lainnya']"
								:value.sync="data_tindakan.data.data_segel.jenis"
							/>	
						</CCol>
						<CCol class="col-12" md="2">
							<CInput
								label="Jumlah Segel"
								:value.sync="data_tindakan.data.data_segel.jumlah"
							/>	
						</CCol>
						<CCol class="col-12" md="3">
							<CInput
								label="Satuan"
								:value.sync="data_tindakan.data.data_segel.satuan"
							/>	
						</CCol>
					</CRow>
					<CRow>
						<CCol class="col-12">
							<CInput
								label="Tempat Segel"
								:value.sync="data_tindakan.data.data_segel.tempat"
							/>	
						</CCol>
					</CRow>
				</CCol>
			</CRow>

			<!-- Toggle Pemeriksaan Badan -->
			<CRow v-if="data_tindakan.show.riksa_badan">
				<CCol class="col-3" md="1">
					<CSwitch 
						class="mx-1" 
						color="success" 
						variant="3d" 
						v-bind="labelIcon" 
						:checked.sync="data_tindakan.data.riksa_badan"
					/>
				</CCol>
				<CCol class="col-9" md="2">
					Pemeriksaan Badan
				</CCol>
			</CRow>
			<CRow v-if="data_tindakan.data.riksa_badan">
				<CCol class="col-12 form-riksa-badan">
					<CRow>
						<CCol sm="12">
							<CInput
								label="Datang dari"
								description="Tempat asal perjalanan orang yg diperiksa"
								:value.sync="data_tindakan.data.data_riksa_badan.asal"
								:is-valid="validatorRequired"
								invalid-feedback="Asal perjalanan harus diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol sm="12">
							<CInput
								label="Tempat tujuan"
								description="Tempat tujuan perjalanan orang yang diperiksa"
								:value.sync="data_tindakan.data.data_riksa_badan.tujuan"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectPendamping"
								label="Nama orang yang bepergian bersama"
								description="Nama orang yang ikut bepergian dengan orang yang diperiksa"
								:id.sync="data_tindakan.data.data_riksa_badan.pendamping.id"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="8" sm="12">
							<CInput
								class="without-valid"
								label="Nama sarana pengangkut"
								description="Nama sarana pengangkut orang yang diperiksa"
								:value.sync="data_tindakan.data.data_riksa_badan.sarkut.nama_sarkut"
								:is-valid="validatorRequiredLinked(
									data_tindakan.data.data_riksa_badan.sarkut.nama_sarkut, 
									data_tindakan.data.data_riksa_badan.sarkut.jenis_sarkut
								)"
								invalid-feedback="Nama sarkut wajib diisi"
							/>
						</CCol>
						<CCol md="4" sm="12">
							<CInput
								class="without-valid"
								label="Jenis sarana pengangkut"
								:value.sync="data_tindakan.data.data_riksa_badan.sarkut.jenis_sarkut"
								:is-valid="validatorRequiredLinked(
									data_tindakan.data.data_riksa_badan.sarkut.jenis_sarkut, 
									data_tindakan.data.data_riksa_badan.sarkut.nama_sarkut
								)"
								invalid-feedback="Jenis sarkut wajib diisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="4" sm="12">
							<CInput
								label="Nomor voyage/penerbangan/trayek"
								:value.sync="data_tindakan.data.data_riksa_badan.sarkut.no_flight_trayek"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="3" sm="12">
							<CInput
								label="Bendera"
								:value.sync="data_tindakan.data.data_riksa_badan.sarkut.bendera"
							/>
						</CCol>
						<CCol md="3" sm="12">
							<CInput
								label="Nomor registrasi/polisi"
								:value.sync="data_tindakan.data.data_riksa_badan.sarkut.no_reg_polisi"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="12">
							<MySelectEntitas
								ref="selectPilot"
								label="Nama nahkoda/pengemudi/pilot"
								:id.sync="data_tindakan.data.data_riksa_badan.sarkut.pilot.id"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol md="2">
							<CInput
								label="Jenis dokumen"
								description="Jenis dokumen barang yang dibawa"
								:value.sync="data_tindakan.data.data_riksa_badan.dokumen.jns_dok"
							/>
						</CCol>
						<CCol md="4">
							<CInput
								label="Nomor dokumen"
								description="Nomor dokumen barang yang dibawa ornag yang diperiksa"
								:value.sync="data_tindakan.data.data_riksa_badan.dokumen.no_dok"
							/>
						</CCol>
						<CCol md="2">
							<div class="form-group">
								<label class="w-100">Tanggal dokumen</label>
								<date-picker 
									v-model="data_tindakan.data.data_riksa_badan.dokumen.tgl_dok" 
									format="DD-MM-YYYY" 
									value-type="format"
									type="date"
								></date-picker>
							</div>
						</CCol>
					</CRow>
					<CRow>
						<CCol sm="12">
							<CTextarea
								label="Uraian pemeriksaan"
								description="Uraian pakaian yang dibuka / pemeriksaan medis yang dilakukan terhadap orang yang dilakukan pemeriksaan badan"
								:value.sync="data_tindakan.data.data_riksa_badan.uraian_pemeriksaan"
							/>
						</CCol>
					</CRow>
					<CRow>
						<CCol sm="12">
							<CTextarea
								label="Hasil pemeriksaan"
								description="Hasil pemeriksaan badan"
								:value.sync="data_tindakan.data.data_riksa_badan.hasil_pemeriksaan"
								:is-valid="validatorRequired"
								invalid-feedback="Hasil pemeriksaan wajib diisi"
							/>
						</CCol>
					</CRow>
				</CCol>
			</CRow>

			<!-- Button simpan -->
			<CRow>
				<CCol sm="12">
					<CButton
						color="success"
						@click="saveLinkedDoc()"
					>
						Simpan
					</CButton>
				</CCol>
			</CRow>
		</CForm>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'

const default_data = {
	show: {
		riksa: false,
		tegah: false,
		segel: false,
		riksa_badan: false,
	},
	data: {
		riksa: false,
		tegah: false,
		segel: false,
		data_segel: {
			jenis: 'kertas',
			jumlah: null,
			satuan: null,
			tempat: null
		},
		riksa_badan: false,
		data_riksa_badan: {
			asal: null,
			tujuan: null,
			pendamping: {id: null},
			sarkut: {
				id: null,
				nama_sarkut: null,
				jenis_sarkut: null,
				no_flight_trayek: null,
				pilot: {id: null},
				bendera: null,
				no_reg_polisi: null,
			},
			dokumen: {
				id: null,
				jns_dok: null,
				no_dok: null,
				tgl_dok: null,
			},
			uraian_pemeriksaan: null,
			hasil_pemeriksaan: null,
		}
	}
}

export default {
	name: "FormTindakan",
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas,
	},
	props: {
		active_details: String,
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_tindakan: JSON.parse(JSON.stringify(default_data)),
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
		}
	},
	watch: {
		active_details: {
			handler: function (val) {
				switch (val) {
					case 'sarkut':
						this.data_tindakan.show.riksa = true
						this.data_tindakan.show.tegah = true
						this.data_tindakan.show.segel = true
						this.data_tindakan.show.riksa_badan = false
						this.data_tindakan.data.riksa_badan = false
						break;

					case 'barang':
						this.data_tindakan.show.riksa = true
						this.data_tindakan.show.tegah = true
						this.data_tindakan.show.segel = true
						this.data_tindakan.show.riksa_badan = false
						this.data_tindakan.data.riksa_badan = false
						break;

					case 'bangunan':
						this.data_tindakan.show.riksa = true
						this.data_tindakan.show.tegah = false
						this.data_tindakan.show.segel = true
						this.data_tindakan.show.riksa_badan = false
						this.data_tindakan.data.tegah = false
						this.data_tindakan.data.riksa_badan = false
						break;

					case 'orang':
						this.data_tindakan.show.riksa = false
						this.data_tindakan.show.tegah = false
						this.data_tindakan.show.segel = false
						this.data_tindakan.show.riksa_badan = true
						this.data_tindakan.data.riksa = false
						this.data_tindakan.data.tegah = false
						this.data_tindakan.data.segel = false
						break;
				
					default:
						this.data_tindakan = JSON.parse(JSON.stringify(default_data))
						break;
				}
			},
			immediate: true
		}
	},
	methods: {
		async getData() {
			let docs = await api.getLinkedDoc(this.doc_type, this.doc_id)
			this.renderData(docs)
		},
		async saveLinkedDoc() {
			let docs = await api.storeLinkedDoc(this.doc_type, this.doc_id, this.data_tindakan.data)
			this.renderData(docs)
			this.alert('Data tindakan berhasil disimpan')
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		renderData(docs) {
			let linked_docs = docs.data.data

			if ('riksa' in linked_docs) {
				this.data_tindakan.data.riksa = true
			} else {
				this.data_tindakan.data.riksa = false
			}

			if ('tegah' in linked_docs) {
				this.data_tindakan.data.tegah = true
			} else {
				this.data_tindakan.data.tegah = false
			}

			if ('segel' in linked_docs) {
				this.data_tindakan.data.segel = true
				this.data_tindakan.data.data_segel = JSON.parse(JSON.stringify(linked_docs.data_segel))
			} else {
				this.data_tindakan.data.segel = false
				this.data_tindakan.data.data_segel = JSON.parse(JSON.stringify(default_data.data.data_segel))
			}

			if ('riksabadan' in linked_docs) {
				this.data_tindakan.data.riksa_badan = true
				let data_riksa_badan = JSON.parse(JSON.stringify(linked_docs.riksabadan))
				
				// Fill default data if empty
				if (data_riksa_badan.sarkut == null) {
					data_riksa_badan.sarkut = JSON.parse(JSON.stringify(default_data.data.data_riksa_badan.sarkut))
				}
				if (data_riksa_badan.dokumen == null) {
					data_riksa_badan.dokumen = JSON.parse(JSON.stringify(default_data.data.data_riksa_badan.dokumen))
				}
				if (data_riksa_badan.pendamping == null) {
					data_riksa_badan.pendamping = JSON.parse(JSON.stringify(default_data.data.data_riksa_badan.pendamping))
				}
				this.data_tindakan.data.data_riksa_badan = data_riksa_badan
				
				// Display entitas data
				this.$nextTick(function () {
					this.$refs.selectPendamping.getEntitas(this.data_tindakan.data.data_riksa_badan.pendamping.id, true)
					this.$refs.selectPilot.getEntitas(this.data_tindakan.data.data_riksa_badan.sarkut.pilot.id, true)
				})
			} else {
				this.data_tindakan.data.riksa_badan = false
				this.data_tindakan.data.data_riksa_badan = JSON.parse(JSON.stringify(default_data.data.data_riksa_badan))
			}
		},
		validatorRequired(val) { return validators.required(val) },
		validatorRequiredLinked(val, linkedVal) { return validators.requiredLinked(val, linkedVal) },
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
div.sep {
	border-top: 1px solid;
	border-color: #d8dbe0;
}

.form-riksa-badan .row+.row {
	margin-top:0;
}
.form-riksa-badan .v-text-field__details {
	display: none;
}
.form-riksa-badan .without-valid .is-valid {
	border-color: #d8dbe0;
	background-image: none;
}
</style>
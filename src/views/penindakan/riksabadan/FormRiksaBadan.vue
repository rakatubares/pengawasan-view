<template>
	<div class="wrapper form-riksa-badan">
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.penindakan.sprint.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectOrang"
						label="Nama orang yang diperiksa"
						description="Nama orang yang terhadapnya dilakukan pemeriksaan badan"
						:id.sync="data.orang.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Datang dari"
						description="Tempat asal perjalanan orang yg diperiksa"
						:value.sync="data.asal"
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
						:value.sync="data.tujuan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectPendamping"
						label="Nama orang yang bepergian bersama"
						description="Nama orang yang ikut bepergian dengan orang yang diperiksa"
						:id.sync="data.pendamping.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="8" sm="12">
					<CInput
						class="without-valid"
						label="Nama sarana pengangkut"
						description="Nama sarana pengangkut orang yang diperiksa"
						:value.sync="data.sarkut.nama_sarkut"
						:is-valid="validatorRequiredLinked(data.sarkut.nama_sarkut, data.sarkut.jenis_sarkut)"
						invalid-feedback="Nama sarkut wajib diisi"
					/>
				</CCol>
				<CCol md="4" sm="12">
					<CInput
						class="without-valid"
						label="Jenis sarana pengangkut"
						:value.sync="data.sarkut.jenis_sarkut"
						:is-valid="validatorRequiredLinked(data.sarkut.jenis_sarkut, data.sarkut.nama_sarkut)"
						invalid-feedback="Jenis sarkut wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4" sm="12">
					<CInput
						label="Nomor voyage/penerbangan/trayek"
						:value.sync="data.sarkut.no_flight_trayek"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CInput
						label="Bendera"
						:value.sync="data.sarkut.bendera"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Nomor registrasi/polisi"
						:value.sync="data.sarkut.no_reg_polisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectPilot"
						label="Nama nahkoda/pengemudi/pilot"
						:id.sync="data.sarkut.pilot.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="2">
					<CInput
						label="Jenis dokumen"
						description="Jenis dokumen barang yang dibawa"
						:value.sync="data.dokumen.jns_dok"
					/>
				</CCol>
				<CCol md="4">
					<CInput
						label="Nomor dokumen"
						description="Nomor dokumen barang yang dibawa ornag yang diperiksa"
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
				<CCol sm="12">
					<MySelectLokasi
						:state.sync="state"
						:grup_lokasi_id.sync="data.penindakan.grup_lokasi.id"
						:lokasi.sync="data.penindakan.lokasi_penindakan"
						label="Lokasi Pemeriksaan"
						description="Tempat/lokasi/alamat di mana pemeriksaan dilakukan"
						feedback="Lokasi pemeriksaan wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Uraian pemeriksaan"
						description="Uraian pakaian yang dibuka / pemeriksaan medis yang dilakukan terhadap orang yang dilakukan pemeriksaan badan"
						:value.sync="data.uraian_pemeriksaan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Hasil pemeriksaan"
						description="Hasil pemeriksaan badan"
						:value.sync="data.hasil_pemeriksaan"
						:is-valid="validatorRequired"
						invalid-feedback="Hasil pemeriksaan wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama saksi yang menyaksikan pemeriksaan badan"
						:id.sync="data.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan pemeriksaan badan"
						:id.sync="data.penindakan.petugas1.user_id"
						role="p2vue.penindakan"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas2"
						label="Nama Petugas 2"
						description="Nama Pejabat Bea dan Cukai yang melakukan pemeriksaan badan"
						:id.sync="data.penindakan.petugas2.user_id"
						role="p2vue.penindakan"
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
import MySelectLokasi from '../../components/SelectLokasi.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const default_data = {
	asal: null,
	tujuan: null,
	orang: {id: null},
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
	saksi: {id: null},
	penindakan: {
		grup_lokasi: {id: null},
		lokasi_penindakan: null,
		sprint: {id: null},
		saksi: {id: null},
		petugas1: {user_id: null},
		petugas2: {user_id: null}
	},
}

export default {
	name: 'FormRiksaBadan',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas,
		MySelectLokasi,
		MySelectPetugas,
		MySelectSprint,
	},
	props: {
		state: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById('riksabadan', this.doc_id)
			this.data = response.data.data
			this.fillDefaultData()
			
			this.$nextTick(function () {
				this.renderData()
			})
		},
		fillDefaultData() {
			// Data orang yg bersamaan
			if (this.data.pendamping == null) {
				this.data.pendamping = {id: null}
			}

			// Data sarkut
			if (this.data.sarkut == null) {
				this.data.sarkut = {
					id: null,
					nama_sarkut: null,
					jenis_sarkut: null,
					no_flight_trayek: null,
					pilot: {id: null},
					bendera: null,
					no_reg_polisi: null,
				}
			} else {
				if (this.data.sarkut.pilot == null) {
					this.data.sarkut.pilot = {id: null}
				}
			}

			// Data dokumen barang
			if (this.data.dokumen == null) {
				this.data.dokumen = {
					id: null,
					jns_dok: null,
					no_dok: null,
					tgl_dok: null,
				}
			}

			// Data saksi
			if (this.data.saksi == null) {
				this.data.saksi = {id: null}
			}

			// Data petugas 2
			if (this.data.penindakan.petugas2 == null) {
				this.data.penindakan.petugas2 = {user_id: null}
			}
		},
		renderData() {
			this.$refs.selectSprint.getSprint(this.data.penindakan.sprint.id, true)
			this.$refs.selectOrang.getEntitas(this.data.orang.id, true)
			this.$refs.selectPendamping.getEntitas(this.data.pendamping.id, true)
			this.$refs.selectPilot.getEntitas(this.data.sarkut.pilot.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.penindakan.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.penindakan.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				console.log('form riksa badan - save data', JSON.parse(JSON.stringify(this.data)))
				try {
					this.data = await api.storeDoc('riksabadan', this.data)
					this.fillDefaultData()

					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert('Data BA Pemeriksaan Badan berhasil disimpan')
				} catch (error) {
					console.log('form riksa badan - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('riksabadan', this.doc_id, this.data)
					this.alert('Data BA Pemeriksaan Badan berhasil diubah')
				} catch (error) {
					console.log('form riksa badan - update data - error', error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorNumber(val) { return validators.number(val) },
		validatorRequiredLinked(val, linkedVal) { return validators.requiredLinked(val, linkedVal) }
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
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
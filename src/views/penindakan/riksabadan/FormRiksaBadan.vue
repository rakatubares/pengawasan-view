<template>
	<div class="wrapper form-riksa-badan">
		<CForm class="pt-3">
			<CRow>
				<label class="w-100 pl-3 pt-2 mb-0">Tanggal Penindakan</label>
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
						:id.sync="selected_sprint"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitasOrang
						label="Nama orang yang diperiksa"
						description="Nama orang yang terhadapnya dilakukan pemeriksaan badan"
						:entity_id.sync="data.penindakan.objek.badan.entitas.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Datang dari"
						description="Tempat asal perjalanan orang yg diperiksa"
						:value.sync="data.penindakan.objek.badan.asal"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Tempat tujuan"
						description="Tempat tujuan perjalanan orang yang diperiksa"
						:value.sync="data.penindakan.objek.badan.tujuan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitasOrang
						label="Nama orang yang bepergian bersama"
						description="Nama orang yang ikut bepergian dengan orang yang diperiksa"
						:entity_id.sync="data.penindakan.objek.badan.pendamping.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="8" sm="12">
					<CInput
						label="Nama sarana pengangkut"
						description="Nama sarana pengangkut orang yang diperiksa"
						:value.sync="data.penindakan.objek.badan.nama_sarkut"
					/>
				</CCol>
				<CCol md="4" sm="12">
					<CInput
						label="Jenis sarana pengangkut"
						:value.sync="data.penindakan.objek.badan.jenis_sarkut"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4" sm="12">
					<CInput
						label="Nomor voyage/penerbangan/trayek"
						:value.sync="data.penindakan.objek.badan.nomor_sarkut"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<MySelectNegara
						ref="SelectNegara"
						label="Bendera sarkut"
						:value.sync="data.penindakan.objek.badan.bendera.kode_2"
					/>
				</CCol>
				<CCol md="6" sm="12">
					<CInput
						label="Nomor registrasi/polisi"
						:value.sync="data.penindakan.objek.badan.registrasi_sarkut"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitasOrang
						ref="selectPilot"
						label="Nama nahkoda/pengemudi/pilot"
						:entity_id.sync="data.penindakan.objek.badan.pengemudi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="2">
					<CInput
						label="Jenis dokumen"
						description="Jenis dokumen barang yang dibawa"
						:value.sync="data.penindakan.objek.badan.jenis_dokumen"
					/>
				</CCol>
				<CCol md="6">
					<CInput
						label="Nomor dokumen"
						description="Nomor dokumen barang yang dibawa ornag yang diperiksa"
						:value.sync="data.penindakan.objek.badan.nomor_dokumen"
					/>
				</CCol>
				<CCol md="2">
					<div class="form-group">
						<label class="w-100">Tanggal dokumen</label>
						<date-picker 
							v-model="data.penindakan.objek.badan.tanggal_dokumen" 
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
				<CCol sm="12">
					<MyComboboxLokasi
						label="Lokasi Pemeriksaan"
						description="Tempat/lokasi/alamat di mana pemeriksaan dilakukan"
						:value.sync="data.penindakan.lokasi_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Uraian pemeriksaan"
						description="Uraian pakaian yang dibuka / pemeriksaan medis yang dilakukan terhadap orang yang dilakukan pemeriksaan badan"
						:value.sync="data.penindakan.objek.badan.uraian_pemeriksaan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Hasil pemeriksaan"
						description="Hasil pemeriksaan badan"
						:value.sync="data.penindakan.objek.badan.hasil_pemeriksaan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitasOrang
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama saksi yang menyaksikan pemeriksaan badan"
						:entity_id.sync="data.penindakan.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan pemeriksaan badan"
						:nip.sync="data.penindakan.petugas.petugas1.nip"
						:currentUser="true"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						label="Nama Petugas 2"
						description="Nama Pejabat Bea dan Cukai yang melakukan pemeriksaan badan"
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
import MySelectLokasi from '../../components/SelectLokasi.vue'
import MySelectNegara from '../../components/SelectNegara.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

export default {
	name: 'FormRiksaBadan',
	components: {
		DatePicker,
		MyComboboxLokasi,
		MySelectEntitasOrang,
		MySelectLokasi,
		MySelectNegara,
		MySelectPetugas,
		MySelectSprint,
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
		validatorRequiredLinked(val, linkedVal) { return validators.requiredLinked(val, linkedVal) }
	},
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
<template>
	<div class="wrapper">
		<!-- Form BA Buka Segel header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.main.data.sprint.id"
					>
					</MySelectSprint>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<!-- Input data nomor segel -->
					<CInput
						v-if="data_source == 'Input Data'"
						label="Nomor Segel"
						description="Nomor segel yang digunakan dalam pembukaan segel"
						:value.sync="data.main.data.nomor_segel"
						:is-valid="validatorRequired"
						invalid-feedback="Nomor segel wajib diisi"
					>
						<template #prepend>
							<CDropdown
								:togglerText.sync="data_source"
								color="primary"
							>
								<CDropdownItem @click="toggleSource('input')">
									Input Data
								</CDropdownItem>
								<CDropdownItem @click="toggleSource('load')">
									Load Segel
								</CDropdownItem>
							</CDropdown>
						</template>
					</CInput>

					<!-- Load data nomor segel -->
					<div v-if="data_source == 'Load Segel'" class="form-group">
						<label>Nomor Segel</label>
						<v-autocomplete
							v-model="segel_search_value"
							outlined
							dense
							:items.sync="segel_search_items"
							:search-input.sync="segel_search_query"
							item-text="no_dok_lengkap"
							item-value="id"
							@change="changeValueSegel"
						>
							<template v-slot:prepend>
								<CDropdown
									:togglerText.sync="data_source"
									color="primary"
								>
									<CDropdownItem @click="toggleSource('input')">
										Input Data
									</CDropdownItem>
									<CDropdownItem @click="toggleSource('load')">
										Load BA Segel
									</CDropdownItem>
								</CDropdown>
							</template>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-title>
										Data BA Segel tidak ditemukan
									</v-list-item-title>
								</v-list-item>
							</template>
							<template v-slot:item="{ item }">
								<v-list-item-content>
									<h3><v-list-item-title v-text="item.no_dok_lengkap"></v-list-item-title></h3>
									<v-list-item-subtitle v-text="item.tanggal_dokumen"></v-list-item-subtitle>
								</v-list-item-content>
							</template>
						</v-autocomplete>
						<small class="form-text text-muted w-100">Nomor segel yang digunakan dalam pembukaan segel</small>
					</div>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tgl Segel</label>
						<date-picker
							v-model="data.main.data.tanggal_segel"
							format="DD-MM-YYYY" 
							value-type="format"
							type="date"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									:disabled="data_source == 'Load Segel'"
								/>
							</template>
							<i slot="icon-calendar"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CInput
						label="Jenis Segel"
						description="Jenis segel yang digunakan (kertas, kunci, timah, lak, segel elektronik, dll)"
						:value.sync="data.main.data.jenis_segel"
						:is-valid="validatorRequired"
						invalid-feedback="Jenis segel wajib diisi"
						:disabled="data_source == 'Load Segel'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Jumlah Segel"
						description="Jumlah segel yang digunakan"
						:value.sync="data.main.data.jumlah_segel"
						:is-valid="validatorNumber"
						invalid-feedback="Jumlah segel wajib diisi"
						:disabled="data_source == 'Load Segel'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Satuan"
						:value.sync="data.main.data.satuan_segel"
						:disabled="data_source == 'Load Segel'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Tempat Segel"
						description="Bagian / lokasi tempat segel ditempatkan / dilekatkan"
						:value.sync="data.main.data.tempat_segel"
						:disabled="data_source == 'Load Segel'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama terang pengangkut / pemilik / kuasa / saksi yang menyaksikan pembukaan segel"
						:showAlamat="true"
						:id.sync="data.main.data.saksi.id"
					>
					</MySelectEntitas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan segel"
						:id.sync="data.main.data.petugas1.user_id"
						role="p2vue.penindakan"
						:currentUser="true"
					>
					</MySelectPetugas>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas2"
						label="Nama Petugas 2"
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan segel"
						:id.sync="data.main.data.petugas2.user_id"
						role="p2vue.penindakan"
					>
					</MySelectPetugas>
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
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

export default {
	name: 'FormBukaSegel',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas,
		MySelectPetugas,
		MySelectSprint
	},
	props: {
		state: String,
		data: Object,
	},
	data() {
		return {
			data_source: 'Input Data',
			segel_search_value: null,
			segel_search_items: [],
			segel_search_query: null,
		}
	},
	methods: {
		validateData() {
			this.$refs.selectSprint.getSprint(this.data.main.data.sprint.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.main.data.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.main.data.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.main.data.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.storeDoc('bukasegel', this.data)
					let doc_id = response.main.data.id
					this.$emit('submit-data', doc_id)
					if (this.data.dokumen.segel.id == null) {
						this.$emit('update:state', 'edit')	
					} else {
						this.$emit('update:state', 'edit-header')
					}
					this.alert('Data BA Buka Segel berhasil disimpan')
				} catch (error) {
					console.log('form buka segel - save data - error', JSON.parse(JSON.stringify(error)))
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('bukasegel', this.data.main.data.id, this.data)
					this.$emit('submit-data')
					this.alert('Data BA Buka Segel berhasil diubah')
				} catch (error) {
					console.log('form buka segel - update data - error', JSON.parse(JSON.stringify(response)))
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorNumber(val) { return validators.number(val) },
		toggleSource(val) {
			if (val == 'input') {
				this.data_source = 'Input Data'	
			} else {
				this.data_source = 'Load Segel'	
			}

			// Nullify related data
			this.data.main.data.nomor_segel = null
			this.data.main.data.tanggal_segel = null
			this.data.main.data.jenis_segel = null
			this.data.main.data.jumlah_segel = null
			this.data.main.data.satuan_segel = null
			this.data.main.data.tempat_segel = null
			this.data.dokumen.segel.id = null
			this.segel_search_value = null
		},
		async changeValueSegel(id) {
			if (id != null) {
				// Get data segel
				let segel = await api.getDocumentById('segel', id)

				// Change current data according to segel
				this.data.main.data.nomor_segel = segel.main.data.nomor_segel
				this.data.main.data.tanggal_segel = segel.penindakan.tanggal_penindakan
				this.data.main.data.jenis_segel = segel.main.data.jenis_segel
				this.data.main.data.jumlah_segel = segel.main.data.jumlah_segel
				this.data.main.data.satuan_segel = segel.main.data.satuan_segel
				this.data.main.data.tempat_segel = segel.main.data.tempat_segel

				// Specify segel id
				this.data.dokumen.segel.id = id
			}
		}
	},
	watch: {
		data: function(val) {
			this.validateData()
		},
		async segel_search_query (val) {
			console.log('form buka segel - search', val)
			let data = {'s': val}
			let responses = await api.searchDoc('segel', data)
			this.segel_search_items = responses.data.data
			console.log('form buka segel - search', val)
		}
	},
	// mounted() {
	// 	this.getData(true)
	// }
}
</script>

<style>
.row+.row {
	margin-top:0;
}

.v-text-field__details {
	display: none;
}

/* V-AUTOCOMPLETE */
.v-input__slot {
	min-height: 34px !important;
	font-size: 14px;
}

.v-input__prepend-outer {
	margin: 0 !important;
} 
</style>
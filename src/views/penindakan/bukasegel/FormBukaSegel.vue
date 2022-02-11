<template>
	<div class="wrapper form-buka-segel">
		<!-- Form BA Buka Segel header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSprint
						ref="selectSprint"
						:id.sync="data.sprint.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<!-- Input data nomor segel -->
					<CInput
						v-if="data_source == 'Input Data'"
						label="Nomor Segel"
						description="Nomor segel yang digunakan dalam pembukaan segel"
						:value.sync="data.nomor_segel"
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
							v-model="data.tanggal_segel"
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
					<CSelect
						label="Jenis Segel"
						description="Jenis segel yang digunakan"
						:options="['Kertas', 'Kunci', 'Timah', 'Lak', 'Segel Elektronik', 'Lainnya']"
						:value.sync="data.jenis_segel"
						:disabled="data_source == 'Load Segel'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Jumlah Segel"
						description="Jumlah segel yang digunakan"
						:value.sync="data.jumlah_segel"
						:is-valid="validatorNumber"
						invalid-feedback="Jumlah segel wajib diisi"
						:disabled="data_source == 'Load Segel'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Satuan"
						:value.sync="data.satuan_segel"
						:disabled="data_source == 'Load Segel'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Tempat Segel"
						description="Bagian / lokasi tempat segel ditempatkan / dilekatkan"
						:value.sync="data.tempat_segel"
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
						:id.sync="data.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan segel"
						:id.sync="data.petugas1.user_id"
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
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan segel"
						:id.sync="data.petugas2.user_id"
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
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const default_data = {
	tanggal_segel: null,
	segel: {id: null},
	jenis_segel: 'Kertas',
	jumlah_segel: null,
	satuan_segel: null,
	tempat_segel: null,
	sprint: {id: null},
	saksi: {id: null},
	petugas1: {user_id: null},
	petugas2: {user_id: null},
}

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
		doc_id: Number,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			data_source: 'Input Data',
			segel_search_value: null,
			segel_search_items: [],
			segel_search_query: null,
			segel_search_exception: null
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById('bukasegel', this.doc_id)
			this.data = response.data.data
			
			if (this.data.petugas2 == null) {
				this.data.petugas2 = {user_id: null}
			}
			if (this.data.segel != null) {
				// Get data segel
				this.segel_search_exception = this.data.segel.id
				await this.search_segel(this.data.segel.no_dok_lengkap)
				this.segel_search_value = this.segel_search_items[0]

				this.$emit('update:state', 'edit-header')
				this.data_source = 'Load Segel'
			} else {
				this.data.segel = {id: null}
			}
			
			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectSprint.getSprint(this.data.sprint.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.storeDoc('bukasegel', this.data)
					this.$emit('update:doc_id', response.id)

					if (response.segel != null) {
						this.$emit('update:state', 'edit-header')
					} else {
						this.$emit('update:state', 'edit')
					}

					this.alert('Data BA Buka Segel berhasil disimpan')
				} catch (error) {
					console.log('form buka segel - save data - error', error)
				}
			} else if (['edit', 'edit-header'].includes(this.state)) {
				try {
					let response = await api.updateDoc('bukasegel', this.doc_id, this.data)

					if (response.segel != null) {
						this.$emit('update:state', 'edit-header')
					} else {
						this.$emit('update:state', 'edit')
					}

					this.alert('Data BA Buka Segel berhasil diubah')
				} catch (error) {
					console.log('form buka segel - update data - error', error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorNumber(val) { return validators.number(val) },
		toggleSource(val) {
			// Nullify related data
			this.data.nomor_segel = null
			this.data.tanggal_segel = null
			this.data.jenis_segel = null
			this.data.jumlah_segel = null
			this.data.satuan_segel = null
			this.data.tempat_segel = null
			this.data.segel.id = null
			this.segel_search_value = null

			if (val == 'input') {
				this.data_source = 'Input Data'
				this.data.jenis_segel = 'Kertas'
			} else {
				this.data_source = 'Load Segel'	
			}
		},
		async changeValueSegel(id) {
			if (id != null) {
				// Get data segel
				let segel = await api.getDocumentById('segel', id)

				// Change current data according to segel
				this.data.nomor_segel = segel.main.data.nomor_segel
				this.data.tanggal_segel = segel.penindakan.tanggal_penindakan
				this.data.jenis_segel = segel.main.data.jenis_segel
				this.data.jumlah_segel = segel.main.data.jumlah_segel
				this.data.satuan_segel = segel.main.data.satuan_segel
				this.data.tempat_segel = segel.main.data.tempat_segel

				// Specify segel id
				this.data.segel.id = id
			}
		},
		async search_segel(search) {
			let data = {'src': search, 'sta': [200, 205], 'exc': this.segel_search_exception}
			let responses = await api.searchDoc('segel', data)
			this.segel_search_items = responses.data.data
		}
	},
	watch: {
		data: function(val) {
			this.renderData()
		},
		async segel_search_query (val) {
			await this.search_segel(val)
		},
	},
	async mounted() {
		if (['edit', 'edit-header'].includes(this.state)) {
			await this.getData()
		}
	}
}
</script>

<style>
.form-buka-segel .row+.row {
	margin-top:0;
}

.form-buka-segel .v-text-field__details {
	display: none;
}

/* V-AUTOCOMPLETE */
.form-buka-segel .v-input__slot {
	min-height: 34px !important;
	font-size: 14px;
}

.form-buka-segel .v-input__prepend-outer {
	margin: 0 !important;
} 
</style>
<template>
	<div class="wrapper my-form">
		<!-- Form BA Buka Tanda Pengaman header -->
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
					<!-- Input data nomor tanda pengaman -->
					<CInput
						v-if="data_source == 'Input Data'"
						class="no-rounded rounded-right"
						label="Nomor Tanda Pengaman"
						description="Nomor tanda pengaman yang digunakan dalam pembukaan tanda pengaman"
						:value.sync="data.nomor_pengaman"
						:is-valid="validatorRequired"
						invalid-feedback="Nomor tanda pengaman wajib diisi"
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
									Load BA Tanda Pengaman
								</CDropdownItem>
							</CDropdown>
						</template>
					</CInput>

					<!-- Load data nomor tanda pengaman -->
					<div v-if="data_source == 'Load Data'" class="form-group">
						<label>Nomor Tanda Pengaman</label>
						<v-autocomplete
							class="no-rounded rounded-right no-message"
							v-model="pengaman_search_value"
							outlined
							dense
							:items.sync="pengaman_search_items"
							:search-input.sync="pengaman_search_query"
							item-text="no_dok_lengkap"
							item-value="id"
							@change="changeValuePengaman"
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
										Load BA Tanda Pengaman
									</CDropdownItem>
								</CDropdown>
							</template>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-title>
										Data BA Tanda Pengaman tidak ditemukan
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
						<small class="form-text text-muted w-100">Nomor tanda pengaman yang digunakan dalam pembukaan tanda pengaman</small>
					</div>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal</label>
						<date-picker
							v-model="data.tanggal_pengaman"
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
									:disabled="data_source == 'Load Data'"
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
						label="Jenis Tanda Pengaman"
						description="Jenis tanda pengaman yang digunakan"
						:options="['Kertas', 'Kunci', 'Timah', 'Lak', 'Segel Elektronik', 'Lainnya']"
						:value.sync="data.jenis_pengaman"
						:disabled="data_source == 'Load Data'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Jumlah"
						description="Jumlah tanda pengaman yang digunakan"
						:value.sync="data.jumlah_pengaman"
						:is-valid="validatorNumber"
						invalid-feedback="Jumlah tanda pengaman wajib diisi"
						:disabled="data_source == 'Load Data'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Satuan"
						:value.sync="data.satuan_pengaman"
						:disabled="data_source == 'Load Data'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Tempat Tanda Pengaman"
						description="Bagian / lokasi tempat tanda pengaman ditempatkan / dilekatkan"
						:value.sync="data.tempat_pengaman"
						:disabled="data_source == 'Load Data'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CTextarea
						label="Dasar Pengamanan"
						:value.sync="data.dasar_pengamanan"
						:disabled="data_source == 'Load Data'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Nama terang pengangkut / pemilik / kuasa / saksi yang menyaksikan pembukaan tanda pengaman"
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
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan tanda pengaman"
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
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan tanda pengaman"
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
	tanggal_pengaman: null,
	jenis_pengaman: 'Kertas',
	jumlah_pengaman: null,
	satuan_pengaman: null,
	tempat_pengaman: null,
	dasar_pengamanan: null,
	sprint: {id: null},
	saksi: {id: null},
	petugas1: {user_id: null},
	petugas2: {user_id: null},
	pengaman: {id: null}
}

export default {
	name: 'FormBukaPengaman',
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
			pengaman_search_value: null,
			pengaman_search_items: [],
			pengaman_search_query: null,
			pengaman_search_exception: null
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById('bukapengaman', this.doc_id)
			this.data = response.data.data

			if (this.data.petugas2 == null) {
				this.data.petugas2 = {user_id: null}
			}
			if (this.data.pengaman != null) {
				// Display current BA pengaman
				let search_data = {
					's': this.data.pengaman.no_dok_lengkap,
					'e': this.data.pengaman.id
				}
				let pengaman_items = await api.searchDoc('pengaman', search_data)
				this.pengaman_search_items = pengaman_items.data.data
				this.pengaman_search_value = this.pengaman_search_items[0]
				
				// Set filter exception
				this.pengaman_search_exception = this.data.pengaman.id
				this.$emit('update:state', 'edit_header')
				this.data_source = 'Load Data'
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
					let response = await api.storeDoc('bukapengaman', this.data)
					this.$emit('update:doc_id', response.id)

					if (response.pengaman != null) {
						this.$emit('update:state', 'edit_header')	
					} else {
						this.$emit('update:state', 'edit')
					}

					this.alert('Data BA Buka Tanda Pengaman berhasil disimpan')
				} catch (error) {
					console.log('form buka pengaman - save data - error', error)
				}
			} else if (['edit', 'edit_header'].includes(this.state)) {
				try {
					let response = await api.updateDoc('bukapengaman', this.doc_id, this.data)
					if (response.pengaman != null) {
						this.$emit('update:state', 'edit_header')
					} else {
						this.$emit('update:state', 'edit')
					}

					this.alert('Data BA Buka Tanda Pengaman berhasil diubah')
				} catch (error) {
					console.log('form buka pengaman - update data - error', error)
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
			this.data.nomor_pengaman = null
			this.data.tanggal_pengaman = null
			this.data.jenis_pengaman = null
			this.data.jumlah_pengaman = null
			this.data.satuan_pengaman = null
			this.data.tempat_pengaman = null
			this.data.dasar_pengamanan = null
			this.data.pengaman = {id: null}
			this.pengaman_search_value = null

			if (val == 'input') {
				this.data_source = 'Input Data'
				this.data.jenis_pengaman = 'Kertas'
			} else {
				this.data_source = 'Load Data'	
			}
		},
		async changeValuePengaman(id) {
			if (id != null) {
				// Get data pengaman
				let response = await api.getDisplayDataById('pengaman', id)
				let pengaman = response.data.data

				// Change current data according to pengaman
				this.data.nomor_pengaman = pengaman.nomor_pengaman
				this.data.tanggal_pengaman = pengaman.penindakan.tanggal_penindakan
				this.data.jenis_pengaman = pengaman.jenis_pengaman
				this.data.jumlah_pengaman = pengaman.jumlah_pengaman
				this.data.satuan_pengaman = pengaman.satuan_pengaman
				this.data.tempat_pengaman = pengaman.tempat_pengaman
				this.data.dasar_pengamanan = pengaman.alasan_pengamanan
				
				// Specify pengaman id
				this.data.pengaman.id = id
			}
		}
	},
	watch: {
		data: function() {
			this.renderData()
		},
		async pengaman_search_query (val) {
			let data = {'s': val, 'e': this.pengaman_search_exception}
			let responses = await api.searchDoc('pengaman', data)
			this.pengaman_search_items = responses.data.data
		}
	},
	async mounted() {
		if (['edit', 'edit_header'].includes(this.state)) {
			await this.getData()
		}
	}
}
</script>

<style>

</style>
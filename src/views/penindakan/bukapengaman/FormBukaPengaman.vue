<template>
	<div class="wrapper">
		<!-- Form BA Buka Tanda Pengaman header -->
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
					<!-- Input data nomor tanda pengaman -->
					<CInput
						v-if="data_source == 'Input Data'"
						label="Nomor Tanda Pengaman"
						description="Nomor tanda pengaman yang digunakan dalam pembukaan tanda pengaman"
						:value.sync="data.main.data.nomor_pengaman"
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
							v-model="data.main.data.tanggal_pengaman"
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
					<!-- <CInput
						label="Jenis Tanda Pengaman"
						description="Jenis tanda pengaman yang digunakan (kertas, kunci, timah, lak, segel elektronik, dll)"
						:value.sync="data.main.data.jenis_pengaman"
						:is-valid="validatorRequired"
						invalid-feedback="Jenis tanda pengaman wajib diisi"
						:disabled="data_source == 'Load Data'"
					/> -->
					<CSelect
						label="Jenis Tanda Pengaman"
						description="Jenis tanda pengaman yang digunakan"
						:options="['Kertas', 'Kunci', 'Timah', 'Lak', 'Segel Elektronik', 'Lainnya']"
						:value.sync="data.main.data.jenis_pengaman"
						:disabled="data_source == 'Load Data'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Jumlah"
						description="Jumlah tanda pengaman yang digunakan"
						:value.sync="data.main.data.jumlah_pengaman"
						:is-valid="validatorNumber"
						invalid-feedback="Jumlah tanda pengaman wajib diisi"
						:disabled="data_source == 'Load Data'"
					/>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Satuan"
						:value.sync="data.main.data.satuan_pengaman"
						:disabled="data_source == 'Load Data'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Tempat Tanda Pengaman"
						description="Bagian / lokasi tempat tanda pengaman ditempatkan / dilekatkan"
						:value.sync="data.main.data.tempat_pengaman"
						:disabled="data_source == 'Load Data'"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CTextarea
						label="Dasar Pengamanan"
						:value.sync="data.main.data.dasar_pengamanan"
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
						:id.sync="data.main.data.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan pembukaan tanda pengaman"
						:id.sync="data.main.data.petugas1.user_id"
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
						:id.sync="data.main.data.petugas2.user_id"
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
	main: {
		data: {
			tanggal_pengaman: null,
			jenis_pengaman: 'Kertas',
			jumlah_pengaman: null,
			satuan_pengaman: null,
			tempat_pengaman: null,
			dasar_pengamanan: null,
			sprint: {id: null},
			saksi: {id: null},
			petugas1: {user_id: null},
			petugas2: {user_id: null}
		}
	},
	dokumen: {
		pengaman: {id: null}
	}
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
			this.data = await api.getDocumentById('bukapengaman', this.doc_id)
			if (this.data.main.data.petugas2 == null) {
				this.data.main.data.petugas2 = {user_id: null}
			}
			if (this.data.dokumen.pengaman != null) {
				// Display current BA pengaman
				let search_data = {
					's': this.data.dokumen.pengaman.no_dok_lengkap,
					'e': this.data.dokumen.pengaman.id
				}
				let pengaman_items = await api.searchDoc('pengaman', search_data)
				this.pengaman_search_items = pengaman_items.data.data
				this.pengaman_search_value = this.pengaman_search_items[0]
				
				// Set filter exception
				this.pengaman_search_exception = this.data.dokumen.pengaman.id
				this.$emit('update:state', 'edit-header')
				this.data_source = 'Load Data'
			}
			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectSprint.getSprint(this.data.main.data.sprint.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.main.data.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.main.data.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.main.data.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.storeDoc('bukapengaman', this.data)
					this.$emit('update:doc_id', response.main.data.id)

					if ('pengaman' in this.data.dokumen) {
						this.$emit('update:state', 'edit-header')	
					} else {
						this.$emit('update:state', 'edit')
					}

					this.alert('Data BA Buka Tanda Pengaman berhasil disimpan')
				} catch (error) {
					console.log('form buka pengaman - save data - error', JSON.parse(JSON.stringify(error)))
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('bukapengaman', this.doc_id, this.data)
					this.alert('Data BA Buka Tanda Pengaman berhasil diubah')
				} catch (error) {
					console.log('form buka pengaman - update data - error', JSON.parse(JSON.stringify(response)))
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
				this.data_source = 'Load Data'	
			}
			// Nullify related data
			this.data.main.data.nomor_pengaman = null
			this.data.main.data.tanggal_pengaman = null
			this.data.main.data.jenis_pengaman = null
			this.data.main.data.jumlah_pengaman = null
			this.data.main.data.satuan_pengaman = null
			this.data.main.data.tempat_pengaman = null
			this.data.main.data.dasar_pengamanan = null
			this.data.dokumen.pengaman.id = null
			this.pengaman_search_value = null
		},
		async changeValuePengaman(id) {
			if (id != null) {
				// Get data pengaman
				let pengaman = await api.getDocumentById('pengaman', id)

				// Change current data according to pengaman
				this.data.main.data.nomor_pengaman = pengaman.main.data.nomor_pengaman
				this.data.main.data.tanggal_pengaman = pengaman.penindakan.tanggal_penindakan
				this.data.main.data.jenis_pengaman = pengaman.main.data.jenis_pengaman
				this.data.main.data.jumlah_pengaman = pengaman.main.data.jumlah_pengaman
				this.data.main.data.satuan_pengaman = pengaman.main.data.satuan_pengaman
				this.data.main.data.tempat_pengaman = pengaman.main.data.tempat_pengaman
				this.data.main.data.dasar_pengamanan = pengaman.main.data.alasan_pengamanan
				
				// Specify pengaman id
				this.data.dokumen.pengaman.id = id
			}
		}
	},
	watch: {
		data: function() {
			this.renderData()
		},
		async pengaman_search_query (val) {
			let data = {'s': val}
			let responses = await api.searchDoc('pengaman', data)
			this.pengaman_search_items = responses.data.data
		}
	},
	async mounted() {
		if (['edit', 'edit-header'].includes(this.state)) {
			await this.getData()
		}
	}
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
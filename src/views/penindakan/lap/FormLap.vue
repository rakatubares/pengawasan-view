<template>
	<div class="wrapper form-lap">
		<CForm class="pt-3">
			<CRow>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal LAP</label>
						<date-picker 
							v-model="data.tanggal_dokumen"
							format="DD-MM-YYYY"
							value-type="format"
							type="date"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_dokumen', validasi.tanggal_sumber.text)
							"
						>
							<template v-slot:input="slotProps">
								<input
									class="form-control" 
									type="text" 
									v-bind="slotProps.props" 
									v-on="slotProps.events"
									v-bind:class="{
										'is-valid': validasi.tanggal_dokumen.state,
										'is-invalid': !validasi.tanggal_dokumen.state
									}"
								/>
								<div class="invalid-feedback pb-1">{{validasi.tanggal_dokumen.text}}</div>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
						<small class="form-text text-muted w-100">Tanggal LAP</small>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="9" sm="12">
					<!-- Load data LI -->
					<div v-if="(data.jenis_sumber == 'LI-1') || (data.jenis_sumber == 'NHI')" class="form-group">
						<label>Sumber informasi</label>
						<v-autocomplete
							v-model="search_value"
							outlined
							dense
							:items.sync="search_items"
							:search-input.sync="search_query"
							item-text="no_dok_lengkap"
							item-value="id"
							@change="changeValueSumber"
						>
							<template v-slot:prepend>
								<CDropdown
									:togglerText.sync="data.jenis_sumber"
									color="primary"
								>
									<CDropdownItem @click="toggleSource('NHI')">
										NHI
									</CDropdownItem>
									<CDropdownItem @click="toggleSource('LI-1')">
										LI-1
									</CDropdownItem>
									<CDropdownItem @click="toggleSource('Lainnya')">
										Lainnya
									</CDropdownItem>
								</CDropdown>
							</template>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-title>
										Data tidak ditemukan
									</v-list-item-title>
								</v-list-item>
							</template>
							<template v-slot:item="{ item }">
								<v-list-item-content>
									<h3><v-list-item-title>{{ item.no_dok_lengkap }}</v-list-item-title></h3>
									<v-list-item-subtitle>{{ item.tanggal_dokumen }}</v-list-item-subtitle>
								</v-list-item-content>
							</template>
						</v-autocomplete>
						<small class="form-text text-muted w-100">Nomor NHI / LI-1 / Informasi lain</small>
					</div>

					<!-- Input LI -->
					<CInput
						v-else
						label="Sumber informasi"
						description="Nomor NHI / LI-1 / Informasi lain"
						:value.sync="data.nomor_sumber"
						:is-valid="validatorRequired"
						invalid-feedback="Sumber informasi wajib diisi"
					>
						<template #prepend>
							<CDropdown
								:togglerText.sync="data.jenis_sumber"
								color="primary"
							>
								<CDropdownItem @click="toggleSource('NHI')">
									NHI
								</CDropdownItem>
								<CDropdownItem @click="toggleSource('LI-1')">
									LI-1
								</CDropdownItem>
								<CDropdownItem @click="toggleSource('Lainnya')">
									Lainnya
								</CDropdownItem>
							</CDropdown>
						</template>
					</CInput>
				</CCol>
				<CCol md="3" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal sumber informasi</label>
						<date-picker 
							v-model="data.tanggal_sumber"
							format="DD-MM-YYYY"
							value-type="format"
							type="date"
							@change="
								validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tanggal_sumber', validasi.tanggal_sumber.text)
							"
						>
							<template v-slot:input="slotProps">
								<div v-if="(data.jenis_sumber == 'LI-1') || (data.jenis_sumber == 'NHI')">
									<input
										class="form-control" 
										type="text" 
										v-bind="slotProps.props" 
										v-on="slotProps.events"
										disabled
									/>
								</div>
								<div v-else>
									<input
										class="form-control" 
										type="text" 
										v-bind="slotProps.props" 
										v-on="slotProps.events"
										v-bind:class="{
											'is-valid': validasi.tanggal_sumber.state,
											'is-invalid': !validasi.tanggal_sumber.state
										}"
									/>
									<div class="invalid-feedback pb-1">{{validasi.tanggal_sumber.text}}</div>
								</div>
							</template>
							<i slot="icon-calendar"></i>
							<i slot="icon-clear"></i>
						</date-picker>
						<small class="form-text text-muted w-100">Tanggal NHI / LI-1 / Informasi lain</small>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4" sm="12">
					<CSelect
						label="Dugaan Pelanggaran"
						description="Kategori dugaan pelanggaran"
						:options="dugaan_pelanggaran_options"
						:value.sync="data.dugaan_pelanggaran.id"
					/>
				</CCol>
			</CRow>

			<!-- URAIAN -->
			<CRow>
				<CCol sm="12">
					<h5>Uraian Pra-penindakan</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Pelaku"
						:options="[{value: 1, label: 'Diketahui'}, {value: 0, label: 'Tidak Diketahui'}]"
						:value.sync="data.flag_pelaku"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait pelaku pelanggaran"
						:value.sync="data.keterangan_pelaku"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Pelanggaran"
						:options="[{value: 1, label: 'Diketahui'}, {value: 0, label: 'Tidak Diketahui'}]"
						:value.sync="data.flag_pelanggaran"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait jenis pelanggaran"
						:value.sync="data.keterangan_pelanggaran"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Locus"
						:options="[{value: 1, label: 'Diketahui'}, {value: 0, label: 'Tidak Diketahui'}]"
						:value.sync="data.flag_locus"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait locus pelanggaran"
						:value.sync="data.keterangan_locus"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Tempus"
						:options="[{value: 1, label: 'Diketahui'}, {value: 0, label: 'Tidak Diketahui'}]"
						:value.sync="data.flag_tempus"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait tempus pelanggaran"
						:value.sync="data.keterangan_tempus"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Prosedural"
						:options="[{value: 1, label: 'Kewenangan DJBC'}, {value: 0, label: 'Bukan Kewenangan DJBC'}]"
						:value.sync="data.flag_kewenangan"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait kewenangan prosedural"
						:value.sync="data.keterangan_kewenangan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="SDM"
						:options="[{value: 1, label: 'Tersedia'}, {value: 0, label: 'Tidak tersedia'}]"
						:value.sync="data.flag_sdm"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait ketersediaan sumber daya manusia"
						:value.sync="data.keterangan_sdm"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Sarana Prasarana"
						:options="[{value: 1, label: 'Tersedia'}, {value: 0, label: 'Tidak tersedia'}]"
						:value.sync="data.flag_sarpras"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait ketersediaan sarana dan prasarana"
						:value.sync="data.keterangan_sarpras"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Anggaran"
						:options="[{value: 1, label: 'Tersedia'}, {value: 0, label: 'Tidak tersedia'}]"
						:value.sync="data.flag_anggaran"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait ketersediaan anggaran"
						:value.sync="data.keterangan_anggaran"
					/>
				</CCol>
			</CRow>

			<!-- KELAYAKAN -->
			<CRow>
				<CCol sm="12">
					<h5>Kelayakan Penindakan</h5>
				</CCol>
			</CRow>
			<CRow>
				<CCol class="col-3" md="1">
					<CSwitch 
						class="mx-1" 
						color="success" 
						variant="3d" 
						v-bind="labelIcon" 
						:checked.sync="data.flag_layak_penindakan"
						@update:checked="togglePenindakan"
					/>
				</CCol>
				<CCol class="col-9" md="6">
					Layak dilakukan penindakan
				</CCol>
			</CRow>
			<CRow v-if="data.flag_layak_penindakan">
				<CCol md="3" sm="12">
					<CSelect
						label="Skema Penindakan"
						:options="skema_penindakan_options"
						:value.sync="data.skema_penindakan.id"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait pelaksanaan penindakan"
						:value.sync="data.keterangan_skema_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow v-else>
				<CCol md="3" sm="12">
					<CSelect
						label="Kelayakan Patroli"
						:options="[{value: 1, label: 'Layak'}, {value: 0, label: 'Tidak layak'}]"
						:value.sync="data.flag_layak_patroli"
					/>
				</CCol>
				<CCol md="9" sm="12">
					<CTextarea
						label="Keterangan"
						description="Keterangan terkait kelayakan patroli"
						:value.sync="data.keterangan_patroli"
					/>
				</CCol>
			</CRow>

			<!-- KESIMPULAN -->
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Kesimpulan"
						:value.sync="data.kesimpulan"
					/>
				</CCol>
			</CRow>

			<!-- PEJABAT -->
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPenerbit"
						:state.sync="state"
						:label="{jabatan: 'Jabatan Penerbit', nama: 'Nama Penerbit'}"
						:selectable_jabatan="['bd.0503', 'bd.0504']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.penerbit.user.user_id"
						:jabatan.sync="data.penerbit.jabatan.kode"
						:plh.sync="data.penerbit.plh"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan"
						:state.sync="state"
						:label="{jabatan: 'Jabatan Atasan', nama: 'Nama Atasan'}"
						:selectable_jabatan="['bd.05']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.atasan.user.user_id"
						:jabatan.sync="data.atasan.jabatan.kode"
						:plh.sync="data.atasan.plh"
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
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import converters from '../../../helpers/converter.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

const default_data = {
	tanggal_dokumen: null,
	jenis_sumber: 'NHI',
	sumber_id: null,
	nomor_sumber: null,
	tanggal_sumber: null,
	dugaan_pelanggaran: {id: 1},
	flag_pelaku: 1,
	keterangan_pelaku: null,
	flag_pelanggaran: 1,
	keterangan_pelanggaran: null,
	flag_locus: 1,
	keterangan_locus: null,
	flag_tempus: 1,
	keterangan_tempus: null,
	flag_kewenangan: 1,
	keterangan_kewenangan: null,
	flag_sdm: 1,
	keterangan_sdm: null,
	flag_sarpras: 1,
	keterangan_sarpras: null,
	flag_anggaran: 1,
	keterangan_anggaran: null,
	flag_layak_penindakan: true,
	skema_penindakan: {id: 1},
	keterangan_skema_penindakan: null,
	flag_layak_patroli: null,
	keterangan_patroli: null,
	kesimpulan: null,
	penerbit: {
		jabatan: {kode: 'bd.0503'},
		plh: false,
		user: {user_id: null}
	},
	atasan: {
		jabatan: {kode: 'bd.05'},
		plh: false,
		user: {user_id: null}
	},
}

const custom_validations_default = {
	tanggal_dokumen: {
		state: false,
		text: 'Tanggal LAP wajib diisi'
	},
	tanggal_sumber: {
		state: false,
		text: 'Tanggal sumber informasi wajib diisi'
	},
}

export default {
	name: 'FormLap',
	components: {
		DatePicker,
		MyAlert,
		MySelectPejabat,
	},
	props: {
		state: String,
		doc_id: Number,
	},
	data() {
		return {
			doc_type: 'lap',
			data: JSON.parse(JSON.stringify(default_data)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			tipe_sumber: 'nhi',
			search_query: null,
			search_value: null,
			search_items: [],
			search_exception: null,
			dugaan_pelanggaran_options: [],
			skema_penindakan_options: [],
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById(this.doc_type, this.doc_id)
			this.data = response.data.data

			this.fillDefault()
			if (this.data.skema_penindakan == null) {
				this.data.skema_penindakan = {id: null}
			}
			if (this.data.sumber_id != null) {
				this.changeTipeSumber(this.data.jenis_sumber)
				this.search_exception = this.data.sumber_id
				await this.search_sumber(this.data.nomor_sumber)
				this.search_value = this.search_items[0]
				this.data_source = this.data.jenis_sumber
			}
			
			this.$nextTick(function () {
				this.renderData()
			})
		},
		fillDefault() {
			this.data.flag_layak_penindakan = this.data.flag_layak_penindakan == 1 ? true : false
		},
		renderData() {
			this.validatorDatetime(this.data.tanggal_dokumen, 'DD-MM-YYYY', 'validasi.tanggal_dokumen', this.validasi.tanggal_dokumen.text)
			this.validatorDatetime(this.data.tanggal_sumber, 'DD-MM-YYYY', 'validasi.tanggal_sumber', this.validasi.tanggal_sumber.text)
			this.$refs.selectPenerbit.selected_jabatan = this.data.penerbit.jabatan.kode
			this.$refs.selectPenerbit.togglePlh(this.data.penerbit.plh)
			this.$refs.selectPenerbit.getPetugas(this.data.penerbit.user.user_id, true)
			this.$refs.selectAtasan.selected_jabatan = this.data.atasan.jabatan.kode
			this.$refs.selectAtasan.togglePlh(this.data.atasan.plh)
			this.$refs.selectAtasan.getPetugas(this.data.atasan.user.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)
					this.fillDefault()
					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert('Data LAP berhasil disimpan')
				} catch (error) {
					console.log('form lap - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					this.data = await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.fillDefault()
					this.alert('Data LAP berhasil diubah')
				} catch (error) {
					console.log('form lap - update data - error', error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorDatetime(val, format, validasiName, text) { 
			let dt = converters.date(val, format)
			let valid = validators.date(dt)
			_.set(this, validasiName+'.state', valid)
			_.set(this, validasiName+'.text', text)
		},
		async getKategoriPelanggaran() {
			let response = await api.getApi('/pelanggaran')
			let kategori_pelanggaran = response.data.data
			kategori_pelanggaran.forEach(element => {
				let option = {
					value: element.id,
					label: element.kategori
				}
				this.dugaan_pelanggaran_options.push(option)
			});
		},
		async getSkemaPenindakan() {
			let response = await api.getApi('/penindakan')
			let skema_penindakan = response.data.data
			skema_penindakan.forEach(element => {
				let option = {
					value: element.id,
					label: element.skema
				}
				this.skema_penindakan_options.push(option)
			});
		},
		toggleSource(val) {
			this.data.jenis_sumber = val
			this.changeTipeSumber(val)

			// Nullify related data
			this.data.nomor_sumber = null
			this.data.tanggal_sumber = null
			this.data.sumber_id = null
			this.search_value = null			
		},
		changeTipeSumber(val) {
			// Change source document
			if (val == 'NHI') {
				this.tipe_sumber = 'nhi'
			} else if (val == 'LI-1') {
				this.tipe_sumber = 'li'
			} else {
				this.tipe_sumber = null
			}
		},
		async changeValueSumber(id) {
			if (id != null) {
				// Get data sumber
				let response = await api.getDisplayDataById(this.tipe_sumber, id)
				let doc = response.data.data
				
				// Change current data according to li
				this.data.nomor_sumber = doc.no_dok_lengkap
				this.data.tanggal_sumber = doc.tanggal_dokumen
				
				// Specify sumber id
				this.data.sumber_id = id
			}
		},
		async search_sumber(search) {
			let data = {'src': search, 'flt': {kode_status: 200}, 'exc': this.search_exception}
			let responses = await api.searchDoc(this.tipe_sumber, data)
			this.search_items = responses.data.data
		},
		togglePenindakan(val) {
			if (val == true) {
				this.data.skema_penindakan = {id: 1}
				this.data.flag_layak_patroli = null
			} else {
				this.data.skema_penindakan = {id: null}
				this.data.flag_layak_patroli = 1
			}
			this.data.keterangan_skema_penindakan = null
			this.data.keterangan_layak_patroli = null
		}
	},
	watch: {
		data: function(val) {
			this.renderData()
		},
		async search_query (val) {
			await this.search_sumber(val)
		},
	},
	async mounted() {
		this.getKategoriPelanggaran()
		this.getSkemaPenindakan()
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
.form-lap .row+.row {
	margin-top:0;
}
.form-lap .v-text-field__details {
	display: none;
}

.form-lap .input-group .form-control {
	border-top-right-radius: 0.25rem !important;
	border-bottom-right-radius: 0.25rem !important;
}

/* V-AUTOCOMPLETE */
.form-lap .v-input__slot {
	min-height: 34px !important;
	font-size: 14px;
}
.form-lap .v-input__prepend-outer {
	margin: 0 !important;
} 
</style>
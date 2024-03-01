<template>
	<div class="wrapper my-form">
		<CForm class="pt-3">
			<CRow>
				<CCol md="6" sm="12">
					<div class="form-group">
						<label>Nomor LKAI</label>
						<v-autocomplete
							class="no-message"
							v-model="lkai_search_value"
							outlined
							dense
							:items.sync="lkai_search_items"
							:search-input.sync="lkai_search_query"
							item-text="no_dok_lengkap"
							item-value="id"
							@change="changeValueLkai"
						>
							<template v-slot:no-data>
								<v-list-item>
									<v-list-item-title>
										Data LKAI tidak ditemukan
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
						<small class="form-text text-muted w-100">Nomor LKAI sebagai sumber penerbitan NI</small>
					</div>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						:label="`Tanggal LKAI`"
						:value.sync="data.tanggal_lkai"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4" sm="12">
					<CSelect
						label="Sifat"
						:description="`Kategori sifat NI`"
						:options="sifat_ni_options"
						:value.sync="data.sifat"
					/>
				</CCol>
				<CCol md="4" sm="12">
					<CSelect
						label="Klasifikasi"
						:description="`Kategori klasifikasi NI`"
						:options="klasifikasi_ni_options"
						:value.sync="data.klasifikasi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="8">
					<CInput
						label="Penerima"
						:description="`Jabatan penerima NI`"
						:value.sync="data.tujuan"
						:is-valid="validatorRequired('tujuan', data.tujuan)"
						invalid-feedback="Pihak penerima wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol>
					<CTextarea
						label="Uraian"
						:value.sync="data.uraian"
						rows="10"
					/>
				</CCol>
			</CRow>

			<!-- Pejabat -->
			<CRow class="sep">
				<CCol md="12">
					<MySelectPejabat
						ref="selectPejabat"
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Penerbit', 'nama': 'Nama Penerbit'}"
						:default_jabatan.sync="default_penerbit"
						:jabatan.sync="data.petugas.penerbit.kode_jabatan"
						:tipe_ttd.sync="data.petugas.penerbit.tipe_ttd"
						:nip.sync="data.petugas.penerbit.nip"
					/>
				</CCol>
			</CRow>

			<!-- Tembusan -->
			<CRow class="sep">
				<CCol md="8">
					<label>Tembusan</label>
					<CRow>
						<CCol>
							<div class="input-container" v-for="(val,id) in data.tembusan" :key="id">
								<MyComboboxTembusan
									:value.sync="data.tembusan[id]"
									:except.sync="data.tembusan"
									@delete-data="delCc(id)"
								/>
							</div>
						</CCol>
					</CRow>
					<CRow>
						<CCol>
							<CButton color="primary" @click="addCc">+ Tambah</CButton>
						</CCol>
					</CRow>
				</CCol>
			</CRow>

			<!-- Button simpan -->
			<CRow class="mt-4">
				<CCol sm="12">
					<CButton
						color="success"
						@click="saveData()"
					>
						Simpan
					</CButton>
				</CCol>
			</CRow>

			<!-- Alert -->
			<MyAlert ref="alert"></MyAlert>
		</CForm>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import store from '../../../store'
import validators from '../../../helpers/validator'
import DefaultNi from './DefaultNi'
import MyAlert from '../../components/AlertSubmit.vue'
import MyComboboxTembusan from '../../components/ComboboxTembusan.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

export default {
	name: 'FormNi',
	components: {
		MyAlert,
		MyComboboxTembusan,
		MySelectPejabat,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(DefaultNi.data)),
			lkai_search_value: null,
			lkai_search_items: [],
			lkai_search_query: null,
			lkai_search_exception: null,
			sifat_ni_options: JSON.parse(JSON.stringify(store.getters.sifatSurat)),
			klasifikasi_ni_options: JSON.parse(JSON.stringify(store.getters.klasifikasiSurat)),
			default_penerbit: 'bd.05',
			validations: {
				tujuan: false,
			}
		}
	},
	watch: {
		async lkai_search_query (val) {
			await this.search_lkai(val)
		},
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById('ni', this.doc_id)

			this.data = response.data
			if (this.data.lkai_id != null) {
				this.lkai_search_exception = this.data.lkai_id
				await this.search_lkai(this.data.nomor_lkai)
				this.lkai_search_value = this.lkai_search_items[0]
			}
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)
					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert(`Data NI berhasil disimpan`)
				} catch (error) {
					console.log(`form ni - save data - error`, error)
				}
			} else if (this.state == 'edit') {
				try {
					let update_data = this.data
					this.data = await api.updateDoc(this.doc_type, update_data.id, update_data)
					this.$emit('update:doc_id', this.data.id)
					this.alert(`Data NI berhasil diubah`)
				} catch (error) {
					console.log(`form ni - update data - error`, error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		async changeValueLkai(id) {
			if (id != null) {
				// Get data LKAI
				let response = await api.getDocumentById('lkai', id)
				let lkai = response.data
				
				// Change current data according to lkai
				this.data.tanggal_lkai = lkai.tanggal_dokumen
				
				// Specify lkai id
				this.data.lkai_id = id
			} else {
				this.data.lkai_id = null
				this.data.tanggal_lkai = null
			}
		},
		async search_lkai(search) {
			let data = {
				'src': search, 
				'flt': {'kode_status': ['terbit']},
				'exc': this.lkai_search_exception, 
			}
			let responses = await api.searchDoc('lkai', data)
			this.lkai_search_items = responses.data.data
		},
		addCc() {
			this.data.tembusan.push(null)
		},
		delCc(id) {
			this.data.tembusan.splice(id,1)
		},
		validatorRequired(field, val) { 
			let validation = validators.required(val) 
			this.validations[field] = validation
			return validation
		},
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>

</style>
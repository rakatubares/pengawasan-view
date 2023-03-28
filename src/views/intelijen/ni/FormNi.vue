<template>
	<div class="wrapper my-form">
		<CForm class="pt-3">
			<CRow>
				<CCol md="6" sm="12">
					<div class="form-group">
						<label>Nomor {{label_lkai}}</label>
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
										Data {{label_lkai}} tidak ditemukan
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
						<small class="form-text text-muted w-100">Nomor {{label_lkai}} sebagai sumber penerbitan {{label_ni}}</small>
					</div>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						:label="`Tanggal ${label_lkai}`"
						:value.sync="data.tanggal_lkai"
						disabled
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="4" sm="12">
					<CSelect
						label="Sifat"
						:description="`Kategori sifat ${label_ni}`"
						:options="sifat_ni_options"
						:value.sync="data.sifat"
					/>
				</CCol>
				<CCol md="4" sm="12">
					<CSelect
						label="Klasifikasi"
						:description="`Kategori klasifikasi ${label_ni}`"
						:options="klasifikasi_ni_options"
						:value.sync="data.klasifikasi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="8">
					<CInput
						label="Penerima"
						:description="`Jabatan penerima ${label_ni}`"
						:value.sync="data.tujuan"
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
						:label="{jabatan: 'Jabatan Penerbit', nama: 'Nama Penerbit'}"
						:selectable_jabatan="['bd.05']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.penerbit.user.user_id"
						:jabatan.sync="data.penerbit.jabatan.kode"
						:plh.sync="data.penerbit.plh"
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
import MyAlert from '../../components/AlertSubmit.vue'
import MyComboboxTembusan from '../../components/ComboboxTembusan.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

const default_sifat_ni_options = ['segera', 'sangat segera']
const default_klasifikasi_ni_options = ['rahasia', 'sangat rahasia']
const default_data = {
	lkai_id: null,
	nomor_lkai: null,
	tanggal_lkai: null,
	sifat: default_sifat_ni_options[0],
	klasifikasi: default_klasifikasi_ni_options[0],
	tujuan: null,
	uraian: null,
	penerbit: {
		jabatan: {kode: null},
		plh: false,
		user: {user_id: null},
	},
	tembusan: []
}

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
		label_ni: String,
		tipe_lkai: String,
		label_lkai: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			lkai_search_value: null,
			lkai_search_items: [],
			lkai_search_query: null,
			lkai_search_exception: null,
			sifat_ni_options: JSON.parse(JSON.stringify(default_sifat_ni_options)),
			klasifikasi_ni_options: JSON.parse(JSON.stringify(default_klasifikasi_ni_options)),
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById(this.doc_type, this.doc_id)
			this.data = response.data.data

			if (this.data.lkai_id != null) {
				this.lkai_search_exception = this.data.lkai_id
				await this.search_lkai(this.data.nomor_lkai)
				this.lkai_search_value = this.lkai_search_items[0]
			}

			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectPejabat.selected_jabatan = this.data.penerbit.jabatan.kode
			this.$refs.selectPejabat.togglePlh(this.data.penerbit.plh)
			this.$refs.selectPejabat.getPetugas(this.data.penerbit.user.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)
					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert(`Data ${this.label_ni} berhasil disimpan`)
				} catch (error) {
					console.log(`form ${this.doc_type} - save data - error`, error)
				}
			} else if (this.state == 'edit') {
				try {
					let update_data = this.data
					this.data = await api.updateDoc(this.doc_type, update_data.id, update_data)
					this.$emit('update:doc_id', this.data.id)
					this.alert(`Data ${this.label_ni} berhasil diubah`)
				} catch (error) {
					console.log(`form ${this.doc_type} - update data - error`, error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		async changeValueLkai(id) {
			if (id != null) {
				// Get data LKAI
				let response = await api.getDisplayDataById(this.tipe_lkai, id)
				let lkai = response.data.data
				
				// Change current data according to lkai
				this.data.tanggal_lkai = lkai.tanggal_dokumen
				
				// Specify lkai id
				this.data.lkai_id = id
			}
		},
		async search_lkai(search) {
			let data = {'src': search, 'exc': this.lkai_search_exception, 'flt': {kode_status: 200}}
			let responses = await api.searchDoc(this.tipe_lkai, data)
			this.lkai_search_items = responses.data.data
		},
		addCc() {
			this.data.tembusan.push(null)
		},
		delCc(id) {
			this.data.tembusan.splice(id,1)
		},
	},
	watch: {
		async lkai_search_query (val) {
			await this.search_lkai(val)
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
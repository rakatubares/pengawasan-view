<template>
	<div class="wrapper my-form">
		<!-- Form BA Penitipan header -->
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
					<div class="form-group">
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
						<small class="form-text text-muted w-100">Nomor BA Penyegelan sarana pengangkut/barang yang terhadapnya dilakukan penitipan</small>
					</div>
				</CCol>
				<CCol md="3" sm="12">
					<CInput
						label="Tanggal Segel"
						:value.sync="data.segel.tanggal"
						disabled
					>
					</CInput>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Lokasi Penitipan"
						description="Lokasi/alamat tempat yang terhadapnya dilakukan penitipan"
						:value.sync="data.lokasi_titip"
						:is-valid="validatorRequired"
						invalid-feedback="Lokasi penitipan wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectPenerima"
						label="Nama Penerima"
						description="Nama orang yang menerima penitipan"
						showPekerjaan
						showAlamat
						:id.sync="data.penerima.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectSaksi"
						label="Nama Saksi"
						description="Orang yang menyaksikan penitipan"
						:id.sync="data.saksi.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas1"
						label="Nama Petugas 1"
						description="Nama Pejabat Bea dan Cukai yang melakukan penitipan"
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
						description="Nama Pejabat Bea dan Cukai yang melakukan penitipan"
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
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSprint from '../../components/SelectSprint.vue'

const default_data = {
	sprint: {id: null},
	segel: {
		id: null,
		tanggal: null
	},
	lokasi_titip: null,
	penerima: {id: null},
	saksi: {id: null},
	petugas1: {user_id: null},
	petugas2: {user_id: null},
}

export default {
	name: 'FormTitip',
	components: {
		MyAlert,
		MySelectEntitas,
		MySelectPetugas,
		MySelectSprint
	},
	props: {
		state: String,
		doc_id: Number
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			segel_search_value: null,
			segel_search_items: [],
			segel_search_query: null,
			segel_search_exception: null
		}
	},
	methods: {
		async getData() {
			// Get data titip
			let response = await api.getFormDataById('titip', this.doc_id)
			this.data = response.data.data

			// Set default value for saksi and petugas2 if null
			if (this.data.saksi == null) {
				this.data.saksi = {id: null}
			}
			if (this.data.petugas2 == null) {
				this.data.petugas2 = {user_id: null}
			}

			// Get data segel
			this.segel_search_exception = this.data.segel.id
			await this.search_segel(this.data.segel.nomor)
			this.segel_search_value = this.segel_search_items[0]

			// Render input data
			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectSprint.getSprint(this.data.sprint.id, true)
			this.$refs.selectPenerima.getEntitas(this.data.penerima.id, true)
			this.$refs.selectSaksi.getEntitas(this.data.saksi.id, true)
			this.$refs.selectPetugas1.getPetugas(this.data.petugas1.user_id, true)
			this.$refs.selectPetugas2.getPetugas(this.data.petugas2.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					let response = await api.storeDoc('titip', this.data)
					this.$emit('update:doc_id', response.id)
					this.$emit('update:state', 'edit')
					this.alert('Data BA Penitipan berhasil disimpan')
				} catch (error) {
					console.log('form titip - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc('titip', this.doc_id, this.data)
					this.alert('Data BA Penitipan berhasil diubah')
				} catch (error) {
					console.log('form titip - update data - error', response)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		async changeValueSegel(id) {
			if (id != null) {
				// Get data segel
				let response = await api.getDisplayDataById('segel', id)
				let segel = response.data.data
				
				// Change current data according to segel
				this.data.segel.tanggal = segel.penindakan.tanggal_penindakan
				
				// Specify segel id
				this.data.segel.id = id
			}
		},
		async search_segel(search) {
			let data = {'src': search, 'exc': this.segel_search_exception}
			let responses = await api.searchDoc('segel', data)
			this.segel_search_items = responses.data.data
		}
	},
	watch: {
		async segel_search_query (val) {
			await this.search_segel(val)
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
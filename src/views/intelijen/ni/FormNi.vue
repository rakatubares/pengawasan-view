<template>
	<div class="wrapper my-form">
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySearchDocument
						doc_type="lkai"
						label="LKAI"
						description="Nomor LKAI sebagai sumber penerbitan NI"
						:value.sync="data.lkai_id"
						:exceptions.sync="saved_lkai"
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
				<CCol sm="12">
					<MyComboboxJabatan
						label="Penerima NI"
						description="Tujuan penerima NI"
						:value.sync="data.tujuan"
						:default_jabatan="default_tujuan"
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
					<MyInputTembusan
						:value.sync="data.tembusan"
					/>
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
import MyComboboxJabatan from '../../components/ComboboxJabatan.vue'
// import MyComboboxTembusan from '../../components/ComboboxTembusan.vue'
import MyInputTembusan from '../../components/InputTembusan.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

export default {
	name: 'FormNi',
	components: {
		MyAlert,
		MyComboboxJabatan,
		// MyComboboxTembusan,
		MyInputTembusan,
		MySearchDocument,
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
			saved_lkai: null,
			sifat_ni_options: JSON.parse(JSON.stringify(store.getters.sifatSurat)),
			klasifikasi_ni_options: JSON.parse(JSON.stringify(store.getters.klasifikasiSurat)),
			default_tujuan: DefaultNi.data.tujuan,
			default_penerbit: 'bd.05',
			validations: {
				tujuan: false,
			}
		}
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById('ni', this.doc_id)

			this.data = response.data
			this.saved_lkai = this.data.lkai_id
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

			// LKAI ID for search exception
			this.saved_lkai = this.data.lkai_id
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
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
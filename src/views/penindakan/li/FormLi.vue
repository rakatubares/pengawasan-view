<template>
	<div class="wrapper form-li">
		<CForm class="pt-3">
			<CRow>
				<CCol sm="12">
					<CInput
						label="Sumber / Media Informasi"
						:value.sync="data.sumber"
						:is-valid="validatorRequired"
						invalid-feedback="Sumber informasi wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Isi Informasi"
						:value.sync="data.informasi"
						:is-valid="validatorRequired"
						invalid-feedback="Isi informasi wajib diisi"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Tindak Lanjut"
						:value.sync="data.tindak_lanjut"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Catatan"
						:value.sync="data.catatan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectPenerbit"
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
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

const default_data = {
	sumber: null,
	informasi: null,
	tindak_lanjut: null,
	catatan: null,
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

export default {
	name: 'FormLi',
	components: {
		MyAlert,
		MySelectPejabat,
	},
	props: {
		state: String,
		doc_id: Number
	},
	data() {
		return {
			doc_type: 'li',
			data: JSON.parse(JSON.stringify(default_data)),
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById(this.doc_type, this.doc_id)
			this.data = response.data.data
			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.$refs.selectPenerbit.selected_jabatan = this.data.penerbit.jabatan.kode
			this.$refs.selectPenerbit.getPetugas(this.data.penerbit.user.user_id, true)
			this.$refs.selectAtasan.selected_jabatan = this.data.atasan.jabatan.kode
			this.$refs.selectAtasan.getPetugas(this.data.atasan.user.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					console.log('form li - doc id 1', this.doc_id)
					let response = await api.storeDoc(this.doc_type, this.data)
					this.$emit('update:doc_id', response.id)
					this.$emit('update:state', 'edit')
					this.alert('Data LI-1 berhasil disimpan')
					console.log('form li - doc id 2', this.doc_id)
				} catch (error) {
					console.log('form li - save data - error', error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.alert('Data LI-1 berhasil diubah')
				} catch (error) {
					console.log('form li - update data - error', error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>
.form-li .row+.row {
	margin-top:0;
}
.form-li .v-text-field__details {
	display: none;
}
</style>
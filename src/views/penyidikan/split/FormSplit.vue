<template>
	<div class="wrapper my-form">
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectLpf
						ref="selectLpf"
						:id.sync="data.id_lpf"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="8" sm="12">
					<CTextarea
						label="Dugaan Pelanggaran"
						:value.sync="data.dugaan_pelanggaran"
						description="diisi uraian singkat dugaan pelanggaran"
						:is-valid="validatorRequired"
						invalid-feedback="Dugaan pelanggaran wajib diisi"
					/>
				</CCol>
			</CRow>

			<!-- Petugas -->
			<CRow class="sep">
				<CCol sm="12">
					<CRow>
						<CCol>
							<h4>Petugas:</h4>
						</CCol>
					</CRow>
					<CRow v-for="(petugas, index) in data.petugas" :key="index" :id="`petugas-${index}`">
						<CCol md="12">
							<MySelectPetugas
								:ref="`selectPetugas${index}`"
								label="Nama Petugas"
								:id.sync="data.petugas[index]['user_id']"
								role="p2vue.penindakan"
							>
								<template #button v-if="index > 0">
									<div class="form-group">
										<label>&nbsp;</label>
										<CButton 
											style="height: calc(1.5em + 0.75rem + 2px);"
											class="w-100 d-block" 
											color="danger" 
											@click="delOfficer(index)" 
										>
											<CIcon name="cil-trash"/>
										</CButton>
									</div>
								</template>
							</MySelectPetugas>
						</CCol>
					</CRow>
					<CRow>
						<CCol>
							<CButton color="primary" @click="addOfficer">+ Tambah</CButton>
						</CCol>
					</CRow>
				</CCol>
			</CRow>

			<!-- Pejabat -->
			<CRow class="sep mt-4">
				<CCol>
					<h4>Pejabat:</h4>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan"
						:state.sync="state"
						:label="{jabatan: 'Jabatan Penerbit SPLIT', nama: 'Nama Pejabat Penerbit SPLIT'}"
						:selectable_jabatan="['bd.0505']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.pemberi_perintah.user.user_id"
						:jabatan.sync="data.pemberi_perintah.jabatan.kode"
						:plh.sync="data.pemberi_perintah.plh"
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
import MySelectLpf from '../lpf/SelectLpf.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import validators from '../../../helpers/validator.js'

const default_data = {
	id_lpf: null,
	dugaan_pelanggaran: null,
	petugas: [{user_id: null}],
	pemberi_perintah: {
		jabatan: {kode: null},
		plh: null,
		user: {user_id: null},
	},
	tembusan: []
}

export default {
	name: 'FormSplit',
	components: {
		MyAlert,
		MyComboboxTembusan,
		MySelectLpf,
		MySelectPejabat,
		MySelectPetugas,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
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
			this.$refs.selectLpf.getData(this.data.id_lpf, true)
			this.renderOfficers()
			this.$refs.selectAtasan.selected_jabatan = this.data.pemberi_perintah.jabatan.kode
			this.$refs.selectAtasan.togglePlh(this.data.pemberi_perintah.plh)
			this.$refs.selectAtasan.getPetugas(this.data.pemberi_perintah.user.user_id, true)
		},
		renderOfficers() {
			for (let index = 0; index < this.data.petugas.length; index++) {
				const refName = `selectPetugas${index}`
				const refs = this.$refs[refName]
				refs[0].changeValue(this.data.petugas[index]['user_id'], true)
			}
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)

					this.renderOfficers()

					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert(`Data SPLIT berhasil disimpan`)
				} catch (error) {
					console.log(`form ${this.doc_type} - save data - error`, error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.alert(`Data SPLIT berhasil diubah`)
				} catch (error) {
					console.log(`form ${this.doc_type} - update data - error`, error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		addOfficer() {
			this.data.petugas.push({'user_id': null})
		},
		delOfficer(id) {
			this.data.petugas.splice(id,1)
			this.renderOfficers()
		},
		addCc() {
			this.data.tembusan.push(null)
		},
		delCc(id) {
			this.data.tembusan.splice(id,1)
		},
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	},
}
</script>

<style>

</style>
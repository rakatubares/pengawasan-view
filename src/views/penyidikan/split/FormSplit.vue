<template>
	<div class="wrapper my-form">
		<CForm class="pt-3">

			<CRow>
				<CCol>
					<MySearchDocument
						ref="SearchDocument"
						doc_type="lpf"
						label="LPF"
						:value.sync="data.lpf.id"
						:exceptions.sync="saved_source_id"
					/>
				</CCol>
			</CRow>

			<CRow>
				<CCol md="8" sm="12">
					<CTextarea
						label="Dugaan Pelanggaran"
						:value.sync="data.dugaan_pelanggaran"
						description="diisi uraian singkat dugaan pelanggaran"
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
					<CRow v-for="(petugas, index) in data.petugas.pelaksana" :key="index" :id="`petugas-${index}`">
						<CCol md="12">
							<MySelectPetugas
								:ref="`selectPetugas${index}`"
								label="Nama Petugas"
								:nip.sync="data.petugas.pelaksana[index]['nip']"
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
						:state.sync="state"
						:label="{'jabatan': 'Jabatan Penerbit SPLIT', 'nama': 'Nama Pejabat Penerbit SPLIT'}"
						:default_jabatan.sync="default_pejabat"
						:jabatan.sync="data.petugas.pejabat.kode_jabatan"
						:tipe_ttd.sync="data.petugas.pejabat.tipe_ttd"
						:nip.sync="data.petugas.pejabat.nip"
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
		</CForm>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyComboboxTembusan from '../../components/ComboboxTembusan.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'

export default {
	name: 'FormSplit',
	components: {
		MyComboboxTembusan,
		MySearchDocument,
		MySelectPejabat,
		MySelectPetugas,
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(this.document)),
			default_pejabat: 'bd.0505',
			saved_source_id: this.document.lpf.id,
		}
	},
	watch: {
		document(val) { 
			this.data = val
			this.$nextTick(() => {
				this.renderOfficers()
			})
		}
	},
	methods: {
		renderOfficers() {
			for (let index = 0; index < this.data.petugas.pelaksana.length; index++) {
				const refName = `selectPetugas${index}`
				const refs = this.$refs[refName]
				refs[0].changeOfficer(this.data.petugas.pelaksana[index]['nip'], true)
			}
		},
		async saveData() {
			if (this.state == 'insert') {
				var data = await api.storeDoc(this.doc_type, this.data)
				this.saved_source_id = data.lpf.id
				this.renderOfficers()
				this.$emit('update:state', 'edit')
			} else if (this.state == 'edit') {
				var data = await api.updateDoc(this.doc_type, this.data.id, this.data)
			}
			this.$emit('save-data', data)
		},
		addOfficer() {
			this.data.petugas.pelaksana.push({'user_id': null})
		},
		delOfficer(id) {
			this.data.petugas.pelaksana.splice(id,1)
			this.renderOfficers()
		},
		addCc() {
			this.data.tembusan.push(null)
		},
		delCc(id) {
			this.data.tembusan.splice(id,1)
		},
	},
}
</script>

<style>

</style>
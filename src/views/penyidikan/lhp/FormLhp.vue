<template>
	<div class="wrapper my-form">
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectSplit
						ref="selectSplit"
						:id.sync="data.id_split"
					/>
				</CCol>
			</CRow>

			<!-- Saksi -->
			<CRow class="sep">
				<CCol sm="12">
					<CRow>
						<CCol>
							<h4>Saksi:</h4>
						</CCol>
					</CRow>
					<CRow v-for="(saksi, index) in data.saksi" :key="index" :id="`saksi-${index}`">
						<CCol md="12">
							<MySelectEntitas
								:ref="`selectEntitas${index}`"
								label="Nama Saksi"
								:id.sync="data.saksi[index]['id']"
								role="p2vue.penindakan"
							>
								<template #button v-if="index > 0">
									<div class="form-group">
										<label>&nbsp;</label>
										<CButton 
											style="height: calc(1.5em + 0.75rem + 2px);"
											class="w-100 d-block" 
											color="danger" 
											@click="delWitness(index)" 
										>
											<CIcon name="cil-trash"/>
										</CButton>
									</div>
								</template>
							</MySelectEntitas>
						</CCol>
					</CRow>
					<CRow>
						<CCol>
							<CButton color="primary" @click="addWitness">+ Tambah</CButton>
						</CCol>
					</CRow>
				</CCol>
			</CRow>

			<!-- Uraian -->
			<CRow class="sep mt-3">
				<CCol sm="12">
					<CTextarea
						label="Kesimpulan"
						description="Diisi kesimpulan penelitian"
						:value.sync="data.kesimpulan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Alternatif penyelesaian perkara"
						description="Diisi usulan alternatif penyelesaian perkara"
						:value.sync="data.alternatif_penyelesaian"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Informasi lainnya"
						description="Diisi informasi yang perlu dikembangkan lebih lanjut terkait dengan pelanggaran yang terjadi"
						:value.sync="data.informasi_lain"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Catatan atasan"
						description="Diisi catatan/disposisi atas lembar resume perkara oleh pejabat atasan dari/atasan langsung penyusun LHP"
						:value.sync="data.catatan"
					/>
				</CCol>
			</CRow>
			
			<!-- TTD -->
			<CRow class="pt-3">
				<CCol md="12">
					<MySelectPetugas
						ref="selectPeneliti"
						label="Ketua Tim Peneliti"
						description="Nama Ketua Tim Peneliti pembuat LHP/Pejabat Fungsional yang melaksanakan tugas dan fungsi di bidang Penyidikan"
						:id.sync="data.peneliti.user_id"
						role="p2vue.penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan1"
						:state.sync="state"
						:label="{jabatan: 'Pejabat Eselon IV yang melaksanakan tugas dan fungsi di Bidang Penyidikan', nama: 'Nama Pejabat'}"
						:selectable_jabatan="['bd.0505']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.atasan1.user.user_id"
						:jabatan.sync="data.atasan1.jabatan.kode"
						:plh.sync="data.atasan1.plh"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan2"
						:state.sync="state"
						:label="{jabatan: 'Jabatan Atasan dari Pejabat Eselon IV', nama: 'Nama Pejabat'}"
						:selectable_jabatan="['bd.05']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.atasan2.user.user_id"
						:jabatan.sync="data.atasan2.jabatan.kode"
						:plh.sync="data.atasan2.plh"
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
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectSplit from '../split/SelectSplit.vue'

const default_data = {
	id_split: null,
	saksi: [{id: null}],
	peneliti: {user_id: null},
	atasan1: {
		jabatan: {kode: null},
		plh: null,
		user: {user_id: null},
	},
	atasan2: {
		jabatan: {kode: null},
		plh: null,
		user: {user_id: null},
	},
}

export default {
	name: 'FormLhp',
	components: {
		MyAlert,
		MySelectEntitas,
		MySelectPejabat,
		MySelectPetugas,
		MySelectSplit,
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
			this.$refs.selectSplit.getData(this.data.id_split, true)
			this.renderWitness()
			this.$refs.selectPeneliti.getPetugas(this.data.peneliti.user_id, true)
			this.$refs.selectAtasan1.selected_jabatan = this.data.atasan1.jabatan.kode
			this.$refs.selectAtasan1.togglePlh(this.data.atasan1.plh)
			this.$refs.selectAtasan1.getPetugas(this.data.atasan1.user.user_id, true)
			this.$refs.selectAtasan2.selected_jabatan = this.data.atasan2.jabatan.kode
			this.$refs.selectAtasan2.togglePlh(this.data.atasan2.plh)
			this.$refs.selectAtasan2.getPetugas(this.data.atasan2.user.user_id, true)
		},
		renderWitness() {
			for (let index = 0; index < this.data.saksi.length; index++) {
				const refName = `selectEntitas${index}`
				const refs = this.$refs[refName]
				refs[0].getEntitas(this.data.saksi[index]['id'], true)
			}
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)

					this.renderWitness()

					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert(`Data LHP berhasil disimpan`)
				} catch (error) {
					console.log(`form ${this.doc_type} - save data - error`, error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.alert(`Data LHP berhasil diubah`)
				} catch (error) {
					console.log(`form ${this.doc_type} - update data - error`, error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		addWitness() {
			this.data.saksi.push({'id': null})
		},
		delWitness(id) {
			this.data.saksi.splice(id,1)
			this.renderWitness()
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
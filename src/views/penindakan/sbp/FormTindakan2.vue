<template>
	<div class="wrapper my-form">
		<CRow class="mx-2 mt-2">
			<CCol col="12">
				<CForm class="pt-3">
					<CRow>
						<CCol sm="12">
							<h4>Tindakan yang Dilakukan</h4>
						</CCol>
					</CRow>

					<!-- Toggle Pemeriksaan Badan -->
					<CRow>
						<CCol class="col-3" md="1">
							<CSwitch 
								class="mx-1" 
								color="success" 
								variant="3d" 
								v-bind="labelIcon" 
								:checked.sync="flags.riksa_badan"
								:disabled.sync="disabled_tindakan.riksa_badan"
							/>
						</CCol>
						<CCol class="col-9" md="11" v-bind:class="{'text-muted': disabled_tindakan.riksa_badan}">
							Pemeriksaan Badan
						</CCol>
					</CRow>

					<!-- Toggle Pemeriksaan -->
					<CRow>
						<CCol class="col-3" md="1">
							<CSwitch 
								class="mx-1" 
								color="success" 
								variant="3d" 
								v-bind="labelIcon" 
								:checked.sync="flags.riksa"
								:disabled.sync="disabled_tindakan.riksa"
							/>
						</CCol>
						<CCol class="col-9" md="11" v-bind:class="{'text-muted': disabled_tindakan.riksa}">
							Pemeriksaan
						</CCol>
					</CRow>

					<!-- Toggle Penegahan -->
					<CRow>
						<CCol class="col-3" md="1">
							<CSwitch 
								class="mx-1" 
								color="success" 
								variant="3d" 
								v-bind="labelIcon" 
								:checked.sync="flags.tegah"
								:disabled.sync="disabled_tindakan.tegah"
							/>
						</CCol>
						<CCol class="col-9" md="11" v-bind:class="{'text-muted': disabled_tindakan.tegah}">
							Penegahan
						</CCol>
					</CRow>

					<!-- Toggle Penyegelan -->
					<CRow>
						<CCol class="col-3" md="1">
							<CSwitch 
								class="mx-1" 
								color="success" 
								variant="3d" 
								v-bind="labelIcon" 
								:checked.sync="flags.segel"
								:disabled.sync="disabled_tindakan.segel"
							/>
						</CCol>
						<CCol class="col-9" md="11" v-bind:class="{'text-muted': disabled_tindakan.segel}">
							Penyegelan
						</CCol>
					</CRow>

					<!-- Data segel -->
					<CRow v-if="flags.segel">
						<CCol class="col-12">
							<CRow>
								<CCol class="col-12" md="3">
									<CSelect
										label="Jenis Segel"
										:options="['Kertas', 'Kunci', 'Timah', 'Lakban', 'Segel Elektronik', 'Lainnya']"
										:value.sync="data_segel.jenis_segel"
									/>	
								</CCol>
								<CCol class="col-12" md="2">
									<CInput
										label="Jumlah Segel"
										:value.sync="data_segel.jumlah_segel"
									/>	
								</CCol>
								<CCol class="col-12" md="3">
									<CInput
										label="Satuan"
										:value.sync="data_segel.satuan_segel"
									/>	
								</CCol>
							</CRow>
							<CRow>
								<CCol class="col-12">
									<CInput
										label="Penempatan Segel"
										:value.sync="data_segel.tempat_segel"
									/>	
								</CCol>
							</CRow>
							<CRow>
								<CCol class="col-12">
									<CInput
										label="Nomor Segel"
										:value.sync="data_segel.nomor_segel"
									/>	
								</CCol>
							</CRow>
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
			</CCol>
		</CRow>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyAlert from '../../components/AlertSubmit.vue'

const default_flags = {
	riksa_badan: false,
	riksa: false,
	tegah: false,
	segel: false,
}

const default_segel = {
	jenis_segel: 'Kertas',
	jumlah_segel: null,
	satuan_segel: null,
	tempat_segel: null,
	nomor_segel: 'BA-      /Segel/KPU.305/'
}

export default {
	name: "FormTindakan",
	components: {
		MyAlert,
	},
	props: {
		penindakan: Object,
	},
	data() {
		return {
			chains: [],
			disabled_tindakan: JSON.parse(JSON.stringify(default_flags)),
			flags: JSON.parse(JSON.stringify(default_flags)),
			data_segel: JSON.parse(JSON.stringify(default_segel)),
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
		}
	},
	methods: {
		getAvailableTindakan() {
			this.disabled_tindakan['riksa_badan'] = this.penindakan 
				? !['badan'].some(r => Object.keys(this.penindakan.objek).includes(r)) 
				: true
			this.disabled_tindakan['riksa'] = this.penindakan 
				? !['sarkut', 'barang', 'bangunan'].some(r => Object.keys(this.penindakan.objek).includes(r)) 
				: true
			this.disabled_tindakan['tegah'] = this.penindakan 
				? !['sarkut', 'barang'].some(r => Object.keys(this.penindakan.objek).includes(r)) 
				: true
			this.disabled_tindakan['segel'] = this.penindakan 
				? !['sarkut', 'barang', 'bangunan'].some(r => Object.keys(this.penindakan.objek).includes(r)) 
				: true
			this.disabled_save = this.penindakan ? false : true
		},
		async listChain() {
			let response = await api.getDocumentsChain('penindakan', this.penindakan.id)
			let chains = response.data
			this.flag_tindakan(chains, 'riksa_badan')
			this.flag_tindakan(chains, 'riksa')
			this.flag_tindakan(chains, 'tegah')
			this.flag_tindakan(chains, 'segel')

			if (this.flags['segel']) { this.getSegel(chains) }
		},
		flag_tindakan(chains, tindakan) {
			let flag = false
			chains.map(function (chain) {
				if (chain.doc_type == tindakan) {
					flag = true
				}
			})

			this.flags[tindakan] = flag
		},
		async getSegel(chains) {
			let segel_id = null
			chains.map(function (chain) {
				if (chain.doc_type == 'segel') {
					segel_id = chain.doc_id
				}
			})

			let response = await api.getDocumentById('segel', segel_id)
			let segel = response.data
			this.data_segel = {
				jenis_segel: segel.jenis_segel,
				jumlah_segel: segel.jumlah_segel,
				satuan_segel: segel.satuan_segel,
				tempat_segel: segel.tempat_segel,
				nomor_segel: segel.nomor_segel,
			}
		},
		async saveData() {
			try {
				let data = {
					riksa_badan: this.flags['riksa_badan'], 
					riksa: this.flags['riksa'], 
					tegah: this.flags['tegah'], 
					segel: this.flags['segel'],
					data_segel: this.data_segel,
				}
				await api.saveTindakan(data, this.penindakan.id)
				
				this.alert(`Data tindakan berhasil disimpan`)
			} catch (error) {
				console.log(`form tindakan - save data - error`, error)
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
	},
	async mounted() {
		this.getAvailableTindakan()
		await this.listChain()
	}
}
</script>

<style>

</style>
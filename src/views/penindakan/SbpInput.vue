<template>
	<div class="wrapper">
		<CRow>
			<CCol>
				<CTableWrapper
					:fields="fields"
					:items="list_sbp"
				>
					<template #header>
						<CIcon name="cil-grid"/>Data SBP
						<div class="card-header-actions">
							<CButton 
								color="primary" 
								@click="inputSbpModal = true"
								class="mr-1"
							>
								+ Tambah SBP
							</CButton>
						</div>
					</template>
				</CTableWrapper>
			</CCol>
		</CRow>

		<!-- Modal Input SBP -->
		<CModal
			title="Input Data SBP"
			size="xl"
			:show.sync="inputSbpModal"
			@update:show="inputSbpModal === false && closeInputSbpModal()"
		>
			<CTabs 
				:activeTab.sync="tabs.current" 
			>
				<CTab title="Header">
					<CForm class="pt-3">
						<CRow>
							<CCol md="9" sm="12">
								<CInput
									label="No Sprint"
									description="Nomor Surat Perintah"
									:value.sync="sbp_header_form.data.no_sprint"
									:is-valid="validatorRequired"
									invalid-feedback="No SPRINT wajib diisi"
									@update:value="
										sbp_header_form.editted = true
										validasi.header.vals.no_sprint = validatorRequired(sbp_header_form.data.no_sprint)
										validatorHeader()
									"
								/>
							</CCol>
							<CCol md="3" sm="12">
								<div class="form-group">
									<label class="w-100">Tgl Sprint</label>
									<date-picker 
										v-model="sbp_header_form.data.tgl_sprint" 
										format="DD-MM-YYYY" 
										type="date"
										@change="
											sbp_header_form.editted = true
											validatorDatetime($event, 'validasi.header.vals.tgl_sprint')
											validatorHeader()
										"
									>
										<template v-slot:input="slotProps">
											<input
												class="form-control" 
												type="text" 
												v-bind="slotProps.props" 
												v-on="slotProps.events"
												v-bind:class="{
													'is-valid': validasi.header.vals.tgl_sprint.state,
													'is-invalid': !validasi.header.vals.tgl_sprint.state
												}"
											/>
											<div class="invalid-feedback pb-1">{{validasi.header.vals.tgl_sprint.text}}</div>
										</template>
										<i slot="icon-calendar"></i>
									</date-picker>	
								</div>
							</CCol>
						</CRow>
						<CRow>
							<CCol sm="12">
								<CInput
									label="Lokasi Penindakan"
									description="Tempat / lokasi dilakukan penindakan"
									:value.sync="sbp_header_form.data.lokasi_penindakan"
									:is-valid="validatorRequired"
									invalid-feedback="Lokasi penindakan wajib diisi"
									@update:value="
										sbp_header_form.editted = true
										validasi.header.vals.lokasi_penindakan = validatorRequired(sbp_header_form.data.lokasi_penindakan)
										validatorHeader()
									"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol sm="12">
								<CTextarea
									label="Uraian Penindakan"
									description="Uraian / kronologis singkat terkait penindakan"
									:value.sync="sbp_header_form.data.uraian_penindakan"
									@update:value="sbp_header_form.editted = true"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol sm="12">
								<CTextarea
									label="Alasan Penindakan"
									description="Pertimbangan dan alasan dilakukannya penindakan"
									:value.sync="sbp_header_form.data.alasan_penindakan"
									@update:value="sbp_header_form.editted = true"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="4" sm="12">
								<CSelect
									label="Jenis Pelanggaran"
									description="Jenis dugaan pelanggaran"
									:options="jenisPelanggaranOptions"
									:value.sync="sbp_header_form.data.jenis_pelanggaran"
									@update:value="sbp_header_form.editted = true"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="3" sm="12">
								<div class="form-group">
									<label class="w-100">Waktu mulai penindakan</label>
									<date-picker 
										v-model="sbp_header_form.data.wkt_mulai_penindakan" 
										format="DD-MM-YYYY HH:mm" 
										type="datetime"
										@change="
											sbp_header_form.editted = true
											validatorDatetime($event, 'validasi.header.vals.wkt_mulai_penindakan', 'Waktu mulai penindakan wajib diisi')
											validatorSequence(
												$event, 
												sbp_header_form.data.wkt_selesai_penindakan, 
												'validasi.header.vals.wkt_mulai_penindakan',
												'validasi.header.vals.wkt_selesai_penindakan',
												'Waktu mulai penindakan sebelum waktu selesai',
												'Waktu selesai penindakan setelah waktu mulai'
											)
											validatorHeader()
										"
									>
										<template v-slot:input="slotProps">
											<input
												class="form-control" 
												type="text" 
												v-bind="slotProps.props" 
												v-on="slotProps.events"
												v-bind:class="{
													'is-valid': validasi.header.vals.wkt_mulai_penindakan.state,
													'is-invalid': !validasi.header.vals.wkt_mulai_penindakan.state
												}"
											/>
											<div class="invalid-feedback pb-1">{{validasi.header.vals.wkt_mulai_penindakan.text}}</div>
										</template>
										<i slot="icon-calendar"></i>
										<i slot="icon-clear"></i>
									</date-picker>
								</div>
							</CCol>
							<CCol md="3" sm="12">
								<div class="form-group">
									<label class="w-100">Waktu selesai penindakan</label>
									<date-picker 
										v-model="sbp_header_form.data.wkt_selesai_penindakan" 
										format="DD-MM-YYYY HH:mm" 
										type="datetime"
										@change="
											sbp_header_form.editted = true
											validatorDatetime($event, 'validasi.header.vals.wkt_selesai_penindakan', 'Waktu selesai penindakan wajib diisi')
											validatorSequence(
												sbp_header_form.data.wkt_mulai_penindakan, 
												$event, 
												'validasi.header.vals.wkt_mulai_penindakan',
												'validasi.header.vals.wkt_selesai_penindakan',
												'Waktu mulai penindakan sebelum waktu selesai',
												'Waktu selesai penindakan setelah waktu mulai'
											)
											validatorHeader()
										"
									>
										<template v-slot:input="slotProps">
											<input
												class="form-control" 
												type="text" 
												v-bind="slotProps.props" 
												v-on="slotProps.events"
												v-bind:class="{
													'is-valid': validasi.header.vals.wkt_selesai_penindakan.state,
													'is-invalid': !validasi.header.vals.wkt_selesai_penindakan.state
												}"
											/>
											<div class="invalid-feedback pb-1">{{validasi.header.vals.wkt_selesai_penindakan.text}}</div>
										</template>
										<i slot="icon-calendar"></i>
										<i slot="icon-clear"></i>
									</date-picker>
								</div>
							</CCol>
						</CRow>
						<CRow>
							<CCol sm="12">
								<CTextarea
									label="Hal yang terjadi"
									description="Hal-hal lain yang perlu diterangkan pada saat proses penindakan"
									:value.sync="sbp_header_form.data.hal_terjadi"
									@update:value="sbp_header_form.editted = true"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol sm="12">
								<CInput
									label="Nama Pengangkut/Pemilik/Kuasa/Saksi"
									description="Nama terang Pengangkut/Pemilik/Kuasa/Saksi yang menyaksikan penindakan"
									:value.sync="sbp_header_form.data.nama_pemilik"
									:is-valid="validatorRequired"
									invalid-feedback="Nama pengangkut/pemilik/kuasa/saksi wajib diisi"
									@update:value="
										sbp_header_form.editted = true
										validasi.header.vals.nama_pemilik = validatorRequired(sbp_header_form.data.nama_pemilik)
										validatorHeader()
									"
								/>
							</CCol>
						</CRow>
					</CForm>
				</CTab>
				<CTab v-if="tabs.visibility[1]" title="Detail">
					<CRow class="mt-3">
						<CCol md="3" sm="12">
							<CButton 
								block 
								color="primary"
								@click="inputDetailSbpModal = true"
							>
								<CIcon name="cil-plus"/>
								Tambah objek penindakan
							</CButton>
						</CCol>
					</CRow>

					<!-- Display data detail sarkut -->
					<CRow 
						v-if="display_details.sarkut.state"
						class="mt-3 mx-2 pt-3 border-top"
					>
						<CCol col="12">
							<CRow>
								<CCol md="12">
									<h5>
										Sarana Pengangkut
									</h5>
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Nama Sarana Pengangkut</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.sarkut.data.nama_sarkut}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Jenis Sarana Pengangkut</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.sarkut.data.jenis_sarkut}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>No Voyage/Penerbangan/Trayek</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.sarkut.data.no_flight_trayek}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Ukuran/Kapasitas Muatan</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.sarkut.data.kapasitas_sarkut}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Nahkoda/Pilot/Pengemudi</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.sarkut.data.nama_pilot_pengemudi}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Bendera</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.sarkut.data.bendera}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Nomor Register/Polisi</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.sarkut.data.no_reg_polisi}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CButton 
									class="mx-1" 
									size="sm" 
									color="success"
									@click="editDetail('sarkut')"
								>
									<CIcon name="cil-pencil"/>&nbsp; Edit
								</CButton>
								<CButton 
									class="mx-1" 
									size="sm" 
									color="danger"
									@click="confirmDeleteDetail('sarkut')"
								>
									<CIcon name="cil-trash"/>&nbsp; Hapus
								</CButton>
							</CRow>
						</CCol>
					</CRow>

					<!-- Display data detail barang -->
					<CRow 
						v-if="display_details.barang.state"
						class="mt-3 mx-2 pt-3 border-top"
					>
						<CCol col="12">
							<CRow>
								<CCol md="12">
									<h5>Barang</h5>
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Jumlah/Jenis Kemasan</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.barang.data.kemasan}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Jenis/Nomor dan Tanggal Dokumen</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.barang.data.dokumen}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Pemilik/Importir/Eksportir/Kuasa</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.barang.data.pemilik}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CButton 
									class="mx-1"
									size="sm" 
									color="success"
									@click="editDetail('barang')"
								>
									<CIcon name="cil-pencil"/>&nbsp; Edit
								</CButton>
								<CButton 
									class="mx-1" 
									size="sm" 
									color="danger"
									@click="confirmDeleteDetail('barang')"
								>
									<CIcon name="cil-trash"/>&nbsp; Hapus
								</CButton>
							</CRow>
							<CRow>
								<CCol>
									<CTableData
										class="mt-3"
										:fields="fields_barang"
										:items="list_barang"
										:editData="editBarang"
										:deleteData="deleteBarang"
									>
										<template #header>
											<CButton 
												color="primary" 
												class="mr-1"
												@click="inputBarangModal = true"
											>
												+ Tambah Barang
											</CButton>
										</template>
									</CTableData>
								</CCol>
							</CRow>
						</CCol>
					</CRow>

					<!-- Display data detail bangunan -->
					<CRow 
						v-if="display_details.bangunan.state"
						class="mt-3 mx-2 pt-3 border-top"
					>
						<CCol col="12">
							<CRow>
								<CCol md="12">
									<h5>Bangunan / Tempat</h5>
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Alamat</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.bangunan.data.alamat}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>No Reg. Bangunan/NPPPBKC</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.bangunan.data.no_reg}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Pemilik</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.bangunan.data.pemilik}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Identitas Pemilik</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.bangunan.data.identitas}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CButton 
									class="mx-1"
									size="sm" 
									color="success"
									@click="editDetail('bangunan')"
								>
									<CIcon name="cil-pencil"/>&nbsp; Edit
								</CButton>
								<CButton 
									class="mx-1" 
									size="sm" 
									color="danger"
									@click="confirmDeleteDetail('bangunan')"
								>
									<CIcon name="cil-trash"/>&nbsp; Hapus
								</CButton>
							</CRow>
						</CCol>
					</CRow>

					<!-- Display data detail badan -->
					<CRow 
						v-if="display_details.badan.state"
						class="mt-3 mx-2 pt-3 border-top"
					>
						<CCol col="12">
							<CRow>
								<CCol md="12">
									<h5>Badan / Orang</h5>
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Nama</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.badan.data.nama}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Tanggal Lahir</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.badan.data.tgl_lahir}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Kewarganegaraan</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.badan.data.warga_negara}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Alamat</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.badan.data.alamat}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CCol md="3">
									<b>Nomor Identitas</b>
								</CCol>
								<CCol md="9">
									&nbsp;{{display_details.badan.data.identitas}}
								</CCol>
							</CRow>
							<CRow class="mt-2 ml-1">
								<CButton 
									class="mx-1"
									size="sm" 
									color="success"
									@click="editDetail('badan')"
								>
									<CIcon name="cil-pencil"/>&nbsp; Edit
								</CButton>
								<CButton 
									class="mx-1" 
									size="sm" 
									color="danger"
									@click="confirmDeleteDetail('badan')"
								>
									<CIcon name="cil-trash"/>&nbsp; Hapus
								</CButton>
							</CRow>
						</CCol>
					</CRow>
				</CTab>
			</CTabs>
			<template #footer>
				<CButton 
					class="btn-nav prev" 
					color="info" 
					shape="pill" 
					:disabled="tabs.current == 0" 
					@click="tabs.current-=1"
				>
					<CIcon name="cil-chevron-circle-left-alt"/>
					{{tabs.names[tabs.current-1]}}
				</CButton>
				<div class="btn-action">
					<CButton
						class="mx-1"
						color="secondary"
						@click="closeInputSbpModal"
					>
						Kembali
					</CButton>
					<CButton 
						class="mx-1" 
						v-if="tabs.current == 0" 
						color="success" 
						@click="submitSbpHeader" 
					>
						Simpan
					</CButton>
				</div>
				<CButton 
					class="btn-nav next"
					color="info" 
					shape="pill" 
					:disabled="tabs.current+1 == tabs.names.length"	
					@click="tabs.current+=1"
				>
					{{tabs.names[tabs.current+1]}}
					<CIcon name="cil-chevron-circle-right-alt"/>
				</CButton>
			</template>
		</CModal>

		<!-- Modal Input Detail SBP -->
		<CModal
			class="modal-level-2"
			title="Input Detail SBP"
			size="xl"
			:show.sync="inputDetailSbpModal"
			@update:show="inputDetailSbpModal === false && closeInputDetailSbpModal()"
		>
			<CRow>
				<CCol md="4">
					<CSelect
						label="Objek penindakan"
						placeholder="pilih objek penindakan"
						:options="jenisPenindakanOptions"
						:value.sync="activeDetailForm"
						:is-valid="validatorRequired"
						invalid-feedback="Objek penindakan harus dipilih"
					/>
				</CCol>
			</CRow>

			<!-- Form Detail Sarana Pengangkut -->
			<CRow v-if="activeDetailForm == 'sarkut'">
				<CCol col="12">
					<CForm>
						<CRow>
							<CCol md="8" sm="12">
								<CInput
									label="Nama sarana pengangkut"
									:value.sync="sbp_details_form.sarkut.data.nama_sarkut"
									:is-valid="validatorRequired"
									invalid-feedback="Nama sarana pengangkut wajib diisi"
								/>
							</CCol>
							<CCol md="4" sm="12">
								<CInput
									label="Jenis sarana pengangkut"
									:value.sync="sbp_details_form.sarkut.data.jenis_sarkut"
									:is-valid="validatorRequired"
									invalid-feedback="Jenis sarana pengangkut wajib diisi"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="4" sm="12">
								<CInput
									label="Nomor voyage/penerbangan/trayek"
									:value.sync="sbp_details_form.sarkut.data.no_flight_trayek"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="4" sm="8">
								<CInput
									label="Ukuran/kapasitas muatan"
									:value.sync="sbp_details_form.sarkut.data.kapasitas"
								/>
							</CCol>
							<CCol md="2" sm="4">
								<CInput
									label="Satuan muatan"
									:value.sync="sbp_details_form.sarkut.data.satuan_kapasitas"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="6" sm="12">
								<CInput
									label="Nama nahkoda/pengemudi/pilot"
									:value.sync="sbp_details_form.sarkut.data.nama_pilot_pengemudi"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="3" sm="12">
								<CInput
									label="Bendera"
									:value.sync="sbp_details_form.sarkut.data.bendera"
								/>
							</CCol>
							<CCol md="3" sm="12">
								<CInput
									label="Nomor registrasi/polisi"
									:value.sync="sbp_details_form.sarkut.data.no_reg_polisi"
								/>
							</CCol>
						</CRow>
					</CForm>
				</CCol>
			</CRow>

			<!-- Form Detail Barang -->
			<CRow v-if="activeDetailForm == 'barang'">
				<CCol col="12">
					<CForm>
						<CRow>
							<CCol md="4">
								<CInput
									label="Jumlah kemasan"
									:value.sync="sbp_details_form.barang.data.jumlah_kemasan"
									:is-valid="validatorInteger"
									invalid-feedback="Jumlah kemasan wajib diisi"
								/>
							</CCol>
							<CCol md="2">
								<CInput
									label="Satuan kemasan"
									:value.sync="sbp_details_form.barang.data.satuan_kemasan"
									:is-valid="validatorRequired"
									invalid-feedback="Satuan kemasan wajib diisi"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="2">
								<CInput
									label="Jenis dokumen"
									description="Jenis dokumen yang menyertai barang"
									:value.sync="sbp_details_form.barang.data.jns_dok"
								/>
							</CCol>
							<CCol md="4">
								<CInput
									label="Nomor dokumen"
									description="Nomor dokumen yang menyertai barang"
									:value.sync="sbp_details_form.barang.data.no_dok"
								/>
							</CCol>
							<CCol md="2">
								<div class="form-group">
									<label class="w-100">Tanggal dokumen</label>
									<date-picker 
										v-model="sbp_details_form.barang.data.tgl_dok" 
										format="DD-MM-YYYY" 
										value-type="format"
										type="date"
									></date-picker>
								</div>
							</CCol>
						</CRow>
						<CRow>
							<CCol>
								<CInput
									label="Nama pemilik/importir/eksportir/kuasa"
									:value.sync="sbp_details_form.barang.data.pemilik"
									:is-valid="validatorRequired"
									invalid-feedback="Nama pemilik/importir/eksportir/kuasa wajib diisi"
								/>
							</CCol>
						</CRow>
					</CForm>
				</CCol>
			</CRow>

			<!-- Form Detail Bangunan -->
			<CRow v-if="activeDetailForm == 'bangunan'">
				<CCol col="12">
					<CForm>
						<CRow>
							<CCol md="12">
								<CTextarea
									label="Alamat"
									description="Tempat/lokasi dilakukan penindakan"
									:value.sync="sbp_details_form.bangunan.data.alamat"
									:is-valid="validatorRequired"
									invalid-feedback="Alamat wajib diisi"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="6">
								<CInput
									label="Nomor registrasi"
									description="Nomor registrasi bangunan/NPPBKC/NPWP/dokumen lainnya yang berkaitan dengan bangunan/tempat lain yang terhadapnya dilakukan penindakan"
									:value.sync="sbp_details_form.bangunan.data.no_reg"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="6">
								<CInput
									label="Nama pemilik/yang menguasai"
									description="Nama pemilik/yang menguasai tempat/bangunan"
									:value.sync="sbp_details_form.bangunan.data.pemilik"
									:is-valid="validatorRequired"
									invalid-feedback="Nama pemilik wajib diisi"
								/>
							</CCol>
							<CCol md="4">
								<CInput
									label="Jenis identitas"
									description="Jenis Identitas pemilik/yang menguasai"
									:value.sync="sbp_details_form.bangunan.data.jns_identitas"
								/>
							</CCol>
							<CCol md="4">
								<CInput
									label="Nomor identitas"
									description="Nomor Identitas pemilik/yang menguasai"
									:value.sync="sbp_details_form.bangunan.data.no_identitas"
								/>
							</CCol>
						</CRow>
					</CForm>
				</CCol>
			</CRow>

			<!-- Form Detail Badan -->
			<CRow v-if="activeDetailForm == 'badan'">
				<CCol col="12">
					<CForm>
						<CRow>
							<CCol md="12">
								<CInput
									label="Nama"
									description="Nama orang yang dilakukan penindakan"
									:value.sync="sbp_details_form.badan.data.nama"
									:is-valid="validatorRequired"
									invalid-feedback="Nama wajib diisi"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="6">
								<div class="form-group">
									<label class="w-100">Tanggal Lahir</label>
									<date-picker 
										v-model="sbp_details_form.badan.data.tgl_lahir" 
										format="DD-MM-YYYY" 
										value-type="format"
										type="date"
									></date-picker>	
								</div>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="6">
								<CInput
									label="Kewarganegaraan"
									description="Warga negara orang yang dilakukan penindakan"
									:value.sync="sbp_details_form.badan.data.warga_negara"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="12">
								<CTextarea
									label="Alamat"
									description="Alamat orang yang dilakukan penindakan"
									:value.sync="sbp_details_form.badan.data.alamat"
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md="2">
								<CInput
									label="Jenis identitas"
									description="Jenis identias orang yang dilakukan penindakan"
									:value.sync="sbp_details_form.badan.data.jns_identitas"
								/>
							</CCol>
							<CCol md="4">
								<CInput
									label="Nomor identitas"
									description="Nomor identitas orang yang dilakukan penindakan"
									:value.sync="sbp_details_form.badan.data.no_identitas"
								/>
							</CCol>
						</CRow>
					</CForm>
				</CCol>
			</CRow>
			<template #footer>
				<CButton
					class="btn"
					color="secondary"
					@click="closeInputDetailSbpModal"
				>
					Kembali
				</CButton>
				<CButton
					class="btn"
					color="success"
					@click="submitSbpDetail(activeDetailForm)"
				>
					Simpan
				</CButton>
			</template>
		</CModal>

		<!-- Modal Tambah Barang -->
		<CModal
			class="modal-level-2"
			title="Input Data Barang"
			:show.sync="inputBarangModal"
			@update:show="inputBarangModal === false && closeInputBarangModal()"
		>
			<CForm>
				<CRow>
					<CCol>
						<CTextarea
							label="Uraian barang"
							:value.sync="sbp_barang_form.data.uraian_barang"
							:is-valid="validatorRequired"
							invalid-feedback="Uraian barang wajib diisi"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="6">
						<CInput
							label="Jumlah"
							:value.sync="sbp_barang_form.data.jumlah_barang"
							:is-valid="validatorNumber"
							invalid-feedback="Jumlah barang wajib diisi"
						/>
					</CCol>
					<CCol md="4">
						<CInput
							label="Satuan"
							:value.sync="sbp_barang_form.data.satuan_barang"
							:is-valid="validatorRequired"
							invalid-feedback="Satuan barang wajib diisi"
						/>
					</CCol>
				</CRow>
			</CForm>
			<template #footer>
				<CButton
					class="btn"
					color="secondary"
					@click="closeInputBarangModal"
				>
					Kembali
				</CButton>
				<CButton
					class="btn"
					color="success"
					@click="submitBarang"
				>
					Simpan
				</CButton>
			</template>
		</CModal>

		<!-- Modal Delete Confirm -->
		<CModal
			class="modal-level-2"
			title="Konfirmasi Hapus Data"
			:show.sync="confirmDeleteModal.state"
			:centered="true"
		>
			<span>Apakan Anda yakin data <b>{{confirmDeleteModal.text}}</b> akan dihapus?</span>
			<template #footer>
				<CButton
					class="btn"
					color="secondary"
					@click="closeConfirmDeleteModal"
				>
					Kembali
				</CButton>
				<CButton
					v-if="confirmDeleteModal.type == 'detail_barang'"
					class="btn"
					color="danger"
					@click="deleteDataBarang" 
				>
					Hapus
				</CButton>
				<CButton
					v-else
					class="btn"
					color="danger"
					@click="deleteData" 
				>
					Hapus
				</CButton>
			</template>
		</CModal>

		<!-- Alert -->
		<CAlert
			class="alert-fixed"
			:show.sync="alert.countDown"
			closeButton
			:color.sync="alert.color"
			fade
		>
			{{alert.text}}
		</CAlert>
						
	</div>
</template>

<script>
// Vue libraries
import _ from 'lodash'
import axios from "axios"
import DatePicker from 'vue2-datepicker'

// Core UI components
import CTableWrapper from '../components/Table.vue'
import CTableData from '../components/TableData.vue'

// My files
import validators from '../../helpers/validator.js'

// CSS
import 'vue2-datepicker/index.css'

DatePicker.locale('id')

const url = 'http://pengawasan.local/api/sbp'
const fields = [
	{ key: 'no_sbp_lengkap', label: 'No SBP' },
	{ key: 'tgl_sbp', label: 'Tgl SBP' },
	{ key: 'nama_pemilik', label: 'Pemilik' },
	{ key: 'pejabat1', label: 'Petugas' }
]
const fields_barang = [
	{ key: 'uraian_barang', label: 'Uraian Barang' },
	{ key: 'jumlah', label: 'Jumlah' },
	{ key: 'actions', label: '' }
]
const sbp_header_form_default = {
	state: 'insert',
	editted: false,
	data: {
		id: null,
		no_sprint: null,
		tgl_sprint: null,
		lokasi_penindakan: null,
		uraian_penindakan: null,
		alasan_penindakan: null,
		jenis_pelanggaran: 'Kepabeanan',
		wkt_mulai_penindakan: null,
		wkt_selesai_penindakan: null,
		hal_terjadi: null,
		nama_pemilik: null,
		pejabat1: 'Pemeriksa'
	}
}
const sbp_details_form_default = {
	sarkut: {
		editted: false,
		data: {
			sbp_id: null,
			nama_sarkut: null,
			jenis_sarkut: null,
			no_flight_trayek: null,
			kapasitas: null,
			satuan_kapasitas: null,
			nama_pilot_pengemudi: null,
			bendera: null,
			no_reg_polisi: null,
		}
	},
	barang: {
		editted: false,
		data: {
			sbp_id: null,
			jumlah_kemasan: null,
			satuan_kemasan: null,
			jsn_dok: null,
			no_dok: null,
			tgl_dok: null,
			pemilik: null,
		}
	},
	bangunan: {
		editted: false,
		data: {
			sbp_id: null,
			alamat: null,
			no_reg: null,
			pemilik: null,
			jns_identitas: null,
			no_identitas: null,
		}
	},
	badan: {
		editted: false,
		data: {
			sbp_id: null,
			nama: null,
			tgl_lahir: null,
			warga_negara: null,
			alamat: null,
			jns_identitas: null,
			no_identitas: null,
		}
	}
}
const sbp_barang_form_default = {
	state: 'insert',
	editted: false,
	data: {
		id: null,
		uraian_barang: null,
		jumlah_barang: null,
		satuan_barang: null
	}
}
const validations_default = {
	header: {
		state: false,
		vals: {
			no_sprint: false,
			tgl_sprint: {
				state: false,
				text: 'Tanggal SPRINT wajib diisi'
			},
			lokasi_penindakan: false,
			wkt_mulai_penindakan: {
				state: false,
				text: 'Waktu mulai penindakan wajib diisi'
			},
			wkt_selesai_penindakan: {
				state: false,
				text: 'Waktu selesai penindakan wajib diisi'
			},
			nama_pemilik: false,
		}
	},
}
const alert_default = {
	color: "success",
	text: "",
	countDown: false
}
const tabs_default = {
	current: 0,
	names: ['Header', 'Detail'],
	visibility: [true, true],
}
const display_details_default = {
	sarkut: {
		state: false,
		data: {
			nama_sarkut: null,
			jenis_sarkut: null,
			no_flight_trayek: null,
			kapasitas_sarkut: null,
			nama_pilot_pengemudi: null,
			bendera: null,
			no_reg_polisi: null,
		}
	},
	barang: {
		state: false,
		data: {
			kemasan: null,
			dokumen: null,
			pemilik: null,
		}
	},
	bangunan: {
		state: false,
		data: {
			alamat: null,
			no_reg: null,
			pemilik: null,
			identitas: null,
		}
	},
	badan: {
		state: false,
		data: {
			nama: null,
			tgl_lahir: null,
			warga_negara: null,
			alamat: null,
			identitas: null,
		}
	}
}
const modal_confirm_delete_default = {
	state: false,
	text: '',
	type: null
}

export default {
	name: 'SbpInput',
	components: { 
		CTableWrapper,
		CTableData,
		DatePicker,
	},
	data() {
		return {
			// Table properties
			fields,
			list_sbp: [],
			fields_barang,
			list_barang: [],

			// Modal properties
			inputSbpModal: false,
			tabs: JSON.parse(JSON.stringify(tabs_default)),
			inputDetailSbpModal: false,
			confirmDeleteModal: JSON.parse(JSON.stringify(modal_confirm_delete_default)),
			inputBarangModal: false,

			// Form header properties
			sbp_header_form: JSON.parse(JSON.stringify(sbp_header_form_default)),
			jenisPelanggaranOptions: ['Kepabeanan', 'Cukai'],

			// Form detail properties
			jenisPenindakanOptions: [
				{ value: 'sarkut', label: 'Sarana Pengangkut' },
				{ value: 'barang', label: 'Barang' },
				{ value: 'bangunan', label: 'Bangunan / Tempat' },
				{ value: 'badan', label: 'Badan / Orang' }
			],
			activeDetailForm: null,
			sbp_details_form: JSON.parse(JSON.stringify(sbp_details_form_default)),
			sbp_barang_form: JSON.parse(JSON.stringify(sbp_barang_form_default)),

			// Display detail
			display_details: JSON.parse(JSON.stringify(display_details_default)),

			// Customs form validations
			validasi: JSON.parse(JSON.stringify(validations_default)),
			
			// Alert
			alert: { ...alert_default },
			console
		}
	},
	methods: {
		getDataSbp() {
			axios
				.get(url)
				.then((response) => {
					this.list_sbp = response.data.data
				})
				.catch((error) => (console.error(error)))
		},
		getDataBarang() {
			let url_list_barang = url + '/' + this.sbp_header_form.data.id + '/barang/detail'
			axios
				.get(url_list_barang)
				.then(
					(response) => {
						let response_data = response.data.data
						let data_barang = []
						for (let idx in response_data) {
							let temp_barang = {
								id: response_data[idx]['id'],
								uraian_barang: response_data[idx]['uraian_barang'],
								jumlah: (response_data[idx]['jumlah_barang'] || '-') + ' ' + (response_data[idx]['satuan_barang'] || '')
							}
							data_barang.push(temp_barang)
						}
						this.list_barang = data_barang
					}
				)
				.catch((error) => (console.error(error)))
		},
		closeInputSbpModal() {
			this.inputSbpModal = false
			this.sbp_header_form = JSON.parse(JSON.stringify(sbp_header_form_default))
			this.validasi = JSON.parse(JSON.stringify(validations_default))
			this.tabs = JSON.parse(JSON.stringify(tabs_default))
		},
		closeInputDetailSbpModal() {
			this.inputDetailSbpModal = false
			this.activeDetailForm = null
			this.sbp_details_form = JSON.parse(JSON.stringify(sbp_details_form_default)) 
		},
		closeInputBarangModal() {
			this.inputBarangModal = false
			this.sbp_barang_form = JSON.parse(JSON.stringify(sbp_barang_form_default))
		},
		closeConfirmDeleteModal() {
			this.confirmDeleteModal = JSON.parse(JSON.stringify(modal_confirm_delete_default))
		},
		submitSbpHeader() {
			let submitMethod
			let submitUrl
			if (this.sbp_header_form.state == 'insert') {
				submitMethod = 'post'
				submitUrl = url
			} else {
				submitMethod = 'put'
				submitUrl = url+'/'+this.sbp_header_form.data.id
			}

			axios({
				method: submitMethod,
				url: submitUrl,
				data: this.sbp_header_form.data
			})
				.then((response) => {
					this.sbp_header_form.state = 'edit'
					this.sbp_header_form.editted = false
					if (submitMethod == 'post') {
						this.sbp_header_form.data.id = response.data.id
					}
					this.tabs.visibility[1] = true
					this.alert = {
						color: "success",
						text: "Data header berhasil disimpan",
						countDown: 2
					}
				})
				.catch((error) => (console.error(error)))
		},
		submitSbpDetail(type) {
			let submit_url = url + '/' + this.sbp_header_form.data.id + '/' + type
			axios
				.post(submit_url, this.sbp_details_form[type]['data'])
				.then(
					(response) => (
						this.displayDetail(type, response.data.data),
						this.alert = {
							color: "success",
							text: "Data " + type + " berhasil disimpan",
							countDown: 2
						}
					)
				)
				.catch((error) => (console.error(error)))
		},
		submitBarang() {
			let submitMethod
			let submitUrl
			if (this.sbp_barang_form.state == 'insert') {
				submitMethod = 'post'
				submitUrl = url + '/' + this.sbp_header_form.data.id + '/barang/detail'
			} else {
				submitMethod = 'put'
				submitUrl = url + '/' + this.sbp_header_form.data.id + '/barang/detail/' + this.sbp_barang_form.data.id
			}

			axios({
				method: submitMethod,
				url: submitUrl,
				data: this.sbp_barang_form.data
			})
				.then(
					(response) => {
						this.sbp_barang_form.state = 'edit'
						this.sbp_barang_form.editted = false
						if (submitMethod == 'post') {
							this.sbp_barang_form.data.id = response.data.data.id
						}
						this.alert = {
							color: "success",
							text: "Data barang berhasil disimpan",
							countDown: 2
						}
						this.getDataBarang()
					}
				)
				.catch((error) => (console.error(error)))
		},
		displayDetail(type, data) {
			if (type == 'sarkut') {
				this.displaySarkut(data)
			} else if (type == 'barang') {
				this.displayBarang(data)
			} else if (type == 'bangunan') {
				this.displayBangunan(data)
			} else if (type == 'badan') {
				this.displayBadan(data)
			} else {
				console.log('display', type, 'tidak ada')
			}
		},
		displaySarkut(data) {
			this.display_details.sarkut.state = true,
			this.display_details.sarkut.data = {
				nama_sarkut: data.nama_sarkut || '-',
				jenis_sarkut: data.jenis_sarkut || '-',
				no_flight_trayek: data.no_flight_trayek || '-',
				kapasitas_sarkut: (data.kapasitas || '-') + ' ' + (data.satuan_kapasitas || ''),
				nama_pilot_pengemudi: data.nama_pilot_pengemudi || '-',
				bendera: data.bendera || '-',
				no_reg_polisi: data.no_reg_polisi || '-'
			}
		},
		displayBarang(data) {
			this.display_details.barang.state = true,
			this.display_details.barang.data = {
				kemasan: (data.jumlah_kemasan || '-') + ' ' + (data.satuan_kemasan || ''),
				dokumen: (data.jns_dok || '') + ' ' + (data.no_dok || '-') + ' / ' + (data.tgl_dok || '-'),
				pemilik: data.pemilik || '-',
			}
		},
		displayBangunan(data) {
			this.display_details.bangunan.state = true,
			this.display_details.bangunan.data = {
				alamat: data.alamat || '-',
				no_reg: data.no_reg || '-',
				pemilik: data.pemilik || '-',
				identitas: (data.jns_identitas || '') + ' ' + (data.no_identitas || '-'),
			}
		},
		displayBadan(data) {
			this.display_details.badan.state = true,
			this.display_details.badan.data = {
				nama: data.nama || '-',
				tgl_lahir: data.tgl_lahir || '-',
				warga_negara: data.warga_negara || '-',
				alamat: data.alamat || '-',
				identitas: (data.jns_identitas || '') + ' ' + (data.no_identitas || '-'),
			}
		},
		editDetail(type) {
			let getUrl = url + '/' + this.sbp_header_form.data.id + '/' + type
			axios
				.get(getUrl)
				.then((response) => (
					this.activeDetailForm = type,
					this.sbp_details_form[type]['data'] = response.data.data,
					this.inputDetailSbpModal = true
				))
				.catch((error) => (console.error(error)))
		},
		editBarang(id) {
			console.log('edit barang', id)
			console.log('sbp header', JSON.stringify(this.sbp_header_form))
			let getUrl = url + '/' + this.sbp_header_form.data.id + '/barang/detail/' + id
			axios
				.get(getUrl)
				.then(
					(response) => {
						this.sbp_barang_form.state = 'update'
						this.sbp_barang_form.data = response.data.data
						this.inputBarangModal = true
					}
				)
				.catch((error) => (console.log(error)))
		},
		confirmDeleteBarang(id) {
			console.log('hapus barang', id)
			this.confirmDeleteModal = {
				state: true,
				text: "barang",
				type: "detail_barang",
				id: id
			}
		},
		confirmDeleteDetail(type) {
			let texts = {
				sarkut: 'sarana pengangkut',
				barang: 'barang',
				bangunan: 'bangunan',
				badan: 'badan',
			}

			this.confirmDeleteModal = {
				state: true,
				text: "detail penindakan " + texts[type],
				type: type,
			}
		},
		deleteData() {
			let delete_url = url + '/' + this.sbp_header_form.data.id + '/' + this.confirmDeleteModal.type
			axios
				.delete(delete_url)
				.then(
					this.display_details[this.confirmDeleteModal.type] = JSON.parse(JSON.stringify(display_details_default[this.confirmDeleteModal.type])),
					this.alert = {
						color: "success",
						text: "Data " + this.confirmDeleteModal.text + " berhasil dihapus",
						countDown: 2
					},
					this.confirmDeleteModal = JSON.parse(JSON.stringify(modal_confirm_delete_default)),
				)
				.catch((error) => (console.error(error)))
		},
		deleteBarang() {
			let delete_url = url + '/' + this.sbp_header_form.data.id + '/barang/detail/' + this.confirmDeleteModal.id
			axios
				.delete(delete_url)
				.then(
					this.getDataBarang(),
					this.alert = {
						color: "success",
						text: "Data " + this.confirmDeleteModal.text + " berhasil dihapus",
						countDown: 2
					},
					this.confirmDeleteModal = JSON.parse(JSON.stringify(modal_confirm_delete_default)),
				)
				.catch((error) => (console.error(error)))
		},
		addListBarang() {
			this.sbp_details_form.barang.list.push(
				{
					editted: false,
					id: null,
					jumlah_barang: null,
					satuan_barang: null,
					uraian_barang: null
				}
			)
			this.validasi.details.barang.list = true
		},
		removeListBarang(index) {
			this.$delete(this.sbp_details_form.barang.list, index)
			if (this.sbp_details_form.barang.list.length == 0) {
				this.validasi.details.barang.list = false
			}
		},
		submitSbpDetailBarang() {
			if (this.sbp_details_form.barang.state == true) {
				if (this.sbp_details_form.barang.list.length > 0) {
					this.validasi.details.barang.list = true
					
					let listValidation = []
					for (const detail of this.sbp_details_form.barang.list) {
						let valid = this.validatorArray(detail['jumlah_barang', 'satuan_barang', 'uraian_barang'])
						listValidation.push(valid)
					}
					let allValid = listValidation.every(Boolean);
					console.log(listValidation)

					if (allValid) {
						this.upsertSbpDetailBarang()	
					} else {
						this.alert = {
							color: "danger",
							text: "Harap lengkapi data barang",
							countDown: 3
						}
					}
				} else {
					this.alert = {
						color: "danger",
						text: "Harap isi data barang",
						countDown: 3
					}
					this.validasi.details.barang.list = false
				}
			} else {
				this.deleteSbpDetailBarang()
			}
		},
		upsertSbpDetailBarang() {
			let url_insert_barang = url + '/' + this.sbp_details_form.sbp_id + '/barang'
			axios
				.post(url_insert_barang, this.sbp_details_form.barang.details)
				.then((response) => {
					this.sbp_details_form.barang.details.id = response.id
					this.submitSbpDetailBarangList()
				})
				.catch((error) => (console.error(error)))
		},
		deleteSbpDetailBarang() {
			let url_delete_barang = url + '/' + this.sbp_details_form.sbp_id + '/barang'
			axios
				.delete(url_delete_barang)
				.then((response) => {
					console.log(response)
				})
				.catch((error) => (console.error(error)))
		},
		submitSbpDetailBarangList() {
			let url_insert_barang_detail = url + '/' + this.sbp_details_form.sbp_id + '/barang/detail'
			axios
				.post(url_insert_barang_detail, this.sbp_details_form.barang.list)
				.then((response) => {
					for (let index = 0; index < response.length; index++) {
						this.sbp_details_form.barang.list.id = response[index].id
					}
				})
				.catch((error) => (console.error(error)))
		},
		validatorHeader() {
			let validations = [
				this.validasi.header.vals.no_sprint,
				this.validasi.header.vals.tgl_sprint.state,
				this.validasi.header.vals.lokasi_penindakan,
				this.validasi.header.vals.wkt_mulai_penindakan.state,
				this.validasi.header.vals.wkt_selesai_penindakan.state,
				this.validasi.header.vals.nama_pemilik,
			]
			let valid = validations.every(Boolean)
			// console.log('validasi header', this.sbp_header_form.editted, valid, validations)
			this.validasi.header.state = valid
		},
		validatorDetailChoices() {
			let choices = [
				this.sbp_details_form.sarkut.state,
				this.sbp_details_form.barang.state,
				this.sbp_details_form.bangunan.state,
				this.sbp_details_form.badan.state,
			]
			let valid = choices.some(choice => choice == true)
			this.validasi.details.choice = valid
			console.log(valid, this.validasi.details.choice, choices)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorArray(arr) { return validators.array(arr) },
		validatorNumber(val) { return validators.number(val) },
		validatorInteger(val) { return validators.integer(val) },
		validatorDatetime(val, validasiName, text) { 
			let valid = validators.date(val)
			_.set(this, validasiName+'.state', valid)
			_.set(this, validasiName+'.text', text)
		},
		validatorSequence(valInitial, valFinal, validasiNameInitial, validasiNameFinal, textInitial, textFinal) {
			if (valInitial != null && valFinal != null) {
				let valid = validators.sequence(valInitial, valFinal)
				_.set(this, validasiNameInitial+'.state', valid)
				_.set(this, validasiNameInitial+'.text', textInitial)
				_.set(this, validasiNameFinal+'.state', valid)
				_.set(this, validasiNameFinal+'.text', textFinal)
			}
		}
	},
	created() {
		this.getDataSbp()
	}
}
</script>

<style>

</style>
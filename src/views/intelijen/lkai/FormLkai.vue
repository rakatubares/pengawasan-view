<template>
    <div class="wrapper my-form">
        <CForm class="pt-4">
            <div>
                <!-- Tanggal Dokumen -->
                <CRow>
                    <CCol md="3" sm="12">
                        <MySelectDate
                            :label="`Tanggal ${label_lkai}`"
                            :value.sync="data.tanggal_dokumen"
                        />
                    </CCol>
                </CRow>

                <!-- Dokumen sumber -->
                <CRow>
                    <CCol class="pb-0" sm="12">
                        <h5>Dokumen Sumber</h5>
                    </CCol>
                </CRow>

                <!-- LPPI -->
                <CRow>
                    <CCol md="12">
                        <MySearchDocument
                            ref="SearchLppi"
                            :doc_type="kode_lppi"
                            :label="label_lppi"
                            :value.sync="data.lppi_id"
                            :exceptions.sync="saved_lppi"
                            @update:value="updateInformasi"
                        />
                    </CCol>
                </CRow>

                <!-- NPI -->
                <CRow class="mt-0">
                    <CCol sm="12" md="8">
                        <CInput
                            :label="`Nomor ${label_npi}`"
                            :value.sync="data.nomor_npi"
                        />
                    </CCol>
                    <CCol sm="12" md="4">
                        <div class="form-group">
                            <label class="w-100" for="tanggal_npi">Tgl. {{ label_npi }}</label>
                            <date-picker
                                v-model="data.tanggal_npi"
                                format="DD-MM-YYYY" 
                                value-type="format"
                                type="date"
                            >
                                <template v-slot:input="slotProps">
                                    <input
                                        class="form-control" 
                                        type="text" 
                                        v-bind="slotProps.props" 
                                        v-on="slotProps.events"
                                    />
                                </template>
                                <i slot="icon-calendar"></i>
                            </date-picker>
                        </div>
                    </CCol>
                </CRow>
            </div>

            <div class="sep pt-2">
                <!-- Analisis -->
                <CRow>
                    <CCol sm="12">
                        <CTextarea
                            v-if="show_informasi"
                            label="Ikhtisar Informasi"
                            :value.sync="data.informasi"
                            rows="5"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CTextarea
                            label="Prosedur Analisis"
                            :value.sync="data.prosedur"
                            rows="5"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CTextarea
                            label="Hasil Analisis"
                            :value.sync="data.hasil"
                            rows="5"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CTextarea
                            label="Kesimpulan"
                            :value.sync="data.kesimpulan"
                            rows="5"
                        />
                    </CCol>
                </CRow>
            </div>

            <div class="sep pt-2">
                <!-- Rekomendasi -->
                <CRow>
                    <CCol sm="12">
                        <h5>Rekomendasi</h5>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="3" sm="12" class="pt-0">
                        <CInputCheckbox
                            :label="label_nhi"
                            :checked.sync="data.flag_rekom_nhi"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="3" sm="12" class="pt-0">
                        <CInputCheckbox
                            :label="label_ni"
                            :checked.sync="data.flag_rekom_ni"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CTextarea
                            label="Rekomendasi Lainnya"
                            :value.sync="data.rekomendasi_lain"
                            rows="5"
                        />
                    </CCol>
                </CRow>
                <CRow v-if="doc_type == 'lkai'">
                    <CCol md="12">
                        <CTextarea
                            label="Informasi Lainnya"
                            :value.sync="data.informasi_lain"
                            rows="5"
                        />
                    </CCol>
                </CRow>
            </div>

            <div class="sep pt-2">
                <CRow>
                    <CCol md="12">
                        <CInput
                            label="Tujuan"
                            :value.sync="data.tujuan"
                        />
                    </CCol>
                </CRow>

                <!-- TTD -->
                <!-- Analis -->
                <CRow>
                    <CCol md="12">
                        <MySelectPetugas
                            ref="selectAnalis"
                            label="Analis"
                            description="Pegawai yang melakukan analisis"
                            :currentUser="true"
                            :nip.sync="data.petugas.analis.nip"
                        />
                    </CCol>
                </CRow>

                <!-- Eseleon IV -->
                <CRow>
                    <CCol class="pb-0" sm="12">
                        <h5>Eselon IV</h5>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="3" sm="12">
                        <CSelect
                            label="Keputusan"
                            :options="[{value: true, label: 'Setuju'}, {value: false, label: 'Tidak Setuju'}]"
                            :value.sync="data.keputusan_pejabat"
                        />
                    </CCol>
                    <CCol md="9" sm="12">
                        <CTextarea
                            label="Catatan"
                            :value.sync="data.catatan_pejabat"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="3" sm="12">
                        <div class="form-group">
                            <label class="w-100" for="tanggal_terima_pejabat">Tgl. Diterima</label>
                            <date-picker
                                v-model="data.tanggal_terima_pejabat"
                                format="DD-MM-YYYY" 
                                value-type="format"
                                type="date"
                            >
                                <template v-slot:input="slotProps">
                                    <input
                                        class="form-control" 
                                        type="text" 
                                        v-bind="slotProps.props" 
                                        v-on="slotProps.events"
                                    />
                                </template>
                                <i slot="icon-calendar"></i>
                            </date-picker>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <MySelectPejabat
                            ref="selectPejabat"
                            :state.sync="state"
                            :default_jabatan.sync="default_pejabat"
                            :jabatan.sync="data.petugas.pejabat.kode_jabatan"
                            :tipe_ttd.sync="data.petugas.pejabat.tipe_ttd"
                            :nip.sync="data.petugas.pejabat.nip"
                        />
                    </CCol>
                </CRow>

                <!-- Eseleon III -->
                <CRow>
                    <CCol class="pb-0" sm="12">
                        <h5>Eselon III</h5>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="3" sm="12">
                        <CSelect
                            label="Keputusan"
                            :options="[{value: true, label: 'Setuju'}, {value: false, label: 'Tidak Setuju'}]"
                            :value.sync="data.keputusan_atasan"
                        />
                    </CCol>
                    <CCol md="9" sm="12">
                        <CTextarea
                            label="Catatan"
                            :value.sync="data.catatan_atasan"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="3" sm="12">
                        <div class="form-group">
                            <label class="w-100" for="tanggal_terima_atasan">Tgl. Diterima</label>
                            <date-picker
                                v-model="data.tanggal_terima_atasan"
                                format="DD-MM-YYYY" 
                                value-type="format"
                                type="date"
                            >
                                <template v-slot:input="slotProps">
                                    <input
                                        class="form-control" 
                                        type="text" 
                                        v-bind="slotProps.props" 
                                        v-on="slotProps.events"
                                    />
                                </template>
                                <i slot="icon-calendar"></i>
                            </date-picker>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <MySelectPejabat
                            ref="selectAtasan"
                            :state.sync="state"
                            :default_jabatan.sync="default_atasan"
                            :jabatan.sync="data.petugas.atasan.kode_jabatan"
                            :tipe_ttd.sync="data.petugas.atasan.tipe_ttd"
                            :nip.sync="data.petugas.atasan.nip"
                        />
                    </CCol>
                </CRow>
            </div>

            <!-- Button simpan -->
            <CRow>
                <CCol sm="12">
                    <CButton
                        color="success"
                        @click="saveData"
                    >
                        Simpan
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectDate from '../../components/SelectDate.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MyTableIkhtisar from '../lppi/TableIkhtisar.vue'

export default {
    name: 'FormLkai',
    components: {
        DatePicker,
        MySearchDocument,
        MySelectDate,
        MySelectPejabat,
        MySelectPetugas,
        MyTableIkhtisar,
    },
    props: {
        state: String,
        doc_type: String,
        document: Object,
        kode_lppi: String,
        label_lkai: String,
        label_lppi: String,
        label_npi: String,
        label_nhi: String,
        label_ni: String,
        default_pejabat: String,
    },
    data() {
        return {
            is_mounting: false,
            data: JSON.parse(JSON.stringify(this.document)),
            default_atasan: 'bd.05',
            ikhtisar_state: 'insert',
            show_informasi: true,
        }
    },
    computed: {
        saved_lppi: {
            get() { return this.data.lppi_id },
            set(val) { this.data.lppi_id = val },
        }
    },
    watch: {
        document(val) { this.data = val },
    },
    methods: {
        async getIkhtisarLppi(lppi_id) {
            let response = await api.getDocumentById(this.kode_lppi, lppi_id)
            let informasi = JSON.parse(JSON.stringify(response.data.informasi))
            let list_informasi = informasi.map(function (info) {
                return info.informasi
            })
            let ikhtisar = list_informasi.join('\n')
            return ikhtisar
        },
        async mountData() {
            if (this.data.lppi_id) {
                await this.$refs.SearchLppi.getDocument(this.data.lppi_id)
            }
        },
        async saveData() {
            let data = null
            if (this.state == 'insert') {
                data = await api.storeDoc(this.doc_type, this.data)
                this.$emit('update:state', 'edit')
            } else if (this.state == 'edit') {
                data = await api.updateDoc(this.doc_type, this.data.id, this.data)
            }
            this.$emit('save-data', data)
        },
        async updateInformasi(val) {
            if (!this.is_mounting) {
                let ikhtisar = null
                if (val != null) {
                    ikhtisar = await this.getIkhtisarLppi(val)
                }
                this.data.informasi = ikhtisar
                this.refresh_informasi()
            }
        },
        refresh_informasi() {
            this.show_informasi = false
            this.$nextTick(() => {
                this.show_informasi = true
            })
        }
    },
}
</script>

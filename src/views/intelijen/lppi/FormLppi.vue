<template>
    <div class="wrapper my-form">
        <CForm class="pt-3">
            <!-- Tanggal Dokumen -->
            <CRow>
                <CCol md="3" sm="12">
                    <MySelectDate
                        :label="`Tanggal ${doc_name}`"
                        :value.sync="data.tanggal_dokumen"
                    />
                </CCol>
            </CRow>
            
            <CRow>
                <CCol sm="12">
                    <h5>Sumber Informasi</h5>
                </CCol>
            </CRow>
            
            <!-- Sumber Internal -->
            <CRow>
                <CCol sm="12">
                    <b>
                        <CInputCheckbox
                            label="Internal"
                            :checked.sync="data.flag_info_internal"
                            @update:checked="toggleFlagInternal"
                        />
                    </b>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="8" sm="12">
                    <label for="media-internal">Media</label>
                    <CInput
                        description="Media informasi. Contoh: kajian / sms center / Nota lnformasi / LPTI / surat / nota dinas"
                        :value.sync="data.media_info_internal"
                        :disabled.sync="disabledMediaInternal"
                    >
                        <template #prepend>
                            <CDropdown
                                id="toggler-lpti"
                                :toggler-text.sync="txtLpti"
                                :disabled.sync="disabledDropdownInternal"
                                color="primary"
                            >
                                <CDropdownItem
                                    v-for="option in ['LPTI', 'NON-LPTI']"
                                    :key="option"
                                    @click="toggleFlagLpti(option)"
                                >
                                    {{ option }}
                                </CDropdownItem>
                            </CDropdown>
                        </template>
                    </CInput>
                </CCol>
                <CCol md="4" sm="12">
                    <div class="form-group">
                        <label class="w-100" for="DateTerimaInternal">Tgl. Terima</label>
                        <date-picker
                            v-model="data.tgl_terima_info_internal"
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
                                    :disabled="data.flag_info_internal == false"
                                />
                            </template>
                            <i slot="icon-calendar"></i>
                        </date-picker>
                    </div>
                </CCol>
            </CRow>

            <!-- Search LPT-I -->
            <CRow v-if="enableSearchLpti">
                <CCol>
                    <MySearchDocument
                        doc_type="lpti"
                        label="LPT-I"
                        :value.sync="data.lpti_id"
                        :exceptions.sync="saved_lpti"
                        @update:value="updateLpti"
                    />
                </CCol>
            </CRow>

            <!-- Free Input -->
            <CRow v-else>
                <CCol md="8" sm="12">
                    <CInput
                        label="No. Dokumen"
                        :value.sync="data.no_dok_info_internal"
                        :disabled="data.flag_info_internal == false"
                    />
                </CCol>
                <CCol md="4" sm="12">
                    <div class="form-group">
                        <label class="w-100" for="DateDokumenInternal">Tgl. Dokumen</label>
                        <date-picker
                            v-model="data.tgl_dok_info_internal"
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
                                    :disabled="data.flag_info_internal == false"
                                />
                            </template>
                            <i slot="icon-calendar"></i>
                        </date-picker>
                    </div>
                </CCol>
            </CRow>

            <!-- Sumber Eksternal -->
            <CRow>
                <CCol sm="12">
                    <b>
                        <CInputCheckbox
                            label="Eksternal"
                            :checked.sync="data.flag_info_eksternal"
                            @update:checked="toggleFlagEksternal"
                        />
                    </b>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="8" sm="12">
                    <CInput
                        label="Media"
                        description="Media informasi. Contoh: informasi dari institusi lain / pengaduan / masyarakat / surat informan"
                        :value.sync="data.media_info_eksternal"
                        :disabled="data.flag_info_eksternal == false"
                    />
                </CCol>
                <CCol md="4" sm="12">
                    <div class="form-group">
                        <label class="w-100" for="DateTerimaEksternal">Tgl. Terima</label>
                        <date-picker
                            v-model="data.tgl_terima_info_eksternal"
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
                                    :disabled="data.flag_info_eksternal == false"
                                />
                            </template>
                            <i slot="icon-calendar"></i>
                        </date-picker>
                    </div>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="8" sm="12">
                    <CInput
                        label="No. Dokumen"
                        :value.sync="data.no_dok_info_eksternal"
                        :disabled="data.flag_info_eksternal == false"
                    />
                </CCol>
                <CCol md="4" sm="12">
                    <div class="form-group">
                        <label class="w-100" for="DateDokumenEksternal">Tgl. Dokumen</label>
                        <date-picker
                            v-model="data.tgl_dok_info_eksternal"
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
                                    :disabled="data.flag_info_eksternal == false"
                                />
                            </template>
                            <i slot="icon-calendar"></i>
                        </date-picker>
                    </div>
                </CCol>
            </CRow>

            <!-- Ikhtisar -->
            <CRow>
                <CCol sm="12">
                    <h5>Ikhtisar</h5>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="12">
                    <MyTableIkhtisar
                        ref="tableIkhtisar"
                        state="insert"
                        :data_ikhtisar.sync="data.informasi"
                        @update-data="updateIkhtisar"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <CTextarea
                        label="Kesimpulan"
                        :value.sync="data.kesimpulan"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <CTextarea
                        label="Catatan"
                        :value.sync="data.catatan"
                    />
                </CCol>
            </CRow>
            <CRow class="mb-2">
                <CCol sm="12" class="pb-0">
                    <label class="w-100" for="CheckTindakLanjut">Tindak Lanjut</label>
                </CCol>
                <CCol md="3" sm="12" class="pt-0">
                    <CInputCheckbox
                        label="Analisis"
                        :checked.sync="data.flag_analisis"
                    />
                </CCol>
                <CCol md="3" sm="12" class="pt-0">
                    <CInputCheckbox
                        label="Arsip"
                        :checked.sync="data.flag_arsip"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <MySelectPetugas
                        ref="selectPenerima"
                        label="Nama Penerima Informasi"
                        description="Pegawai yang menerima informasi"
                        :nip.sync="data.petugas.penerima_informasi.nip"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <MySelectPetugas
                        ref="selectPenilai"
                        label="Nama Penilai Informasi"
                        description="Pegawai yang menilai informasi"
                        :nip.sync="data.petugas.penilai_informasi.nip"	
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="3" sm="12">
                    <div class="form-group">
                        <label class="w-100" for="DateDisposisi">Tgl. Disposisi</label>
                        <date-picker
                            v-model="data.tanggal_disposisi"
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
                    <MySelectPetugas
                        ref="selectDisposisi"
                        label="Nama Penerima Disposisi"
                        description="Pegawai yang menerima disposisi"
                        :nip.sync="data.petugas.penerima_disposisi.nip"	
                        :currentUser="true"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <MySelectPejabat
                        ref="selectPejabat"
                        :state.sync="state"
                        :label="{'jabatan': 'Pejabat', 'nama': 'Nama Pejabat'}"
                        :default_jabatan.sync="default_jabatan"
                        :jabatan.sync="data.petugas.pejabat.kode_jabatan"
                        :tipe_ttd.sync="data.petugas.pejabat.tipe_ttd"
                        :nip.sync="data.petugas.pejabat.nip"
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
import MyTableIkhtisar from './TableIkhtisar.vue'

export default {
    name: 'FormLppi',
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
        doc_name: String,
        document: Object,
        default_jabatan: {
            type: String,
            default: 'bd.0501',
        }
    },
    data() {
        return {
            data: JSON.parse(JSON.stringify(this.document)),
            txtLpti: 'LPTI',
        }
    },
    watch: {
        document(val) { this.data = val },
    },
    computed: {
        saved_lpti: {
            get() { return this.data.lpti_id },
            set(val) { this.data.lpti_id = val },
        },
        disabledDropdownInternal() {
            return !this.data.flag_info_internal
        },
        disabledMediaInternal() {
            let flag = true
            if (this.data.flag_info_internal) {
                if (this.data.media_info_internal != 'LPTI') {
                    flag = false	
                }
            }
            return flag
        },
        enableSearchLpti() {
            let flag = false
            if (this.data.flag_info_internal) {
                if (this.data.media_info_internal == 'LPTI') {
                    flag = true
                }
            }
            return flag
        },
        minDateSelect() {
            let date = new Date()
            date.setDate(date.getDate() - 1)
            return date
        },
        maxDateSelect() {
            return new Date()
        }
    },
    methods: {
        updateIkhtisar(val) {
            this.data.informasi = val
        },
        async saveData() {
            let data = null
            if (this.state == 'insert') {
                data = await api.storeDoc(this.doc_type, this.data)
                this.$emit('update:state', 'edit')
            } else if (this.state == 'edit') {
                let update_data = this.data
                update_data.informasi = this.data.informasi.map(function(informasi) {
                    let update_informasi = informasi
                    delete update_informasi.index
                    return update_informasi
                })
                data = await api.updateDoc(this.doc_type, update_data.id, update_data)
            }
            this.$emit('save-data', data)
        },
        toggleFlagInternal(val) {
            this.data.flag_info_internal = val
            this.data.media_info_internal = 'LPTI'
            this.data.tgl_terima_info_internal = null
            this.data.no_dok_info_internal = null
            this.data.tgl_dok_info_internal = null
            this.toggleFlagLpti('LPTI')
        },
        toggleFlagLpti(val) {
            this.txtLpti = val
            if (val == 'LPTI') {
                this.data.media_info_internal = 'LPTI'
            } else {
                this.data.lpti_id = null
                this.data.media_info_internal = null
                this.data.no_dok_info_internal = null
                this.data.tgl_dok_info_internal = null
            }
        },
        toggleFlagEksternal(val) {
            this.data.flag_info_eksternal = val
            this.data.media_info_eksternal = null
            this.data.tgl_terima_info_eksternal = null
            this.data.no_dok_info_eksternal = null
            this.data.tgl_dok_info_eksternal = null
        },
        async updateLpti(lpti_id) {
            if (lpti_id) {
                let response = await api.getDocumentById('lpti', lpti_id)
                let lpti = JSON.parse(JSON.stringify(response))
                this.data.no_dok_info_internal = lpti.data.no_dok_lengkap
                this.data.tgl_dok_info_internal = lpti.data.tanggal_dokumen
            } else {
                this.data.no_dok_info_internal = null
                this.data.tgl_dok_info_internal = null
            }
        },
    },
}
</script>

<template>
    <div class="wrapper my-form">
        <CForm class="pt-4">
            <div>
                <!-- Seksi -->
                <CRow>
                    <CCol v-if="data.no_dok == null" md="4" sm="12">
                        <CSelect
                            label="Seksi"
                            :options="seksi_options"
                            :value.sync="data.seksi"
                        />
                    </CCol>
                    <CCol v-else sm="12" >
                        <b>Seksi:</b> {{ data.seksi }}
                    </CCol>
                </CRow>

                <!-- No ST -->
                <CRow class="mt-0">
                    <CCol sm="12" md="8">
                        <CInput
                            :label="`Nomor ST`"
                            :value.sync="data.nomor_st"
                        />
                    </CCol>
                    <CCol sm="12" md="4">
                        <div class="form-group">
                            <label class="w-100" for="tanggal_st">Tgl. ST</label>
                            <date-picker
                                v-model="data.tanggal_st"
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

                <!-- Tugas -->
                <CRow class="pb-3">
                    <CCol md="12">
                        <CRow>
                            <CCol>
                                <h4>Tugas:</h4>
                            </CCol>
                        </CRow>

                        <CRow v-for="(tugas, index) in data.tugas" :key="index">
                            <CCol md="11">
                                <CTextarea
                                    :value.sync="data.tugas[index]"
                                />	
                            </CCol>
                            <CCol md="1">
                                <CButton 
                                    style="height: calc(1.5em + 0.75rem + 2px);"
                                    class="w-100 d-block" 
                                    color="danger" 
                                    @click="delTask(index)" 
                                >
                                    <CIcon name="cil-trash"/>
                                </CButton>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol>
                                <CButton color="primary" @click="addTask">+ Tambah</CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>

                <!-- Wilayah -->
                <CRow>
                    <CCol md="12">
                        <MyComboboxLokasi
                            label="Wilayah Penugasan"
                            :value.sync="data.wilayah"
                        />
                    </CCol>
                </CRow>

                <!-- Periode -->
                <CRow>
                    <label class="w-100 pl-3 pt-2 mb-0" for="DatePenugasan">
                        Periode Penugasan
                    </label>
                    <CCol md="4" sm="12">
                        <div class="form-group">
                            <date-picker 
                                v-model="data.tanggal_mulai"
                                format="DD-MM-YYYY" 
                                value-type="format"
                                type="date"
                                class="w-100"
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
                                <i slot="icon-clear"></i>
                            </date-picker>
                            <small class="form-text text-muted w-100">Tanggal Mulai</small>
                        </div>
                    </CCol>
                    <CCol md="4" sm="12">
                        <div class="form-group">
                            <date-picker 
                                v-model="data.tanggal_akhir"
                                format="DD-MM-YYYY" 
                                value-type="format"
                                type="date"
                                class="w-100"
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
                                <i slot="icon-clear"></i>
                            </date-picker>
                            <small class="form-text text-muted w-100">Tanggal Akhir</small>
                        </div>
                    </CCol>
                </CRow>
            </div>

            <!-- Kegiatan Pengumpulan dan Penilaian Informasi -->
            <div class="sep pt-3">
                <CRow>
                    <CCol>
                        <h5>Kegiatan Pengumpulan dan Penilaian Informasi</h5>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CInput
                            label="Tempat Pengumpulan Informasi"
                            :value.sync="data.tempat_pengumpulan"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CInput
                            label="Sumber Informasi"
                            :value.sync="data.sumber_informasi"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CInput
                            label="Metode Pengumpulan Informasi"
                            :value.sync="data.metode_pengumpulan"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CTextarea
                            label="Ikhtisar Informasi"
                            :value.sync="data.ikhtisar_informasi"
                        />
                    </CCol>
                </CRow>
            </div>

            <!-- Kegiatan Analisis Intelijen -->
            <div class="sep pt-3">
                <CRow>
                    <CCol>
                        <h5>Kegiatan Analisis Intelijen</h5>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="4" sm="12">
                        <CInput
                            label="Jenis"
                            :value.sync="data.jenis_dok_pabean"
                        />
                    </CCol>
                    <CCol md="4" sm="12">
                        <CInput
                            label="Nomor"
                            :value.sync="data.nomor_dok_pabean"
                        />
                    </CCol>
                    <CCol md="4" sm="12">
                        <div class="form-group">
                            <label class="w-100" for="tanggal_dok_pabean">Tanggal</label>
                            <date-picker 
                                v-model="data.tanggal_dok_pabean"
                                format="DD-MM-YYYY" 
                                value-type="format"
                                type="date"
                                class="w-100"
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
                                <i slot="icon-clear"></i>
                            </date-picker>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CInput
                            label="Metode Analisis Intelijen"
                            :value.sync="data.metode_analisis"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CTextarea
                            label="Ikhtisar Hasil Analisis Intelijen"
                            :value.sync="data.ikhtisar_analisis"
                        />
                    </CCol>
                </CRow>
            </div>

            <!-- Indikasi Pelanggaran -->
            <div class="sep pt-3">
                <CRow>
                    <CCol>
                        <h5>Indikasi Pelanggaran</h5>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="4" sm="12">
                        <CSelect
                            label="Jenis Pelanggaran"
                            :options="jenis_pelanggaran_options"
                            :value.sync="data.jenis_pelanggaran"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CInput
                            label="Modus Pelanggaran"
                            :value.sync="data.modus_pelanggaran"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CInput
                            label="Perkiraan Tempat Pelanggaran"
                            :value.sync="data.tempat_pelanggaran"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="4" sm="12">
                        <div class="form-group">
                            <label class="w-100" for="tanggal_pelanggaran">Perkiraan Waktu Pelanggaran</label>
                            <date-picker 
                                v-model="data.waktu_pelanggaran"
                                format="DD-MM-YYYY" 
                                value-type="format"
                                type="date"
                                class="w-100"
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
                                <i slot="icon-clear"></i>
                            </date-picker>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <MySelectEntitas
                            label="Perkiraan Pelaku Pelanggaran"
                            :entity_type.sync="data.pelaku.type"
                            :entity_id.sync="data.pelaku.data.id"	
                            default_type="entitas-badan-hukum"
                        />
                    </CCol>
                </CRow>
            </div>

            <!-- Dokumentasi -->
            <div class="sep pt-3">
                <CRow>
                    <CCol>
                        <h5>Dokumentasi Kegiatan Intelijen</h5>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CInput
                            label="Foto"
                            :value.sync="data.dokumentasi_foto"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CInput
                            label="Rekaman Audio"
                            :value.sync="data.dokumentasi_audio"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CInput
                            label="Rekaman Video"
                            :value.sync="data.dokumentasi_video"
                        />
                    </CCol>
                </CRow>
            </div>

            <div class="sep">
                <CRow>
                    <CCol md="12">
                        <CTextarea
                            label="Informasi Lainnya"
                            :value.sync="data.informasi_lain"
                        />
                    </CCol>
                    <CCol md="12">
                        <CTextarea
                            label="Kesimpulan"
                            :value.sync="data.kesimpulan"
                        />
                    </CCol>
                    <CCol md="12">
                        <CTextarea
                            label="Rekomendasi"
                            :value.sync="data.rekomendasi"
                        />
                    </CCol>
                </CRow>
            </div>

            <!-- Pembuat -->
            <CRow>
                <CCol md="12">
                    <MySelectPetugas
                        ref="selectPembuat"
                        label="Ketua Tim"
                        :currentUser="true"
                        :nip.sync="data.petugas.pembuat.nip"
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
        </CForm>
    </div>
</template>

<script>
const jenis_pelanggaran = ['Kepabeanan', 'Cukai']
const list_seksi = ['Intelijen I', 'Intelijen II']

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import MyComboboxLokasi from '../../components/ComboboxLokasi.vue'
import MyInputTembusan from '../../components/InputTembusan.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'

export default {
    name: 'FormLpti',
    components: {
        DatePicker,
        MyComboboxLokasi,
        MyInputTembusan,
        MySearchDocument,
        MySelectEntitas,
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
            jenis_pelanggaran_options: [ ...jenis_pelanggaran ],
            seksi_options: [ ...list_seksi ],
        }
    },
    watch: {
        document(val) { this.data = val },
    },
    methods: {
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
        addTask() {
            this.data.tugas.push(null)
        },
        delTask(id) {
            this.data.tugas.splice(id,1)
        },
    }
}
</script>
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
                <CCol md="12">
                    <MySearchDocument
                        ref="SearchLkai"
                        doc_type="lkai"
                        label="LKAI"
                        description="Nomor LKAI sebagai sumber penerbitan NHI"
                        :value.sync="data.lkai_id"
                        :exceptions.sync="saved_lkai"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="4" sm="12">
                    <CSelect
                        label="Sifat"
                        description="Kategori sifat NHI"
                        :options="sifat_nhi_options"
                        :value.sync="data.sifat"
                    />
                </CCol>
                <CCol md="4" sm="12">
                    <CSelect
                        label="Klasifikasi"
                        description="Kategori klasifikasi NHI"
                        :options="klasifikasi_nhi_options"
                        :value.sync="data.klasifikasi"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <MyComboboxJabatan
                        label="Penerima NHI"
                        description="Tujuan penerima NHI"
                        :value.sync="data.tujuan"
                        :default_jabatan="default_tujuan"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <MyComboboxLokasi
                        label="Tempat Indikasi"
                        description="Tempat terjadinya atau akan terjadinya indikasi pelanggaran"
                        :value.sync="data.tempat_indikasi"
                    />
                </CCol>
            </CRow>
            <CRow>
                <label class="w-100 pl-3 pt-2 mb-0" for="tanggal_indikasi">Tanggal/Waktu Indikasi</label>
                <CCol md="3" sm="12">
                    <div class="form-group">
                        <date-picker 
                            v-model="data.tanggal_indikasi"
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
                        <small class="form-text text-muted w-100">Tanggal</small>
                    </div>
                </CCol>
                <CCol md="2" sm="12">
                    <div class="form-group">
                        <date-picker 
                            v-model="data.waktu_indikasi"
                            format="HH:mm" 
                            value-type="format"
                            type="time"
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
                        <small class="form-text text-muted w-100">Jam</small>
                    </div>
                </CCol>
                <CCol md="1" sm="12">
                    <CSelect
                        :options="zona_waktu_options"
                        :value.sync="data.zona_waktu"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="12">
                    <MySelectKantorBC
                        :kode_kantor.sync="data.kantor.kode_kantor"
                        :default_kantor="default_kantor"
                        description="Kantor Wilayah atau Kantor Pelayanan yang membawahi pengawasan atas wilayah terjadinya atau akan terjadinya indikasi pelanggaran"
                    />
                </CCol>
            </CRow>
            
            <CRow class="sep mt-3">
                <CCol sm="4">
                    <CSelect
                        label="Jenis Barang"
                        :options="nhi_options"
                        :value.sync="selected_nhi"	
                        @update:value="toggleJenisBarang"
                    />
                </CCol>
            </CRow>

            <!-- Barang EXIM -->
            <div v-if="selected_nhi == 'nhi-exim'">
                <CRow>
                    <CCol md="4">
                        <CSelect
                            label="Tipe Kegiatan"
                            :options="jenis_kegiatan"
                            :value.sync="data.detail.data.tipe"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="2" sm="12">
                        <CInput
                            label="Jenis Dokumen Pabean"
                            :value.sync="data.detail.data.jenis_dok"
                        />
                    </CCol>
                    <CCol md="6" sm="12">
                        <CInput
                            label="Nomor Dokumen"
                            :value.sync="data.detail.data.nomor_dok"
                        />
                    </CCol>
                    <CCol md="2" sm="12">
                        <div class="form-group">
                            <label class="w-100" for="tanggal_dok">Tanggal Dokumen</label>
                            <date-picker 
                                v-model="data.detail.data.tanggal_dok"
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
                    <CCol md="6" sm="12">
                        <CInput
                            label="Nama Sarana Pengangkut"
                            :value.sync="data.detail.data.nama_sarkut"
                        />
                    </CCol>
                    <CCol md="2" sm="12">
                        <CInput
                            label="Voy./Flight/Nopol"
                            :value.sync="data.detail.data.nomor_sarkut"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="6" sm="12">
                        <CInput
                            label="No. BL/AWB"
                            :value.sync="data.detail.data.nomor_awb"
                        />
                    </CCol>
                    <CCol md="2" sm="12">
                        <div class="form-group">
                            <label class="w-100" for='tanggal_awb'>Tanggal AWB</label>
                            <date-picker 
                                v-model="data.detail.data.tanggal_awb"
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
                    <CCol md="8" sm="12">
                        <CInput
                            label="No. Container/Merek Koli"
                            :value.sync="data.detail.data.merek_koli"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <MySelectEntitas
                            label="Importir/Eksportir/PPJK"
                            :entity_type.sync="data.detail.data.entitas.type"
                            :entity_id.sync="data.detail.data.entitas.data.id"	
                            default_type="entitas-badan-hukum"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="8" sm="12">
                        <CTextarea
                            label="Data Lainnya"
                            :value.sync="data.detail.data.data_lain"
                        />
                    </CCol>
                </CRow>
            </div>

            <!-- Barang BKC -->
            <div v-if="selected_nhi == 'nhi-bkc'">
                <CRow>
                    <CCol md="8" sm="12">
                        <CInput
                            label="Pabrik/Tempat Penyimpanan/Tempat Penimbunan"
                            :value.sync="data.detail.data.tempat_penimbunan"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="8" sm="12">
                        <CInput
                            label="Penyalur"
                            :value.sync="data.detail.data.penyalur"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="8" sm="12">
                        <CInput
                            label="Tempat Penjualan Eceran"
                            :value.sync="data.detail.data.tempat_penjualan"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="8" sm="12">
                        <CInput
                            label="NPPBKC"
                            :value.sync="data.detail.data.nppbkc"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="6" sm="12">
                        <CInput
                            label="Nama Sarana Pengangkut"
                            :value.sync="data.detail.data.nama_sarkut"
                        />
                    </CCol>
                    <CCol md="2" sm="12">
                        <CInput
                            label="Voy./Flight/Nopol"
                            :value.sync="data.detail.data.nomor_sarkut"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="8" sm="12">
                        <CTextarea
                            label="Data Lainnya"
                            :value.sync="data.detail.data.data_lain"
                        />
                    </CCol>
                </CRow>
            </div>

            <!-- Barang Tertentu -->
            <div v-if="selected_nhi == 'nhi-tertentu'">
                <CRow>
                    <CCol md="2" sm="12">
                        <CInput
                            label="Jenis Dokumen"
                            :value.sync="data.detail.data.jenis_dok"
                        />
                    </CCol>
                    <CCol md="6" sm="12">
                        <CInput
                            label="Nomor Dokumen"
                            :value.sync="data.detail.data.nomor_dok"
                        />
                    </CCol>
                    <CCol md="2" sm="12">
                        <div class="form-group">
                            <label class="w-100" for="tanggal_dok">Tanggal Dokumen</label>
                            <date-picker 
                                v-model="data.detail.data.tanggal_dok"
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
                    <CCol md="6" sm="12">
                        <CInput
                            label="Nama Sarana Pengangkut"
                            :value.sync="data.detail.data.nama_sarkut"
                        />
                    </CCol>
                    <CCol md="2" sm="12">
                        <CInput
                            label="Voy./Flight/Nopol"
                            :value.sync="data.detail.data.nomor_sarkut"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="6" sm="12">
                        <CInput
                            label="No. BL/AWB"
                            :value.sync="data.detail.data.nomor_awb"
                        />
                    </CCol>
                    <CCol md="2" sm="12">
                        <div class="form-group">
                            <label class="w-100" for="tanggal_awb">Tanggal AWB</label>
                            <date-picker 
                                v-model="data.detail.data.tanggal_awb"
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
                    <CCol md="8" sm="12">
                        <CInput
                            label="No. Container/Merek Koli"
                            :value.sync="data.detail.data.merek_koli"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <MySelectEntitas
                            label="Orang Pribadi/Badan Hukum"
                            :entity_type.sync="data.detail.data.entitas.type"
                            :entity_id.sync="data.detail.data.entitas.data.id"	
                            default_type="entitas-badan-hukum"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="8" sm="12">
                        <CTextarea
                            label="Data Lainnya"
                            :value.sync="data.detail.data.data_lain"
                        />
                    </CCol>
                </CRow>
            </div>

            <CRow>
                <CCol md="8" sm="12">
                    <CTextarea
                        label="Indikasi"
                        :value.sync="data.indikasi"
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
        </CForm>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import store from '../../../store'
import validators from '../../../helpers/validator'
import DefaultNhi from './DefaultNhi'
import MyComboboxJabatan from '../../components/ComboboxJabatan.vue'
import MyComboboxLokasi from '../../components/ComboboxLokasi.vue'
import MyInputTembusan from '../../components/InputTembusan.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectDate from '../../components/SelectDate.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectKantorBC from '../../components/SelectKantorBC.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

const default_zona_waktu_options = ['WIB', 'WITA', 'WIT']
const default_nhi_options = [
    {value: 'nhi-exim', label: 'Barang Ekspor/Impor'}, 
    {value: 'nhi-bkc', label: 'Barang BKC'}, 
    {value: 'nhi-tertentu', label: 'Barang Tertentu'}
]

export default {
    name: 'FormNhi',
    components: {
        DatePicker,
        MyComboboxJabatan,
        MyComboboxLokasi,
        MyInputTembusan,
        MySearchDocument,
        MySelectDate,
        MySelectEntitas,
        MySelectKantorBC,
        MySelectPejabat,
    },
    props: {
        state: String,
        doc_type: String,
        doc_name: String,
        document: Object,
    },
    data() {
        return {
            data: JSON.parse(JSON.stringify(this.document)),
            jenis_kegiatan: JSON.parse(JSON.stringify(store.getters.jenisKegiatan)),
            sifat_nhi_options: JSON.parse(JSON.stringify(store.getters.sifatSurat)),
            klasifikasi_nhi_options: JSON.parse(JSON.stringify(store.getters.klasifikasiSurat)),
            zona_waktu_options: JSON.parse(JSON.stringify(default_zona_waktu_options)),
            nhi_options: JSON.parse(JSON.stringify(default_nhi_options)),
            selected_nhi: default_nhi_options[0].value,
            default_tujuan: DefaultNhi.data.tujuan,
            default_penerbit: 'bd.05',
            default_kantor: '050100',
            validations: {
                tujuan: false,
            }
        }
    },
    computed: {
        saved_lkai: {
            get() { return this.data.lkai_id },
            set(val) { this.data.lkai_id = val },
        }
    },
    watch: {
        document(val) { this.data = val },
    },
    methods: {
        async mountData() {
            if (this.data.lkai_id) {
                await this.$refs.SearchLkai.getDocument(this.data.lkai_id)	
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
        resetDetailNhi(detail_type) {
            switch (detail_type) {
                case 'nhi-exim':
                    this.data.detail.data = JSON.parse(JSON.stringify(DefaultNhi.detail_exim))
                    break;

                case 'nhi-bkc':
                    this.data.detail.data = {}
                    break;

                case 'nhi-tertentu':
                    this.data.detail.data = JSON.parse(JSON.stringify(DefaultNhi.detail_tertentu))
                    break;
            
                default:
                    break;
            }
        },
        toggleJenisBarang(val) {
            this.data.detail.type = val
            this.resetDetailNhi(val)
        },
        validatorRequired(field, val) { 
            let validation = validators.required(val) 
            this.validations[field] = validation
            return validation
        },
    },
}
</script>

<template>
    <div class="wrapper">
        <CForm>
            <CRow>
                <CCol md="8" sm="12">
                    <MySelectJabatan
                        :state="state"
                        :label="label.jabatan"
                        :default_jabatan="default_jabatan"
                        :jabatan.sync="selected_jabatan"
                    />
                </CCol>
                <CCol md="2" sm="12">
                    <CSelect
                        label="Tipe TTD"
                        :options="options_ttd"
                        :value.sync="selected_tipe_ttd"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="8" sm="12">
                    <div class="form-group">
                        <label for="nip">{{ label.nama }}</label>
                        <v-autocomplete
                            v-model="selected_petugas"
                            outlined
                            dense
                            :items.sync="options_petugas"
                            :search-input.sync="search"
                            item-text="name"
                            item-value="nip"
                            @change="changePejabat"
                            @keyup="searchOfficer"
                        >
                            <template v-slot:no-data>
                                <v-list-item>
                                    <v-list-item-title>
                                        Data pejabat tidak ditemukan
                                    </v-list-item-title>
                                </v-list-item>
                            </template>
                            <template v-slot:item="{ item }">
                                <v-list-item-content>
                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.nip }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-autocomplete>
                        <small class="form-text text-muted w-100">{{ description }}</small>
                    </div>
                </CCol>
                <CCol md="3" sm="12">
                    <CInput
                        label="NIP"
                        :value.sync="selected_petugas.nip"
                        disabled
                    >
                    </CInput>
                </CCol>
            </CRow>
        </CForm>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../../router/api2.js'
import MySelectJabatan from './SelectJabatan.vue'

const default_petugas = {
    user_id: null,
    name: null,
    nip: null
}

const options_ttd = [
    {'label': '-', 'value': null},
    {'label': 'Plh.', 'value': 'plh'}, 
    {'label': 'Plt.', 'value': 'plt'},
]

export default {
    name: 'SelectPejabat',
    components: {
        MySelectJabatan,
    },
    props: {
        state: String,
        label: {
            type: Object,
            default() {
                return {
                    jabatan: 'Jabatan',
                    nama: 'Nama Pejabat'
                }
            }
        },
        description: String,
        default_jabatan: String,
        jabatan: String,
        tipe_ttd: String,
        nip: String,
        with_autofill: {
            type: Boolean,
            default() { return true }
        },
    },
    computed: {
        ...mapState(['userInfo'])
    },
    data() {
        return {
            options_petugas: [],
            selected_petugas: JSON.parse(JSON.stringify(default_petugas)),
            search: null,
            options_jabatan: [],
            options_ttd: options_ttd,
            selected_jabatan: null,
            selected_tipe_ttd: null,
        }
    },
    watch: {
        async jabatan(val) {
            this.selected_jabatan = val
        },
        async tipe_ttd(val) {
            this.selected_tipe_ttd = val
        },
        async nip(val) {
            await this.getPetugas(val, true)
        },
        async selected_tipe_ttd (val) {
            // Change prop
            await this.setProps('tipe_ttd', val)

            // Change officer
            if ((val == null) & (this.with_autofill)) {
                await this.autofillPejabat(this.jabatan)
            }
        },
        async selected_jabatan (val) {
            // Change prop
            await this.setProps('jabatan', val)

            // Change officer
            if (this.with_autofill) {
                if ((this.selected_tipe_ttd == null) && (this.nip == null)) {
                    await this.autofillPejabat(val)	
                }	
            }
        },
    },
    methods: {
        async autofillPejabat(jabatan) {
            let pejabat = await api.getUserByPosition({positions: [jabatan]})
            this.changePejabat(pejabat[0].nip, true)
        },
        async setProps(prop, val) {
            this.$emit(`update:${prop}`, val)
        },
        async searchOfficer() {
            if ((this.search != null) & (this.search != "")) {
                this.options_petugas = await api.searchUser({query: this.search})
            }
        },
        async changePejabat(nip, mounted=false) {
            await this.getPetugas(nip, mounted)
            await this.setProps('nip', nip)
        },
        async getPetugas(nip, mounted=false) {
            if ((nip != null) && (nip != this.selected_petugas.nip)) {
                this.selected_petugas = await api.getUserByNip({nip: nip})
                if (mounted) {
                    this.options_petugas = [this.selected_petugas]
                }
                this.saveCache()
            } else if (nip == null) {
                this.selected_petugas = JSON.parse(JSON.stringify(default_petugas))
            }
        },
        saveCache() {
            api.saveUser(this.selected_petugas)
        },
    },
}
</script>

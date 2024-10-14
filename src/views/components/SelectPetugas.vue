<template>
    <div class="wrapper">
        <CRow>
            <CCol md="8" sm="12">
                <div class="form-group">
                    <label for="nip">{{ label }}</label>
                    <v-autocomplete
                        class="no-message"
                        v-model="selected_petugas"
                        outlined
                        dense
                        :disabled="disabled"
                        :items.sync="options_petugas"
                        :search-input.sync="search"
                        item-text="name"
                        item-value="nip"
                        @change="changeOfficer"
                        @keyup="searchOfficer"
                    >
                        <template v-slot:no-data>
                            <v-list-item>
                                <v-list-item-title>
                                    Data petugas tidak ditemukan
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
            <CCol  md="1" sm="12">
                <slot name="button"></slot>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import api from '../../router/api2.js'

const default_petugas = {
    user_id: null,
    name: null,
    nip: null
}

const delay = ms => new Promise(res => setTimeout(res, ms));

export default {
    name: 'SelectPetugas',
    props: {
        label: String,
        description: String,
        currentUser: {
            type: Boolean,
            default: false
        },
        nip: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
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
        }
    },
    watch: {
        async nip(val) {
            await this.getPetugas(val, true)
        },
    },
    methods: {
        async searchOfficer() {
            if ((this.search != null) && (this.search != "")) {
                this.options_petugas = await api.searchUser({query: this.search})
            }
        },
        async changeOfficer(nip, mounted=false) {
            await this.getPetugas(nip, mounted)
            this.saveCache()
            this.$emit('update:nip', nip)
        },
        async getPetugas(nip, mounted=false) {
            if ((nip != null) && (nip != this.selected_petugas.nip)) {
                this.selected_petugas = await api.getUserByNip({nip: nip})
                if (mounted) {
                    this.options_petugas = [this.selected_petugas]
                }
            } else if (nip == null) {
                this.selected_petugas = JSON.parse(JSON.stringify(default_petugas))
            }
        },
        saveCache() {
            if (
                (this.selected_petugas.nip != null) &&
                (this.selected_petugas.nip != this.userInfo.nip)
            ) {
                api.saveUser(this.selected_petugas)
            }
        },
    },
    async mounted() {
        // Await to let nip prop fully loaded
        await delay(1000)
        if ((this.currentUser) && (this.nip == null)) {
            this.changeOfficer(this.userInfo.nip, true)
        }
    }
}
</script>

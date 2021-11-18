<template>
	<div class="wrapper">
		<CRow>
			<CCol md="9" sm="12">
				<div class="form-group">
					<label>No SPRINT</label>
					<v-autocomplete
						v-model="value"
						outlined
						dense
						:items.sync="items"
						:search-input.sync="search"
						item-text="nomor_sprint"
						item-value="id"
						@change="changeValue"
					>
						<template v-slot:no-data>
							<v-list-item>
								<v-list-item-title>
									Data SPRINT tidak ditemukan
								</v-list-item-title>
							</v-list-item>
						</template>
						<template v-slot:item="{ item }">
							<v-list-item-content>
								<h3><v-list-item-title v-text="item.nomor_sprint"></v-list-item-title></h3>
								<v-list-item-subtitle v-text="item.tanggal_sprint"></v-list-item-subtitle>
							</v-list-item-content>
						</template>
					</v-autocomplete>
					<small class="form-text text-muted w-100">Nomor Surat Perintah</small>
				</div>
			</CCol>
			<CCol md="3" sm="12">
				<CInput
					label="Tanggal SPRINT"
					:value.sync="sprint.tanggal_sprint"
					disabled
				>
				</CInput>
			</CCol>
		</CRow>
		<CRow>
			<CCol sm="12">
				<CInput
					label="Pejabat"
					disabled
				>
				</CInput>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../router/api.js'
import axios from 'axios'

export default {
	name: 'SelectSprint',
	data() {
		return {
			items: [],
			value: null,
			search: null,
			sprint: []
		}
	},
	watch: {
		async search (val) {
			let data = {'s': val}
			let response = await axios.post(api.searchSprint(), data)
			this.items = response.data.data
		}
	},
	methods: {
		changeValue(id) {
			this.getSprint(id)
			this.$emit('update:id', id)
		},
		getSprint(id, mounted=false) {
			if (id != null) {
				axios
					.get(api.getSprintById(id))
					.then(
						(response) => {
							this.sprint = response.data.data
							if (mounted == true) {
								this.items = [response.data.data]
								this.value = this.items[0]
							}
						}
					)
			}
		}
	}
}
</script>

<style>

</style>
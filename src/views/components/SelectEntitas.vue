<template>
  <div class="wrapper">
	<CRow>
		<CCol>
			<CForm>
				<CRow>
					<CCol>
						{{ label }}
					</CCol>
				</CRow>
				<CRow>
					<CCol md="12">
						<CDropdown
							:toggler-text.sync="txt_dropdown_entity"
							color="primary"
						>
							<CDropdownItem @click="toggleEntityType('entitas-orang')">Perorangan</CDropdownItem>
							<CDropdownItem @click="toggleEntityType('entitas-badan-hukum')">Badan Hukum</CDropdownItem>
						</CDropdown>
					</CCol>
				</CRow>

				<CRow v-if="selected_entity_type=='entitas-orang'">
					<CCol md="12">
						<MySelectEntitasOrang 
							state="insert"
							:entity_id.sync="selected_entity_id"
						/>
					</CCol>
				</CRow>

				<CRow v-if="selected_entity_type=='entitas-badan-hukum'">
					<CCol md="12">
						<MySelectEntitasBadanHukum 
							state="insert"
							:entity_id.sync="selected_entity_id"
						/>
					</CCol>
				</CRow>
			</CForm>
		</CCol>
	</CRow>
  </div>
</template>

<script>
import MySelectEntitasBadanHukum from '../components/SelectEntitasBadanHukum.vue'
import MySelectEntitasOrang from '../components/SelectEntitasOrang.vue'

const entity_name = {
	'entitas-orang': 'Perorangan',
	'entitas-badan-hukum': 'Badan Hukum',
}

const default_entitas = {
	type: null,
	data: { id: null }
}

export default {
	name: 'SelectEntitas',
	components: {
		MySelectEntitasBadanHukum,
		MySelectEntitasOrang,
	},
	props: {
		label: String,
		entity_type: String,
		entity_id: Number,
		default_type: String,
	},
	data() {
		return {
			selected_entity_type: this.entitas_type,
			selected_entity_id: this.entitas_id,
			txt_dropdown_entity: entity_name[this.entity_type],
		}
	},
	watch: {
		entity_type(val) {
			if (val != null) {
				this.selected_entity_type = val	
			}
		},
		selected_entity_type(val) {
			if (val != null) {
				this.txt_dropdown_entity = entity_name[val]
				this.$emit('update:entity_type', val)	
			}
		},
		entity_id(val) {
			this.selected_entity_id = val
		},
		selected_entity_id(val) {
			this.$emit('update:entity_id', val)
		},
	},
	methods: {
		toggleEntityType(val) {
			this.selected_entity_type = val
			this.selected_entity_id = null
		}
	},
	mounted() {
		this.toggleEntityType(this.default_type)
	}
}
</script>

<style>

</style>
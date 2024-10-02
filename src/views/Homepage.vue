<template>
	<CCard>
		<CCardBody>
			<CCol sm="5">
				<h4 id="welcome" class="card-title mb-0">Welcome, {{ userInfo.name }}</h4>
			</CCol>
		</CCardBody>
	</CCard>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState(['userInfo'])
	},
}
</script>

<style>

</style>
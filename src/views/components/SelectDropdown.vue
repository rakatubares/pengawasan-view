<template>
	<div class="wrapper">
		<CInput
			:placeholder="placeholder"
		>
			<template #append>
                <CButton color="primary">
					<CIcon :name="button_icon"/>
				</CButton>
			</template>
		</CInput>
	</div>
</template>

<script>
export default {
	name: 'SelectDropdown',
	props: {
		placeholder: {
			type: String,
			default: 'Pilih data...'
		},
		button_icon: {
			type: String,
			default: 'cil-plus'
		}
	}
}
</script>

<style>

</style>
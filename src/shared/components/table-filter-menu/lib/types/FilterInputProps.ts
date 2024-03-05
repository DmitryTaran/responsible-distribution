export type FilterInputProps<U> = {
	matchValue: U
	onChange: (value: U) => void
	handleConfirm: (matchValue: U) => void
	handleCancel: () => void
}
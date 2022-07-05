function getColor(optionResult, expectedResult, isRecovery, isDefault) {
	if (isDefault) {
		return '';
	}
	if (optionResult !== expectedResult) {
		return 'color_loss';
	}
	if (isRecovery) {
		return 'color_recovery';
	}
	return 'color_gain';
}

function ResultSelect(props) {

	const optionList = ['', '1', 'X', '2'].map(optionValue => <option
		key={optionValue}
		className={getColor(optionValue, props.expectedResult, props.isRecovery, props.isDefault)}
	>{optionValue}</option>);

	return <select
		className={props.className}
		onInput={(event) => props.onInput(event)}
		ref={ref => { if (ref) { props.setRef(ref); } }}
	>{optionList}</select>;
}

export default ResultSelect;

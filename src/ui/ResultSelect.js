import { isGain } from '../util/bet';

function getColor(optionResult, expectedResult, isRecovery, isDefault) {
	if (isDefault || optionResult.includes('R')) {
		return '';
	}
	if (!isGain(optionResult, expectedResult)) {
		return 'color_loss';
	}
	if (isRecovery) {
		return 'color_recovery';
	}
	return 'color_gain';
}

function ResultSelect(props) {

	let optionList = ['', '1', 'X', '2'];

	if (props.hasReturn) {
		optionList = optionList.flatMap(x => (x && (!isGain(props.expectedResult, x))) ? [x, `${x}R`] : x);
	}

	optionList = optionList.map(optionValue => <option
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

function ResultSelect(props) {

	let optionList = [];

	if (props.hasEmptyOption) {
		optionList = [<option key='empty'></option>];
	}

	optionList = optionList.concat([<option key='1'>1</option>, <option key='X'>X</option>, <option key='2'>2</option>]);

	return <select onInput={(event) => props.onInput(event)} ref={ref => { if (ref) { props.setRef(ref); } }}>{optionList}</select>;
}

export default ResultSelect;

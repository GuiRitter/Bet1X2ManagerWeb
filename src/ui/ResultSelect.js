function ResultSelect(props) {

	return <select
		className={props.className}
		onInput={(event) => props.onInput(event)}
		ref={ref => { if (ref) { props.setRef(ref); } }}
	><option></option><option >1</option><option >X</option><option >2</option></select>;
}

export default ResultSelect;

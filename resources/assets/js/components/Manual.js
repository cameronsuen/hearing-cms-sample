var Manual = React.createClass({
	render: function() {
		return (
		  <div className="panel panel-info">
		    <div className="panel-heading">
			  <h3 className="panel-title">Manual</h3>
			</div>
			<div className="panel-body">
		      <ul>
			    <li>
			      <h6>Listen to voice played</h6>
			    </li>
			    <li>
			      <h6>Compare the voice played to the word displayed on the word list</h6>
			    </li>
			    <li>
			      <h6>Determine whether the sample is correct, incorrect, unsure or is a noise</h6>
			    </li>
		      </ul>
			</div>
		  </div>
		);
	}
});

/*ReactDOM.render(
	<Manual />,
	document.getElementById('manual')
);*/

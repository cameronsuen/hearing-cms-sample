var Counter = React.createClass({

	getInitialState: function() {
		return { count: 0 };
	},
	
	componentWillMount: function() {
		PubSub.subscribe('sampleViewed', (msg, data) => {
			this.setState({ count: this.state.count + 1 });
		});
	},
	
	render: function() {
		return (
	 		<div className="counterCard">
			  <div className="panel panel-success">
			    <div className="panel-heading">
				  <h3 className="panel-title">Counter</h3>
				</div>
                <div className="panel-body">
				  <p className="text-center lead">You have validated</p>
				  <h3 className="text-center count">{ this.state.count }</h3>
				  <p className="text-center lead">record(s) so far</p>
				</div>
		      </div>
			</div>
		);
	}
});

/*ReactDOM.render(
	<Counter />,
	document.getElementById('counter')
);*/

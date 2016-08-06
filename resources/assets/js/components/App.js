var App = React.createClass({
	
	switchPage: function(name) {
		var selector = 'li#' + name;
		window.history.pushState(name, name, '/' + name);
		console.log(selector);
		$('li').removeClass('active');
		$(selector).addClass('active');
	},

	logout: function() {
		console.log('here called');
		localStorage.removeItem('accessToken');
		this.setState({ invalidToken: true });
	},

	getInitialState: function() {
		return { invalidToken: null, sysFunction: [] };
	},

	componentWillMount: function() {
		PubSub.subscribe('valid_token', (msg, data) => {
			if (this.state.invalidToken !== false) {
				Request.get('/sysFunction', null, (data) => {
					this.setState({ sysFunction: data });
				});
				this.setState({ invalidToken: false });	
			} 
		});

		PubSub.subscribe('invalid_token', (msg, data) => {
			this.setState({ invalidToken: true });
		});	
		
		Request.get('/sysFunction', null, (data) => {
			this.setState({ sysFunction: data });
		});

		console.log(location.pathname.substring(1));

	},

	render: function() {
		console.log(this.logout);
		if (this.state.invalidToken === null) {
			return (
				<div><Navbar /></div>
			);
		} else if (!this.state.invalidToken) {
			return (
				<div>				
				  <Navbar currentPath={location.pathname.substring(1)} sysFunction={this.state.sysFunction} logout={this.logout} switchPage={this.switchPage} />

				  <div className="container-fluid">
				    <div className="row">
				      <div className="col-md-4 col-md-offset-1">
					    <div className="row">
						  <div className="col-md-12"> 
						    <Counter />
						  </div>
					    </div>

					    <div className="row">
					      <div className="col-md-12">
						    <Manual />
					      </div>
					    </div>
				      </div>
				      <div className="col-md-6">
				        <SampleCard />
				      </div>
				    </div>
			      </div>
			    </div>
			);
		} else {
			return (
				<div>
				  <Navbar />
				  <div className="container-fluid">
				  
				    <div className="row">
				      <div className="col-md-4 col-md-offset-4">
					    <LoginForm />
					  </div>	
				    </div>
				  </div>
				</div>
			);
		}
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('app')
);

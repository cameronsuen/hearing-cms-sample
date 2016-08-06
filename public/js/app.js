var NavItem = React.createClass({
	componentDidMount: function() {
		$('#' + this.props.functionHref + ' a').click((e) => {
			e.preventDefault();
		});
	},

	render: function() {
		return (
			<li className={this.props.liClass} id={this.props.functionHref} onClick={this.props.clickAction.bind(null, this.props.functionHref)}><a href=""><span className={this.props.className}></span> {this.props.functionName}</a></li>
		);
	}
});

var Navbar = React.createClass({
	render: function() {
		var itemList = [];
		var logout_icon = <li></li>;
		for (var i in this.props.sysFunction) {
			if (this.props.sysFunction[i] === this.props.currentPath) {
				itemList.push(<NavItem functionName={i} liClass="active" functionHref={this.props.sysFunction[i]} clickAction={this.props.switchPage} className="" key={i} />);
			} else {
				itemList.push(<NavItem functionName={i} functionHref={this.props.sysFunction[i]} clickAction={this.props.switchPage} className="" key={i} />);
			}
		}
		if (itemList.length !== 0) {
			console.log(this.props.logout);
			logout_icon = <NavItem clickAction={this.props.logout} className="glyphicon glyphicon-log-out" functionHref="logout" functionName="Logout" />
		}
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
    		  <div className="container-fluid">
      		    <div className="navbar-header">
	    	      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar">
	      	        <span className="sr-only">Toggle navigation</span>
		  	        <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
	              </button>
	              <a className="navbar-brand" href="#">Hearing CMS</a>
	            </div>

                <div className="collapse navbar-collapse" id="myNavbar">
	              <ul className="nav navbar-nav">{itemList}</ul>
	              <ul className="nav navbar-nav navbar-right">
				  	{logout_icon}
	              </ul>
	            </div>
	          </div>
  			</nav>
		);
	}
});

var LoginForm = React.createClass({
	componentDidMount: function() {
		$('#login_form').submit((e)=>{
			e.preventDefault();
			var credentials = {
				username: $('#inputUsername').val(),
				password: $('#inputPassword').val()
			}

			Request.post('/authenticate', credentials, (data)=>{
				localStorage.accessToken = data.access_token;
			});
		});
	},

	render: function() {
		return (
		  <div>
		  	<form id="login_form" className="form-horizontal">
		    <fieldset>
		      <div className="loginForm">
		        <div className="panel panel-warning">
			  
			      <div className="panel-heading">
			        <h3 className="panel-title">Login</h3>
			      </div>

			      <div className="panel-body">
			    
			        <div className="form-group">
		              <label htmlFor="inputUsername" className="col-md-2 control-label">
				        Username
				      </label>
				      <div className="col-md-10">
				        <input className="form-control" id="inputUsername" placeholder="username" type="text"></input>
				      </div>
				    </div>

                    <div className="form-group">
		              <label htmlFor="inputPassword" className="col-md-2 control-label">
				        Password
				      </label>
				      <div className="col-md-10">
				        <input className="form-control" id="inputPassword" placeholder="password" type="password"></input>
				      </div>
				    </div>
                    
					<div className="form-group">
			          <div className="col-md-12">
			            <button type="submit" className="btn btn-warning center">Submit</button>
			          </div>
		            </div>

			      </div>
			    </div>
		      </div>
		    </fieldset>
		  </form>
		  </div>
		);
	}
});

/*ReactDOM.render(
	<LoginForm />,
	document.getElementById('loginform')
);*/

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

var Button = React.createClass({

  update: function() {
  	var content = {
	  op: 'add',
	  field: this.props.fieldId,
      value: 1
	};
	$.ajax('/api/samples/' + this.props.id, {
	  method: 'PATCH',
	  accepts: 'application/json',
	  contentType: 'application/json',
	  data: JSON.stringify(content)
	}).done((data) => {
	  this.props.onClick();
	  PubSub.publish('sampleViewed', 'sampleViewed');
	});
    
  },

  render: function() {
    var btnClass = "btn " + this.props.btnClass + " btn-block";
	var iconClass = "glyphicon " + this.props.iconClass;
    return (
      <div className="col-md-3">
	    <a id={this.props.fieldId} onClick={this.update} className={btnClass}>
		  <span className={iconClass}></span>
		  {this.props.text}
		</a>
	  </div>
	);
  }
});

var ButtonGroup = React.createClass({
  render: function() {
    return (
      <div className="row">
	    <Button id={this.props.id} fieldId="correct" btnClass="btn-primary" iconClass="glyphicon-ok-sign" text="Correct" onClick={this.props.onClick} />
		<Button id={this.props.id} fieldId="incorrect" btnClass="btn-danger" iconClass="glyphicon-remove-sign" text="Incorrect" onClick={this.props.onClick} />
		<Button id={this.props.id} fieldId="unsure" btnClass="btn-warning" iconClass="glyphicon-question-sign" text="Unsure" onClick={this.props.onClick} />
		<Button id={this.props.id} fieldId="noise" btnClass="btn-info" iconClass="glyphicon-info-sign" text="Noise" onClick={this.props.onClick} />  
	  </div>
    );
  }
});

var WordImage = React.createClass({
  render: function() {
    return (
	  <div className="row">
	    <div className="col-md-8 col-md-offset-2">
		  <img src={this.props.src} className="img-responsive center" />
	    </div>
      </div>
	);
  }
});

var Text = React.createClass({
  render: function() {
    return (
      <div className="row">
	    <div className="col-md-8 col-md-offset-2">
		  <h3 className="text-center">{this.props.text}</h3>
		</div>
	  </div>
	);
  }
});

var Player = React.createClass({
  componentDidUpdate: function() {
  	// Load the new source
  	$('#player').load();
  },

  render: function() {
    return (
      <div className="row">
	    <div className="col-md-8 col-md-offset-2">
	      <audio id="player" controls className="center">
		    <source src={'/file/audio/' + this.props.src} type="audio/wav">
		    </source>
		  </audio>
	    </div>
      </div>
	);
  }
});

var SampleCard = React.createClass({
	getInitialState: function() {
		return {
			result: '',
			i: -1,
			loaded: false
		};
	}, 

	getSample: function() {
		this.request = Request.get('/api/samples', null, (result) => {
			this.setState({
				result: result,
				i: 0,
				loaded: true
			});
		}.bind(this));
	},

	componentDidMount: function() {
		this.getSample();
	},

	componentWillUnmount: function() {
		//this.request.abort();
	},
	
	nextSample: function() {
		if (this.state.i + 1 < this.state.result.length) {
			this.setState({
				i: this.state.i + 1
			});
		} else {
			this.getSample();	
		}
	},

	render: function() {
		// Check if component is completely rendered
		if (this.state.loaded) {
			return (
				<div className="sampleCard">
				  <div className="panel panel-primary">
					<div className="panel-heading">
					  <h3 className="panel-title">Validation</h3>
					</div>
					
					<div className="panel-body">  
					  <div className="container-fluid">
						
						<WordImage src={'/file/img/' + this.state.result[this.state.i].img} />
						<Text text={this.state.result[this.state.i].word} />    

						<Player src={this.state.result[this.state.i].sample} />;
						<ButtonGroup id={this.state.result[this.state.i].id} onClick={this.nextSample} />    

					  </div>
					</div>
				  </div>
				</div>
			);
		} else {
			return <div>Loading</div>;
		}
	}
});

/*ReactDOM.render(
	<SampleCard />,
	document.getElementById('card')
);*/

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

//# sourceMappingURL=app.js.map

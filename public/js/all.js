var App = React.createClass({

	render: function() {
		<div class="row">
		  <div class="col-md-4 col-md-offset-1">
			<div class="row">
			  <div class="col-md-12"> 
			  	<Counter />
			  </div>
			</div>

			<div class="row">
			  <div class="col-md-12">
			  	<Manual />
			  </div>
			</div>
		  </div>

		  <div class="col-md-6">
		  	<SampleCard />
		  </div>
		</div>

	}
});

ReactDOM.render(
	<App />,
	document.getElementById('app')
);

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
		  <h3 className="text-center">Hearing CMS</h3>
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

ReactDOM.render(
	<LoginForm />,
	document.getElementById('loginform')
);

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

// Module: Wrapper for the AJAX calls with access token
var Request = (function() {
	
	var accessToken = localStorage.accessToken;
	return {
		get: function(url, data, success, dataType) {
			$.ajax({
				url: url,
				data: data,
				success: success,
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
				}
			});
		},

		post: function(url, data, success, dataType) {
			$.ajax({
				url: url,
				method: 'POST',
				data: data,
				success: success,
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
				}
			});
		},

		patch: function() {
			$.ajax({
				url: url,
				method: 'PATCH',
				data: data,
				success: success,
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
				}
			});
		},

		put: function() {
			$.ajax({
				url: url,
				method: 'PUT',
				data: data,
				success: success,
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
				}
			});
		}
	};
}());



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
		    <source src={'data:audio/wav;base64,' + this.props.src}>
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
			console.log('got');
			console.log(result);
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
		this.request.abort();
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
						
						<WordImage src={'../img/' + this.state.result[this.state.i].img} />
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

//# sourceMappingURL=all.js.map

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

ReactDOM.render(
	<SampleCard />,
	document.getElementById('card')
);

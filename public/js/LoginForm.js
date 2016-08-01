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

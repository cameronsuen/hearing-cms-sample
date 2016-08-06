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

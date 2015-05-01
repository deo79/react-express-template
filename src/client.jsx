var DefaultRoute, Header, Link, React, Route, RouteHandler, Router;

window.$ = window.jQuery = require('jquery');

require('semantic-ui-css/semantic');

React = require('react/addons');

Router = require('react-router');

var ui = require('./ui');
Header = require('./header');

Route = Router.Route, 
	RouteHandler = Router.RouteHandler, 
	DefaultRoute = Router.DefaultRoute, 
	Link = Router.Link
;

var Home = React.createClass({
	render: function() {
		return (
			<div className="column">
				<div classNakme="ui segment">
					<h1 className="ui header">
						<span>JobRunner: The scheduled job system.</span>
						<div className="sub header">
							Schedule URLs and scripts to run whenever you need them to.
						</div>
					</h1>
				</div>
			</div>
			)
	}
});

var About = React.createClass({
	render: function() {
		return (
		<div className="column">
			<div className="ui segment">
				<h4 className="ui black header">This is an Orderwave project.</h4>
			</div>
		</div>
		)
	}
});

var Main = React.createClass({
	render: function() {
		return (
		<div>
			<Header/>
			<div className="ui page grid">
				<RouteHandler {...this.props}/>
			</div>
		</div>
		)
	}
});

var routes =
	<Route path="/" handler={Main}>
		<DefaultRoute name="home" handler={Home}/>
		<Route name="about" handler={About}/>
	</Route>


//-----------

$(function() {
	return Router.run(routes, Router.HashLocation, function(Handler) {
		return React.render(<Handler/>, document.body);
	});
});

'use strict';

import React from "react/addons"
import Router from "react-router"
var Modal = require('react-semantify').Modal;
var FormData = require('react-form-data');
var $ = require('jquery');

var ui = {};

ui.formSetup = function(model, selector) {
	selector = selector || model + 'Form';
	var formSelector = '.ui.form.' + selector;
	var container = $(formSelector);
	if($(formSelector).parents('.ui.modal').length) {
		container = $(formSelector).parents('.ui.modal');
	}
	$(container)
		.dimmer('show')
		.dimmer('set opacity', 0.1);
	$.get('/form/setup/'+model)
		.done(function(validationRules) {
			$(formSelector)
				.form(validationRules);
			$(container).addClass('dimmable dimmed');
			$(container)
				.dimmer('hide');
		});
}

ui.loginModal = function() {
	var LoginModal = React.createClass({
		mixins: [FormData],
		handleSubmit: function(e) {
			if( e ) {
				console.log('preventDefault');
				console.log(e);
				e.preventDefault();
			} else {
				console.log('no event to preventDefault')
			}
			console.log(this.formData);
			$.post('/user/authenticate', this.formData)
				.done(function(result) {
					console.log(result);
					if(result.valid) {
						console.log(result.valid);
					} else {
						$('.ui.form.UserForm').removeClass('success').addClass('error'); // TODO: dynamic names
						$('.ui.form.UserForm').form('add errors',result.messages); // TODO: dynamic names
					}
				});
		},
		makeItSubmit: function() {
			$(React.findDOMNode(this.refs.UserForm)).form('validate form');
			this.handleSubmit();
		},
		render: function() {
			return (
				<div className="ui small modal loginModal">
					<i className="close icon"></i>
					<div className="header">
						Login
					</div>
					<div className="content">
						<form ref="UserForm" className="ui form UserForm" onChange={this.updateFormData} onSubmit={this.handleSubmit}>
							<div className="ui error message"></div>
							<div className="two fields">
								<div className="required field">
									<label>Username</label>
									<div className="ui icon input">
										<input type="text" name="username" ref="username" placeholder="Username" />
										<i className="user icon"></i>
									</div>
								</div>
								<div className="required field">
									<label>Password</label>
									<div className="ui icon input">
										<input type="password" name="password" ref="password" placeholder="Password" />
										<i className="lock icon"></i>
									</div>
								</div>
							</div>
							<input className="hidden" type="submit" />
						</form>
					</div>
					<div className="actions">
						<div className="ui buttons">
							<div className="ui button close">Cancel</div>
							<div className="or"></div>
							<div className="ui primary button" onClick={this.makeItSubmit}>Login</div>
						</div>
					</div>
				</div>
			);
		},
		componentDidMount: function() {
			$('.loginModal')
				.modal({
					selector: {
						close: '.close',
						approve: '.actions .positive, .actions .approve, .actions .ok',
						deny: '.actions .negative, .actions .deny, .actions .cancel'
					}
				})
				.modal('detachable', false)
				.modal('setting', 'transition', 'horizontal flip')
				.modal('show');
			ui.formSetup('User');
		}
	});
	if( !$('.dimmer.modals').length ) {
		$('body')
			.append('<div class="ui dimmer modals"></div>');
	}
	React.render(
		<LoginModal />,
		$('.dimmer.modals')[0]
	);
};

module.exports = ui;
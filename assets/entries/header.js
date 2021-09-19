import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
	Dialog,
	Menu,
	MenuItem,
	MenuDivider,
} from '@blueprintjs/core';
import { FaUserPlus } from 'react-icons/fa';

import NARegisterForm from '../header/NARegisterForm';
import NALoginForm from '../header/NALoginForm';
import '../styles/header.scss';
import NANavbar from '../header/NANavbar';

class NAAppHeader extends Component {
	constructor(props) {
		super(props);
		this.resetState = {
			isRegisterForm: false,
			isLoginForm: false,
			isUserMenu: false,
			isNotifyMenu: false,
		};
		this.state = {
			isRegisterForm: false,
			isLoginForm: false,
			isUserMenu: false,
			isNotifyMenu: false,
			isAuthenticated: false,
		};
	}
	handleOpen(componentState) {
		this.setState({
			...this.state,
			...this.resetState,
			[componentState]: true,
		});
	}
	handleClose(componentState) {
		this.setState({ ...this.state, [componentState]: false });
	}
	async componentDidMount() {
		const body_auth_user = new FormData();
		body_auth_user.set('fields', '["username", "email"]');
		const res_auth_user = await fetch(window.$variables.route.api_auth_user, {
			method: 'POST',
			body: body_auth_user,
		});
		const auth_user_json = await res_auth_user.json();
		// console.log(auth_user_json);
		if (auth_user_json.success && auth_user_json.data) {
			this.setState({ ...this.state, isAuthenticated: true });
		}
	}
	render() {
		const userMenu = (
			<Menu className="navbar-menu-dropdown">
				{this.state.isAuthenticated ? (
					<>
						<MenuItem
							icon="log-out"
							onClick={() => {
								window.location.href = window.$variables.route.user_logout;
							}}
							text="Logout"
						/>
						<MenuItem
							icon="settings"
							text="Settings"
							onClick={() => {
								window.location.href = window.$variables.route.user_settings;
							}}
						/>
					</>
				) : (
					<>
						<MenuItem
							icon={
								<span className="bp3-icon bp3-icon-standard">
									<FaUserPlus />
								</span>
							}
							onClick={() => {
								this.handleOpen('isRegisterForm');
							}}
							text="Register"
						/>
						<MenuDivider />
						<MenuItem
							icon="log-in"
							onClick={() => {
								this.handleOpen('isLoginForm');
							}}
							text="Login"
						/>
					</>
				)}
			</Menu>
		);

		return (
			<>
				<NANavbar
					userMenu={userMenu}
					handleClose={(componentState) => {
						this.handleClose(componentState);
					}}
					handleOpen={(componentState) => {
						this.handleOpen(componentState);
					}}
					isUserMenu={this.state.isUserMenu}
					isNotifyMenu={this.state.isNotifyMenu}
				/>
				<Dialog
					isOpen={this.state.isRegisterForm}
					onClose={() => {
						this.handleClose('isRegisterForm');
					}}
				>
					<NARegisterForm
						id="registerForm"
						onClose={() => {
							this.handleClose('isRegisterForm');
						}}
					/>
				</Dialog>

				<Dialog
					onClose={() => {
						this.handleClose('isLoginForm');
					}}
					isOpen={this.state.isLoginForm}
				>
					<div>
						<NALoginForm
							id="loginForm"
							onClose={() => {
								this.handleClose('isLoginForm');
							}}
						/>
					</div>
				</Dialog>
			</>
		);
	}
}

ReactDOM.render(<NAAppHeader />, document.getElementById('app-header'));

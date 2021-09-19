import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../styles/footer.scss';
import NASocialLinks from '../footer/NASocialLinks';

class NAAppFooter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cpyYear: new Date().getFullYear(),
		};
	}
	render() {
		return (
			<>
				<NASocialLinks />
				<div className="footer-container p-2">
					<div className="container text-center footer-copyright">
						Copyright &copy; {this.state.cpyYear} | Powered by Zen Geeks
					</div>
				</div>
			</>
		);
	}
}

ReactDOM.render(<NAAppFooter />, document.getElementById('app-footer'));

import React ,{Component} from 'react';
import './Home.css';
import Nav from '../Nav/Nav'


class Home extends Component {


	render(){
		document.body.className = "app-back"
		return(
			<div className="home">
				<Nav />
				<div id="home-cover"></div> 
				<div id="home-caption">
						<span id = "title">Be a part of the solution</span>
				</div>

			</div>
		)

	}
}
export default Home;


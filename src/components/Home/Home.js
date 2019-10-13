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
						<span id = "title">Be a part of the change</span>
				</div>

				{/* <div id = "home-intro">
						<span id = "title2">There is no such thing as ‘away’. <p>When we throw anything away it must go somewhere</p>.</span>

				</div>
			 */}

			</div>
		)

	}
}
export default Home;

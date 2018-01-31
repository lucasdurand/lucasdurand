import React, { Component } from 'react';
import logo from './logo.svg';
import github from './github.svg';
import gmail from './gmail.svg';
import './App.css';
import Masterpiece from './lucas.js';
import td from './td.svg';
import nbfm from './nbc.svg';
import uoft from './uoft.svg';
import york from './york.png';
import atom from './atom.svg';
import face from './face.png';
import linkedin from './linkedin.svg';
import * as Scroll from 'react-scroll';
import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import withSizes from 'react-sizes';

class App extends Component {

  constructor(props) {
    super(props);
    this.state=this.props;
  }

  componentDidMount(){


	Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });
 
    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();

  }
  
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  render() {
  	const logosize = 40;

const ParallaxBack = () => (
    <Parallax
        className="Tiny-art"
        offsetYMax={1000}
        offsetYMin={-400}
        slowerScrollRate
        tag="div" 
    >	
    	<Masterpiece/>
    	
    
    </Parallax> );

    return (
	<ParallaxProvider>
      <div className="App">
      {this.state.width>500? ParallaxBack():null}	
      <header className="App-header">
      <div className={this.state.me?"Nav-button active":"Nav-button App-title"} onClick={()=>this.setState({me:!this.state.me,})}>{this.state.me? 'Resume':'Lucas Durand'}</div>
      {this.state.width>500 && !this.state.me? (
      <div className="Nav-bar">

			    <div className="Nav-button" onClick={()=>{scroll.scrollToTop()}}>
        		Home
        	</div>
          	<Link activeClass="active" className="Nav-button" to="exp" spy={true} smooth={true} offset={-100} duration={500}>
        		Work
        	</Link>
          	<Link activeClass="active" className="Nav-button" to="education" spy={true} smooth={true} offset={-100} duration={500}>
        		Education
        	</Link>

          	<Link activeClass="active" className="Nav-button" to="contact" spy={true} offset={-100} smooth={true} duration={500}>
        		Contact
        	</Link>
      </div>
        ): null}
      </header>

      {this.state.width<=500 && this.state.me? <div className="Tiny-art"><Masterpiece/></div>:null}

<div className="Spacer"/>
{this.state.me? null: ( <div>
<div>
  <div className="Resume-chunk">
	<Element name="exp"><h2 className="Resume-chunk">Experience</h2>
  	<div>
          <p className="dates">Aug 2017 - Feb 2018</p>
          <div className="Resume-item">
            <img  src={td} height={logosize}/>
          </div>
          <ul className="Resume-item">
          	<h3 className="Resume-title">Front Office Quant</h3>
          	<div className="Resume-role">TD Securities - Quantitative Modelling & Analytics</div>
          	<li> Responsible for development and implementation of sophisticated derivatives pricing and risk models, exposing functionality to Excel and Java interfaces
          </li><li>Deliver Testing Harness PoC to perform continuous integration testing between local, server, and downstream valuation platforms
          </li><li>Implement infrastructure to expose library to Python, integrate with build
          </li><hr/>
          <li>Led Machine Learning group learning course. Cover key Data Science technniques with ongoing projects
          </li><li> Winner of TD Bank's Hackathon with development of novel model to predict customer life moments
          </li><li> Develop network of Chatbots, providing easy access to a variety of useful data and algorithms
          </li></ul>
      </div>
      <div>    
          <p className="dates">Feb 2017 - Jul 2018</p>
          <div className="Resume-item">
            <img  src={td} height={logosize}/>
          </div>
          <ul className="Resume-item">
          	<h3 className="Resume-title">Quant Developer</h3>
          	<div className="Resume-role">TD Bank - Treasury Analytics Group</div>

  			<li>Leverage data visualization tools to deliver interactive mortgage-backed security (MBS) valuation module to business leaders</li>
  	        <li> Benchmark and stability testing of quasi-Monte Carlo method allows for Key Rate Vega and Convexity hedging   </li>
  	        <li> Presented <i>Lunch n' Learn</i> featuring real-time code execution and animations</li>
  	        <hr/>
  	        <li>Course Completed: Udemy - Data Science and Machine Learning with Python</li>
          </ul>
      </div>
  </Element>
	</div>
</div>

	<div>
		<Element name="education">
			<div className="Resume-chunk">
			<h2 className="Resume-chunk">Education</h2>
				<div>
              <p className="dates">2014 - 2016</p>
			        <img className="Resume-item" src={york} height={logosize}/>
        			<ul className="Resume-item">
        			<h3 className="Resume-title">MSc., Theoretical Physics</h3>
		        	<div className="Resume-role">York University, Perimeter Institute (PI)</div>
		        		<li>TA: Engineering/Physics Lab; Science, Technology & the Environment</li>
		        		<li>Major Research Project: <i>inSIDious</i> Matter</li>
	        		</ul>
        		</div>
        		<div>
              <p className="dates">2009 - 2014</p>
			        <img className="Resume-item" src={uoft} height={logosize}/>
        			<ul className="Resume-item">
        			<h3 className="Resume-title">HBSc., Physics & Philosophy</h3>
		        	<div className="Resume-role">University of Toronto</div>
		        		<li>Senior Thesis Completed - Graphene: Hartree-Fock Analytics and Numerics</li>
	        		</ul>
        		</div>
			<h2 className="Resume-chunk">Research</h2>
				<div>
			        <img className="Resume-item" src={york} height={logosize}/>
        			<ul className="Resume-item">
        			<h3 className="Resume-title">Major Research Project</h3>
		        	<div className="Resume-role">Tulin Research Group</div>
			        	<li> Phenomenological exploration of a particle physics model for an inelastic self-interacting dark matter</li>
				        <li> Theoretical formulation of scattering quantities by tensor calculus and numerical partial-wave analysis</li>
				        <li> Determination of allowed parameter-space for theory in agreement with predictions from N-body simulations and astronomical observations</li>
				       	<li> New efficient techniques for numerically determining scattering cross-sections in the classical regime are implemented</li>
				    	<li> Visiting Researcher at the <i>Perimeter Institute for Theoretical Physics</i></li>
	        		</ul>
        		</div>

			</div>	
		</Element>
	</div>

	<div>
		<Element name="contact">
		<div className="Resume-chunk">
			<h2 className="Resume-chunk">Contact</h2>
			<div className="Resume-ite">Reach me by the digital channel of your choosing:</div>
		        <div className="Resume-item">
		      		<a href='mailto:lucas@lucasdurand.xyz'><img className="inverted" src={gmail} height={logosize} /></a>
	      		</div>
		        <div className="Resume-item">
		        	<img className="inverted" src={linkedin} height={logosize}/>
		        </div>
		        <div className="Resume-item">
		        	<a href='https://github.com/lucasdurand' target='_blank'><img className="inverted" alt="GitHub" src={github} height={logosize}/></a>
		        </div>
		</div>
		</Element>
	</div>

</div> )}
</div>
</ParallaxProvider>
    );
  }
}


const mapSizesToProps = ({ width }) => ({
  width: width,
})

export default withSizes(mapSizesToProps)(App);

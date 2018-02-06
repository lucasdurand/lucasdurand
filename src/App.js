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
import sax from './sax.svg';
import atom from './atom.svg';
import face from './face.png';
import chair from './chair.svg';
import trin from './trin.png';
import lit from './lit.png';
import linkedin from './linkedin.svg';
import * as Scroll from 'react-scroll';
import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import withSizes from 'react-sizes';
import interests from './interests.json';
import languages from './languages.json';
import { Pie, Venn } from './plots.js';
import {Doughnut} from 'react-chartjs-2';
import shuffle from 'shuffle-array';

class App extends Component {

  constructor(props) {
    super(props);
    this.state={interests:interests,
      activeInterest:-1,
      languages:[],
      width:props.width};
  }

  componentDidMount(){


	Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });
 
    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();
    console.log("Mounted!", this.state);
    this.setState({languages:this.constructLanguages(languages)});
    this.forceUpdate();
  }
  
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  constructLanguages(langs){
    const start = 1;
    const end = 250;
    console.log('constructLanguages');
    var out = {};
    var c = 0.0
    out["labels"] = langs.map((lang)=>lang.label);
    out["datasets"]=[{"data":langs.map((lang)=>lang.value),
      "backgroundColor": langs.map((lang,i)=>{
        c = Math.round((i*(end-start)/langs.length)+start);
        return `rgba(${c},${c},${c},0.6)`;
        }
      ),
      "hoverBackgroundColor": '#fff'
    }]
    out["datasets"][0]["backgroundColor"]=shuffle(out["datasets"][0]["backgroundColor"]);
    console.log(out);
    return out;  
    }


  render() {
  	const logosize = 40;
    const headerheight = 60;
    
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
      <div className={this.state.me?"Nav-button active":"Nav-button App-title"} onClick={()=>{scroll.scrollToTop(); if(this.state.me){this.setState({me:false})}}} onDoubleClick={()=>this.setState({me:!this.state.me,})}>{this.state.me? 'Back to CV':'Lucas Durand'}</div>
      {this.state.width>500 && !this.state.me? (
      <div className="Nav-bar">
          <Link activeClass="active" className="Nav-button" to="exp" spy={true} smooth={true} offset={-headerheight} duration={500}>
        		Work
        	</Link>
          
          <Link activeClass="active" className="Nav-button" to="education" spy={true} smooth={true} offset={-headerheight} duration={500}>
        		Education
        	</Link>
          
          <Link activeClass="active" className="Nav-button" to="more" spy={true} smooth={true} offset={-headerheight} duration={500}>
            More
          </Link>

          <Link activeClass="active" className="Nav-button" to="contact" spy={true} offset={-headerheight} smooth={true} duration={500}>
        		Contact
        	</Link>
      </div>
        ): null}
      </header>

      {this.state.width<=500 && this.state.me? <div className="Mobile-art"><Masterpiece/></div>:null}

<div className="Spacer"/>
{this.state.me? null: ( <div>
<div>
  <div className="Resume-chunk">
    <Element name="skills"><h2 className="Resume-chunk">Skills</h2>
      <div className="Noverflow">
        {this.state.interests.map((interest,i)=>
            <div key={interest.id} className="Skill-circle" onMouseEnter={()=>this.setState({activeInterest:interest.id})} onMouseLeave={()=>this.setState({activeInterest:-1})}>
              {this.state.activeInterest === interest.id?
                <ul>
                {interest.skills.map((skill,j)=>
                  <li key={j}>{skill}</li> 
                  )}
                </ul>
              : <Pie percent={interest.percentage} width={100} />
              }
            <h4>{interest.name}</h4>
            </div>  
          )}
      </div>
      <div className="Noverflow">
        <h2 className="Resume-chunk">Languages</h2>
        <Doughnut data={this.state.languages} height={Math.min(300,this.state.width)} legend={{
        display: true,
        position: 'bottom',
        fullWidth: false,
        reverse: false,
        labels: {
          fontColor: '#fff'}}}/>
      </div>
    </Element>
  </div>
</div>

<div>
  <div className="Resume-chunk">
	<Element name="exp"><h2 className="Resume-chunk">Work</h2>
  	<div>
          <p className="dates">Aug 2017 - Feb 2018</p>
          <div className="Resume-item">
            <img  src={td} width={logosize}/>
          </div>
          <ul className="Resume-item">
          	<h3 className="Resume-title">Quant Developer</h3>
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
            <img  src={td} width={logosize}/>
          </div>
          <ul className="Resume-item">
          	<h3 className="Resume-title">Quant Developer</h3>
          	<div className="Resume-role">TD Bank - Treasury Analytics Group</div>
  			<li>Leverage data visualization tools to deliver interactive mortgage-backed security (MBS) valuation module to business leaders</li>
  	        <li> Benchmark and stability testing of quasi-Monte Carlo method allows for Key Rate Vega and Convexity hedging   </li>
  	        <li> Presented <i>Lunch n' Learn</i> featuring real-time code execution and animations</li>
  	        <hr/>
            Course Completed:
  	        <li>Udemy - Data Science and Machine Learning with Python</li>
          </ul>
      </div>

      <div>    
          <p className="dates">Jul 2016 - Feb 2018</p>
          <div className="Resume-item">
            <img  src={td} width={logosize}/>
          </div>
          <ul className="Resume-item">
            <h3 className="Resume-title">Business Systems Analyst</h3>
            <div className="Resume-role">TD Bank - Enterprise Fraud Analytics Program</div>

            <li>Subject Matter Expert (SME) for Identity & Access Management. Developed Role-Based Access Management tools to automate RBAC reporting</li>
            <li>Interfaced between business and Testing Centre of Excellence to facilitate continuous testing on vendor platform delivery</li>
            <hr/>
            Courses Completed:
              <li> Global Knowledge - IBM BigInsights Foundation </li>
              <li> Coursera (Columbia University) - Financial Engineering and Risk Management Part I</li> 
          </ul>
      </div>
      <div>    
          <p className="dates">Sep 2014 - Apr 2016</p>
          <div className="Resume-item">
            <img  src={york} width={logosize}/>
          </div>
          <ul className="Resume-item">
            <h3 className="Resume-title">Teaching & Research Assistant</h3>
            <div className="Resume-role">York University, Tulin Research Group</div>

            <li>Maintained a broad knowledge of general science to lead tutorials in <i>Science, Technology & the Environment</i> as well as  weekly topics relevant to <i>Engineering/Physics Labs</i></li>
            <li>Worked to promote a holistic understanding of difficult concepts through the use of qualitative, quantitative, analytic and synthetic thinking while efficiently assessing a high volume of student problem sets and assignments</li>
          </ul>
      </div>

      <div>    
          <p className="dates">Apr 2014 - Sep 2015</p>
          <div className="Resume-item">
            <img  src={nbfm} width={logosize}/>
          </div>
          <ul className="Resume-item">
            <h3 className="Resume-title">Application Analyst</h3>
            <div className="Resume-role">NBFM - Equities Trade Support</div>

            <li>Created ETL framework and dashboards to provide meaningful business insights from global equities trade data, leading to the adoption of Tableau Server across the LoB</li>
            <li>Worked on NBFM trading floor, directly interfacing with institutional equities, direct market access, and discount brokerage traders</li>
            <li>Designed and implemented Big Data PoC for legal compliance reporting. Consolidated data from legacy Sybase servers into modern data structure to increase search speeds by 1000%</li>
            <li>Explored use cases for visualisation libraries by analysing real-time market data</li>
          </ul>
      </div>

  </Element>
  </div>
</div>

<div>
  <Element name="languages">
    <div className="Resume-chunk">
    </div>
  </Element>
</div>
	<div>
		<Element name="education">
			<div className="Resume-chunk">
			<h2 className="Resume-chunk">Education</h2>
				<div>
              <p className="dates">2014 - 2016</p>
			        <img className="Resume-item" src={york} width={logosize}/>
        			<ul className="Resume-item">
        			<h3 className="Resume-title">MSc., Theoretical Physics</h3>
		        	<div className="Resume-role">York University, Perimeter Institute (PI)</div>
		        		<li>TA: Engineering/Physics Lab; Science, Technology & the Environment</li>
		        		<li>Major Research Project: <i>inSIDious</i> Matter</li>
	        		</ul>
        		</div>
        		<div>
              <p className="dates">2009 - 2014</p>
			        <img className="Resume-item" src={uoft} width={logosize}/>
        			<ul className="Resume-item">
        			<h3 className="Resume-title">HBSc., Physics & Philosophy</h3>
		        	<div className="Resume-role">Trinity College, University of Toronto</div>
		        		<li>Senior Thesis Completed - Graphene: Hartree-Fock Analytics and Numerics</li>
	        		</ul>
        		</div>
			<h2 className="Resume-chunk">Research</h2>
				<div>
			        <img className="Resume-item" src={york} width={logosize}/>
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

  <Element name="more">
    <div>
      <div className="Resume-chunk">
      <h2 className="Resume-chunk">Volunteering</h2>
        <div>
          <p className="dates">Annual</p>
          <img className="Resume-item" src={sax} width={logosize}/>
          <ul className="Resume-item">
          <h3 className="Resume-title">Benefit Concerts</h3>
            <li>ABC for SickKids</li>
            <li>CANFAR - AIDSbeat</li>
            <li>March of Dimes - Rock for Dimes</li>
            <li>CIBC Run for the Cure</li>
            <li>Big Brothers Big Sisters of York</li>
            <li>CIBC Rock for LIFE</li>
            <li>AUSUM Charity for Autism</li>
            <li>Raising the Roof - Sounds of the 6ix</li>
          </ul>
        </div>
        <div>
          <p className="dates">2014 - Present</p>
          <img className="Resume-item" src={uoft} width={logosize}/>
          <ul className="Resume-item">
          <h3 className="Resume-title">UofT A&S Mentorship Program</h3>
            <li>Department of Physics Mentor</li>
          </ul>
        </div>
        <div>
          <p className="dates">Jul 2016 - Present</p>
          <img className="Resume-item" src={td} width={logosize}/>
          <ul className="Resume-item">
          <h3 className="Resume-title">TD Associate Knowledge Academy</h3>
            <li>Lunch n' Learn Presenter</li>
            <li>Group Learning Coordinator</li>
            <li>Associate Fireside Chat Creator</li>
          </ul>
        </div>
      </div>
  </div>
  <div>
    <div className="Resume-chunk">
      <h2 className="Resume-chunk">Leadership</h2>
      <div>
        <p className="dates">2017 - Present</p>
        <img className="Resume-item" src={chair} width={logosize}/>
        <div className="Resume-item">
          <h3 className="Resume-title">Second Chair Solutions Ltd.</h3>
          Director of the Board
        </div>
      </div>

      <div>
        <p className="dates">2009 - 2014</p>
        <img className="Resume-item" src={lit} width={logosize}/>
        <div className="Resume-item">
          <h3 className="Resume-title">Trinity College Literary Institute</h3>
          Speaker
        </div>
      </div>


      <div>
        <p className="dates">2009 - 2014</p>
        <img className="Resume-item" src={trin} width={logosize}/>
        <div className="Resume-item">
          <h3 className="Resume-title">Trinity College Meeting</h3>
          Deputy Chair
        </div>
      </div>

    </div>
  </div>
  </Element>
	<div>
		<Element name="contact">
		<div className="Resume-chunk">
			<h2 className="Resume-chunk">Contact</h2>
			<div className="Resume-item">Reach me by the digital channel of your choosing:</div>
      <div>
        <div className="Resume-item">
      		<a href='mailto:lucas@lucasdurand.xyz'><img className="inverted" src={gmail} width={logosize} /></a>
    		</div>
        <div className="Resume-item">
        	<a href="https://www.linkedin.com/in/lucasdurand">
            <img className="inverted" src={linkedin} width={logosize}/>
          </a>
        </div>
        <div className="Resume-item">
        	<a href='https://github.com/lucasdurand' target='_blank'><img className="inverted" alt="GitHub" src={github} width={logosize}/></a>
        </div>
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

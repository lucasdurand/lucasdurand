import React, { Component } from 'react';
import {CirclePie} from 'salad-ui.chart';
import './venn.css';


export class Venn extends Component {
	render(){
		return(
<div>
    <div id="center-sphere">
      <h2 className="title">Web of Health</h2>
      <p className="description">Hover over a sphere to learn more</p>
    </div> 
    <div className="sphere one" >
      <span className="text health">GI Health</span>
      <p className="blurb">Deep v forage Thundercats selfies, shabby chic chillwave food truck fashion axe PBR&amp;B Etsy flannel High Life beard skateboard. Mixtape skateboard quinoa viral, bicycle rights tote bag Neutra Wes Anderson gentrify Tonx. </p>
    </div>
    <div className="sphere two" >
      <span className="text spiritual">Spiritual</span>
       <p className="blurb">Deep v forage Thundercats selfies, shabby chic chillwave food truck fashion axe PBR&amp;B Etsy flannel High Life beard skateboard. Mixtape skateboard quinoa viral, bicycle rights tote bag Neutra Wes Anderson gentrify Tonx. </p>
    </div>
    <div className="sphere three" >
      <span className="text emotion">Emotions</span>
       <p className="blurb">Deep v forage Thundercats selfies, shabby chic chillwave food truck fashion axe PBR&amp;B Etsy flannel High Life beard skateboard. Mixtape skateboard quinoa viral, bicycle rights tote bag Neutra Wes Anderson gentrify Tonx. </p>
    </div>
    <div className="sphere four" >
      <span className="text lifestyle">Lifestyle</span>
       <p className="blurb">Deep v forage Thundercats selfies, shabby chic chillwave food truck fashion axe PBR&amp;B Etsy flannel High Life beard skateboard. Mixtape skateboard quinoa viral, bicycle rights tote bag Neutra Wes Anderson gentrify Tonx.</p>
    </div>
    <div className="sphere five" >
      <span className="text hormone">Hormones</span>
       <p className="blurb">Deep v forage Thundercats selfies, shabby chic chillwave food truck fashion axe PBR&amp;B Etsy flannel High Life beard skateboard. Mixtape skateboard quinoa viral, bicycle rights tote bag Neutra Wes Anderson gentrify Tonx. </p>
    </div>
    <div className="sphere six" >
      <span className="text immune">Immunity</span>
       <p className="blurb">Deep v forage Thundercats selfies, shabby chic chillwave food truck fashion axe PBR&amp;B Etsy flannel High Life beard skateboard. Mixtape skateboard quinoa viral, bicycle rights tote bag Neutra Wes Anderson gentrify Tonx. </p>
    </div>
    <div className="sphere seven" >
      <span className="text muscles">Musculoskeletal</span>
       <p className="blurb">Deep v forage Thundercats selfies, shabby chic chillwave food truck fashion axe PBR&amp;B Etsy flannel High Life beard skateboard. Mixtape skateboard quinoa viral, bicycle rights tote bag Neutra Wes Anderson gentrify Tonx. </p>
    </div>
    <div className="sphere eight" >
      <span className="text genes">Genes</span>
       <p className="blurb">Deep v forage Thundercats selfies, shabby chic chillwave food truck fashion axe PBR&amp;B Etsy flannel High Life beard skateboard. Mixtape skateboard quinoa viral, bicycle rights tote bag Neutra Wes Anderson gentrify Tonx. </p>
    </div>
    <div className="sphere nine" >
      <span className="text toxin">Toxins</span>
       <p className="blurb">Deep v forage Thundercats selfies, shabby chic chillwave food truck fashion axe PBR&amp;B Etsy flannel High Life beard skateboard. Mixtape skateboard quinoa viral, bicycle rights tote bag Neutra Wes Anderson gentrify Tonx. </p>
    </div>
     <div className="sphere ten">
      <span className="text nutrient">Nutrients</span>
        <p className="blurb">Deep v forage Thundercats selfies, shabby chic chillwave food truck fashion axe PBR&amp;B Etsy flannel High Life beard skateboard. Mixtape skateboard quinoa viral, bicycle rights tote bag Neutra Wes Anderson gentrify Tonx. </p>
    </div>
</div>
		)
	}
}

export class Pie extends Component {

  render() {

	const hw = this.props.width;//100;
  	return (
  		<CirclePie percent={this.props.percent}
  		 strokeWidth={15/100*hw}
  		 railColor={null}
  		 height={hw}
  		 width={hw}
  		 labelColor="rgba(255, 255, 255,0.85)" //
  		 labelFontSize={hw/5}
  		 strokeColor="rgba(255, 255, 255,0.85)" //circle
 		/>
	)
  }
}


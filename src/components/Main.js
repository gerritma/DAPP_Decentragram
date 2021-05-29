import React, { Component } from 'react'


class Main extends Component {


  render() {
    return (
    <div className="container-fluid mt-5">
    	<div className="row">
    		<main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: '500px'}} >
    		  <div id="content mr-auto ml-auto">
    		  <p>&nbsp;</p>
    		  
    		  <h2>Share Image</h2>
    		  <form onSubmit={(event) => {
    		  	event.preventDefault()
    		  	const description = this.imageDescription.value
    		  	this.props.uploadImage(description) 
    		  }} >
    		  	<input type='file' accept=".jpg, .jpeg, .png, .bmp, /gif" onChange = {this.props.captureFile} />
    		  		<div className="form-group mr-sm-2">
    		  			<br></br>
    		  				<input 
    		  					id="imageDescription"
    		  					type="text"
    		  					ref={(input) => {this.imageDescription = input}}
    		  					className="form-control"
    		  					placeholder="Image description ..."
    		  					required />
    		  		</div>
    		  	<button type="submit" className="btn btn-primary btn-block btn-lg">Upload</button>
    		  </form>

        	<p>&nbsp;</p>

        		{/*code */}
        
      		</div>
      	</main>
      </div>
     </div>

    );
  }
}

export default Main;

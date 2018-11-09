import React from 'react';
import {Router,Route,IndexRoute} from 'react-router';
import {HashRouter,BrowserRouter,Switch,withRouter } from 'react-router-dom';
import App from './App.js';
import Order from '../src/components/order.js';
import Deal from '../src/components/Deal.js';
import Completepage from '../src/components/Complete.js';
import { createHashHistory } from 'history';

const history = createHashHistory();


const Routes=()=>(
    <Router history={history}>
	  <div>
	  	
		    
		    <Route exact path='/'  component={App} />
		    <Route exact path='/product'  component={App} />

		    
		    <Switch>
			          	<Route exact path='/order' component={Order} />
			          
			          	<Route exact path='/order/deal' component={Deal} />
			          	
			          	<Route exact path='/order/complete' component={Completepage} />
			          	
			</Switch>
	   
	  </div>
	</Router>

        
        
)

if(window.location.href === "https://www.cmapi.ca/cm_miniprogram/dev/public/sbox-manage/#/order/deal"){
	console.log("success");
	createHashHistory().push("/order/deal");
}else if(window.location.href === "https://www.cmapi.ca/cm_miniprogram/dev/public/sbox-manage/#/order/complete"){
	console.log("complete success");
	createHashHistory().push("/order/complete");
}else{
	createHashHistory().push("/");
}


console.log(window.location.hash);
console.log(window.location.href);





export default Routes;

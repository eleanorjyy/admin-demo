import React from 'react';
import {Router,Route} from 'react-router';
import {BrowserRouter,Switch,withRouter } from 'react-router-dom';
import App from './App.js';
import Order from '../src/components/order.js';
import Deal from '../src/components/Deal.js';
import Completepage from '../src/components/Complete.js';


const Routes=()=>(
    <BrowserRouter>
	  <div>
	  	
		    
		    <Route path='/product' component={App} />
		    <Switch>
			          <Route exact path='/order' component={Order} />
			          <Route path='/order/deal' component={Deal} />
			          <Route path='/order/complete' component={Completepage} />
			</Switch>
	   
	  </div>
	</BrowserRouter>
        
        
)

export default Routes;



var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var orderdata = require('../../src/components/boxdata.json');




var userActions = {
	createBox:function(box) {
		// body...
		var newbox = {"id":box,"name":orderdata[box].name,"addr":orderdata[box].addr,
						"phone":orderdata[box].info,"deal":orderdata[box].dealed,
						"complete":orderdata[box].complete,"tracking":orderdata[box].tracknum} ;
		console.log(newbox);
		

		Dispatcher.dispatch({
			actionType: ActionTypes.CREATEBOX,
			box:newbox
		});
	},
	updataBox:function(box) {
		// body...
		var updataBox = {};
		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATA_BOX,
			box: ActionTypes.UPDATA_BOX
		});
	},


};


module.exports = userActions;
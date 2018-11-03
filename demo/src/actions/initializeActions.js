"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorApi = require('../api/authorApi');

var InitializeActions ={
	initbox:function(){
		Dispatcher.dispatch({
			actionType:ActionTypes.INITIALIZE,
			initialData{
				boxs:AuthorApi.getAllAuthors()
			}
		});
	}
};

module.exports = InitializeActions;
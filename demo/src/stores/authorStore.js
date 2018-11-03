

var Dispatcher = require('../dispatcher/appDispatcher.js');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var _boxs = [];

var AuthorStore = assign({},EventEmitter.prototype,{
	addChangeListener:function (callback) {
		// body...
		this.on("Click",callback);

	},
	removeChangeListener:function (callback) {
		// body...
		this.removeChangeListener("Click",callback);

	},
	emitChange:function () {
		// body...
		this.emit("Click");

	},

	getAllbox:function(){
		return _boxs;
	},

	getBoxById:function(id){
		return _.find(_boxs,{id:id});
	}

});

Dispatcher.register(function(action){
	switch(action.actionType){
		case ActionTypes.INITIALIZE:
			_boxs = action.initialData.boxs;
			AuthorStore.emitChange();
			break;
		case ActionTypes.CREATEBOX:
			_boxs.push(action.box);
			AuthorStore.emitChange();
			break;
		case ActionTypes.UPDATA_BOX:
			var existingBox = _.find(_boxs,{id:action.box.id});
			var exsitingBoxIndex = _.indexOF(_boxs,existingBox);
			_boxs.splice(existingBox,1,action.box);
			AuthorStore.emitChange();
			break;
		default:

	}

});

module.exports=AuthorStore;
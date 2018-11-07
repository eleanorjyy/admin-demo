
var Dispatcher = require('../dispatcher/appDispatcher.js');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var _boxs = [];
var _products =[];
var _images = [];
var _Pimages =[];
var _Ub =[];

var ProductStore = assign({},EventEmitter.prototype,{
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

	getBoxById:function(id,bid){
		console.log("use id "+id+"from all data "+JSON.stringify(_boxs));
		if(id < _boxs.length){
			//_boxs[id].bid=;
			var result = _boxs[id];
		}
		return result;
	},
	getAllproducts:function(){
		return _products;
	},

	addboxid:function(){
		return _Ub;
	},

	addImageToBox:function(){
		console.log("new image in box"+JSON.stringify(_images));

		return _images;
		
	},

	addImageToP:function(){
		console.log("new Pimage in box"+_Pimages.length);
		return _Pimages;
		
	},
	getAllboxImage:function(){
		return _images;
	},
	getAllpImages:function(){
		return _Pimages;
	},
	getImagePById:function(id){
		console.log("here!");
		if(_Pimages.length > 0){
			for (var i=0;i<_Pimages.length;i++){
				console.log(JSON.stringify(_Pimages));
				if (_Pimages[i].pid === id){
					console.log("if state!");
					console.log(JSON.stringify(_Pimages[i]));
					return _Pimages[i];
				}
			}
		}else{
			console.log("empty "+_Pimages);
			return _Pimages;
		}
		
	},
	getImageAddr:function(id){
		console.log("here!");
		if(_Pimages.length > 0){
			for (var i=0;i<_Pimages.length;i++){
				console.log(JSON.stringify(_Pimages));
				if (_Pimages[i].pid === id){
					console.log("if state!");
					console.log(JSON.stringify(_Pimages[i]));
					return _Pimages[_Pimages.length-1];
				}
			}
		}else{
			console.log("empty "+_Pimages);
			return _Pimages;
		}
		
	},

	getImageById:function(id){
		console.log("here!");
		if(_images.length > 0){
			for (var i=0;i<_images.length;i++){
				console.log(JSON.stringify(_images));
				if (_images[i].bid === id){
					console.log("if state!");
					console.log(JSON.stringify(_images[i]));
					return _images[i];
				}
			}
		}else{
			console.log("empty "+_images);
			return _images;
		}
		
	},

});

Dispatcher.register(function(action){
	switch(action.actionType){
		case ActionTypes.CREATE_DETAIL:
			_products = null;
			_products = action.boxdetail;
			ProductStore.emitChange();
			break;
		case ActionTypes.CREATEPRODUCT:
			const eabox = JSON.stringify(action.boxdata)
			//_boxs = null;
			_boxs.push(action.boxdata);
			console.log("in stores:"+eabox);
			ProductStore.emitChange();
			break;
		case ActionTypes.UPDATEPRODUCT:
			_products.push(action.product);
			ProductStore.emitChange();
		case ActionTypes.ADD_IMAGE:
			//_images = null;
			console.log(_images);
			if(_images.length === 6){
				console.log("change _images");
				
				for(var i=0;i<_images.length;i++){
					console.log(_images[i]);
					if(_images[i].length >= 1){
						if(action.imageUrl.bid === _images[i].bid){
							_images[i].image = action.imageUrl.image;
						}
					}else{
						console.log("no way in here");
						console.log(_images[i]);
						_images[i].image = '';
					}
				}
			}else{	
				console.log("init _images");
				_images.push(action.imageUrl);
			}
			ProductStore.emitChange();
			break; 
		case ActionTypes.ADD_PIMAGE:
			_Pimages.push(action.pimageUrl);
			ProductStore.emitChange();
			break; 
		case ActionTypes.UPDATEBOXID:
			_Ub.push(action.box);
			console.log(_Ub);
			ProductStore.emitChange();
			break; 
		
		default:

	}

});

module.exports=ProductStore;
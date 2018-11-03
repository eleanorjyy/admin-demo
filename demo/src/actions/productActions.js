
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
//var orderdata = require('../../src/components/boxdata.json');




var productActions = {
	createProduct:function(box,boxdata) {
		// box is index, boxdata is each box data
		var index = box;
		console.log("index send: "+ box);
		console.log("each data: "+ JSON.stringify(boxdata));
		//var newbox = box.ea_boxes;
		// if(boxdata.status === 0){
			var newbox ={key:boxdata.bid, pid:boxdata.bid, pn:boxdata.name, rest:boxdata.num,price:boxdata.price,threshold:boxdata.threshold};
		// }else{
		// 	var newbox ={key:boxdata.bid, pid:boxdata.bid,pn:"no data"};
		// }
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATEPRODUCT,
			boxdata:newbox
		});
	},
	
	createDetail:function(box,boxdetail){
		var index = box;
		console.log("detail index send: "+ box);
		console.log("each detail: "+ JSON.stringify(boxdetail));
		//var newbox = box.ea_boxes;
		//{key:boxdetail.id,boxid:index,pid:boxdetail.pid,pn:boxdetail.name, amount:boxdetail.num,price:boxdetail.price}
		var newdetail =boxdetail;
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_DETAIL,
			boxdetail:newdetail
		});
	},
	updateProduct:function(pid,product){
		//{"bid":1,"pid":1,"num":3,"id":2,"status":0,"price":"2.99","name":"p5","image":""}
		var newproduct = {	pid:pid,
							name:product.name,
							bid:product.bid,
							num:product.num,
							status:product.status,
							price:product.price,
							image:product.image,
							id:product.id
		};
		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATEPRODUCT,
			product:newproduct
		});

	},
	addImage:function(box,imageUrl){
		var index = box;
		console.log("detail index send: "+index);
		
		//var newbox = box.ea_boxes;
		//{key:boxdetail.id,boxid:index,pid:boxdetail.pid,pn:boxdetail.name, amount:boxdetail.num,price:boxdetail.price}
		var newImage = {bid:box,image:imageUrl};

		console.log("new image!"+ JSON.stringify(newImage));
		Dispatcher.dispatch({
			actionType: ActionTypes.ADD_IMAGE,
			imageUrl:newImage
		});
	},



	addpImage:function(box,pid,imageUrl){
		var index = box;
		console.log("detail index send: "+index);
		
		//var newbox = box.ea_boxes;
		//{key:boxdetail.id,boxid:index,pid:boxdetail.pid,pn:boxdetail.name, amount:boxdetail.num,price:boxdetail.price}
		var newImageP = {bid:box,pid:pid,image:imageUrl};

		console.log("new Pimage!"+ JSON.stringify(newImageP));
		Dispatcher.dispatch({
			actionType: ActionTypes.ADD_PIMAGE,
			imageUrl:newImageP
		});
	}
	


};


module.exports = productActions;
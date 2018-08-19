const filterEmoji = (data) => {
	console.log('data: ', typeof data);
	if(data.constructor == String){
		return data.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");;
	}else{
		return data;
	}
	
}

module.exports = {
	filterEmoji: filterEmoji
}
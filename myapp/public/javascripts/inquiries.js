$("td").bind("click", dataClick);

function dataClick(e) {
	console.log(e);
	if (e.currentTarget.innerHTML!= "") return;
	if (e.currentTarget.contentEditable == null){
		$(e.currentTarget).attr("contentEditable", true);
	}
	else{
		$(e.currentTarget).append("<input type='text'>");
	}
}
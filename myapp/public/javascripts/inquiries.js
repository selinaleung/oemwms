$(document).ready(function() {
	$(".note-cell").bind("click", cellClick);
	$(".inquiry-row").bind("dblclick", rowClick);
	$('#new-note-info').popover();
});

$(document).on('keyup', '.note-cell', updateRow)

function cellClick(e) {
	if (e.currentTarget.contentEditable != null) {
		$(e.currentTarget).attr("contentEditable", true);
	} 
	else {
		$(e.currentTarget).append("<input type='text'>");
	}
}

function rowClick(e) {
	$(e.currentTarget).toggleClass("unresolved");
}

function updateRow(e) {
	if (e.keyCode === 13) {
		var form = $(e.currentTarget).find($('form'));
		var row = $(e.currentTarget).parent();
		var inquiryId = row.attr("id");

		var notes_value = $(e.currentTarget).text();
		var status_value = $(row).hasClass("unresolved") ? 'unresolved': 'resolved' ;

		$(form).append("<input name='notes' type='hidden' value= '"+notes_value+"'>");
		$(form).append("<input name='status' type='hidden' value= '"+status_value+"'>");

		$(form).submit();
	}
}

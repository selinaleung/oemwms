$(document).ready(function() {
	$(".note-cell").bind("click", cellClick);
	$(".status-cell").bind("dblclick", statusClick)
});

$(document).on('click', '.update-btn', updateRow)


function cellClick(e) {
	if (e.currentTarget.contentEditable != null) {
		$(e.currentTarget).attr("contentEditable", true);
	} 
	else {
		$(e.currentTarget).append("<input type='text'>");
	}
}

function statusClick(e) {
	console.log(e.currentTarget.innerHTML);
	if (e.currentTarget.innerHTML == 'unresolved'){
		$(e.currentTarget).html('resolved');
	} 
	else {
		$(e.currentTarget).html('unresolved');
	}
}

function updateRow(e) {
	var form = $(e.currentTarget).parent()[0];
	var row = $(e.currentTarget).parent().parent().parent();
	var inquiryId = row.attr("id");
	var note_cells = $(".note-cell");
	var status_cells = $(".status-cell");

	var notes_value = $(row).find(note_cells).html();
	var status_value = $(row).find(status_cells).html();

	$(form).append("<input name='notes' type='hidden' value= '"+notes_value+"'>");
	$(form).append("<input name='status' type='hidden' value= '"+status_value+"'>");

	$(form).submit();
}

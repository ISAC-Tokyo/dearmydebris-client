/*
 *@parameter
 *_user_id : SNS ID
 *_debri_id : Submit Debri ID
 */
function submitDebri(_user_id, _debri_id){

	_url = "https://www.google.co.jp";

	$.ajax({
		
		type:'post',
		url: _url,
		dara: {
			user_id:_user_id,
			debri_id:_debri_id
		},
		sucess: function(msg){
			alert("登録が完了しました");
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
     		alert("some error");
  		}
	});
}
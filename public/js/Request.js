// Module: Wrapper for the AJAX calls with access token
var Request = (function() {
	
	var accessToken = localStorage.accessToken;
	return {
		get: function(url, data, success, dataType) {
			$.ajax({
				url: url,
				data: data,
				success: success,
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
				}
			});
		},

		post: function(url, data, success, dataType) {
			$.ajax({
				url: url,
				method: 'POST',
				data: data,
				success: success,
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
				}
			});
		},

		patch: function() {
			$.ajax({
				url: url,
				method: 'PATCH',
				data: data,
				success: success,
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
				}
			});
		},

		put: function() {
			$.ajax({
				url: url,
				method: 'PUT',
				data: data,
				success: success,
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
				}
			});
		}
	};
}());

// Module: Wrapper for the AJAX calls with access token
var Request = (function() {
	
	var handleResponse = function(success) {
		return function(result) {
			if (result.success) {
				success(result.data);
				PubSub.publish('valid_token', 'valid_token');
			} else {
				PubSub.publish('invalid_token', 'invalid_token');
			}

		}
	}
	return {
		get: function(url, data, success, dataType) {
			console.log('Access token: ' + localStorage.accessToken);
			$.ajax({
				url: url,
				data: data,
				success: handleResponse(success),
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.accessToken);
				}
			});
		},

		post: function(url, data, success, dataType) {
			$.ajax({
				url: url,
				method: 'POST',
				data: data,
				success: handleResponse(success),
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.accessToken);
				}
			});
		},

		patch: function(url, data, success, dataType) {
			$.ajax({
				url: url,
				method: 'PATCH',
				data: data,
				success: handleResponse(success),
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.accessToken);
				}
			});
		},

		put: function(url, data, success, dataType) {
			$.ajax({
				url: url,
				method: 'PUT',
				data: data,
				success: handleResponse(success),
				dataType: dataType,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.accessToken);
				}
			});
		}
	};
}());

//# sourceMappingURL=utils.js.map

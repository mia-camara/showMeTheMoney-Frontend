$ (document).ready(function(){

// listData();

	// SIGN UP - NEW USER
	$('#sign-up').on('click', function(event){
		event.preventDefault(); 
		
		$.ajax({
	    type: 'POST',
	    url: 'http://localhost:3000/users',
	    data: {
	    	user: {
	    		username: $('#username').val(),
	    		email: $('#email').val(),
	    		password: $('#password_signup').val()
	    	}
	    },
	    dataType: 'json',
	    success: function(response){
	    	console.log(response);
				window.location = "../home.html";
	    }
		});
	});

	// LOG IN - NEW SESSION
	$('#log-in').on('click', function(event){
		event.preventDefault(); 

		$.ajax({
	    type: 'POST',
	    url: 'http://localhost:3000/sessions',
	    data: {
	    	user: {
	    		username: $('#existing_username').val(),
	    		password: $('#password_signin').val()	
	    	}
	    },
	    dataType: 'json',
	    success: function(response){
	    	console.log(response);
	    	window.location = "../home.html";
	    }
		});
	});

		// LOG OUT - DELETE SESSION
	$('#log-out').on('click', function(event){
		event.preventDefault(); 
    $.ajax({
	    type: 'DELETE',
	    url: 'http://localhost:3000/sessions',
	    dataType: 'json',
	    success: function(response){
	    	console.log(response);
	    	window.location = "../index.html";
	    }
		})
	});

	// POST A NEW EXPENSE
	$(document).on('click','.addButton', function(){
		postRequest();
  });

  function postRequest() {
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/expenses',
      data: {
        expense: {
          day:  $('.newDay').val(),
          month: $('.newMonth').val(),
          category: $('.newCategory').val(),
          description: $('.newDescription').val(),
          amount: $('.newAmount').val()
        }      
      },
      dataType: "JSON",
		  xhrFields: {
		    withCredentials: true
		  },
      success: function(response) {
        console.log("success", response);
        $('.newDay').val("");
        $('.newMonth').val("");
        $('.newCategory').val("");
        $('.newDescription').val("");
        $('.newAmount').val("");
          listData();
        }
    }) 
  }

  //LIST EXPENSES
  
  function listData() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3000/expenses',
      dataType: "JSON",
		  xhrFields: {
		    withCredentials: true
		  },
      success: function(response) {
        console.log("success", response);
        $('#all-expenses > tbody').text(''); 
        response.forEach(function (post) {
          $('#all-expenses > tbody').append("<tr class='post-item'>" + "<td>" + post.day + "</td>" + "<td>" + post.month + "</td>" + "<td>" + post.category + "</td>" + "<td>" + post.description + "</td>" + "<td>" + post.amount + "</td></tr>" );
        });
      }
    }); 
  }
});
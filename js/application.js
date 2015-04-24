$ (document).ready(function(){

listData();
listIncome();

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
      },
      fail: function(response){
      	console.log("failed");
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
          $('#all-expenses > tbody').append("<tr>" + "<td>" + post.day + "</td>" + "<td>" + post.month + "</td>" + "<td>" + post.category + "</td>" + "<td>" + post.description + "</td>" + "<td class='post-button'>" + "$" + post.amount + "&nbsp&nbsp&nbsp&nbsp<button class='btn btn-default deleteButton' value='" + post._id + "' type='button'>X</button></td></tr>" );
        });
      }
    }); 
  }

  // DELETE EXPENSE
	$(document).on('click','.deleteButton', function(){
		console.log('clicked')
		event.preventDefault(); 
		var element = $(this).attr('value');

    $.ajax({
	    type: 'DELETE',
	    url: 'http://localhost:3000/expenses/' + element,
	    dataType: 'json',
	    success: function(response){
	    	console.log(response);
	    	listData()
	    }
		})
	});

// POST A NEW INCOME
	$(document).on('click','.addIncomeButton', function(){
		postIncome();
  });

  function postIncome() {

    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/incomes',
      data: {
        income: {
          day:  $('.incDay').val(),
          month: $('.incMonth').val(),
          description: $('.incDescription').val(),
          amount: $('.incAmount').val()
        }      
      },
      dataType: "JSON",
		  xhrFields: {
		    withCredentials: true
		  },
      success: function(response) {
        console.log("success", response);
        $('.incDay').val("");
        $('.incMonth').val("");
        $('.incDescription').val("");
        $('.incAmount').val("");
          listIncome();
      },
      fail: function(response){
      	console.log("failed");
      }
    }) 
  }

  //LIST INCOMES
  
  function listIncome() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3000/incomes',
      dataType: "JSON",
		  xhrFields: {
		    withCredentials: true
		  },
      success: function(response) {
        console.log("success", response);
        $('#all-incomes > tbody').text(''); 
        response.forEach(function (post) {
          $('#all-incomes > tbody').append("<tr>" + "<td>" + post.day + "</td>" + "<td>" + post.month + "</td>" + "<td>" + post.description + "</td>" + "<td class='post-button'>" + "$" + post.amount + "&nbsp&nbsp&nbsp&nbsp<button class='btn btn-default deleteIncomeButton' value='" + post._id + "' type='button'>X</button></td></tr>" );
        });
      }
    }); 
  }

  // DELETE INCOME
	$(document).on('click','.deleteIncomeButton', function(){
		console.log('clicked'); 
		var element = $(this).attr('value');

    $.ajax({
	    type: 'DELETE',
	    url: 'http://localhost:3000/incomes/' + element,
	    dataType: 'json',
	    success: function(response){
	    	console.log(response);
	    	listIncome()
	    }
		})
	});

// NAV PILLS
 $('#expenses, #incomes, #graphs').hide();

 $(document).on('click','.expensePill', function() {
   $('#incomes, #graphs').hide();
   $('.expensePill').css("background","transparent");
   $('#expenses').show();
 })

 $(document).on('click','.incomePill', function() {
   $('#expenses, #graphs').hide();
   $('.incomePill').css("background","transparent");
   $('#incomes').show();
 })

 $(document).on('click','.graphPill', function() {
   $('#expenses, #incomes').hide();
   $('.graphPill').css("background","transparent");
   $('#graphs').show();
   $('.highcharts-background').attr("fill","transparent")
 })

});
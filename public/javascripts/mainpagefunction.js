/*
this code is reponsible to generate views dynamically on mainpage and signup page
*/

/*$(window).scroll(function(){

  console.log("Hi Kumud !!!");

});*/
$( function(){
  console.log("Hi Welcome !!!");
  setdialogbox();
  $("#nav > li:nth-child(1)").mousedown(function(){
    // go to home page
     move(); 
  });
  $("#nav > li:nth-child(2)").mousedown(function(){
    call_joinus();
  });
  $("#nav > li:nth-child(3)").mousedown(function(){
    // go to home page
  });
  $("#nav > li:nth-child(1)").mousedown(function(){
    // go to home page
  });
});
 
// setting dialog box but making autoOpen false. 
//It will be open on click inside call_joinus method
function setdialogbox(){
    dialog = $( "#dialog-form" ).dialog({
      classes: {
            "ui-dialog": "custom-red ui-corner-all"
        },
      autoOpen: false,
      height: 450,
      width: 340,
      modal: true,
      dialogClass: "no-close",
     /* buttons: 
      [{
      text: "submit",
      icons: {primary: "ui-icon-heart"},
      click: function() {
        console.log(" going to save in database");
        regReqToServer();
      }},
      {text: "close",
      icons: {primary: "ui-icon-closethick"},
      click: function() {$( this ).dialog( "close" );},
     }],*/
    create:function () {
        $(this).closest(".ui-dialog").find(".ui-button").addClass(" customdialogbtn ");
    }
  });
}

function move() {
     console.log("Hello came to here !!!");
     window.location.href = '/newpage';
}

function call_joinus(){
  console.log("Hello come to join us!!!");
  //window.location.href = '/joinus';
   dialog.dialog( "open" );

}

function closeWin(){
  $("#dialog-form").dialog( "close" );
}

// function to be called on button click to send request to server
/*function regReqToServer(){
          var data = {};
					data.title = "title";
					data.message = "message";
					
					$.ajax({
						type: 'POST',
						data: JSON.stringify(data),
				        contentType: 'application/json',
                        url: 'http://localhost:3000/register',						
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });
}*/


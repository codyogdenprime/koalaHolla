console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  var koalaArray=[];
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      sex: $('#sexIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
  $( '#editButton' ).on( 'click', function(){
    console.log( 'in editButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameEditIn').val(),
      age: $('#ageEditIn').val(),
      sex: $('#sexEditIn').val(),
      readyForTransfer: $('#readyForTransferEditIn').val(),
      notes: $('#notesEditIn').val()
    };
    // call saveKoala with the new obejct
    editKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

var getKoalas = function(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      displayKoalas(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
}; // end getKoalas
var editKoalas = function(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/editKoala',
    type: 'PUT',
    success: function( data ){
      console.log( 'edited some koalas: ', data );
      displayKoalas(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
}; // end getKoalas

var saveKoala = function( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/addKoala',
    type: 'post',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      getKoalas();
      // displayKoalas(data);
    } // end success
  }); //end ajax
};
var displayKoalas = function(data){

  for (var i = 0; i < data.length; i++) {
    var index = data[i];

    var wrapper = $('<div />').attr('id','koala-'+index.id);
    var name= $('<h2 />',{class:'koala-name', html: index.name});
    var age = $('<div />').addClass('koala-age').html(index.age);
    var sex = $('<div />').addClass('koala-sex').html(index.sex);
    var transferrabe = $('<div />').addClass('koala-transferrable').html(index.transferrabe);
    var notes = $('<div />').addClass('koala-notes').html(index.notes);

    wrapper.append(name).append(age).append(sex).append(transferrabe).append(notes);
    $('#viewKoalas').append(wrapper);
  }
};//displayKoalas

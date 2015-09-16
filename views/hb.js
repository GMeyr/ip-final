$(document).ready(function(){

  var source = $('#first-template').html();
  var template = Handlebars.compile(source);

  var context = {
    title: "All about Handlebars",
    body: "This is a post about other things though."
  }
  var el_html = template(context);

  $("#first_place_holder").html(el_html);
})

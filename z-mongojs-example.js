//for viewed page
<div class="content">
</div>
<script>
  var req = new XMLHttpRequest();
  req.open("GET", "science", false);
  req.send(null);

  console.log(req.responseText);

  $(document).ready(function(){
    $('.content').html(req.responseText);
  })
</script>

// for requestHandlers file
function science (response){
  console.log("Request handler 'science' was called.");

  var databaseUrl = "ip"; // "username:password@example.com/mydb"
  var collections = ["blogs"]
  var mongoapp = require('mongojs');
  var db = mongoapp(databaseUrl, collections);

  db.blogs.findOne( function(err, found) {
    if( err || !found) console.log("No science found");
    else {
  console.log(found);
  var result = JSON.stringify(found.title);
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end(result);
}});
}

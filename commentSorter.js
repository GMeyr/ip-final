sortBy = require('sort-by');



function commentSort (arr) {
  console.log("--running commentSort");
  var statcomms = [],
      ratcomms = [],
      moralcomms = [],
      aneccomms = [];

  arr.forEach(function (obj) {
    var current_type = calcCommType(obj);
    obj.type = current_type;

    switch (obj.type) {
      case "statistical":
        console.log("---found to be statistical");
        statcomms.push(obj);
        break;
      case "rational":
        console.log("---found to be rational");
        ratcomms.push(obj);
        break;
      case "moral":
        console.log("---found to be moral");
        moralcomms.push(obj);
        break;
      case "anecdotal":
        console.log("---found to be anecdotal");
        aneccomms.push(obj);
        break;
      default:
        console.log("--commentSort failed to identify obj.type");
    }
  });

  arr.sort(sortBy('votes', 'posted'));
  statcomms.sort(sortBy('votes', 'posted')); //don't forget to combine upvotes and downvotes to votes
  ratcomms.sort(sortBy('votes', 'posted'));
  moralcomms.sort(sortBy('votes', 'posted'));
  aneccomms.sort(sortBy('votes', 'posted'));

  var commArrays = {
    allCommentArr: arr,
    statCommentArr: statcomms,
    ratCommentArr: ratcomms,
    moralCommentArr: moralcomms,
    anecCommentArr: aneccomms
  };

  return commArrays;
}



function calcCommType (obj){
    console.log("-----obj.statvotes: " + obj.statvotes,
                ", obj.ratvotes: " + obj.ratvotes,
                 ", obj.moralvotes: " + obj.moralvotes,
                 ", obj.anecvotes: " + obj.anecvotes)
    if (obj.statvotes > obj.ratvotes
       && obj.statvotes > obj.moralvotes
       && obj.statvotes > obj.anecvotes) {
         console.log("statvotes wins");
         if(obj.badvotes < 3)
           return "statistical";
         else return "badvotes";
       } else if
         (obj.ratvotes > obj.statvotes
            && obj.ratvotes > obj.moralvotes
            && obj.ratvotes > obj.anecvotes) {
              console.log("ratvotes wins");
              if(obj.badvotes < 3)
                return "rational";
              else return "badvotes";
       } else if (obj.moralvotes > obj.ratvotes
          && obj.moralvotes > obj.statvotes
          && obj.moralvotes > obj.anecvotes) {
            console.log("moralvotes wins");
            if(obj.badvotes < 3)
              return "moral";
            else return "badvotes";
        } else if (obj.anecvotes > obj.ratvotes
           && obj.anecvotes > obj.statvotes
           && obj.anecvotes > obj.moralvotes) {
             console.log("anecvotes wins");
             if(obj.badvotes < 3)
               return "anecdotal";
             else return "badvotes";
          } else {
            console.log("no winner chosen");
            //need to account for ties
            return "rational"
          }

}


exports.commentSort = commentSort;

sortBy = require('sort-by');



function commentSort (arr) {
  arr.forEach(function () {
    var current_type = calcCommType (obj);
    obj.type = current_type;
    
    var statcomms = [],
        ratcomms = [],
        moralcomms = [],
        aneccomms = [];
        
    switch (obj.type) {
      case "statistical":
        statcomms.push(obj);
        break;
      case "rational":
        ratcomms.push(obj);
        break;
      case "moral":
        moralcomms.push(obj);
        break;
      case "anecdotal":
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
    statCommentArrs: statcomms,
    ratCommentArr: ratcomms,
    moralCommentArr: moralcomms,
    anecCommentArr: anecomms
  };
  
  return commArrays;
}



function calcCommType (obj){
    var winner = "none";
    var objArr =  [
 		 {name: "statvotes",
 		  num: obj.statvotes},
 	         {name: "ratvotes",
 	          num: obj.ratvotes},
 		 {name: "moralvotes",
 		  num: obj.moralvotes},
 		 {name: "anecvotes",
 		  num: obj.anecvotes},
 		 {name: "none",
 		  num: 0}];

    objArr.forEach(function(x){
        console.log(x.name + " is being compared to " + obj[winner]);
        console.log(x.num + " is being compared to " + winner.num);
        if(x.num > exdata[winner]){
           console.log(x.name + "is greater than" + obj.winner);
           winner = x.name;
        }
    });
        //badvote threshold
        if(obj.badvotes < 3)
          return winner;
        else return "badvotes";
}


exports.commentSort = commentSort;

module.exports.pageNav = function(type,id) {

  var artTitles = [
    "Amanda (Pelecanus Venezia)",
    "Osprey & Kingfisher",
    "Jim Clark Driving The Lotus 49",
    "Swamp Thing",
    "Edward Scissorhands",
    "Eastern Screech Owl",
    "Quanah Park, Last Chief of the Comanches",
    "Blue Jay in the Desert",
    "Frank and the Cellar Door",
    "Frederic Chopin",
    "Eternal Sunshine",
    "French Quarter Motorcycle Guitarist",
    "The Melting Doge",
    "The Murder of Mingo Jack, book cover",
    "Corman and Poe",
    "Nine to Five",
    "Vincent Price in His Laboratory"
  ];
  var artIds = [
     "pelicanvenice",
     "ospreykingfisher",
     "jimclark",
     "swampthing",
     "edwardscissorhands",
     "screechowl",
     "quanahparker",
     "bluejaydesert",
     "frankcellardoor",
     "chopin",
     "eternalsunshine",
     "fqmg",
     "meltingdoge",
     "mingojack",
     "cormanandpoe",
     "ninetofive",
     "vincentprice"
  ];
  var photoTitles = [
    "Venezia Honeymoon",
    "Austria: Innsbruck, Salzburg, and Seefeld",
    "Printer's Row Perspective",
    "Frozen Chicago Lakefront",
    "Formula 1 U.S. Grand Prix: Standing on the Track",
    "Formula 1 U.S. Grand Prix: Race Start",
    "Nascar at Chicagoland Speedway",
    "Flying Over Chicago",
    "Waterfall at Blackwater Falls State Park",
    "Montoya Penske IndyCar at Mid-Ohio",
    "Navy Pier Cormorant and Old Ferris Wheel",
    "Fort Macon, NC Self-Portrait",
    "Emerald Isle, NC: Sunrise",
    "Formula E Long Beach ePrix",
    "Sundance 2015: Evening on Main Street",
    "Curtis Island Lighthouse from aboard Schooner Olad",
    "Monadnock Staircase",
    "Open Range: Joshua Tree",
    "Open Range: Grand Canyon",
    "Open Range: On The Road",
    "Open Range: Navajo National Monument",
    "Open Range: Hidden Skull in Monument Valley",
    "Open Range: Saddleback Mesa (book cover)",
    "Open Range: Lee's Ferry, Colorado River",
    "Open Range: Kayaking Lake Powell",
    "Reframing Ruin: Bloomingdale Trail Twilight",
    "Frozen Bench at Promontory Point",
    "Notte a Venezia (Night in Venice)",
    "Lugano, Switzerland",
    "Wahkeena Falls, Oregon",
    "English Portfolio: High Bradfield",
    "English Portfolio: Liverpool",
    "Emerald Isle, NC: Under the Bogue Inlet Pier"
  ];
  var photoIds = [
    "venezia",
    "austria",
    "printersrow",
    "frozenlakefront",
    "2015usgp-track",
    "2015usgp-start",
    "nascarchicago-start",
    "flyingoverchicago",
    "blackwaterfalls",
    "montoyaindycar-midohio",
    "navypiercomorant-ferris",
    "fortmaconself",
    "ei-sunrise",
    "formulae-longbeach",
    "sundance-mainst",
    "camdenlighthouse",
    "monadnock",
    "openrange-joshuatree",
    "openrange-grandcanyon",
    "openrange-ontheroad",
    "openrange-navajomonument",
    "openrange-skull",
    "openrange-saddleback",
    "openrange-leesferry",
    "openrange-lakepowell",
    "bloomingdale",
    "frozenpromontory",
    "nottevenezia",
    "lugano",
    "wahkeena",
    "england-bradfield",
    "england-liverpool",
    "ei-bogueinletpier"
  ];

  var num,
      totalWorks,
      prevNum,
      nextNum,
      prevTitle,
      prevId,
      nextTitle,
      nextId;

  if (type == 'art') {

    num = (artIds.indexOf(id) > -1) ? artIds.indexOf(id) : 0;

    totalWorks = artTitles.length - 1;
    prevNum = (num == 0) ? totalWorks : num - 1;
    nextNum = (num == totalWorks) ? 0 : num + 1;

    prevTitle = artTitles[prevNum];
    prevId = artIds[prevNum];
    nextTitle = artTitles[nextNum];
    nextId = artIds[nextNum];

  } else if (type == 'photos') {

    num = (photoIds.indexOf(id) > -1) ? photoIds.indexOf(id) : 0;

    totalWorks = photoTitles.length - 1;
    prevNum = (num == 0) ? totalWorks : num - 1;
    nextNum = (num == totalWorks) ? 0 : num + 1;

    prevTitle = photoTitles[prevNum];
    prevId = photoIds[prevNum];
    nextTitle = photoTitles[nextNum];
    nextId = photoIds[nextNum];
    
  }

  return '<li class="prev"><a href="'+prevId+'.html"><img src="../img/'+type+'/thumbs/'+prevId+'-250.jpg" alt="'+prevTitle+'"><span>'+prevTitle+'</span></a></li>'+
         '<li class="next"><a href="'+nextId+'.html"><img src="../img/'+type+'/thumbs/'+nextId+'-250.jpg" alt="'+nextTitle+'"><span>'+nextTitle+'</span></a></li>';
};

module.exports.monthNumber = function(month)  { 
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[(month - 1)];
};


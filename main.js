function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var getAllRecords = function() {
    $.getJSON(
        "https://api.airtable.com/v0/appDhoSertFBddIEF/restaurant?api_key=keymQfZjvk1D7Dvzi&view=Grid view",
        function(airtable){
        var html = [];
      $.each(airtable.records, function(index, record) {
          var id=record.id;
          var image=record.fields["images"];
          var name=record.fields["name"];
          var rate=record.fields["rating"];
          html.push(listView(id, image, name, rate));
      });
      $(".list-view").append(html);
    }
  );
};

var listView = function(id,image, name, rate) {
    return`
    
    <div class="col-md-4 col-sm-12">
    <div class="card">
    ${image ? `<img src="${image[0].url}">` : ``}
              <div class="card-body">
              <h2 class="card-title"><a href="index.html?id=${id}">${name}</a></h2>
                <p class="card-text">${"⭐".repeat(rate)}</p>
              </div>
    </div>      
    </div>    
      
    `;
  };
 
  
  var getOneRecord = function(id) {
    $.getJSON(
        `https://api.airtable.com/v0/appDhoSertFBddIEF/restaurant/${id}?api_key=keymQfZjvk1D7Dvzi`,
      function(record) {
        var html = [];
        var image=record.fields["images"];
        var image1=record.fields["image1"];
        var image2=record.fields["image2"];
        var image3=record.fields["image3"];
        var name=record.fields["name"];
        var rate = record.fields["rating"];
        var map = record.fields["map"];
        var hour = record.fields["hours"];
        var recommendation = record.fields["recommendation"];
        var link = record.fields["link"];
        html.push(
          detailView(
            image,
            image1,
            image2,
            image3,
            name,
            rate,
            map,
            hour,
            recommendation,
            link,
         
          )
        );
        $(".detail-view").append(html);
      }
    );
  };

  var detailView = function(
    image,
    image1,
    image2,
    image3,
    name,
    rate,
    map,
    hour,
    recommendation,
    link,
  ) {
    $('.carousel').carousel();
    console.log(recommendation);
    return `
    <div class="card mb-3">
    <div class="row no-gutters">
    <div class="col-md-4 col-sm-12">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active square">
    ${image ? `<img src="${image[0].url}"class="d-block w-100" alt="...">` : ``}
    </div>
    <div class="carousel-item square">
    ${image1 ? `<img src="${image1[0].url}"class="d-block w-100" alt="...">` : ``}
  </div>
  <div class="carousel-item square">
  ${image2 ? `<img src="${image2[0].url}"class="d-block w-100" alt="...">` : ``}
  </div>
  <div class="carousel-item square">
  ${image3 ? `<img src="${image3[0].url}"class="d-block w-100" alt="...">` : ``}
  </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  </div>
 </div>
    <div class="col-md-8 col-sm-12 rect">
      <div class="card-body">
        <h5 class="card-title"><a href="index.html?id=${id}">${name}</a></h5>
        
        <p class="card-text"><span class="rating">
        ${"⭐".repeat(rate)}</span> <span class="hour">${hour}</span>  <a href=${link}>Website</a> <br><a href=${map}>How to get there</a> <span class="recomm"> ${recommendation}</span></p>
        <button type="button" class="btn btn-success"><a href="index.html">⇦</a></button>
      </div>
    </div>
 
</div>
    `;
    };

  var id = getParameterByName("id");
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }  
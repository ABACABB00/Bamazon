
$(function () {
  var $headlines = $('#headlines');
  var $urls = $('#urls');
  var $images = $('#images');

  $.ajax({
    type: 'GET',
    url: 'https://finnhub.io/api/v1/news?category=general&token=bqsv227rh5re54ulror0',
    success: function(headlines) {
      $.each(headlines, function (i, head) {
        $headlines.append(head.headline);
      })
    }
  })

  $.ajax({
    type: 'GET',
    url: 'https://finnhub.io/api/v1/news?category=general&token=bqsv227rh5re54ulror0',
    success: function (urls) {
      $.each(urls, function (i, ur) {
        $urls.append(ur.url);
      })
    }
  })


  $.ajax({
    type: 'GET',
    url: 'https://finnhub.io/api/v1/news?category=general&token=bqsv227rh5re54ulror0',
    // contentType: "image/png",
    success: function (images) {
      $.each(images, function (i, capture) {
        $images.append(capture.image);
      })
    }
  })


})


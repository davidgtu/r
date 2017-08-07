$(function() {
  var url = 'https://dog.ceo/api/breeds/list/all';
  var Signal = signals.Signal;
  var myObject = {
    started : new Signal(),
    stopped : new Signal()
  };

  var $body = $('html, body');
  var content = $('.main-content').smoothState({
    onStart: {
      duration: 250,
      render: function() {
        content.toggleAnimationClass('is-exiting');
        $body.animate({ 'scrollTop': 0 });
      }
    }
  }).data('smoothstate')

  fetch(url, { method: 'get' })
    .then(res => {
      res.json()
      .then(parsedRes => {
        breedNames = Object.keys(parsedRes.message).map(breedName => breedName);

        var template = $('#dogNames').html();
        var templateScript = Handlebars.compile(template);

        var context = {list: breedNames};
        var markup = templateScript(context);

        $(document.body).append(markup);
      });
    }
  );
});

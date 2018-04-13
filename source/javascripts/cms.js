var cms = cms || {};
cms.lazyLoad = new LazyLoad({
  elements_selector: ".lazy"
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

cms.buildPage = function(){
  var data = cms.tabletop.sheets();
  var $template = $("#template");

  var sheet = $template.data("collection");
  var template = $template.html();

  var collection = {};
  collection.elements = $.map(data[sheet].elements, function(el, i){
    el.index = i;
    el.avatarUrl = function(){
      return gravatar(el["Email"], { size: 160, backup: "mm" });
    };
    el.coverImage = "//picsum.photos/40" + getRandomInt(9) + "/20" + getRandomInt(9);
    el.emailObfuse = el["Email"].replace(/@/, "(at)");
    return el;
  });

  Mustache.parse(template);
  var html = Mustache.render(template, collection);

  $template.before(html);
  $template.remove();

  var listOptions = {
    valueNames: ['index', 'name', 'profession', 'skill']
  };
  var profileList = new List('profile-list', listOptions);
  profileList.on('updated', function(){
    cms.lazyLoad.update();
  });

  $('#loading').remove();
  cms.lazyLoad.update();
};

$(function(){
  cms.tabletop = Tabletop.init({
    key: '117XHn5ry7u3toeYNfk0p5FCmPdcuD7_YGPUFpGzEkdk',
    callback: cms.buildPage
  });

});

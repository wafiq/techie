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
  collection.elements = $.map(data[sheet].toArray(), function(el, i){
    profile = {
      index: i,
      name: el[1],
      email: el[2],
      website: el[4],
      twitter: el[5],
      availability: el[6],
      experience: el[7],
      depth: el[8],
      profession: el[9],
      skills: el[10],
      description: el[11],
      coverImage: "//picsum.photos/40" + getRandomInt(9) + "/20" + getRandomInt(9),
      emailObfuse: el[2].replace(/@/, "(at)")
    }
    profile.avatarUrl = function(){
      return gravatar(el[2], { size: 160, backup: "mm" });
    };
    return profile;
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
    key: '1OvL8b7De7RYgZIEIp4tVX0iHtdq_HkJsxcotbaN36TI',
    callback: cms.buildPage,
    simpleSheet: true
  });

});

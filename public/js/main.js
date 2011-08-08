(function() {
  
  Object.keys = Object.keys || function (o) {
    var r = [];
    for (key in o) {
      o.hasOwnProperty(key) && r.push(key);
    }
    return r;
  };
    
  $.fn.clearAndAdd = function(item) {
    $(this).html("").append(item);
  };
  
  var log = function() {
    console.log.apply(console, arguments);
  };
  
  var call = function(f) {
    return f();
  };

  var withAppData = call(function() {
    var cach = null;
    
    return function(cb) {
      if(cach !== null) {
        return cb(cach);
      }
      $.get("data.json", {}, function(data) {
        cach = data;
        cb(data);
      }, "json");
    };
  });

  var renderPage = function(data) {
    var ul = $("<ul />").addClass("items");
    
    $(data).each(function(index, item) {
      ul.append(
        $("<li />")
          .addClass("page-item")
          .append(
            $("<a />")
              .text(item.name)
              .attr("href", item.href),
              $("<p />").text(item.description)));
    });
    return ul;
  };

  

  var AppRouter = Backbone.Router.extend({

    routes: {
      ""      :         "home",
      "music" :         "music",
      ":page" :         "page"
    },
    
    home: function() {
      $("#content-bar").clearAndAdd($("#home-screen").clone());
    },
    
    music: function() {
      $("#content-bar").clearAndAdd($("#music-screen").clone());
    },
    
    page: function(page) {
      withAppData(function(data) {
        if(data[page] === undefined) {
          $("#content-bar").clearAndAdd(
            $("#item-404").clone());
        } else {
          var pageEl = renderPage(data[page]);
          $("#content-bar").html("").append(pageEl);
        }
      });
    }
  });
  
  var withNoDefaults = function(f) {
    return function(event) {
      event.preventDefault && event.preventDefault();
      call(f);
      return false;
    };
  };
    
  $(function() {
    var appRouter = new AppRouter();
    Backbone.history.start({ pushState: false });
    
    var historyNavigator = function(path) {
      return function() {
        appRouter.navigate(path, { triggerRoute: true });        
      };
    };
    
    withAppData(function(data) {      
      $.fn.append.apply($("#internal-links"), _.map(Object.keys(data.stuff), function(key) {
        return $("<li />").append(
          $("<a href='#' />")
            .text(data.stuff[key])
            .click(withNoDefaults(historyNavigator(key))));
      }));
    });
    
    $("#show-music").click(
      withNoDefaults(historyNavigator("music")));
  });  
} ());

















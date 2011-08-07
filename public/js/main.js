(function() {
  
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
      $("#content-bar").html("").append($("#home-screen").clone());
    },
    
    music: function() {
      $("#content-bar").html("").append($("#music-screen").clone());
    },
    
    page: function(page) {
      var item = page;
      withAppData(function(data) {
        log(item);        
        if(data[item] === undefined) {
         $("#content-bar").html("").append($("#item-404").clone());
        } else {
         var page = renderPage(data[item]);
         $("#content-bar").html("").append(page);
        }
      });
    }
  });
  
  
  var createPageMover = function(page, appRouter) {
    return function(event) {
      event.preventDefault();
      appRouter.navigate(page, { triggerRoute: true });
      return false;
    };
  };
  
  $(function() {
    var appRouter = new AppRouter();
    Backbone.history.start({ pushState: false });
    
    withAppData(function(data) {
      Object.keys(data.stuff).forEach(function(key) {
        var link = $("<a href='#' />")
          .text(data.stuff[key])
          .click(createPageMover(key, appRouter));
        $("<li />").append(link).appendTo("#internal-links");
      });
    });
    
    $("#show-music").click(function(event) {
      event.preventDefault();
      appRouter.navigate("music", { triggerRoute: true });
      return false;
    });
  });  
} ());

















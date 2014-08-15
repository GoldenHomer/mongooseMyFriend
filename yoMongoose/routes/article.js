module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Article = mongoose.models.Article,
      api = {};

  // ALL
  api.articles = function (req, res) {
    Article.find(function(err, articles) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json({articles: articles});
      }
    });
  };

  // GET
  api.article = function (req, res) {
    var id = req.params.id;
    Article.findOne({ '_id': id }, function(err, article) {
      if (err) {
        res.json(404, err);
      } else {
        res.json({article: article});
      }
    });
  };

  // POST
  api.addArticle = function (req, res) {
    
    var article;
      
    if(typeof req.body.article == 'undefined'){
         res.status(500);
         return res.json({message: 'article is undefined'});
    }

    article = new Article(req.body.article);

    article.save(function (err) {
      if (!err) {
        console.log("created article");
        return res.json(201, article.toObject());
      } else {
        return res.json(500, err);
      }
    });

  };

  // PUT
  api.editArticle = function (req, res) {
    var id = req.params.id;

    Article.findById(id, function (err, article) {


    
      if(typeof req.body.article["title"] != 'undefined'){
        article["title"] = req.body.article["title"];
      }  
    
      if(typeof req.body.article["excerpt"] != 'undefined'){
        article["excerpt"] = req.body.article["excerpt"];
      }  
    
      if(typeof req.body.article["content"] != 'undefined'){
        article["content"] = req.body.article["content"];
      }  
    
      if(typeof req.body.article["published"] != 'undefined'){
        article["published"] = req.body.article["published"];
      }  
    
      if(typeof req.body.article["created"] != 'undefined'){
        article["created"] = req.body.article["created"];
      }  
    

      return article.save(function (err) {
        if (!err) {
          console.log("updated article");
          return res.json(200, article.toObject());        
        } else {
         return res.json(500, err);
        }
        return res.json(article);
      });
    });

  };

  // DELETE
  api.deleteArticle = function (req, res) {
    var id = req.params.id;
    return Article.findById(id, function (err, article) {
      return article.remove(function (err) {
        if (!err) {
          console.log("removed article");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/articles', api.articles);
  app.get('/api/article/:id', api.article);
  app.post('/api/article', api.addArticle);
  app.put('/api/article/:id', api.editArticle);
  app.delete('/api/article/:id', api.deleteArticle);
};
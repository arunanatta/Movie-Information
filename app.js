var express =   require('express');
var bodyParser = require('body-parser');
const request = require('request');

const port = 3000;

const app = express();

app.use(express.static(__dirname + '/views/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index.html');
});

app.post('/search', function(req, res) {
    console.log(req.body);
    //res.send('send query "' + req.body.Search);

     request('http://www.omdbapi.com/?t='+req.body.Search+ '&apikey=7bba56e8', { json: true }, (err, result, body) => {
        if(err)
        console.error(err);
        else
        var pattern = {
            "title" :result.body.Title,
            "poster" :result.body.Poster,
            "imdbRating" :result.body.imdbRating,
            "releaseDate" :result.body.Released,
            "genre" :result.body.Genre,
            "director" :result.body.Director,
            "actors" :result.body.Actors
        }
        
        res.render('table.html',pattern);

     });
});

app.listen(port, () => {
    console.log('Server started on port'+port);
  });



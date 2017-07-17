/***************************Common Controllers*******************************/

app.filter('scrurl', function($sce) {
    return function(text) {
        text = text.replace("watch?v=", "embed/");
        return $sce.trustAsResourceUrl(text);
    };
});


app.filter('limitchars', function() {
    return function(text, limit) {
        try {
            var limit_val = 25;
            if (limit) {
                limit_val = limit;
            }
            //console.log(limit_val);
            if (text.length > limit_val)
                return text.substring(0, limit_val - 3) + '...';
            else
                return text;
        } catch (error) {
            return text;
        };
    };
});

app.filter('replaceBr', function() {
    return function(text) {
        try {
            return text.replace(/<br\s*\/?>/mg, "\n");
            //return text.replace(/\r?\n/g, '<br />');
            //return text.replace(/&lt;br\s*\/&gt;/g,'<br/>');
        } catch (err) {

        }
    };
});


app.filter('valueUnit', function() {
    return function(text) {
        if (text > 1000)
            text = (text / 1000).toFixed(1) + 'K';
        return text;
    };
});

app.filter('capitalize', function() {
    return function(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
});

app.filter('reverse', function() {
    return function(items) {
        if (items)
            return items.slice().reverse();
    };
});

/*replace date with year*/
app.filter('showYear', function() {
    return function(text) {
        /* gett string after -
         if (text)
         var year = text.substr(0, text.indexOf('-'));
         else
         year = '';
         return year;
         */

        //getting string after comma
        //return text.split(',')[1];
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];
        if (text) {
            var d = text.slice(0, 10).split('-');
            var dFormate = monthNames[parseInt(d[1]) - 1] + ' ' + parseInt(d[2]) + ', ' + d[0]; // month/day/year
        } else
            dFormate = '';
        return dFormate;
    };
});

app.filter('range', function() {
    return function(input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i < max; i++)
            input.push(i);
        return input;
    };
});

app.filter('extractUrl', function($q, $timeout) {

    return function(text) {
        /*
         var html_scrap = text;
         var string_with_url = text.match(/(https?:\/\/[^\s]+)/g);
         var string_url = string_with_url[0];
         //$('#atc_url').html(string_url);
         //$('.page_url').attr("href", string_url);
         
         var title = null;
         var description = null;
         var image = null;
         console.log(string_url);
         */
        return text;
        /*
         $.post("/page/views/fetch.php?url=" + escape(string_url), {}, function (response) {
         //console.log(response);
         html_scrap += '<div class="scrapper_wrapper">';
         //Set Content
         title = response.title;
         description = response.description;
         image = response.total_images;
         
         $.each(response.images, function (a, b)
         {
         console.log(b);
         var str = b.img;
         //var img_src = str.substring(str.lastIndexOf('content="')+1,str.lastIndexOf('"/>'));
         var img_src = str.split('"og:image" content="').pop().split('"/>').shift();
         console.log(img_src);
         if (img_src)
         image = img_src;
         else
         image = b.img;
         });
         
         html_scrap += '<div class="scrap_url_img"><img src="' + image + '" alt="' + title + '"></div>';
         html_scrap += '<a class="scrap_url_title" href="' + string_url + '">' + title + '</a>';
         html_scrap += '<div class="scrap_url_desc">' + description + '</div>';
         html_scrap += '</div>';
         
         return html_scrap;
         
         });
         
         */

        //return html.replace(/[&<>"']/g, function($0) {
        //return "&" + {"&":"amp", "<":"lt", ">":"gt", '"':"quot", "'":"#39"}[$0] + ";";
        //});
    };
});

app.filter('htmlencode', function($sce) {
    return function(val) {
        //console.log(val);
        try {
            var string_with_url = val.match(/(https?:\/\/[^\s]+)/g);
            if (string_with_url) {
                //console.log(string_with_url);
                val = val.replace(string_with_url[0], "<a href='" + string_with_url[0] + "' target='_blank'>" + string_with_url[0] + "</a>");
            }
            return $sce.trustAsHtml(val);
        } catch (e) {

        }
    };
});
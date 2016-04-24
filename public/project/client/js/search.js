/**
 * Created by emma on 4/24/16.
 */
try {
    var MockBuilder = function() {
        this.data = {
        };
    };
    MockBuilder.prototype.add = function(id, name, description, url) {
        this.data[id] = {
            name: name,
            description: description,
            url: url,
            image: "http://lorempixel.com/200/200/abstract/" + name
        };
        return this;
    };
    MockBuilder.prototype.build = function() {
        return this.data;
    };

    var NPMSearchForm = function() {
        this.data = {
            keywords: null
        };
    };
    NPMSearchForm.prototype.keywords = function(keywords) {
        this.data.keywords = keywords;
        return this;
    };
    NPMSearchForm.prototype.submit = function(callback) {
        var data = this.data;
        var mock = new MockBuilder();
        for(var index = 1; index < (1 + Math.random() * 10); index++) {
            mock.add("package" + index, "name" + index, "description" + index, "http://placehold.it/100x" + (10 * index));
        }
        setTimeout(function() {
            callback(null, mock.build());
        }, 1);
    };

    $(document).ready(function () {
        var packagesTemplate = $('.packages');
        var packagesElement = null;

        $("#NPMSearchForm").submit(function (event) {
            try {
                var keywords = $(this).find('input:text[name=keywords]').val();
                console.log("keywords: %s", keywords);

                var action = function() {
                    var callback = function(err, results) {
                        if(err) {
                            alert(err);
                        } else {
                            packagesElement = packagesTemplate.clone();
                            packagesElement.insertBefore(packagesTemplate);
                            var group = packagesElement.find('.packages-group');
                            var keys = Object.keys(results);
                            while(packagesElement.find('.package').size() < keys.length) {
                                group.clone().insertBefore(group);
                            }
                            var index = 0;
                            packagesElement.find('.package').each(function(i, e) {
                                if (index < keys.length) {
                                    var result = results[keys[index++]];
                                    $(e).find('p.description').text(result.description);
                                    $(e).find('img.package-image').attr('src', result.image);
                                    $(e).find('h2.name').each(function(i, e) {
                                        e.firstChild.data = " " + result.name + " ";
                                        $(e).find('a').attr('href', result.url);
                                    });
                                    //$(e).find('.rating-desc').hide();
                                } else {
                                    $(e).hide();
                                }
                            });
                            packagesElement.fadeIn();
                        }
                    };

                    new NPMSearchForm().keywords(keywords).submit(callback);
                };

                if(packagesElement) {
                    packagesElement.fadeOut(function() {
                        packagesElement.remove();
                        packagesElement = null;
                        action();
                    });
                } else {
                    action();
                }
            } catch(err) {
                console.log("throws err: %s", err);
            }
            event.preventDefault();
        });
    });
} catch(err) {
    alert("err: " + err);
}

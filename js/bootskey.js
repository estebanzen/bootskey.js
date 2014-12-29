(function($) {
    $.fn.extend({
        keyboost: function() {
            this.each(function() {
                var $this = $(this);
                var typ = $this.attr("type");
                var val = $this.val();
                init_keyboost();

                function init_keyboost() {
                    var substr = $this.val().split(',');
                    console.log(substr);
                    substr = $.unique(substr).reverse();
                    console.log(substr);
                    var output = '';
                    var keys = '';
                    $this.val(substr);
                    for (var i = 0; i < substr.length; i++) {
                        if (substr[i] != '') {
                            keys += substr[i].trim() + ',';
                            console.log('keys:' + keys);
                            output += '<button style="margin: 0 5px 5px 0" class="btn btn-primary" type="button"><span>' + substr[i] + '</span> <span class="glyphicon glyphicon-remove"></span></button>';
                        }
                    }
                    $this.val(keys);
                    output += '<input type="text" placeholder="Ingrese Palabra/s clave" class="form-control keyboost-input">';
                    if ($this.hasClass("keyboost-init")) {
                        console.log('keyboost ya esta inicializado');
                        $('.keyboost-container').html(output);
                    } else {
                        console.log('init keyboost');
                        // $this.hide();
                        $this.addClass('keyboost-init');
                        $this.parent().append('<div class="keyboost-container"></div>');
                        $this.next().append(output);
                    }
                    $('.keyboost-input').focus();
                }
                //keywoard remove
                $('.keyboost-container button').click(function(event) {
                    var key = $(this).children().text();
                    $(this).fadeOut();
                    var keywords = $this.val();
                    keywords = keywords.replace(key, "");
                    $this.val(keywords);
                    $('.keywords').keyboost();
                });
                $('.keyboost-input').keyup(function(e) { // keyup input Keyboost
                    if (e.keyCode == 188 || e.keyCode == 13 || e.keyCode == 32) {
                        // detecta tecla coma, espacios (falta el enter)
                        var str = $('.keyboost-input').val();
                        var res = str.replace(",", "");
                        res = res.replace(" ", "");
                        var newVal = $this.val() + ',' + res;
                        $this.val(newVal);
                        $('.keyboost-input').val('');
                        $('.keywords').keyboost();
                    } else if (e.ctrlKey && (e.which == 86 || e.which == 118)) {
                        //detecta ctrl+v
                        console.log('ctrl+v!');
                        /* --------- */
                        var str = $('.keyboost-input').val();
                        var res = str.replace(/\s/g, ",");
                        var newVal = $this.val() + ',' + res;
                        $this.val(newVal);
                        $('.keyboost-init-input').val('');
                        $('.keywords').keyboost();
                    }
                });
            });
        }
    });
})(jQuery)
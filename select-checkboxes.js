(function ($) {


    function do_modify(element) {

        // ID of <select>
        var id = $(element).attr('id');

        // related label (referred through its 'for' attribute
        var label = $('*[for="' + id + '"]');
        if (label.length == 0) { 
            alert('<select> with ID "' + id + '" has no associated label');
            return;
        }
        var label_text = $(label).html();

        // added checkboxes
        $(element).after('<div class="select-checkbox" data-id="' + id + '">');
        var div = $('.select-checkbox[data-id="' + id + '"');
        $(element).children('option').each(function() {
            div.append('<div><input class="select-checkbox" type="checkbox" value="' +  $(this).attr('value') + '"/>' + $(this).html() + '</div>') ;
        });
        $(element).after('</div>');
        $(element).after('<div class="toggle-select-checkbox" data-id="'  + id + '">' + label.html() + '</div>');

        // hide <select> and related label element                    
        $(element).hide();
        label.hide();

        // Toggler for div with checkboxes
        $(document).on('click', '.toggle-select-checkbox', function(event) {
            event.stopImmediatePropagation();
            var id = $(this).data('id');
            $('div.select-checkbox[data-id="' + id + '"]').toggleClass('checkboxes-shown');
        });

        // Handle for checkboxes
        $(document).on('click', 'div.select-checkbox', function() {
            var selected_values = [];
            $(this).find('input[type="checkbox"]').each(function() {
                if ($(this).prop('checked')) {
                    var value = $(this).val();
                    selected_values.push(value);
                }
            });

            var select = $('#' + id);
            select.find('option:selected').prop('selected', false);
            select.find('option').each(function() {
                if (selected_values.indexOf($(this).val()) > -1) {
                    $(this).prop('selected', true);
                }
            });

        });
    }




    jQuery.fn.extend({
      selectCheckboxes: function() {
        return this.each(function() {
            do_modify(this);
        });
      },
    });


}(jQuery));
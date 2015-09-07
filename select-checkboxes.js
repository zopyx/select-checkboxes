(function ($) {

    function do_modify(element) {

        // ID of <select>
        var id = $(element).attr('id');

        // related label (referred through its 'for' attribute
        var label = $('*[for="' + id + '"]');
        if (label.length == 0) { 
            alert(sprintf('<select> with ID "%s" has no associated label', id));
            return;
        }
        var label_text = $(label).html();

        // added checkboxes
        var html = [];
        html.push(sprintf('<div class="select-checkbox" data-id="%s">', id));
        $(element).children('option').each(function() {
            html.push('<div>');
            if ($(this).is(':checked')) {
                html.push(sprintf('<input class="select-checkbox" type="checkbox" value="%s" checked="checked">', $(this).attr('value')));
            } else {
                html.push(sprintf('<input class="select-checkbox" type="checkbox" value="%s">', $(this).attr('value')));
            }
            html.push($(this).html());
            html.push('</div>');
        });
        html.push('</div>');
        $(element).after(sprintf('<div class="select-checkbox-container"><div class="toggle-select-checkbox checkboxes-invisible" data-id="%s">%s</div> %s</div></div>', id, label.html(), html.join('')));

        // hide <select> and related label element                    
        $(element).hide();
        label.hide();

        // Toggler for div with checkboxes
        $(document).on('click', '.toggle-select-checkbox', function(event) {
            event.stopImmediatePropagation();
            var id = $(this).data('id');
            var target = $('div.select-checkbox[data-id="' + id + '"]');
            target.toggleClass('checkboxes-shown');
            if (target.is(':visible')) {
                $(this).addClass('checkboxes-visible');
                $(this).removeClass('checkboxes-invisible');
                } else {
                $(this).removeClass('checkboxes-visible');
                $(this).addClass('checkboxes-invisible');
            }
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

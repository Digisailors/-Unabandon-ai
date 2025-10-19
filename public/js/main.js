(function($) {
    "use strict";

    /*-------------------------------------
    Subscribe Form Activation
    -------------------------------------*/
    $('[data-pixsaas]').each(function() {
        const $form = $(this);
        const $formResult = $('.form-result', $form);
        const $submitButton = $('button[type="submit"]', $form);

        $formResult.hide();

        const resetFormState = function(message, cssClassToAdd, cssClassesToRemove) {
            const classesToRemove = Array.isArray(cssClassesToRemove) ? cssClassesToRemove.join(' ') : cssClassesToRemove;

            $formResult
                .stop(true, true)
                .removeClass(classesToRemove)
                .addClass(cssClassToAdd)
                .fadeIn(200)
                .show()
                .delay(5000)
                .fadeOut(400, function() {
                    $(this).removeClass(cssClassToAdd).hide();
                });
            $('.form-result > .content', $form).text(message);
            $submitButton.removeClass('clicked');
        };

        $form.on('submit', function(event) {
            event.preventDefault();
            $submitButton.addClass('clicked');

            const values = {};
            $('[name]', $form).each(function() {
                const $field = $(this);
                const fieldName = $field.attr('name');
                if (fieldName) {
                    values[fieldName] = $field.val();
                }
            });

            $.ajax({
                url: $form.attr('action'),
                type: 'POST',
                data: values,
                success: function success(data) {
                    const hasError = Boolean(data && data.error === true);
                    const message = data && data.message ? data.message : 'Subscription processed successfully.';

                    if (hasError) {
                        resetFormState(message, 'alert-warning', ['alert-success', 'alert-danger']);
                        return;
                    }

                    resetFormState(message, 'alert-success', ['alert-warning', 'alert-danger']);
                    $form.trigger('reset');
                },
                error: function error() {
                    resetFormState('Sorry, an unexpected error occurred.', 'alert-danger', ['alert-warning', 'alert-success']);
                }
            });
        });
    });

    /*-------------------------------------
    Youtube Video
    -------------------------------------*/
    if ($.fn.YTPlayer !== undefined && $("#fxtVideo").length) {
        $("#fxtVideo").YTPlayer({
            useOnMobile: true
        });
    }

    /*-------------------------------------
    Vegas Slider
    -------------------------------------*/
    if ($.fn.vegas !== undefined && $("#vegas-slide").length) {
        const targetSlider = $("#vegas-slide");
        const vegasOptions = targetSlider.data('vegas-options');
        if (typeof vegasOptions === "object") {
            targetSlider.vegas(vegasOptions);
        }
    }

    /*-------------------------------------
    Animated Headline
    -------------------------------------*/
    if ($.fn.animatedHeadline !== undefined && $(".ah-animate").length) {
        const targetSlider = $(".ah-animate");
        const ahOptions = targetSlider.data('line-options');
        if (typeof ahOptions === "object") {
            targetSlider.animatedHeadline(ahOptions);
        }
    }

    /*-------------------------------------
    Section background image
    -------------------------------------*/
    $("[data-bg-image]").each(function() {
        const img = $(this).data("bg-image");
        $(this).css({
            backgroundImage: "url(" + img + ")"
        });
    });

    $(function() {
        /*-------------------------------------
        Ripples activation code
        -------------------------------------*/
        if ($.fn.ripples !== undefined) {
            $('#wrapper').ripples({
                resolution: 356,
                dropRadius: 20,
                perturbance: 0.04,
            });
        }
        /*-------------------------------------
        Countdown activation code
        -------------------------------------*/
        const eventCounter = $(".countdown");
        if (eventCounter.length) {
            eventCounter.countdown("2022/01/01", function(e) {
                $(this).html(
                    e.strftime(
                        "<div class='countdown-section'><div><div class='countdown-number'>%D</div> <div class='countdown-unit'>Day%!D</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>Hour%!H</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>Minutes</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>Second</div> </div></div>"
                    )
                );
            });
        }
    });
})(jQuery);


/**
 * Minimal Form Interface (orginaly on: tympanus.net/codrops/2014/04/01/minimal-form-interface/)
 *
 * Refactored version of the Codrop's minimal form interface, now simplier, in jQuery and SASS.
 *
 * @author Alex Rohleder <alexrohleder96@outlook.com> <https://www.alexrohleder.com.br> <https://blog.alexrohleder.com.br>
 * @version 1.0
 */
 
$(function () {

    /**
     * Init the minimal form in a form element
     *
     * options
     *    - validate: receive a question input execute some logic
     *                for validating they value and return a boolean.
     *    - error: The callback for making error messages, receives the
     *             question input and returns a string with validation error.
     *    - submit: The callback called when all the inputs are correctly filled.
     */

    $.fn.form = function (options) {

        // Getting the event end name implemented in the current browser.
        var transEndEventName = ({
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        })[ Modernizr.prefixed('transition') ];


        var form = $(this);
        var current = 0;
        var questions = form.find('.question');
        var question = questions.eq(current).find('input');
        var progress = form.find('.progress-bar');
        var next = form.find('.next');
        var status = form.find('.count .itr');
        var error = form.find('.error');

        // The default error handler returns the browser default validation message (in english)
        var settings = $.extend({
            validate: function (e) {
                if (Modernizr.formvalidation) {
                       return e[0].checkValidity();
                } else return e.val() !== '';
            },
            error: function (e) {
                if (e[0].validationMessage) {
                       return e[0].validationMessage;
                } else return 'Invalid Input';
            },
            submit: function () {
                // do nothing
            }
        }, options);

        // When user get in touch with the form, this is the very first event, when user initiate to fill the form.
        var onQuestionFocus = function () {
            // do something ...
        }

        // on question submit execute question change logic if it is a valid one.
        var onQuestionSubmit = function (ev) {
            ev.preventDefault();

            if (!settings.validate(question)) {
                return !error.html(settings.error(question)).addClass('show');
            }

            current = current + 1;
            progress.css('width', 'p%'.replace('p', current * (100 / questions.length)));
            error.removeClass('show');

            if (current === questions.length) {
                next.off('click');
                return settings.submit(this);
            }

            status.html(current + 1);
            error.html('&nbsp;');
            form.addClass('change');
            questions.eq(current - 1).removeClass('current');
            question = questions.eq(current).addClass('current').find('input').focus();
        }

        // executed when all the question transition was done.
        var onTransitionEnd = function () {
            form.removeClass('change');
        }

        // Check if the key pressed is an enter, if so execute the submition.
        var onQuestionWrite = function (e) {
            if (e.which == 13) next.click();
        }

        // initial dom manipulations. and event binding.
        form.find('.count .total').html(questions.length);
        questions.on('focus', onQuestionFocus).on('keyup', onQuestionWrite);
        next.on('click', onQuestionSubmit);
        progress.on(transEndEventName, onTransitionEnd);
    }

});

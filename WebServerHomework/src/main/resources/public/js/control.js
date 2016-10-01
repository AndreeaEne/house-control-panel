// Configs
const MIN_TEMP = -10;
const MAX_TEMP = 40;
const TEMP_SCALE = chroma.scale(['0c00ad', '38e4f0', 'ffea00', 'f59218', 'f03818'])
    .domain([MIN_TEMP, MAX_TEMP]);

class State {
    constructor() {
        var self = this; // for closures

        // Cache DOM elements
        this.body = $("body");

        this.lightsFormInput = $('#lights-form-input');
        this.lightsButton = $('#lights-button');
        this.lightsButton.click(function (event) {
            event.preventDefault();  // Don't send request.
            self.isLightOn = !self.isLightOn;
        });

        // Visual elements to reflect db status
        this.isLightOn = this.isLightOn;
    }

    get isLightOn() {
        return this.lightsFormInput.is(':checked');
    }
    set isLightOn(newValue) {
        this.lightsButton
            .removeClass('btn-primary btn-secondary')
            .addClass(newValue ? 'btn-primary' : 'btn-secondary');

        this.body
            .removeClass('lights-on lights-off')
            .addClass(newValue ? 'lights-on' : 'lights-off');

        this.lightsFormInput.attr('checked', newValue);
    }

    calcArea() {
        return this.height * this.width;
    }
}

const state = new State();


$(function () {
    handleCurtains();
    handleTemperature();
});

// Curtains
function handleCurtains() {
    var curtains_buttons = $('.curtains-buttons');
    var formInput = $('#curtains-form-input');

    curtains_buttons.click(function (event) {
        event.preventDefault(); // Don't send request.
    });

    var curt_closed = $('#curt-close');
    var curt_opened = $('#curt-open');
    var setClass = function () {
        $("body").removeClass('curtains-on curtains-off');

        curt_opened.removeClass('btn-primary');
        curt_closed.removeClass('btn-primary');

        var statusClass = formInput.is(':checked') ? 'curtains-on' : 'curtains-off';
        // button_lights.addClass(statusClass);
        $("body").addClass(statusClass);

        if (!formInput.is(':checked')) {
            curt_closed.addClass('btn-primary');
            curt_closed.removeClass('btn-secondary');
        }
        else {
            curt_opened.addClass('btn-primary');
            curt_opened.removeClass('btn-secondary');
        }
    }
    setClass(); // Initialization

    curt_closed.click(function (event) {
        if (!curt_closed.hasClass("btn-primary")) {
            curt_opened.addClass("btn-secondary");
            curt_closed.addClass("btn-primary");
            formInput.attr('checked', !formInput.is(':checked'));  // Invert checked status.
            setClass();
        }
    });

    curt_opened.click(function (event) {
        if (!curt_opened.hasClass("btn-primary")) {
            curt_closed.addClass("btn-secondary");
            curt_opened.addClass("btn-primary");
            formInput.attr('checked', !formInput.is(':checked'));  // Invert checked status.
            setClass();
        }
    });

}

var slider = $("#temperature-slider");
function handleTemperature() {

    var formInput = $('#temp-form-input');
    var temperature_value = formInput.val();

    // Create slider
    noUiSlider.create(slider.get(0), {
        start: temperature_value,
        range: {
            min: MIN_TEMP,
            max: MAX_TEMP
        }
    });


    // Bind the color changing function
    // to the slide event.
    slider.get(0).noUiSlider.on('slide', setTempColor);


    // Set new slider value.
    // TODO: Takes the value only when the button is pressed?
    var submit_button = $('#submit-button');
    submit_button.click(function (event) {
        var new_value = Math.round(slider.get(0).noUiSlider.get());
        formInput.attr('value', new_value);
    });
}

// This is needed because there is no 'box-shadow-color' property
const uncoloredBorderProps = $('.card-block').css('box-shadow');

// Set the temperature color for the border.
function setTempColor() {
    // Get the slider values,
    var sliderValue = slider.get(0).noUiSlider.get();
    $('#temperature-slider .noUi-handle').text(Math.round(sliderValue));
    var color = TEMP_SCALE(sliderValue).hex();

    // Fill the color box.
    $('.card-block')
        .css('border-color', color)
        // .css('background-color', color);
        // .css('box-shadow', uncoloredBorderProps + ' ' + color);
}


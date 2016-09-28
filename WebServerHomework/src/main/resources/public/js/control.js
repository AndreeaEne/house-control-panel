// TODO: Use jQuery


$(function () {
    handleLights();
    handleTemperature();
});


function handleLights() {
    var button = $('#lights-button');
    var formInput = $('#lights-form-input');

    var setClass = function () {
        button.removeClass('lights-on lights-off');
        $("body").removeClass('lights-on lights-off');

        var statusClass = formInput.is(':checked') ? 'lights-on' : 'lights-off';
        button.addClass(statusClass);
        $("body").addClass(statusClass);
    };

    setClass();  // Initialization

    button.click(function (event) {
        event.preventDefault();  // Don't send request.

        formInput.attr('checked', !formInput.is(':checked'));  // Invert checked status.
        setClass();
    });
}

function handleTemperature() {
    var slider = $("#temperature-slider");
    noUiSlider.create(slider.get(0), {
        start: 0,
        tooltips: true,
        range: {
            min: -5,
            max: 30
        },
    });

}




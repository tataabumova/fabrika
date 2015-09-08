/*******************Добавление сообщений************************/
$(".btn-textarea").click(function() {
    var mess_elem = $('#message');
    if (mess_elem.val()) {
        var curr_date = new Date();
        var month = get_month_array();

        $('.message_block').prepend('<div class="message clearfix"><div class="message_time">' + ("0" + curr_date.getDate()).slice(-2) + ' ' + month[curr_date.getMonth()] + ' ' + curr_date.getFullYear() + '<br>в ' + curr_date.getHours() + ':' + curr_date.getMinutes() + ':' + curr_date.getSeconds() + '</div><div class="message_text"><p class="message_autor">Я</p><p>' + mess_elem.val() + '</p></div></div>');

        mess_elem.val('');
    }
});

function get_month_array() {
    var month = new Array(12);
    month[0] = "января";
    month[1] = "февраля";
    month[2] = "марта";
    month[3] = "апреля";
    month[4] = "мая";
    month[5] = "июня";
    month[6] = "июля";
    month[7] = "августа";
    month[8] = "сентября";
    month[9] = "октября";
    month[10] = "ноября";
    month[11] = "декабря";

    return month;
}


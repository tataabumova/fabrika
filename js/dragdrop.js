$(document).ready(function() {
    // add the dataTransfer property for use with the native `drop` event
    jQuery.event.props.push( "dataTransfer" );

    var dropZone = $('#dropZone'),
        maxFileSize = 1000000; // максимальный размер фалйа в байтах.

    // Проверка поддержки браузером
    if (typeof(window.FileReader) == 'undefined') {
        dropZone.text('Не поддерживается браузером!');
        dropZone.addClass('error');
    }

    // Добавляем класс hover при наведении
    dropZone.on("dragover", function(event) {
        event.preventDefault();
        event.stopPropagation();

        $(this).addClass('hover');
        return false;
    });

    // Убираем класс hover
    dropZone.on("dragleave", function(event) {
        event.preventDefault();
        event.stopPropagation();

        $(this).removeClass('hover');
        return false;
    });

    // Обрабатываем событие Drop
    dropZone.on("drop", function(event) {
        event.preventDefault();
        event.stopPropagation();

        $(this).removeClass('hover');
        $(this).addClass('drop');

        var file = event.dataTransfer.files[0];

        // Проверяем размер файла
        if (file.size > maxFileSize) {
            $(this).text('Файл слишком большой!');
            $(this).addClass('error');
            return false;
        }

        add_document_row(file.name);
    });
    $(".upload_a").click(function(){
        $("input[type='file']").click();
    });

    $("input[type='file']").change(function(){
        if ($(this).val()){
            var file_name = $(this).val().replace(/.*\\(.*)/, "$1");
            add_document_row(file_name);
        }
    });

    function add_document_row(file_name) {
        var last_elem = get_last_document_row();
        var new_index = parseInt(last_elem.find('td:first-of-type').html()) + 1;
        var curr_date = new Date();
        var month = get_month_array();

        $("tbody").append("<tr><td>" + new_index + "</td><td>" + file_name + "</td><td>Вы</td><td>" + ("0" + curr_date.getDate()).slice(-2) + " " + month[curr_date.getMonth()] + " " + curr_date.getFullYear() + " в " + curr_date.getHours() + ":" + curr_date.getMinutes() + "</td><td><i class='demo-icon icon-pencil'></i><i class='demo-icon icon-trash'></i></td></tr>");
    }

    $(document).on("click", '.icon-trash', function(){
        $(this).parents('tr').remove();
        reindexing_documents();
    });

    function reindexing_documents(){
        $('.table_border tbody>tr').each(function(ind){
            $(this).find('td:first-of-type').html(ind+1);
        })
    }

    function get_last_document_row() {
        return $('.table_border tbody>tr:last-of-type');
    }

});
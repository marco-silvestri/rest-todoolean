$(document).ready(function () {

    /* References */

    var buttonSubmit = $('i.fas.fa-plus');
    var inputArea = $('.add-task');
    var list = $('.todo');
    var btnUpdate = $('i.fas.fa-sync-alt');
    var btnRemove = $('i.fas.fa-minus');
    
    var url = 'http://157.230.17.132:3022/todos';

    //Handlebars
    var source = $("#list__element-template").html();
    var template = Handlebars.compile(source);


    //Add the note on the click of the + button
    buttonSubmit.click(function(){
        addAPI(url, inputArea.val(), template, list);
    });

    // Add the new note on the hit of ENTER
    inputArea.keyup(function(e){
        if (e.which == 13 || e.keyCode == 13){//13 is ENTER
            addAPI(url, inputArea.val(), template, list);;
        }
    });

    // Refresh
    btnUpdate.click(function () { 
        updateAPI(url,template,list);
    });

    $(document).on('click', btnRemove, function(){
        removeAPI(url, $(this), template, list);
    });


}); //END of DOCUMENT

    /****************
    *  Functions
    *****************/

function updateAPI(url, template, destination){
    var settings = {
        url : url,
        method : 'GET'
    };
    $.ajax(settings).done(function(result){
        destination.html('');
        printTodos(result, template, destination);
    }).fail(function(error){
        console.log('Error #' + error.status);
    });
}

function addAPI(url, input, template, destination){
    var settings = {
        url : url,
        method : 'POST',
        data : {text : input}
    };
    $.ajax(settings).done(function(){
        updateAPI(url, template, destination);
    }).fail(function(error){
        console.log('Error #' + error.status);
    });
}

function removeAPI(url, self, template, destination){
    var thisId = self.data('id');
    var settings = {
        url : url +'/'+ thisId,
        method : 'DELETE',
    };
    $.ajax(settings).done(function(){
        updateAPI(url, template, destination);
    }).fail(function(error){
        console.log('Error #' + error.status);
    });
}

function printTodos(data, template, destination){
    for (var i = 0; i < data.length; i++){
        var templateData = {
            todoId : data[i].id,
            todoElement : data[i].text
        };
        var output = template(templateData);
        destination.append(output);
    }
}

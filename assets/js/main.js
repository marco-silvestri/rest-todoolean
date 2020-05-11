$(document).ready(function () {

    //  Refs
    var buttonSubmit = $('i.fas.fa-plus');
    var inputArea = $('.add-task');
    var list = $('.todo');
    var buttonUpdate = $('i.fas.fa-sync-alt');
    var url = 'http://157.230.17.132:3022/todos';

    //  Handlebars
    var source = $("#list__element-template").html();
    var template = Handlebars.compile(source);

    //  Add the note on the click of the + button
    buttonSubmit.click(function(){
        addTodo(url, inputArea, template, list);
    });

    //  Add the new note on the hit of ENTER
    inputArea.keyup(function(e){
        if (e.which == 13 || e.keyCode == 13){//13 is ENTER
            addTodo(url, inputArea, template, list);;
        }
    });

    //  Update
    buttonUpdate.click(function () { 
        updateTodos(url,template,list);
    });

    //  Remove on click
    list.on('click', '.fas.fa-minus', function(){
        removeTodo(url, $(this), template, list);
    });
}); //END of DOCUMENT

    /*************
    *  Functions
    **************/
//  crUd
function updateTodos(url, template, destination){
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

//  Crud
function addTodo(url, input, template, destination){
    var settings = {
        url : url,
        method : 'POST',
        data : {text : input.val()}
    };
    $.ajax(settings).done(function(){
        updateTodos(url, template, destination);
        input.val('');
    }).fail(function(error){
        console.log('Error #' + error.status);
    });
}

//  cRud
function removeTodo(url, self, template, destination){
    var thisId = self.data('id');
    var settings = {
        url : url +'/'+ thisId,
        method : 'DELETE',
    };
    $.ajax(settings).done(function(){
        updateTodos(url, template, destination);
    }).fail(function(error){
        console.log('Error #' + error.status);
    });
}

//  Print
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

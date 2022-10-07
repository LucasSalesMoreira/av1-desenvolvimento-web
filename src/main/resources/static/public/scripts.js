$(document).ready(() => {
    const sendRequest = (
        successCallback = (response) => console.log(response), 
        url = null, 
        method = 'GET', 
        data = null
    ) => {
        let baseUrl = 'http://localhost:8080/api/post'
        url = url ? `${baseUrl}/${url}` : baseUrl 
        
        $.ajax({
            url,
            dataType: 'json',
            headers: {"Content-Type": "application/json"},
            method,
            data: data ? JSON.stringify(data) : data, 
            success: successCallback,
            error: (e) => console.log(`Algo deu errado: ${e}`)
        })
    }

    const makePostsList = ({ posts }) => {
        $('#posts').html('') // Limpa posts da tela.

        if (posts.length === 0) {
            $('#posts').append($('<h3>Sem posts no momento!</h3>'))
            return
        }

        posts.reverse()

        posts.forEach((item) => {
            let html = `<div class="d-flex text-muted pt-3">
                            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6f42c1"/><text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text></svg>
                            <!--<img class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" src="./assets/brand/user.png">-->
                            <p class="pb-3 mb-0 small lh-sm border-bottom">
                                <strong class="d-block text-gray-dark">@${item.author}</strong>
                                ${item.body}
                            </p>
                        </div>`
            
            $('#posts').append($(html))
        })
    }

    const reload = () => sendRequest(makePostsList)

    const successCreatedNewPost = (post) => {
        console.log(`Novo post criado ID = ${post.id}`)
        reload()
        $('#modal-post').modal('hide')
    }

    $('#reload').click(() => {
        reload()
    })

    $('#send-button').click(() => {
        let payload = {
            title: $('#title').val(),
            body: $('#message').val(),
            author: $('#author').val()
        }
        sendRequest(successCreatedNewPost, null, 'POST', payload)
    })

    reload()
})
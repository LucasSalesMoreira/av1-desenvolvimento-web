$(document).ready(() => {
    const sendRequest = (
        successCallback = (response) => console.log(response), 
        url = null, 
        method = 'GET', 
        data = {}
    ) => {
        let baseUrl = 'http://localhost:8080/api/post'
        url = url ? `${baseUrl}/${url}` : baseUrl 
        
        $.ajax({
            url,
            method,
            data,
            success: successCallback,
            error: (e) => console.log(`Algo deu errado: ${e}`)
        })
    }

    const makePostsList = ({ posts }) => {
        if (posts.length === 0) {
            $('#posts').append($('<h3>Sem posts no momento!</h3>'))
            return
        }
        
        $('#posts').html('') // Limpa posts da tela.

        posts.forEach((item) => {
            let html = `<div class="d-flex text-muted pt-3">
                            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6f42c1"/><text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text></svg>
                            <!--<img class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" src="./assets/brand/user.png">-->
                            <p class="pb-3 mb-0 small lh-sm border-bottom">
                                <strong class="d-block text-gray-dark">@${item.author}</strong>
                                Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?
                            </p>
                        </div>`
            
            $('#posts').append($(html))
        })
    }


    sendRequest(makePostsList)

    $('#reload').click(() => {
        sendRequest(makePostsList)
    })

    $('#send-button').click(() => {
        let payload = {
            title: null,
            body: null,
            author: null 
        }
        sendRequest(makePostsList, null, 'POST', payload)
    })
})
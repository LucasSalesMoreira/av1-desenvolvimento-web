let btEditPost
let btDelPost

$(document).ready(() => {
    let globalPosts
    let globalId

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

        posts.forEach((item, index) => {
            let html = `<div class="d-flex text-muted pt-3">
                            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6f42c1"/><text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text></svg>
                            <!--<img class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" src="./assets/brand/user.png">-->
                            <p class="pb-3 mb-0 small lh-sm border-bottom">
                                <strong class="d-block text-gray-dark">@${item.author} - ${item.title}</strong>
                                ${item.body}
                            </p>
                            <br/>
                            <small class="d-block text-end mt-3">
                                &nbsp;&nbsp;<a class="edit" onclick="btEditPost('${item.id}')" href="#">Editar</a> &nbsp;<a style="color: #e02d2d;" class="del" onclick="btDelPost('${item.id}')" href="#">Deletar</a>
                              </small>
                        </div>`
            
            $('#posts').append($(html))
        })

        globalPosts = posts 
    }

    const reload = () => sendRequest(makePostsList)

    const successCreatedNewPost = (post) => {
        console.log(`Novo post criado ID = ${post.id}`)
        reload()
        $('#modal-post').modal('hide')
    }
    
    const successUpdatedPost = (post) => {
        console.log(`Post editado ID = ${post.id}`)
        reload()
        $('#modal-post-edit').modal('hide')
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

    $('#send-button-edit').click(() => {
        let payload = {
            title: $('#title-edit').val(),
            body: $('#message-edit').val()
        }
        sendRequest(successUpdatedPost, globalId, 'PATCH', payload)
    })

    btEditPost = (id) => {
        const { title, body } = globalPosts.find(item => item.id === id)
        globalId = id
        $('#title-edit').val(title)
        $('#message-edit').val(body)
        $('#modal-post-edit').modal('show')
    }

    btDelPost = (id) => {
        sendRequest(() => {
            reload()
            console.log('Post deletado com sucesso!')
        }, id, 'DELETE')
    }

    reload()
})
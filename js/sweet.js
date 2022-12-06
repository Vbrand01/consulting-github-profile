
$("#btoConsult").click(() => {

    Swal.fire({
        title: 'Insira seu nome de usuário do Github',
        input: 'text',
        background: 'rgb(97, 97, 97)',
        color: 'white',
        inputAttributes: {
          autocapitalize: 'off',
          color: 'blue',
          popup: 'swal2-show',
          backdrop: 'swal2-backdrop-show',
          icon: 'swal2-icon-show'
        },

        showClass: {
            popup: 'swal2-noanimation',
            backdrop: 'swal2-noanimation'
            
        },
          hideClass: {
            popup: '',
            backdrop: ''
        },

        customClass: {
            confirmButtonTwo: 'btn btn-success',
            container: 'container-class',
            popup: 'popup-class',
            header: 'header-class',
            title: 'title-class',
            closeButton: 'close-button-class',
            icon: 'icon-class',
            image: 'image-class',
            content: 'content-class',
            input: 'input-class',
            actions: 'actions-class',
            confirmButton: 'confirm-button-class',
            cancelButton: 'cancel-button-class',
            footer: 'footer-class',
            imageUrl: 'img-url',
            showValidationMessage: 'valid-message'
        },

        showCancelButton: true,
        confirmButtonText: 'OK',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Falha na solicitação: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            background: 'rgb(97, 97, 97)',
            color: 'white',
            title: `${result.value.login}`,
            imageUrl: result.value.avatar_url,
          })
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
            
            let timerInterval
            
            Swal.fire({                
            title: 'Alerta de fechamento automático!',
            html: 'Fechando em <b></b> milissegundos.',
            timer: 1500,
            color: 'white',
            background: 'rgb(97, 97, 97)',
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },

            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
            })
          }
      })
})

// vBrand01
// Cassianosch
// lucaspereirasantiago



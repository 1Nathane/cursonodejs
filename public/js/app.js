

const cotacoesForm = document.querySelector('form')
const mensagemPrincipal = document.querySelector('h3')
const close_ = document.querySelector('#close')
const open_ = document.querySelector('#open')
const high = document.querySelector('#high')
const low = document.querySelector('#low')
const img_linha = document.querySelector('#primeira-linha')

cotacoesForm.addEventListener('submit', (event) => {
    // img_linha.innerText = ""
    mensagemPrincipal.innerText = "Buscando..."
    open_.innerText = ''
    close_.innerText = ''
    high.innerText = ''
    low.innerText = ''
    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        mensagemPrincipal.innerText ='O ativo deve ser informado'
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                mensagemPrincipal.innerText =`Alguma coisa deu errado`
                close_.innerText = `${data.error.message} código ${data.error.code}`
            }else{
                mensagemPrincipal.innerText = data.symbol
                open_.innerText = `Abertura: R$ ${data.open}`
                close_.innerText = `Fechamento: R$ ${data.close}`
                high.innerText = `Preço mais alto do dia: R$ ${data.high}`
                low.innerText = `Preço mais baixo do dia: R$ ${data.low}`
                
            }   
        })
    })
})
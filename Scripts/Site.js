function AbrirCamera()
{
    ///VERIFICAR SE JÁ ESTÁ LOGADO (SE JÁ LEU O QR CODE)
    var s = EstaLogado();
    if (s == 'sim') {
        window.location.href = "Pedido.html";
    }
    else {
        ///ABRIR A CÂMERA PARA LER O QRCODE
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
            var video = document.querySelector('video');
            video.srcObject = stream;
            video.play();
        });
    }
}

function EstaLogado()
{
    ///VERIFICAR SE JÁ ESTÁ LOGADO (SE JÁ LEU O QR CODE) E RETORNA A RESPOSTA
    var s = sessionStorage.getItem('logado');
    if (s=='sim') {
        return 'sim';
    }
    return 'não';
}

function GravarLogin() {
    ///GRAVAR LEITURA DO AR CODE
    sessionStorage.setItem('logado', 'sim');
}

function Sair() {
    ///SAIR (REMOVER SESSÃO)
    sessionStorage.removeItem('logado');
    sessionStorage.removeItem('forma');
    window.location.href = "Index.html";
}
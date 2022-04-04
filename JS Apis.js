if(window.File && window.FileReader && window.FileList && window.Blob) {
    function handleFileSelect(evt) {
        let file = evt.target.files[0];

        if (!file.type.match('video.*')) {
            return;
        }

        let reader = new FileReader();

        reader.onload = (function (Archivo) {
            return function (e) {
                let videoDiv = document.getElementsByClassName('video-container');

                if(videoDiv[0] != null) {
                    videoDiv[0].parentNode.removeChild(videoDiv[0]);
                }
                    
                let div = document.createElement('div');
                div.id = "video-div";
                div.className = "video-container";
                div.innerHTML = '<video controls id="video" class="thumb" src="' + e.target.result + '" title="'+ escape(Archivo.name) + '"/>';

                document.getElementById('video-output').insertBefore(div, null);

                let mensajeCargando = document.createElement('p');

                mensajeCargando.id = "loading";
                mensajeCargando.className = "mensaje-cargando";
                mensajeCargando.innerHTML = 'El video está cargando';

                document.getElementById('video-output').insertBefore(mensajeCargando, null);

                let playButton = document.getElementById('play');
                let pauseButton = document.getElementById('pause');
                let volumesubirVolumen = document.getElementById('subirVolumen');
                let volumebajarVolumen = document.getElementById('bajarVolumen');
                
                playButton.addEventListener('click', () => {
                    document.getElementById('video').play();
                });
                
                pauseButton.addEventListener('click', () => {
                    document.getElementById('video').pause();
                })

                volumesubirVolumen.addEventListener('click', () => {
                    document.getElementById('video').volume += 0.1;
                })

                volumebajarVolumen.addEventListener('click', () => {
                    document.getElementById('video').volume -= 0.1;
                })

                document.getElementById('video').addEventListener('canplay', () => {
                    let mensajeCargando = document.getElementById('loading');

                    document.getElementById('video-output').removeChild(mensajeCargando);

                    document.getElementById('video').style.visibility = "visible";

                    playButton.style.visibility = "visible";
                    pauseButton.style.visibility = "visible";
                    volumesubirVolumen.style.visibility = "visible";
                    volumebajarVolumen.style.visibility = "visible"; 
                });
            }
        }) (file);

        reader.readAsDataURL(file);
    } 

    document.getElementById('file').addEventListener('change', handleFileSelect, false);
} else {
    alert('File APIs no están soportadas por este navegador.')
}
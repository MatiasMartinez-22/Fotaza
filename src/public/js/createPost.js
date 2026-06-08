const inputImagen = document.getElementById('img');
const preview = document.getElementById('imgsPreview');

const imagenBase64 = document.getElementById('imagen_base64');
const nombreOriginal = document.getElementById('nombre_original');
const mimeType = document.getElementById('mime_type');

inputImagen.addEventListener('change', (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 500000) {
        alert('La imagen no puede superar 500 KB');
        inputImagen.value = '';
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {

        imagenBase64.value = reader.result;
        nombreOriginal.value = file.name;
        mimeType.value = file.type;

        preview.innerHTML = '';

        const img = document.createElement('img');
        img.src = reader.result;
        img.style.width = '300px';

        preview.appendChild(img);
    };

    reader.readAsDataURL(file);

});
/*
    Este arquivo é necessário pois o reac native/expo/typescrip não está reconhecendo a importação de arquivos .png dando erro no código, só que na verdade o expo aceita sim importar arquivos *.png. Para burlar isso criamos uma pasta com o nome "@types" e dentro do index.d.ts criamos um módulo para reconhecer o tipo de arquivo nas importações.

    Exemplo de importação que daria erro:
    import mapMarker from './src/images/map-marker.png';
*/

declare module "*.png";
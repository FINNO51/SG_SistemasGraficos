import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
 
class grada extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      
      // Un Mesh se compone de geometría y material
      this.video = document.createElement('video');
      this.video.crossOrigin = 'anonymous';
      this.video.preload = '';
      this.video.loop = 'true';
      this.video.src = 'videos/publico.mp4';
      this.video.load();

      var texture = new THREE.VideoTexture(this.video);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;

      var textureLoader2 = new THREE.TextureLoader();
      var textura2 = textureLoader2.load("imagenes/malla.png");
      //var materialPrueba = new THREE.MeshNormalMaterial();
      var material = new THREE.MeshPhongMaterial({map:textura2, transparent:true});

      var material2 = new THREE.MeshPhongMaterial({map:texture});
      

      var boxGeom = new THREE.BoxBufferGeometry (50, 5, 30);
      var laterales = new THREE.BoxBufferGeometry (2, 3, 30);
      var laterales1 = new THREE.BoxBufferGeometry (2, 3, 15);
      var boxGeom2 = new THREE.BoxBufferGeometry (50, 20, 1);
      var planeGeom = new THREE.PlaneBufferGeometry(23, 4);
      // Como material se crea uno a partir de un color

        var cimiento = new THREE.Mesh(boxGeom, material);
        var paredAtras = new THREE.Mesh(boxGeom2, material);
        var lateral1 = new THREE.Mesh(laterales, material);
        var lateral2 = new THREE.Mesh(laterales, material);
        var lateral11 = new THREE.Mesh(laterales1, material);
        var lateral22 = new THREE.Mesh(laterales1, material);
        var publico1 = new THREE.Mesh(planeGeom, material2);
        var publico2 = new THREE.Mesh(planeGeom, material2);
        var publico3 = new THREE.Mesh(planeGeom, material2);
        var publico4 = new THREE.Mesh(planeGeom, material2);
        var publico5 = new THREE.Mesh(planeGeom, material2);
        var publico6 = new THREE.Mesh(planeGeom, material2);

        cimiento.translateY(5);
        paredAtras.translateZ(-15);
        paredAtras.translateY(10);
        lateral1.translateX(-24);
        lateral1.translateY(8);
        lateral2.translateX(24);
        lateral2.translateY(8);
        lateral11.translateX(-24);
        lateral11.translateZ(-7.5);
        lateral11.translateY(11);
        lateral22.translateX(24);
        lateral22.translateZ(-7.5);
        lateral22.translateY(11);

        publico1.translateY(9);
        publico1.translateX(-11.5);
        publico1.translateZ(7.5);
        publico2.translateY(9);
        publico2.translateX(11.5);
        publico2.translateZ(7.5);
        publico3.translateY(13);
        publico3.translateX(-11.5);
        //publico3.translateZ(7.5);
        publico4.translateY(13);
        publico4.translateX(11.5);
        publico5.translateY(17);
        publico5.translateX(11.5);
        publico5.translateZ(-7.5);
        publico6.translateY(17);
        publico6.translateX(-11.5);
        publico6.translateZ(-7.5);
        
       

      this.final = new THREE.Mesh();

      this.final.add(cimiento);
      this.final.add(paredAtras);
      this.final.add(lateral1);
      this.final.add(lateral2);
      this.final.add(lateral11);
      this.final.add(lateral22);
      this.final.add(publico1);
      this.final.add(publico1);
      this.final.add(publico2);
      this.final.add(publico3);
      this.final.add(publico4);
      this.final.add(publico5);
      this.final.add(publico6);

      this.final.translateY(-2.5);

      this.add(this.final);
      
      this.createLights();
      
      
  
        
      
    }

    play(){
      this.video.play();
    }
    createLights () {
    

    }
}
    
export { grada };   

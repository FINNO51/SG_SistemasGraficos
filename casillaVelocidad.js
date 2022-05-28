import * as THREE from './libs/three.module.js'
 
class casillaVelocidad extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      
      // Un Mesh se compone de geometría y material
      this.video = document.createElement('video');
      this.video.crossOrigin = 'anonymous';
      this.video.preload = '';
      this.video.loop = 'true';
      this.video.src = 'videos/turbo.mp4';
      this.video.load();

      var texture = new THREE.VideoTexture(this.video);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;



      var boxGeom2 = new THREE.PlaneBufferGeometry(60, 20);
      var material2 = new THREE.MeshPhongMaterial({map:texture});
     // material2.emissiveMap = texture;
     // material2.emissive = 0xffffff;
      
      // Ya podemos construir el Mesh
      this.box2 = new THREE.Mesh(boxGeom2, material2);

      this.box2.translateY(-0.45);
      this.box2.rotateX(-Math.PI/2);
      this.box2.rotateZ(-Math.PI/2);
      
      this.add(this.box2);
      
      this.createLights();
      
      
  
        
      
    }

    play(){
      this.video.play();
    }
    createLights () {
      //Iluminación de la meta 
      
      // this.luz = new THREE.PointLight( 0xffffff, 2 , 200);
      // this.luz.translateY(30);

      // this.luz2 = new THREE.PointLight( 0xffffff, 2 , 20);
      // this.luz2.translateY(3);
      // this.luz2.translateX(20);

      // this.luz3 = new THREE.PointLight( 0xffffff, 2 , 20);
      // this.luz3.translateY(3);
      // this.luz3.translateX(-20);

      // this.luz4 = new THREE.PointLight( 0xffffff, 2 , 20);
      // this.luz4.translateY(3);
      // this.luz4.translateX(-40);

      // this.luz5 = new THREE.PointLight( 0xffffff, 2 , 20);
      // this.luz5.translateY(3);
      // this.luz5.translateX(40);
      

      //this.add (this.luz);


    }
}
    
export { casillaVelocidad };   

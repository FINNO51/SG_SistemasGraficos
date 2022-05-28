import * as THREE from './libs/three.module.js'
 
class meta extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();

       // Un Mesh se compone de geometría y material
       this.video = document.createElement('video');
       this.video.crossOrigin = 'anonymous';
       this.video.preload = '';
       this.video.loop = 'true';
       this.video.src = 'videos/meta.mp4';
       this.video.load();
 
       var texture = new THREE.VideoTexture(this.video);
       texture.generateMipmaps = false;
       texture.minFilter = THREE.LinearFilter;
       texture.magFilter = THREE.LinearFilter;
       texture.format = THREE.RGBFormat;
      
      //var material2 = new THREE.MeshNormalMaterial();
      // Un Mesh se compone de geometría y material
      var boxGeom = new THREE.BoxBufferGeometry (30, 0.0001,60);
      var boxGeom2 = new THREE.BoxBufferGeometry (0.0001, 5,60);
      // Como material se crea uno a partir de un color
      var textureLoader = new THREE.TextureLoader();
      var textura = textureLoader.load("imagenes/meta.jpg");

      var textureLoader2 = new THREE.TextureLoader();
      var textura2 = textureLoader2.load("imagenes/hormigon.jpg");
     
      var material = new THREE.MeshPhongMaterial({map:textura});
      var material1 = new THREE.MeshPhongMaterial({map:textura2});
      var material2 = new THREE.MeshPhongMaterial({map:texture});

      this.box = new THREE.Mesh (boxGeom, material);

      this.box2 = new THREE.Mesh (boxGeom2, material2);
    
      var columnaIzq = new THREE.CylinderBufferGeometry(2, 2, 20, 24, 1);

      this.colIzq = new THREE.Mesh (columnaIzq, material1);

      var columnaDer = new THREE.CylinderBufferGeometry(2, 2, 20, 24, 1);

      this.colDer = new THREE.Mesh (columnaDer, material1);
      
  
      // Y añadirlo como hijo del Object3D (el this)
     // this.box.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/2);




         this.box.translateY(-1);
         this.colDer.translateZ(32);
         this.colDer.translateY(9);
         this.colIzq.translateZ(-32);
         this.colIzq.translateY(9);
         this.box2.translateY(16);
      
    //   this.box.translateX(100);

        this.meshTodo = new THREE.Mesh();
        
        this.meshTodo.add (this.box);
        this.meshTodo.add(this.colIzq);
        this.meshTodo.add(this.colDer);
        this.meshTodo.add(this.box2);
      

        this.add(this.meshTodo);
      
      
      
     // this.createLights();
  
        
      
    }

    play(){
        this.video.play();
      }

    createLights () {
        //Iluminación de la meta 
        
        this.spotLight = new THREE.SpotLight( 0xffffff,4 , 50, Math.PI/7);
        this.spotLight.position.set( 35, 15, 6);


        this.spotLight2 = new THREE.SpotLight( 0xffffff,4 , 50, Math.PI/7);
        this.spotLight2.position.set( 35, 15, 23);


        this.spotLight3 = new THREE.SpotLight( 0xffffff,4 , 50, Math.PI/7);
        this.spotLight3.position.set( 35, 15, -10);


        this.spotLight4 = new THREE.SpotLight( 0xffffff,4 , 50, Math.PI/7);
        this.spotLight4.position.set( 35, 15, -20);
       
        //this.spotLight.target(this.box);
    
       
    
        this.add (this.spotLight);
        this.add (this.spotLight2);
        this.add (this.spotLight3);
        this.add (this.spotLight4);

      }
}
    
export { meta };   

import * as THREE from '../libs/three.module.js'
 
class circuito1 extends THREE.Object3D {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);
    var loader = new THREE. TextureLoader();
    var barrerasIzq = [];
    
    var textura = loader.load("imagenes/malla.png");
    textura.wrapS = textura.wrapT = THREE.RepeatWrapping;
    textura.offset.set( 0, 0.5 );
    textura.repeat.set( 1/10, 1/10 );

      // // Instrucciones para crear el contorno
      // var shape = new THREE.Shape();
      // shape.moveTo(0,-20);
      // shape.lineTo(0,-20);
      // shape.lineTo(0, 20);
      // shape.lineTo(-1, 20);
      // shape.lineTo(-1, -20);

    // Instrucciones para crear el contorno
    var shape = new THREE.Shape();
    shape.moveTo(0,-30);
    shape.lineTo(1,-30);
    shape.lineTo(1, 30);
    shape.lineTo(-3, 30);
    shape.lineTo(0, 30);
    shape.lineTo(0, -30);

    shape.lineTo(1, -30);


    // Camino del barrido
    var multiplier = 1.5;
    var pts = [];
    pts.push(new THREE.Vector3(multiplier*100.0, -0.5, multiplier*5.0));
    pts.push(new THREE.Vector3(multiplier*110.0, -0.5, multiplier*5.0));
    pts.push(new THREE.Vector3(multiplier*400.0, -0.5, multiplier*0.0));
    pts.push(new THREE.Vector3(multiplier*600.0, -0.5, multiplier*200.0));
    pts.push(new THREE.Vector3(multiplier*1400.0, -0.5, multiplier*200.0));
    pts.push(new THREE.Vector3(multiplier*1500.0, -0.5, multiplier*450.0));
    pts.push(new THREE.Vector3(multiplier*1400.0, -0.5, multiplier*600.0));
    pts.push(new THREE.Vector3(multiplier*1200.0, -0.5, multiplier*700.0));
    pts.push(new THREE.Vector3(multiplier*700.0, -0.5, multiplier*900.0));
    pts.push(new THREE.Vector3(multiplier*-200.0, -0.5, multiplier*800.0));
    pts.push(new THREE.Vector3(multiplier*-100.0, -0.5, multiplier*100.0));
    pts.push(new THREE.Vector3(multiplier*10.0, -0.5, multiplier*5.0));
    pts.push(new THREE.Vector3(multiplier*100.0, -0.5, multiplier*5.0));
    
   // pts.push(new THREE.Vector3(0.0, 15.0, 10.0));
   // pts.push(new THREE.Vector3(-5.0, 15.0, 15.0));
    var camino = new THREE.CatmullRomCurve3(pts);

    var opciones = {amount: 1, bevelEnabled: true, bevelSegments: 10, steps: 1000, curveSegments: 4, bevelSize: 1, bevelThickness: 1, extrudePath: camino};

  // Construir geometría a partir del contorno
    var geometriaBarrido = new THREE.ExtrudeGeometry(shape, opciones);
  // Material
    var materialBarrido = new THREE.MeshPhongMaterial({map:textura, transparent: true});
    materialBarrido.depthWrite = false;
    
    // Formar nodos de rotación y translación para la animación
    this.ab = new THREE.Mesh(geometriaBarrido, materialBarrido);   // Geometría del Barrido
    this.add(this.ab);

 // // Instrucciones para crear el contorno
 var shape = new THREE.Shape();
 shape.moveTo(-1,-20);
 shape.lineTo(-1,-20);
 shape.lineTo(-3, -20);
 shape.lineTo(-3, -19);
 shape.lineTo(-1, -20);


   


  }

  
}

export { circuito1 };

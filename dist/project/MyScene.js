
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { Stats } from '../libs/stats.module.js'
import { Lensflare, LensflareElement} from '../libs/Lensflare.js'

// Clases de mi proyecto

import {circuito1 } from './circuito1.js'
import {firestingray} from './firestingray.js'
import {Ciudad} from './ciudad.js'
import {casillaVelocidad} from './casillaVelocidad.js'
import {meta} from './meta.js'
import {grada} from './grada.js'
import * as TWEEN from '../libs/tween.esm.js'


 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();

    this.activarVideos = false;

    //skybox
    // var skyGeo =new THREE.BoxBufferGeometry(10000, 10000, 10000);
    // var loader = new THREE.TextureLoader(), texture = loader.load("imagenes/skybox.jpg");

    // var material = new THREE.MeshPhongMaterial({
    //     map: texture,
    // });

    // var sky = new THREE.Mesh(skyGeo, material);
    // sky.material.side = THREE.BackSide;



    this.go = false;
    this.turn = false;

    this.tecla;

    this.directions = {65: false, 32: false, 68: false, 37: false, 39: false};

    this.velocidad = 0;
    this.velocidadguardada = 0;
    this.giro = 0;
    this.sobrecircuito = true;
    this.choquefrontal = false;
    this.choqueizquierda = false;
    this.choquederecha = false;
    this.explota = false;
    this.resetear = false;
    this.preparar = true;
    this.vuelta = 1;
    this.vueltaDisponible=false;
    this.boost = false;
    this.sigueenturbo = false;

    this.minutos = 0;
    this.segundos = 0;
    this.milisegundos = 0;
    this.minutos2 = 0;
    this.segundos2 = 0;
    this.milisegundos2 = 0;
    this.loading = 60; //en condiciones normales, se activará cuando el framerate sea estable
    this.noBorrado=true;
    this.start = false;
    this.start2 = false;
    this.empezado = false;
   
    this.unavez = false;

    this.tiempos = Array();


    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
   // this.gui = this.createGUI ();
    
    this.initStats();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    var boxGeom2 = new THREE.PlaneBufferGeometry(40, 20);
    var material2 = new THREE.MeshPhongMaterial({color: 0x000000});
    material2.flatShading = true;

    this.fondoMenu = new THREE.Mesh(boxGeom2, material2);

    this.numerogeometry = new THREE.PlaneGeometry( 0.75, 0.75 );
    this.numeroloader = new THREE.TextureLoader().load('imagenes/3.png');
    this.numerotextura = new THREE.MeshBasicMaterial( {map: this.numeroloader, transparent: true});
    this.numero = new THREE.Mesh( this.numerogeometry, this.numerotextura);
    this.add(this.numero);

    this.circuito1 = new circuito1();
    this.nave1 = new firestingray();
    this.nave2 = new firestingray();
    this.ciudad = new Ciudad();
    this.grada01 = new grada();
    this.grada0 = new grada();
    this.grada1 = new grada();
    this.grada2 = new grada();
    this.grada3 = new grada();
    this.grada4 = new grada();
    this.grada5 = new grada();
    this.grada6 = new grada();
    this.grada7 = new grada();
    this.grada8 = new grada();
    this.grada9 = new grada();
    this.grada10 = new grada();
    this.grada11 = new grada();
    this.grada12 = new grada();


    this.panel1 = new casillaVelocidad(); //casillas de turbo
  
    this.meta = new meta(); // Lalínea de meta
    //this.nave2.translateX(1);
    //this.nave2.rotateX(Math.PI/6);
    this.nave2.position.x += 84;
    this.nave2.scale.set(1/2,1/2,1/2);
    this.nave2.position.y += 4.5;
    this.nave2.position.z += -1;

    this.numero.rotateY(-Math.PI/2); 
    this.numero.position.x += 87;
    this.numero.position.y += 5;
    this.numero.scale.set(0,0,0);
    

    this.nave1.position.x +=100;
   // this.nave1.position.z -=5;
    this.nave1.rotateY(Math.PI/2);
    this.ciudad.position.y -=400;
    this.ciudad.position.x +=2500;
    this.ciudad.position.z -=1500;

    this.meta.translateX(130);
    this.meta.translateZ(6);
    this.meta.translateY(0.7);

    this.panel1.translateX(1900);
    this.panel1.translateZ(1010);
    this.panel1.rotateY(Math.PI);
    this.panel1.rotateY(Math.PI/8);

    
    this.grada0.translateX(112);
    this.grada0.translateZ(-45);
    this.grada1.translateX(160);
    this.grada1.translateZ(-40);
    this.grada2.translateX(208);
    this.grada2.translateZ(-46);
    this.grada3.translateX(256);
    this.grada3.translateZ(-52);
    this.grada4.translateX(304);
    this.grada4.translateZ(-58);
    this.grada5.translateX(352);
    this.grada5.translateZ(-64);
    this.grada6.translateX(400);
    this.grada6.translateZ(-70);
    this.grada7.translateX(448);
    this.grada7.translateZ(-76);
    this.grada8.translateX(495);
    this.grada8.translateZ(-72);
    this.grada8.rotateY(-Math.PI/12);
    this.grada9.translateX(544);
    this.grada9.translateZ(-64);
    this.grada9.rotateY(-Math.PI/12);
    this.grada10.translateX(592);
    this.grada10.translateZ(-56);
    this.grada10.rotateY(-Math.PI/11);
    this.grada11.translateX(640);
    this.grada11.translateZ(-40);
    this.grada11.rotateY(-Math.PI/9);
    this.grada12.translateX(688);
    this.grada12.translateZ(-15);
    this.grada12.rotateY(-Math.PI/4);

  

    this.add(this.grada0);
    this.add(this.grada1);
    this.add(this.grada2);
    this.add(this.grada3);
    this.add(this.grada4);
    this.add(this.grada5);
    this.add(this.grada6);
    //this.add(this.grada7);
    //this.add(this.grada8);
   // this.add(this.grada9);
   // this.add(this.grada10);
   // this.add(this.grada11);
   // this.add(this.grada12);

    this.nave2.add(this.fondoMenu);

    this.add(this.meta);
    this.add(this.panel1);
    this.add(this.nave1);
    this.add(this.nave2);
    this.add(this.circuito1);
    
    this.add(this.ciudad);
    var chispasGeometry = new THREE.PlaneGeometry( 28*3, 6*3 );
    var chispasLoader = new THREE.TextureLoader().load('imagenes/ellos.png');
    var chispasTextura = new THREE.MeshBasicMaterial( {map: chispasLoader, transparent: true});
    this.plane = new THREE.Mesh( chispasGeometry, chispasTextura);
    this.plane.position.x+=830;
    this.plane.position.y+=307;
    this.plane.position.z+=1550;
    this.plane.rotation.y+=Math.PI*2.2/2;
    this.add(this.plane);

    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    var camara = new THREE.Vector3(0,0,0);

    this.nave1.camera.getWorldPosition(camara);

    this.nave1.numero.lookAt(camara);
    this.fondoMenu.position.x +=3;
    this.fondoMenu.position.z +=2;

    this.fondoMenu.lookAt(camara);

  }

  iniciarMovimiento(){
      //Animacion para el menu
      var spline1 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(84.0, 4.5, -1.0),
        new THREE.Vector3(70.0, 3.8, -1.0),
     
      ]);
      var spline2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(84.0, 7.0, -2.0),
        new THREE.Vector3(84.0, 5.0, -2.0),
     
      ]);
      var spline3 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(84.0, 5.0, -2.0),
        new THREE.Vector3(84.0, 4.95, -2.0),
     
      ]);
      var spline4 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(84.0, 4.95, -2.0),
        new THREE.Vector3(84.0, 2.00, -2.0),
     
      ]);
      var spline5 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(84.0, 2.00, 0.0),
        new THREE.Vector3(84.0, 4.95, 0.0),
     
      ]);
      var spline6 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(84.0, 4.95, 0.0),
        new THREE.Vector3(84.0, 5.00, 0.0),
     
      ]);
      var spline7 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(84.0, 5.0, 0.0),
        new THREE.Vector3(84.0, 7.0, 0.0),
     
      ]);
      var spline8 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(84.0, 7.0, 2.0),
        new THREE.Vector3(84.0, 5.0, 2.0),
     
      ]);
      var spline9 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(84.0, 5.0, 2.0),
        new THREE.Vector3(84.0, 4.95, 2.0),
     
      ]);
      var spline10 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(84.0, 4.95, 2.0),
        new THREE.Vector3(84.0, 2.00, 2.0),
     
      ]);
  
      var geomCamino1 = new THREE.BufferGeometry().setFromPoints(spline1.getPoints(100));
       
      var matCamino = new THREE.LineBasicMaterial({color: 0xff0000});
      this.camino1 = new THREE.Line(geomCamino1, matCamino);
  
      var that = this;
      var origen = {x: 0.0, y: 0.0};
      var destino = {x: 1.0, y: 0.0};
      this.movimiento1 = new TWEEN.Tween(origen).to(destino, 4000)
         .onStart(function (){
           that.nave1.zoom.play();
           document.getElementById("inicio").className = "hidden";
         })
         .easing(TWEEN.Easing.Quadratic.In)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline1.getPointAt(origen.x);
            that.nave2.position.copy(posicion);
         })
         .onComplete (function () {
            origen.x= 0.0;
            that.numero.scale.set(1,1,1);
            that.nave1.motor.play();
            that.nave1.motor.setDetune(-100);
      });
      this.movimiento2 = new TWEEN.Tween(origen).to(destino, 300)
         .easing(TWEEN.Easing.Quadratic.Out)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline2.getPointAt(origen.x);
            that.numero.position.copy(posicion);
         })
         .onComplete (function () {
            origen.x= 0.0;
            that.nave1.three.play();

      });
      this.movimiento3 = new TWEEN.Tween(origen).to(destino, 200)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline3.getPointAt(origen.x);
            that.numero.position.copy(posicion);
         })
         .onComplete (function () {
          origen.x= 0.0;
      });
      this.movimiento4 = new TWEEN.Tween(origen).to(destino, 500)
         .easing(TWEEN.Easing.Quadratic.In)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline4.getPointAt(origen.x);
            that.numero.position.copy(posicion);
         })
         .onComplete (function () {
          origen.x= 0.0;
          that.numeroloader = new THREE.TextureLoader().load('imagenes/2.png');
          that.numerotextura = new THREE.MeshBasicMaterial( {map: that.numeroloader, transparent: true});
          that.numero.material = that.numerotextura;

      });
      this.movimiento5 = new TWEEN.Tween(origen).to(destino, 300)
         .easing(TWEEN.Easing.Quadratic.Out)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline5.getPointAt(origen.x);
            that.numero.position.copy(posicion);
         })
         .onComplete (function () {
            origen.x= 0.0;
            that.nave1.two.play();

      });
      this.movimiento6 = new TWEEN.Tween(origen).to(destino, 200)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline6.getPointAt(origen.x);
            that.numero.position.copy(posicion);
         })
         .onComplete (function () {
          origen.x= 0.0;
      });
      this.movimiento7 = new TWEEN.Tween(origen).to(destino, 500)
         .easing(TWEEN.Easing.Quadratic.In)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline7.getPointAt(origen.x);
            that.numero.position.copy(posicion);
         })
         .onComplete (function () {
          origen.x= 0.0;
          that.numeroloader = new THREE.TextureLoader().load('imagenes/1.png');
          that.numerotextura = new THREE.MeshBasicMaterial( {map: that.numeroloader, transparent: true});
          that.numero.material = that.numerotextura;

      });
      this.movimiento8 = new TWEEN.Tween(origen).to(destino, 300)
         .easing(TWEEN.Easing.Quadratic.Out)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline8.getPointAt(origen.x);
            that.numero.position.copy(posicion);
         })
         .onComplete (function () {
            origen.x= 0.0;
            that.nave1.one.play();

      });
      this.movimiento9 = new TWEEN.Tween(origen).to(destino, 200)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline9.getPointAt(origen.x);
            that.numero.position.copy(posicion);
         })
         .onComplete (function () {
          origen.x= 0.0;
      });
      this.movimiento10 = new TWEEN.Tween(origen).to(destino, 500)
         .easing(TWEEN.Easing.Quadratic.In)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline10.getPointAt(origen.x);
            that.numero.position.copy(posicion);
         });
      this.movimientoExtra = new TWEEN.Tween(origen).to(destino, 250)
         .onComplete (function () {
          origen.x=0.0;
          that.remove(that.nave2);
          that.empezado = true;
          document.getElementById("hud").className = "";
          that.numero.scale.set(0,0);
          that.nave1.go.play();


      });
      this.movimiento11 = new TWEEN.Tween(origen).to(destino, 1000)
         .easing(TWEEN.Easing.Quadratic.In)
         .onUpdate (function () {
            that.nave1.numero.scale.x+=0.14;
            that.nave1.numero.scale.y+=0.14;
            that.nave1.numero.material.opacity-=0.025;
            that.nave1.numero.position.y+=THREE.MathUtils.randFloat(-0.1,0.1);
            that.nave1.numero.position.z+=THREE.MathUtils.randFloat(-0.1,0.1);
         })
         .onComplete (function () {
           that.nave1.remove(that.nave1.numero);
           that.nave1.musica.play();
      });

         this.movimiento1.chain(this.movimiento2);
         this.movimiento2.chain(this.movimiento3);
         this.movimiento3.chain(this.movimiento4);
         this.movimiento4.chain(this.movimiento5);
         this.movimiento5.chain(this.movimiento6);
         this.movimiento6.chain(this.movimiento7);
         this.movimiento7.chain(this.movimiento8);
         this.movimiento8.chain(this.movimiento9);
         this.movimiento9.chain(this.movimiento10);
         this.movimiento10.chain(this.movimientoExtra);
         this.movimientoExtra.chain(this.movimiento11);
         this.movimiento1.start();

  }
  
  
  initStats() {
  
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;
  }
  
  createCamera () {
    this.nave1.createCamera(this.renderer);
  }
  
  createGround () {
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (50,0.2,50);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.3);
    

    //var skyGroundLight = new THREE. HemisphereLight(0xaaaaff, 0xaaffaa) ;
    this.add(ambientLight);
    // La añadimos a la escena
    //this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.

    
    this.spotLight = new THREE.PointLight( 0xf6ca97);
    this.spotLight.position.set( -3500, 1200, 5000 );

    var textureSun = new THREE.TextureLoader().load('imagenes/sol.png');
    var textureFlare = new THREE.TextureLoader().load('imagenes/flare.png');
    var flareColor = new THREE.Color(0xffaacc);
    var lensflare = new Lensflare();

    lensflare.addElement( new LensflareElement( textureSun, 700, 0, flareColor ) );
    lensflare.addElement( new LensflareElement( textureFlare, 60, 0.6 ) );
    lensflare.addElement( new LensflareElement( textureFlare, 70, 0.7 ) );
    lensflare.addElement( new LensflareElement( textureFlare, 120, 0.9 ) );
    lensflare.addElement( new LensflareElement( textureFlare, 70, 1 ) );
    this.spotLight.add(lensflare);

    this.add (this.spotLight);
  }
  
  setLightIntensity (valor) {
    this.spotLight.intensity = valor;
  }
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer({alpha: true});
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.nave1.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.nave1.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.nave1.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  

  update () {
    
    if (this.contador == 0){
      var aux = this.velocidad*(210.15+ THREE.MathUtils.randFloat(0.2, 0.6));
      
      document.getElementById("velocidad").innerHTML = aux.toFixed(2);
    }

    //this.nave2.rotation.y += 0.015;
   

  if(this.loading == 0 ){
    if (this.noBorrado){
      var elem = document.getElementById("loading");
      elem.parentNode.removeChild(elem);
      this.noBorrado = false;
      document.getElementById("inicio").className = "velocidad";
    }

    if (this.activarVideos){
      this.panel1.play();
      this.meta.play();
      this.grada1.play();
      this.grada2.play();
      this.grada3.play();
      this.grada4.play();
      this.grada5.play();
      this.grada6.play();
      this.grada7.play();
      this.grada8.play();
      this.grada9.play();
      this.grada10.play();
      this.grada11.play();
      this.grada12.play();
      this.grada0.play();

      this.activarVideos = false;
    }
    if (this.stats) this.stats.update();
    
    if(this.preparar == true){
      this.nave1.prepararTrackBall();
      this.preparar = false;
    }
    
    

    if(this.empezado){

      document.getElementById("vuelta").innerHTML = this.vuelta;
      document.getElementById("minutos").innerHTML = this.minutos;
      document.getElementById("segundos").innerHTML = this.segundos;
      document.getElementById("milisegundos").innerHTML = this.milisegundos;
      document.getElementById("minutos2").innerHTML = this.minutos2;
      document.getElementById("segundos2").innerHTML = this.segundos2;
      document.getElementById("milisegundos2").innerHTML = this.milisegundos2;

      this.milisegundos += 16;
      if (this.milisegundos > 999){
        this.segundos += 1;
        this.milisegundos = 0;
      }
      if (this.segundos == 59){
        this.minutos +=1;
        this.segundos = 0;
      }

      this.milisegundos2 += 16;
      if (this.milisegundos2 > 999){
        this.segundos2 += 1;
        this.milisegundos2 = 0;
      }
      if (this.segundos2 == 59){
        this.minutos2 +=1;
        this.segundos2 = 0;
      }

      if(!this.explota){
        if(this.sobrecircuito){
          this.movimiento();
          this.nave1.inclinacionPorVirar(this.directions[37], this.directions[39]);
          this.nave1.movimientoChispa(this.directions);
        }

        this.nave1.acelerar(this.directions[32]);
        if(!this.directions[32]){
          this.velocidad = this.nave1.rozamiento(this.velocidad);
        }
        if(this.velocidad == 0){
          this.nave1.updateTrackBall();
          this.resetear = true;
        }else if(this.resetear == true){
          this.nave1.restartTrackBall();
          this.resetear = false;
          this.preparar = true;
        }else if(this.sobrecircuito){
          this.nave1.motor.play();
          this.nave1.motor.setDetune(this.velocidad*120 -100);
        }
        this.giro = this.nave1.rectificar(this.giro, this.turn);
        this.nave1.inclinacionPorGiro(this.giro);
        this.sobrecircuito = this.nave1.sobreSuelo(this.circuito1);
        this.choquefrontal = this.nave1.colisionFrontal(this.circuito1);
        this.choqueizquierda = this.nave1.colisionIzquierda(this.circuito1);
        this.choquederecha = this.nave1.colisionDerecha(this.circuito1);
        //this.boost = this.nave1.sobreCasilla(this.panel1);
        this.meta1 = this.nave1.sobreMeta(this.meta);
        var turbo = this.nave1.sobreCasilla(this.panel1);
        if(turbo && this.boost){this.sigueenturbo = true;}
        if(turbo && !this.boost){this.boost = true;}
        if(!turbo && this.boost){this.sigueenturbo = false; this.boost = false;}
        
        if(!this.sobrecircuito){
          this.nave1.motor.pause();
          this.nave1.derrape.pause();
          this.nave1.caer();
          this.explota = this.nave1.explotar(this.ciudad);
        }

        if(this.meta1 && this.vueltaDisponible){
          this.vuelta ++;
          this.vueltaDisponible=false;
          this.tiempos.push(this.minutos2, this.segundos2, this.milisegundos2);
          this.minutos2 = this.segundos2 = this.milisegundos2 = 0;
        }

        if(this.boost && !this.sigueenturbo){
          this.nave1.contador2 = 0;
          this.vueltaDisponible = true;
          
        }
        aux = this.velocidad*(210.15+ THREE.MathUtils.randFloat(0.001, 0.002));
        document.getElementById("velocidad").innerHTML = aux.toFixed(2);
        this.velocidad = this.nave1.boost(this.velocidad);
        


        if(this.choquefrontal){
          this.nave1.translateOnAxis(new THREE.Vector3(0,0,-1).normalize(), this.velocidad+0.2);
        }

        if(this.choqueizquierda){
          this.nave1.translateOnAxis(new THREE.Vector3(-1,0,0).normalize(), 1);
        }

        if(this.choquederecha){
          this.nave1.translateOnAxis(new THREE.Vector3(1,0,0).normalize(), 1);
        }

        if(!this.choquefrontal && !this.choquederecha && !this.choqueizquierda){
          this.nave1.choque.pause();
        }
        
        this.nave1.translateOnAxis(new THREE.Vector3(0,0,1).normalize(), this.velocidad);
        this.nave1.rotateOnAxis(new THREE.Vector3(0,1,0).normalize(), this.giro);
        if(this.directions[37] && this.sobrecircuito && !(this.directions[65] || this.directions[68])){
          this.nave1.translateOnAxis(new THREE.Vector3(1,0,0).normalize(), 0.3);
          
        }
        
        if(this.directions[39] && this.sobrecircuito && !(this.directions[65] || this.directions[68])){
          this.nave1.translateOnAxis(new THREE.Vector3(1,0,0).normalize(), -0.3);
        }
      }
      else{
        this.nave1.animacionExplotar();
      }
    }
  }else{
    this.loading -= 1;
    
    
  }

  if (this.start2){
      
    if(this.unavez){
      this.iniciarMovimiento();
      this.unavez = false;
    }
    TWEEN.update();
  }


    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }

  movimiento(){
  
    if(this.go){

      /*Todo lo que vaya hacia delante*/
      if(this.directions[32] == true){
        if(this.directions[65] == true){
          
          if(this.velocidad < 5){
            this.velocidad += 0.1;
          }
          this.turn = true;
          if(this.directions[37]){
            if(this.giro < 0.04){
              this.giro += 0.002;
            }
          }else{
            if(this.giro < 0.02){
              this.giro += 0.002;
              if(this.giro > 0.02){
                this.giro = 0.018;
              }
            }
          }

        }

        else if(this.directions[68] == true){
          
          if(this.velocidad < 5){
            this.velocidad += 0.1;
          }
          this.turn = true;
          if(this.directions[39]){
            if(this.giro > -0.04){
              this.giro -= 0.002;
            }
          }else{
            if(this.giro > -0.02){
              this.giro -= 0.002;
              if(this.giro < -0.02){
                this.giro = -0.018;
              }
            }
          }


        }

        else if(this.directions[65] == false & this.directions[68] == false){
          if(this.velocidad < 5){
            this.velocidad += 0.05;
          }
        }
      }

      /*Solo a izda*/
      else if(this.directions[65] == true){
        this.turn = true;
        if(this.directions[37]){
          if(this.giro < 0.04){
            this.giro += 0.002;
          }
        }else{
          if(this.giro < 0.02){
            this.giro += 0.002;
            if(this.giro > 0.02){
              this.giro = 0.018;
            }
          }
        }

      }

      /*Solo a dcha*/
      else if(this.directions[68] == true){
        this.turn = true;
        if(this.directions[39]){
          if(this.giro > -0.04){
            this.giro -= 0.002;
          }
        }else{
          if(this.giro > -0.02){
            this.giro -= 0.002;
            if(this.giro < -0.02){
              this.giro = -0.018;
            }
          }
        }
      }
    }
  }

  onKeyUp(event){
    
    if(event.keyCode == 32){
      this.directions[32] = false;
    }
    if(event.keyCode == 65){
      this.directions[65] = false;
    }
    if(event.keyCode == 68){
      this.directions[68] = false;
    }
    if(this.directions[32] == false && this.directions[65] == false && this.directions[68] == false){
      this.go = false;
    }
    if(this.directions[65] == false || this.directions[68] == false){
      this.turn = false;
    }
    if(event.keyCode == 37){
      this.directions[37] = false;
    }
    if(event.keyCode == 39){
      this.directions[39] = false;
    }

    
  }

  onKeyDown(event){
    
    if(event.keyCode == 32){
      this.directions[32] = true;
    }
    if(event.keyCode == 65){
      this.directions[65] = true;
    }
    if(event.keyCode == 68){
      this.directions[68] = true;
    }
    if(event.keyCode == 37){
      this.directions[37] = true;
    }
    if(event.keyCode == 39){
      this.directions[39] = true;
    }
    this.go = true;
  }

  onDocumentMouseDown(event){
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX/window.innerWidth)*2-1;
    mouse.y = - (event.clientY / window.innerHeight)*2+1;

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.nave1.camera);
    var pickedObjects = raycaster.intersectObject(this.nave2.modelo);
    if(pickedObjects.length == 0)
      var pickedObjects = raycaster.intersectObject(this.nave2.aleron);

    console.log(pickedObjects.length);
  
    if(pickedObjects.length > 0 && !this.start2){
      this.activarVideos = true;
      this.unavez = true;
      this.start2 = true;
    }
  }
  
}






/// La función   main
$(function () {

  
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'imagenes/stormydays_bk.jpg');
let texture_bk = new THREE.TextureLoader().load( 'imagenes/stormydays_ft.jpg');
let texture_up = new THREE.TextureLoader().load( 'imagenes/stormydays_up.jpg');
let texture_dn = new THREE.TextureLoader().load( 'imagenes/stormydays_dn.jpg');
let texture_rt = new THREE.TextureLoader().load( 'imagenes/stormydays_rt.jpg');
let texture_lf = new THREE.TextureLoader().load( 'imagenes/stormydays_lf.jpg');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
skybox.position.x+=1300;
skybox.position.z+=450;
scene.add( skybox );
  


  //ACELERAR
  window.addEventListener("keydown", (event)=> scene.onKeyDown(event));
  window.addEventListener("keyup", (event)=> scene.onKeyUp(event));
  window.addEventListener("mousedown", (event)=>scene.onDocumentMouseDown(event));
  
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});

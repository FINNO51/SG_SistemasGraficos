import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import { TrackballControls } from './libs/TrackballControls.js'
 
class firestingray extends THREE.Object3D {
  constructor() {
    super();
    
    this.inclinaciongiro = 0;
    this.inclinacionvirar = 0;
    this.chispamovida = 0;
    this.caida = 0;
    this.estacayendo = false;

    var that = this;
    this.modelo = new THREE.Object3D();
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load ('./models/firestingray/nave.mtl',
       function (materials) {
          objectLoader.setMaterials(materials);
          objectLoader.load('./models/firestingray/nave.obj',
             function (object) {
                that.modelo.add(object);
                object.recieveShadow = true;
                // modelo.rotateX(-Math.PI/2);
                // modelo.scale.set(0.3, 0.3, 0.3);
                // modelo.translateZ(-5);
                that.add(that.modelo);
             }, null, null);
       });

    this.modelo.aleron = new THREE.Object3D();
    var materialLoader2 = new MTLLoader();
    var objectLoader2 = new OBJLoader();
    materialLoader2.load ('./models/firestingray/aleron.mtl',
      function (materials2) {
          objectLoader2.setMaterials(materials2);
          objectLoader2.load('./models/firestingray/aleron.obj',
            function (object) {
                that.modelo.aleron.add(object);
                // modelo.rotateX(-Math.PI/2);
                // modelo.scale.set(0.3, 0.3, 0.3);
                // modelo.translateZ(-5);
                that.modelo.add(that.modelo.aleron);
            }, null, null);
      });
    
    this.modelo.position.y-=0.2;
    var chispasGeometry = new THREE.PlaneGeometry( 1, 1 );
    var chispasLoader = new THREE.TextureLoader().load('imagenes/chispas.png');
    var chispasTextura = new THREE.MeshBasicMaterial( {map: chispasLoader,side: THREE.BackSide, transparent: true});
    var explosionTextura = new THREE.MeshBasicMaterial( {map: chispasLoader, transparent: true});
    this.explosion = new THREE.Mesh( chispasGeometry, explosionTextura);
    this.explosion.scale.set(0,0,0);
    this.explosion.position.z+=0.7;
    this.contador = 0;
    this.contador2 = 100;
    this.totalx=0;
    this.totaly=0;
    this.totalz=0;
    this.fov = 40
    this.plane = new THREE.Mesh( chispasGeometry, chispasTextura);
    this.plane.position.z-=0.3;
    this.plane.position.y-=0.2;
    this.plane.material.opacity=0;
    this.add(this.plane);
    this.add(this.explosion);
    this.raycaster = new THREE.Raycaster(this.punto, new THREE.Vector3(0,-1,0).normalize(), 0,2);

    this.frente = new THREE.Raycaster(this.punto, new THREE.Vector3(0,0,1).normalize(), 0,6);
    this.izquierda = new THREE.Raycaster(this.punto, new THREE.Vector3(0.7,0,0.7).normalize(), 0,4);
    this.derecha = new THREE.Raycaster(this.punto, new THREE.Vector3(-0.7,0,0.7).normalize(), 0,4);

    this.reactorizq = new THREE.PointLight( 0x6f6cff,0,4);
    this.reactorizq.position.set( 0.27, 0.3, 0);
    this.add(this.reactorizq);
    this.reactorder = new THREE.PointLight( 0x6f6cff,0,4);
    this.reactorder.position.set( -0.27, 0.3, 0);
    this.add(this.reactorder);
    var fuegoGeometry = new THREE.PlaneGeometry( 1, 1 );
    var fuegoLoader = new THREE.TextureLoader().load('imagenes/fuego.png');
    var fuegoTextura = new THREE.MeshBasicMaterial( {map: fuegoLoader,side: THREE.BackSide, transparent: true});
    this.fuegoizq = new THREE.Mesh( fuegoGeometry, fuegoTextura);
    this.fuegoizq.scale.set(0,0,0);
    this.fuegoder = new THREE.Mesh( fuegoGeometry, fuegoTextura);
    this.fuegoder.scale.set(0,0,0);
    this.modelo.add(this.fuegoizq);
    this.fuegoizq.position.set( 0.27, 0.4, 0);
    this.modelo.add(this.fuegoder);
    this.fuegoder.position.set( -0.27, 0.4, 0);
    this.numerogeometry = new THREE.PlaneGeometry( 2, 1 );
    this.numeroloader = new THREE.TextureLoader().load('imagenes/go.png');
    this.numerotextura = new THREE.MeshBasicMaterial( {map: this.numeroloader, transparent: true});
    this.numero = new THREE.Mesh( this.numerogeometry, this.numerotextura);
    this.numero.position.z-=15;
    this.numero.position.y+=5;
    this.numero.position.x-=0.2;
    this.numero.scale.set(0,0,0);
    this.add(this.numero);

    
    
   
  }
  createCamera(renderer){
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 5, -20);
    // Y hacia dónde mira
    this.look = new THREE.Vector3(0,0,0);
    this.modelo.getWorldPosition(this.look);
    this.look.y += 3;
    this.add (this.camera);
    
    this.cameraControl = new TrackballControls (this.camera, renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    this.cameraControl.noPan = true;
    
    this.cameraControl.target = this.modelo.position;

    const listener = new THREE.AudioListener();
    this.camera.add(listener);
    var that = this;

    this.musica = new THREE.Audio(listener);
    const musicaLoader = new THREE.AudioLoader();
    musicaLoader.load('audio/musica.ogg', function(buffer){
      that.musica.setBuffer(buffer);
      that.musica.setLoop(true);
      that.musica.setVolume(0.5);
    });

    this.zoom = new THREE.Audio(listener);
    musicaLoader.load('audio/zoom.ogg', function(buffer){
      that.zoom.setBuffer(buffer);
      that.zoom.setLoop(false);
      that.zoom.setVolume(0.5);
    });

    this.three = new THREE.Audio(listener);
    musicaLoader.load('audio/three.ogg', function(buffer){
      that.three.setBuffer(buffer);
      that.three.setLoop(false);
      that.three.setVolume(0.5);
    });

    this.two = new THREE.Audio(listener);
    musicaLoader.load('audio/two.ogg', function(buffer){
      that.two.setBuffer(buffer);
      that.two.setLoop(false);
      that.two.setVolume(0.5);
    });

    this.one = new THREE.Audio(listener);
    musicaLoader.load('audio/one.ogg', function(buffer){
      that.one.setBuffer(buffer);
      that.one.setLoop(false);
      that.one.setVolume(0.5);
    });

    this.go = new THREE.Audio(listener);
    musicaLoader.load('audio/go.ogg', function(buffer){
      that.go.setBuffer(buffer);
      that.go.setLoop(false);
      that.go.setVolume(0.6);
    });

    this.motor = new THREE.Audio(listener);
    musicaLoader.load('audio/motor.ogg', function(buffer){
      that.motor.setBuffer(buffer);
      that.motor.setLoop(true);
      that.motor.setVolume(0.1);
    });
    this.derrape = new THREE.Audio(listener);
    musicaLoader.load('audio/derrape.ogg', function(buffer){
      that.derrape.setBuffer(buffer);
      that.derrape.setLoop(true);
      that.derrape.setVolume(0.1);
    });
    this.explotion = new THREE.Audio(listener);
    musicaLoader.load('audio/explosion.ogg', function(buffer){
      that.explotion.setBuffer(buffer);
      that.explotion.setLoop(false);
      that.explotion.setVolume(0.5);
    });
    this.gameover = new THREE.Audio(listener);
    musicaLoader.load('audio/gameover.ogg', function(buffer){
      that.gameover.setBuffer(buffer);
      that.gameover.setLoop(false);
      that.gameover.setVolume(0.5);
    });
    this.choque = new THREE.Audio(listener);
    musicaLoader.load('audio/choque.ogg', function(buffer){
      that.choque.setBuffer(buffer);
      that.choque.setLoop(true);
      that.choque.setVolume(0.2);
    });

  }

  updateTrackBall(){
    
    // Debe orbitar con respecto al punto de mira de la cámara
    this.look = new THREE.Vector3(0,0,0);
    this.modelo.getWorldPosition(this.look);
    this.look.y += 3;
    this.cameraControl.target = this.modelo.position;
    this.cameraControl.update();
    this.camera.lookAt(this.look);
    
  }

  restartTrackBall(){
    this.cameraControl.reset();
    this.look = new THREE.Vector3(0,0,0);
    this.modelo.getWorldPosition(this.look);
    this.look.y += 3;
    this.camera.lookAt(this.look);

  }

  prepararTrackBall(){

    this.modelo.getWorldPosition(this.look);
    this.look.y += 3;
    this.camera.lookAt(this.look);
    this.cameraControl.target = this.modelo.position;
    
  }

    getCamera(){
        return this.camera;
    }

    rozamiento(velocidad){
        if(velocidad > 0){
            velocidad-=0.05;
        }
        if(velocidad <= 0){
            velocidad = 0;
        }
        return velocidad;
    }

    rectificar(giro, turn){
        if(!turn){
            if(giro > 0){
                giro-=0.01;
            }
            if(giro < 0){
                giro+=0.01;
            }
            if(giro <= 0.01 && giro >= -0.01){
                giro = 0;
            }
        }
        return giro;
    }


  
  
    inclinacionPorGiro(giro){
      if(giro != 0 && !this.estacayendo){
          if(giro > 0 && this.inclinaciongiro < 0.3){
            this.modelo.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), -0.03);
            this.explosion.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), -0.03);
            if(this.camera.position.x >= -2.5)
              this.camera.position.x -= 0.25;
            this.modelo.getWorldPosition(this.look);
            this.look.y += 3;
            this.camera.lookAt(this.look);
            this.inclinaciongiro+=0.05;
            this.modelo.aleron.rotateOnAxis(new THREE.Vector3(0,1,0).normalize(), -0.08);
          }
          if(giro < 0 && this.inclinaciongiro > -0.3){
            this.modelo.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.03);
            this.explosion.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.03);
            if(this.camera.position.x <= 2.5)
              this.camera.position.x += 0.25;
            this.modelo.getWorldPosition(this.look);
            this.look.y += 3;
            this.camera.lookAt(this.look);
            this.inclinaciongiro-=0.05;
            this.modelo.aleron.rotateOnAxis(new THREE.Vector3(0,1,0).normalize(), 0.08);
          }

      }else{
          if(this.inclinaciongiro < 0){
            this.modelo.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), -0.03);
            this.explosion.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), -0.03);
            if(this.camera.position.x != 0){
              this.camera.position.x -= 0.25;
              if(this.camera.position.x > -0.0001 && this.camera.position.x < 0.0001)
                this.camera.position.x = 0;
            }
            this.modelo.getWorldPosition(this.look);
            this.look.y += 3;
            this.camera.lookAt(this.look);
            this.inclinaciongiro+=0.05;
            this.modelo.aleron.rotateOnAxis(new THREE.Vector3(0,1,0).normalize(), -0.08);
          }
          if(this.inclinaciongiro > 0){
            this.modelo.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.03);
            this.explosion.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.03);
            if(this.camera.position.x != 0){
              this.camera.position.x += 0.25;
              if(this.camera.position.x > -0.0001 && this.camera.position.x < 0.0001)
                this.camera.position.x = 0;
            }
            this.modelo.getWorldPosition(this.look);
            this.look.y += 3;
            this.camera.lookAt(this.look);
            this.inclinaciongiro-=0.05;
            this.modelo.aleron.rotateOnAxis(new THREE.Vector3(0,1,0).normalize(), 0.08);
        }

      }


  }

  inclinacionPorVirar(izquierda, derecha){
    if(izquierda || derecha){
      if(izquierda && this.inclinacionvirar < 0.2){
        this.modelo.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), -0.02);
        this.explosion.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), -0.02);
        this.inclinacionvirar+=0.05;
      }
      if(derecha && this.inclinacionvirar > -0.2){
        this.modelo.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.02);
        this.explosion.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.02);
        this.inclinacionvirar-=0.05;
      }
    }else{
      if(this.inclinacionvirar < 0){
        this.modelo.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), -0.02);
        this.explosion.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), -0.02);
        this.inclinacionvirar+=0.05;
      }
      if(this.inclinacionvirar > 0){
        this.modelo.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.02);
        this.explosion.rotateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.02);
        this.inclinacionvirar-=0.05;
      }
    }
  }


  movimientoChispa(direcciones){
    this.plane.scale.set(THREE.MathUtils.randFloat(0.5,1.5),THREE.MathUtils.randFloat(0.5,1.5),THREE.MathUtils.randFloat(0.5,1.5));
    this.plane.rotation.z+=THREE.MathUtils.randFloat(0.5,1.5);
    if(direcciones[37] && direcciones[65] && this.chispamovida == 0){
      this.plane.position.x+=1.3;
      this.plane.material.opacity=1;
      this.chispamovida = 1;
      this.derrape.play();
      this.derrape.setDetune(4000);
    }
    if(direcciones[39] && direcciones[68] && this.chispamovida == 0){
      this.plane.position.x-=1.3;
      this.plane.material.opacity=1;
      this.chispamovida = -1;
      this.derrape.play();
      this.derrape.setDetune(5000);
    }

    if((!direcciones[37] || !direcciones[65]) && this.chispamovida == 1){
      this.plane.position.x-=1.3;
      this.plane.material.opacity=0;
      this.chispamovida = 0;
      this.derrape.pause();
    }

    if((!direcciones[39] || !direcciones[68]) && this.chispamovida == -1){
      this.plane.position.x+=1.3;
      this.plane.material.opacity=0;
      this.chispamovida = 0;
      this.derrape.pause();
    }
  }

  sobreSuelo(circuito){
    this.punto = new THREE.Vector3(0,0,0);
    this.modelo.getWorldPosition(this.punto);
    this.raycaster.set(this.punto, new THREE.Vector3(0,-1,0).normalize());
    var estatocando = this.raycaster.intersectObject(circuito,true);
    if (estatocando.length != 0){
      estatocando = true;
    }else{
      estatocando = false;
    }
    return estatocando;
  }

  sobreCasilla(casilla){
    this.punto = new THREE.Vector3(0,0,0);
    this.modelo.getWorldPosition(this.punto);
    this.raycaster.set(this.punto, new THREE.Vector3(0,-1,0).normalize());
    var estatocando = this.raycaster.intersectObject(casilla,true);
    if (estatocando.length != 0){
      estatocando = true;
    }else{
      estatocando = false;
    }
    return estatocando;
  }

  sobreMeta(meta){
    this.punto = new THREE.Vector3(0,0,0);
    this.modelo.getWorldPosition(this.punto);
    this.raycaster.set(this.punto, new THREE.Vector3(0,-1,0).normalize());
    var estatocando = this.raycaster.intersectObject(meta,true);
    if (estatocando.length != 0){
      estatocando = true;
    }else{
      estatocando = false;
    }
    return estatocando;
  }

  colisionFrontal(circuito){
    var direccion = new THREE.Vector3(0,0,0);
    this.modelo.getWorldDirection(direccion);
    this.frente.set(this.punto, direccion);
    var estatocando = this.frente.intersectObject(circuito,true);
    if (estatocando.length != 0){
      estatocando = true;
      this.choque.play();
      this.choque.setDetune(-1800);
    }else{
      estatocando = false;
    }
    return estatocando;

  }

  colisionIzquierda(circuito){
    var direccion = new THREE.Vector3(0,0,0);
    this.modelo.getWorldDirection(direccion);
    direccion.applyAxisAngle(new THREE.Vector3(0,1,0), Math.PI/3);
    this.izquierda.set(this.punto, direccion);
    var estatocando = this.izquierda.intersectObject(circuito,true);
    if (estatocando.length != 0){
      estatocando = true;
      this.choque.play();
      this.choque.setDetune(-1800);
    }else{
      estatocando = false;
    }
    return estatocando;

  }

  colisionDerecha(circuito){
    var direccion = new THREE.Vector3(0,0,0);
    this.modelo.getWorldDirection(direccion);
    direccion.applyAxisAngle(new THREE.Vector3(0,1,0), -Math.PI/3);
    this.derecha.set(this.punto, direccion);
    var estatocando = this.derecha.intersectObject(circuito,true);
    if (estatocando.length != 0){
      estatocando = true;
      this.choque.play();
      this.choque.setDetune(-1800);
    }else{
      estatocando = false;
    }
    return estatocando;

  }

  caer(){
    this.estacayendo = true;
    this.plane.scale.set(0,0,0);
    this.reactorizq.intensity=0;
    this.reactorder.intensity=0;
    this.fuegoizq.scale.set(0,0,0);
    this.fuegoder.scale.set(0,0,0);
    this.modelo.translateOnAxis(new THREE.Vector3(0,1,0).normalize(), -this.caida);
    this.explosion.translateOnAxis(new THREE.Vector3(0,1,0).normalize(), -this.caida);
    this.caida += 0.1;
  }

  explotar(ciudad){
    var direccion = new THREE.Vector3(0,0,0);
    this.modelo.getWorldDirection(direccion);
    this.frente.set(this.punto, direccion);
    this.frente.far= 10;
    var estatocando = this.frente.intersectObject(ciudad,true);
    this.punto = new THREE.Vector3(0,0,0);
    this.modelo.getWorldPosition(this.punto);
    this.raycaster.set(this.punto, new THREE.Vector3(0,-1,0).normalize());
    this.raycaster.far= 10;
    if(estatocando.length == 0){
      var estatocando = this.raycaster.intersectObject(ciudad,true);
    }
    if(estatocando.length != 0 || this.caida > 10){
      estatocando = true;
    }
    else{
      estatocando = false;
    }
    return estatocando;
  }

  boost(velocidad){
    if(this.contador2 < 60){
      if(this.contador2 <10){
        this.camera.fov+=2;
        this.camera.updateProjectionMatrix();
        this.camera.position.y-=0.1;
        velocidad+=0.3;
      }
      var intensidadLuz = THREE.MathUtils.randFloat(8,13);
      this.reactorizq.intensity=intensidadLuz*2;
      this.reactorder.intensity=intensidadLuz*2;
      this.fuegoizq.scale.set(intensidadLuz/4,intensidadLuz/4,intensidadLuz/4);
      this.fuegoder.scale.set(intensidadLuz/4,intensidadLuz/4,intensidadLuz/4);
      var cambiox=THREE.MathUtils.randFloat(-0.1,0.1);
      var cambioy=THREE.MathUtils.randFloat(-0.1,0.1);
      var cambioz=THREE.MathUtils.randFloat(-0.1,0.1);
      
      this.camera.position.x+=cambiox;
      this.camera.position.y+=cambioy;
      this.camera.position.z+=cambioz;
      this.totalx+=cambiox;
      this.totaly+=cambioy;
      this.totalz+=cambioz;
      this.contador2 += 1;
      if(this.contador2 ==60 ){
        this.camera.position.x -= this.totalx;
        this.camera.position.y -= this.totaly;
        this.camera.position.z -= this.totalz;
        this.totalx=0;
        this.totaly=0;
        this.totalz=0;
      }
    }else if(this.contador2 < 70){
      this.camera.fov-=2;
      this.camera.updateProjectionMatrix();
      this.camera.position.y+=0.1;
      this.contador2 += 1;
      velocidad -= 0.3;
    }

    return velocidad;
  }

  animacionExplotar(){
    if(this.contador < 30){
      if(this.contador == 1){
        this.musica.pause();
        this.explotion.play();
        this.modelo.scale.set(0,0,0);
      }
      this.explosion.scale.x+=4;
      this.explosion.scale.y+=4;
      this.explosion.scale.z+=4;
      this.explosion.material.opacity-=0.04;
      var direccion = new THREE.Vector3(0,0,0);
      this.camera.getWorldPosition(direccion);
      this.explosion.lookAt(direccion.x, direccion.y, direccion.z);
      this.camera.position.x+=THREE.MathUtils.randFloat(-1,1);
      this.camera.position.y+=THREE.MathUtils.randFloat(-1,1);
      this.camera.position.z+=THREE.MathUtils.randFloat(-1,1);
      this.contador += 1;
      document.getElementById("hud").className = "hidden";
    }else if(this.contador <=100){
      this.contador += 1;
    }

    if(this.contador == 100){
      this.gameover.play();
      this.contador = 101;
    }
   
  }

  acelerar(acelera){
    if(acelera){
      var intensidadLuz = THREE.MathUtils.randFloat(3,6);
      this.reactorizq.intensity=intensidadLuz;
      this.reactorder.intensity=intensidadLuz;
      this.fuegoizq.scale.set(intensidadLuz/4,intensidadLuz/4,intensidadLuz/4);
      this.fuegoder.scale.set(intensidadLuz/4,intensidadLuz/4,intensidadLuz/4);
    }else{
      this.reactorizq.intensity=0;
      this.reactorder.intensity=0;
      this.fuegoizq.scale.set(0,0,0);
      this.fuegoder.scale.set(0,0,0);
    }
  }
} 

  




export { firestingray };

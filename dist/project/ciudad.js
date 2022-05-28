import * as THREE from './libs/three.module.js'
import {MTLLoader} from './libs/MTLLoader.js'
import {OBJLoader} from './libs/OBJLoader.js'


class Ciudad extends THREE.Object3D {
   constructor() {
      super();
      var that = this;
      this.modelo = new THREE.Object3D();
      var materialLoader = new MTLLoader();
      var objectLoader = new OBJLoader();
      materialLoader.load ('./models/ciudad/material.mtl',
         function (materials) {
            objectLoader.setMaterials(materials);
            objectLoader.load('./models/ciudad/my_city_0.obj',
               function (object) {
                  object.castShadow = true;
                  that.modelo.add(object);
                  that.modelo.scale.set(10, 10, 10);
                  that.add(that.modelo);
               }, null, null);
         });

   }
}


export {Ciudad};
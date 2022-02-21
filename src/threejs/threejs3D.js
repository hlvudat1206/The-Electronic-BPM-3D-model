import React, { Component } from 'react'


import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let  mixer, light, model, model2, renderer;
export default class ThreeScene2 extends Component {
    constructor(props) {
      super(props);
      
    }
    
    componentDidMount(){
        // create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x4caca5
        );

        // create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
        // create rendering
      const renderer = new THREE.WebGL1Renderer({
        canvas: document.querySelector("#bg"),
      });
      renderer.toneMapping = THREE.ReinhardToneMapping; //use toneMapping
      renderer.toneMappingExposure = 2.3;
      renderer.shadowMap.enabled = true;

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.set(10, 2, 0);
      renderer.render(scene, camera);
      
      
      // create light
      const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820,4); // anh sang truc tiep tu canh, su dung 2 mau nau pale orange for sky and gray for ground 
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      light = new THREE.SpotLight(0xffa95c,4); //The sun
      light.position.set(-50,50,50);
      light.castShadow = true;
      scene.add( light );

      light.shadow.bias = -0.0001;
      light.shadow.mapSize.width = 1024*4;
      light.shadow.mapSize.height = 1024*4;

    const gray_color = new THREE.Color(0x57554f);
    const yellow_color = new THREE.Color(0xe0c53a);
     
      //import glb file
      const loader2 = new GLTFLoader();
      loader2.load("./Room103.glb", function (gltf) {
        console.log('in ra:', gltf);
        console.log('in ra children22: ',gltf.scene.children[0]);
        model = gltf.scene.children[0];
        model.traverse(n => { if ( n.isMesh ) {
          n.castShadow = true; 
          n.receiveShadow = true;
          if(n.material.map) n.material.map.anisotropy = 16; 
        }});

        gltf.scene.position.set(0,0,0);
        gltf.scene.scale.set(2.8, 2.8, 2.8);

        scene.add( gltf.scene );

      })

      const loader4 = new GLTFLoader();
      loader2.load("./baodo4.glb", function (gltf) {
        console.log('in ra:', gltf);
        console.log('in ra children22: ',gltf.scene.children[0]);
        model = gltf.scene.children[0];
        model.traverse(n => { if ( n.isMesh ) {
          n.castShadow = true; 
          n.receiveShadow = true;
          if(n.material.map) n.material.map.anisotropy = 16; 
        }});

        gltf.scene.position.set(2,2.2,2);
        gltf.scene.scale.set(0.9, 0.9, 0.9);

        scene.add( gltf.scene );

      })

      const loader3 = new GLTFLoader();
      loader3.load("./boyring5.glb", function (gltf) {
        console.log('in ra boyboy: ',gltf.scene);
        model2 = gltf.scene;
        model2.traverse(n => { if ( n.isMesh ) {
          n.castShadow = true; 
          n.receiveShadow = true;
          if(n.material.map) n.material.map.anisotropy = 16; 
        }});

        gltf.scene.position.set(4,0,2);
        gltf.scene.scale.set(1.8, 1.8, 1.8);

        scene.add( gltf.scene );
      })

      const loader = new GLTFLoader();
      loader.load("./huyetap22.glb", function (gltf) {
        console.log('in ra:', gltf);
        console.log('in ra children: ',gltf.scene.children[6]);

        gltf.scene.traverse( c =>{
          c.castShadow = true;
        });

        mixer = new THREE.AnimationMixer( gltf.scene );
        
        gltf.animations.forEach( ( clip ) => {
          
            mixer.clipAction( clip ).play();
          
        } );
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        gltf.scene.position.set(0,1.8,3);

        let object = gltf.scene.children[6];
        scene.add( gltf.scene );

      } );
      const controls = new OrbitControls(camera, renderer.domElement);
      
 
      function animate() {
        requestAnimationFrame(animate);

        light.position.set( 
          camera.position.x + 10,
          camera.position.y + 10,
          camera.position.z + 10,
        );
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.0;
        // hoverPieces();

        controls.update();
        renderer.render(scene, camera);
      }
  
      animate();

      
      function render() {
				requestAnimationFrame(render);
				// update the mmi
				
				renderer.render(scene, camera);
            // calculate objects intersecting the picking ray

            renderer.render( scene, camera );

          }       
          window.requestAnimationFrame(render)
			
			render();
      

      
    }
    render() {
        
      return (
          <div>
          <canvas id="bg">
            
          </canvas>
          
          </div>
      )
    }
  
}
  
    
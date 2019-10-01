import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/108/three.module.js';
import { easeIn, easeOut } from './Ease.js';

export default class Smoke {
  constructor() {
    const geometry = new THREE.IcosahedronGeometry(Math.random() * (0.5 - 0.2) + 0.2, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, flatShading: true })
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
    this.mesh.position.set(0, 0, 0);

    this.listeners = [];
    this.startTime = null;
    this.animationTime = 1;
  }

  onAnimationEnd(fn) {
    this.listeners.push(fn)
  }

  update(time) {
    if(!this.startTime) this.startTime = time;
    
    const elapsedTime = time - this.startTime;

    if (elapsedTime <= 0.5) {
      const factor = easeOut(elapsedTime/0.5)    
      this.mesh.scale.set(factor,factor,factor)
    } else if (elapsedTime >= 0.7) {
      const factor = easeIn((elapsedTime - 0.7) /0.3)    
      this.mesh.scale.set(1- factor, 1-factor, 1-factor)
    } else {
      this.mesh.scale.set(1,1,1)
    }

    if(elapsedTime >= this.animationTime) this.listeners.forEach(fn => fn())
  }

  reset() {
    this.mesh.position.set(0, 0, 0);
    this.mesh.scale.set(1, 1, 1);
    this.listeners = [];
    this.startTime = null;
  }
}
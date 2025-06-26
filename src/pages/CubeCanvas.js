import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const CubeCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.offsetWidth || window.innerWidth / 2;
    const height = mountRef.current.offsetHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('rgb(160,100,183)'),
      roughness: 0.5,
      metalness: 0.6,
    });

    const cubes = [];
    for (let i = 0; i < 5; i++) {
      const cube = new THREE.Mesh(geometry, material.clone());
      cube.position.set(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
      scene.add(cube);
      cubes.push(cube);
    }

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };

    animate();

    // Clean-up
    return () => {
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    ></div>
  );
};

export default CubeCanvas;

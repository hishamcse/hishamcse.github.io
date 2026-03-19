// ─── SHARED 3D BACKGROUND (subpages) ───
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = canvas.dataset.scene || 'particles';
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const threeScene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 6;

  const mouse = { x: 0, y: 0 };
  document.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.3;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function makeParticles(count, spread, colors, size) {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random()-0.5)*spread;
      pos[i*3+1] = (Math.random()-0.5)*spread;
      pos[i*3+2] = (Math.random()-0.5)*(spread*0.6);
      const c = colors[Math.floor(Math.random()*colors.length)];
      col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return new THREE.Points(geo, new THREE.PointsMaterial({
      size, vertexColors: true, transparent: true, opacity: 0.55, sizeAttenuation: true
    }));
  }

  function makeWire(geo, color, opacity) {
    return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color, wireframe: true, transparent: true, opacity
    }));
  }

  let objects = [];

  if (scene === 'education') {
    const c1=new THREE.Color('#4f8ef7'), c2=new THREE.Color('#7c3aed'), c3=new THREE.Color('#0d1117');
    const pts = makeParticles(1200, 18, [c1,c2,c3], 0.04);
    threeScene.add(pts); objects.push({mesh:pts,rx:0.04,ry:0.07});
    const dodec = makeWire(new THREE.DodecahedronGeometry(2.2,0), 0x4f8ef7, 0.05);
    threeScene.add(dodec); objects.push({mesh:dodec,rx:0.05,ry:0.09});
    const oct = makeWire(new THREE.OctahedronGeometry(3.5,0), 0x7c3aed, 0.04);
    threeScene.add(oct); objects.push({mesh:oct,rx:-0.03,ry:0.06});
    const ring = new THREE.Mesh(new THREE.TorusGeometry(4,0.007,4,90),
      new THREE.MeshBasicMaterial({color:0x4f8ef7,transparent:true,opacity:0.08}));
    ring.rotation.x = Math.PI/4; threeScene.add(ring); objects.push({mesh:ring,rx:0.02,ry:0.04});
  }
  else if (scene === 'skills') {
    const c1=new THREE.Color('#4f8ef7'), c2=new THREE.Color('#1a2133'), c3=new THREE.Color('#7c3aed');
    const pts = makeParticles(900, 20, [c1,c2,c3], 0.035);
    threeScene.add(pts); objects.push({mesh:pts,rx:0.02,ry:0.05});
    const cubeGeo = new THREE.BoxGeometry(1,1,1);
    for (let i=0; i<7; i++) {
      const cube = makeWire(cubeGeo, i%2===0?0x4f8ef7:0x7c3aed, 0.04+Math.random()*0.04);
      cube.position.set((Math.random()-0.5)*12,(Math.random()-0.5)*10,(Math.random()-0.5)*6);
      const s=0.5+Math.random()*2; cube.scale.set(s,s,s);
      cube._rs={x:(Math.random()-0.5)*0.005,y:(Math.random()-0.5)*0.008};
      threeScene.add(cube); objects.push({mesh:cube,custom:true});
    }
    const ico = makeWire(new THREE.IcosahedronGeometry(2.8,1), 0x4f8ef7, 0.035);
    threeScene.add(ico); objects.push({mesh:ico,rx:0.04,ry:0.08});
  }
  else if (scene === 'projects') {
    const c1=new THREE.Color('#4f8ef7'), c2=new THREE.Color('#7c3aed'), c3=new THREE.Color('#0d1a2e');
    const pts = makeParticles(1400, 20, [c1,c2,c3], 0.045);
    threeScene.add(pts); objects.push({mesh:pts,rx:0.025,ry:0.06});
    const t1 = makeWire(new THREE.TetrahedronGeometry(2,0), 0x4f8ef7, 0.06);
    threeScene.add(t1); objects.push({mesh:t1,rx:0.06,ry:0.1});
    const t2 = makeWire(new THREE.TetrahedronGeometry(3.5,0), 0x7c3aed, 0.04);
    t2.rotation.y=Math.PI; threeScene.add(t2); objects.push({mesh:t2,rx:-0.04,ry:-0.07});
    const torus = new THREE.Mesh(new THREE.TorusGeometry(4.5,0.006,4,100),
      new THREE.MeshBasicMaterial({color:0x4f8ef7,transparent:true,opacity:0.06}));
    torus.rotation.x=Math.PI/3; threeScene.add(torus); objects.push({mesh:torus,rx:0.01,ry:0.03});
  }
  else if (scene === 'experience') {
    const c1=new THREE.Color('#4f8ef7'), c2=new THREE.Color('#7c3aed');
    const pts = makeParticles(1100, 18, [c1,c2,new THREE.Color('#111')], 0.04);
    threeScene.add(pts); objects.push({mesh:pts,rx:0.03,ry:0.055});
    const knot = makeWire(new THREE.TorusKnotGeometry(2,0.4,80,8), 0x4f8ef7, 0.05);
    threeScene.add(knot); objects.push({mesh:knot,rx:0.04,ry:0.08});
    const sphere = makeWire(new THREE.SphereGeometry(3.8,12,8), 0x7c3aed, 0.03);
    threeScene.add(sphere); objects.push({mesh:sphere,rx:-0.02,ry:0.04});
  }
  else if (scene === 'publication') {
    const c1=new THREE.Color('#f0b429'), c2=new THREE.Color('#4f8ef7'), c3=new THREE.Color('#0d1117');
    const pts = makeParticles(1000, 18, [c1,c2,c3], 0.04);
    threeScene.add(pts); objects.push({mesh:pts,rx:0.02,ry:0.05});
    const oct1 = makeWire(new THREE.OctahedronGeometry(2.2,0), 0xf0b429, 0.06);
    threeScene.add(oct1); objects.push({mesh:oct1,rx:0.05,ry:0.09});
    const oct2 = makeWire(new THREE.OctahedronGeometry(3.8,1), 0x4f8ef7, 0.035);
    threeScene.add(oct2); objects.push({mesh:oct2,rx:-0.03,ry:-0.06});
    const ring = new THREE.Mesh(new THREE.TorusGeometry(4.2,0.007,4,80),
      new THREE.MeshBasicMaterial({color:0xf0b429,transparent:true,opacity:0.07}));
    ring.rotation.x=Math.PI/5; threeScene.add(ring); objects.push({mesh:ring,rx:0.01,ry:0.03});
  }
  else if (scene === 'connect') {
    const c1=new THREE.Color('#4f8ef7'), c2=new THREE.Color('#7c3aed');
    const pts = makeParticles(900, 16, [c1,c2,new THREE.Color('#0a0f18')], 0.04);
    threeScene.add(pts); objects.push({mesh:pts,rx:0.03,ry:0.06});
    const sphere = makeWire(new THREE.SphereGeometry(2.4,10,8), 0x4f8ef7, 0.05);
    threeScene.add(sphere); objects.push({mesh:sphere,rx:0.04,ry:0.07});
    const torus1 = new THREE.Mesh(new THREE.TorusGeometry(3.5,0.007,4,80),
      new THREE.MeshBasicMaterial({color:0x7c3aed,transparent:true,opacity:0.09}));
    torus1.rotation.x=Math.PI/4; threeScene.add(torus1); objects.push({mesh:torus1,rx:0.02,ry:0.04});
    const torus2 = new THREE.Mesh(new THREE.TorusGeometry(4.8,0.005,4,80),
      new THREE.MeshBasicMaterial({color:0x4f8ef7,transparent:true,opacity:0.05}));
    torus2.rotation.y=Math.PI/3; threeScene.add(torus2); objects.push({mesh:torus2,rx:-0.01,ry:0.03});
  }

  function animate() {
    requestAnimationFrame(animate);
    for (const obj of objects) {
      if (obj.custom) {
        obj.mesh.rotation.x += obj.mesh._rs.x;
        obj.mesh.rotation.y += obj.mesh._rs.y;
      } else {
        if (obj.rx) obj.mesh.rotation.x += obj.rx * 0.01;
        if (obj.ry) obj.mesh.rotation.y += obj.ry * 0.01;
      }
    }
    camera.position.x += (mouse.x*1.5 - camera.position.x)*0.02;
    camera.position.y += (mouse.y*1.5 - camera.position.y)*0.02;
    camera.lookAt(threeScene.position);
    renderer.render(threeScene, camera);
  }
  animate();
})();

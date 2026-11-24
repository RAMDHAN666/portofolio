import * as THREE from 'three';
import { Component, Suspense, memo, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { RoundedBox, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

const PHOTO_URL = '/foto-kartu.jpg';
const NAME_TEXT = 'Web Developer';
const ROLE_TEXT = 'STMIK Mardira Indonesia';

function makeLabelTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 160;
  const g = c.getContext('2d');
  g.fillStyle = '#0f172a';
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = '#ffffff';
  g.font = '700 38px Inter, Arial, sans-serif';
  g.textAlign = 'center';
  g.fillText(NAME_TEXT, 256, 72);
  g.fillStyle = '#a78bfa';
  g.font = '600 28px Inter, Arial, sans-serif';
  g.fillText(ROLE_TEXT, 256, 118);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeStrapTexture() {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 170;
  const g = c.getContext('2d');
  g.fillStyle = '#d81b2a';
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = '#ffffff';
  g.font = '700 62px Arial, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('STMIK MARDIRA INDONESIA', 512, 88);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function Band() {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const photo = useTexture(PHOTO_URL);
  const label = useMemo(() => makeLabelTexture(), []);
  const strap = useMemo(() => makeStrapTexture(), []);

  useMemo(() => {
    photo.colorSpace = THREE.SRGBColorSpace;
    const img = photo.image;
    if (img && img.width && img.height) {
      const target = 1.4 / 1.55;
      const aspect = img.width / img.height;
      if (aspect > target) {
        photo.repeat.set(target / aspect, 1);
        photo.offset.set((1 - target / aspect) / 2, 0);
      } else {
        photo.repeat.set(1, aspect / target);
        photo.offset.set(0, (1 - aspect / target) / 2);
      }
    }
  }, [photo]);

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered, dragged]);

  useFrame((state) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current && card.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => { (() => { try { e.target.releasePointerCapture(e.pointerId); } catch (err) {} })(); drag(false); }}
            onPointerDown={(e) => {
              (() => { try { e.target.setPointerCapture(e.pointerId); } catch (err) {} })();
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <RoundedBox args={[1.6, 2.25, 0.03]} radius={0.06} smoothness={4}>
              <meshStandardMaterial color="#1a1a3e" roughness={0.35} metalness={0.4} />
            </RoundedBox>
            <mesh position={[0, 0.3, 0.017]}>
              <planeGeometry args={[1.4, 1.55]} />
              <meshBasicMaterial map={photo} />
            </mesh>
            <mesh position={[0, -0.78, 0.017]}>
              <planeGeometry args={[1.4, 0.44]} />
              <meshBasicMaterial map={label} />
            </mesh>
            <mesh position={[0, 1.08, 0.017]}>
              <planeGeometry args={[0.35, 0.07]} />
              <meshBasicMaterial color="#8b5cf6" />
            </mesh>
            <mesh position={[0, 1.2, 0]}>
              <boxGeometry args={[0.28, 0.16, 0.06]} />
              <meshStandardMaterial color="#c4b5fd" metalness={0.9} roughness={0.25} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" useMap={1} map={strap} repeat={[-1.5, 1]} depthTest={false} resolution={[1000, 1000]} lineWidth={2.2} />
      </mesh>
    </>
  );
}

class LanyardBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err) { console.error('Lanyard error:', err); }
  render() { return this.state.failed ? null : this.props.children; }
}

function Lanyard() {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 640
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%',
        height: isMobile ? '460px' : '640px',
        position: 'relative',
        touchAction: 'pan-y'
      }}
    >
      <LanyardBoundary>
        <Canvas
          camera={{ position: [0, 0, isMobile ? 15 : 13], fov: 25 }}
          gl={{ alpha: true }}
          dpr={[1, 1.5]}
          style={{ touchAction: 'pan-y' }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />
          <directionalLight position={[-5, 2, 3]} intensity={1} color="#a78bfa" />
          <Suspense fallback={null}>
            <Physics gravity={[0, -40, 0]} timeStep={1 / 60} paused={!visible}>
              <Band />
            </Physics>
          </Suspense>
        </Canvas>
      </LanyardBoundary>
    </div>
  );
}

export default memo(Lanyard);

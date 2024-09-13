import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import SceneInit from "./lib/SceneInit";
import Planet from "./lib/Planet";
import Rotation from "./lib/Rotation";
// import SoundOn from "/assets/soundon.png";
// import SoundOff from "/assets/soundoff.png";
// import Limerence from "/assets/Limerence.mp3";

export default function Home() {
  //let gui;

  // const initGui = async () => {
  //   const dat = await import("dat.gui");
  //   gui = new dat.GUI();
  // };

  const [isPlaying, setIsPlaying] = useState(false); // Track if music is playing
  const musicRef = useRef(null); // Ref for audio element

  const toggleMusic = () => {
    if (isPlaying) {
      musicRef.current.pause();
    } else {
      musicRef.current.currentTime = 0; // Start from beginning
      musicRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(async () => {
    alert("You can turn on music by clicking the button on the top left.");
    // TODO: Understand this code later.
    let test = new SceneInit();
    test.initScene();
    test.animate();

    const sunGeometry = new THREE.SphereGeometry(8);
    const sunTexture = new THREE.TextureLoader().load("sun.jpeg");
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    const solarSystem = new THREE.Group();
    solarSystem.add(sunMesh);
    test.scene.add(solarSystem);

    const mercury = new Planet(2, 16, "mercury.png");
    const mercuryMesh = mercury.getMesh();
    let mercurySystem = new THREE.Group();
    mercurySystem.add(mercuryMesh);

    const venus = new Planet(3, 32, "venus.jpeg");
    const venusMesh = venus.getMesh();
    let venusSystem = new THREE.Group();
    venusSystem.add(venusMesh);

    const earth = new Planet(4, 48, "earth.jpeg");
    const earthMesh = earth.getMesh();
    let earthSystem = new THREE.Group();
    earthSystem.add(earthMesh);

    const mars = new Planet(3, 64, "mars.jpeg");
    const marsMesh = mars.getMesh();
    let marsSystem = new THREE.Group();
    marsSystem.add(marsMesh);

    solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem);

    const mercuryRotation = new Rotation(mercuryMesh);
    const mercuryRotationMesh = mercuryRotation.getMesh();
    mercurySystem.add(mercuryRotationMesh);
    const venusRotation = new Rotation(venusMesh);
    const venusRotationMesh = venusRotation.getMesh();
    venusSystem.add(venusRotationMesh);
    const earthRotation = new Rotation(earthMesh);
    const earthRotationMesh = earthRotation.getMesh();
    earthSystem.add(earthRotationMesh);
    const marsRotation = new Rotation(marsMesh);
    const marsRotationMesh = marsRotation.getMesh();
    marsSystem.add(marsRotationMesh);

    // NOTE: Add solar system mesh GUI.
    //await initGui();
    // const solarSystemGui = gui.addFolder("solar system");
    // solarSystemGui.add(mercuryRotationMesh, "visible").name("mercury").listen();
    // solarSystemGui.add(venusRotationMesh, "visible").name("venus").listen();
    // solarSystemGui.add(earthRotationMesh, "visible").name("earth").listen();
    // solarSystemGui.add(marsRotationMesh, "visible").name("mars").listen();

    // NOTE: Animate solar system at 60fps.
    const EARTH_YEAR = 2 * Math.PI * (1 / 55) * (1 / 55);
    const animate = () => {
      sunMesh.rotation.y += 0.001;
      mercurySystem.rotation.y += EARTH_YEAR * 4;
      venusSystem.rotation.y += EARTH_YEAR * 2;
      earthSystem.rotation.y += EARTH_YEAR;
      marsSystem.rotation.y += EARTH_YEAR * 0.5;
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="btnContainer">
        <button
          onClick={toggleMusic}
          // style={{ border: "none", background: "none", padding: 0 }}
        >
          <img
            src={isPlaying ? "/assets/soundoff.png" : "assets/soundon.png"}
            alt={isPlaying ? "Sound Off" : "Sound On"}
            width="28"
            height="25"
          />
        </button>
        <audio
          ref={musicRef}
          src="/assets/limerence.mp3"
          preload="auto"
          loop
        ></audio>
      </div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

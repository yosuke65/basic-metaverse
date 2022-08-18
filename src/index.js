import Movements from "./movements.js";
import blockchain from "./Web3.js";
import abi from "./abi/abi.json" assert { type: "json" };

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Setting the scene lights
const ambient_light = new THREE.AmbientLight(0xbda355);
const directional_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(directional_light);
scene.add(ambient_light);

// Setting up a flat space of the Metaverse
const geometry_space = new THREE.BoxGeometry(100, 0.2, 50);
const material_space = new THREE.MeshPhongMaterial({ color: 0xffffff });
const space = new THREE.Mesh(geometry_space, material_space);
scene.add(space);

// Geometric figure to be represented in the Metaverse: Cube
const geometry = new THREE.BoxGeometry();
const material_cube = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material_cube);
scene.add(cube);

// Geometric figure to be represented in the Metaverse: Cone
const geometry_cone = new THREE.ConeGeometry(5, 20, 32);
const material_cone = new THREE.MeshPhongMaterial({ color: 0xed810a });
const cone = new THREE.Mesh(geometry_cone, material_cone);
cone.position.set(-10, 5, 0);
scene.add(cone);

// Geometric figure to be represented in the Metaverse: Cylinder
const geometry_cylinder = new THREE.CylinderGeometry(5, 5, 5, 32);
const material_cylinder = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const cylinder = new THREE.Mesh(geometry_cylinder, material_cylinder);
cylinder.position.set(20, 5, 0);
scene.add(cylinder);

camera.position.set(10, 5, 40);

function animate() {
  // requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;
  cylinder.rotation.x += 0.05;
  // camera.position.x += 0.01;
  requestAnimationFrame(animate);

  // Movement to the left
  if (Movements.isPressed(37)) {
    camera.position.x -= 0.5;
  }

  // Upward Movement
  if (Movements.isPressed(38)) {
    camera.position.x += 0.5;
    camera.position.y += 0.5;
  }

  // Movement to the right
  if (Movements.isPressed(39)) {
    camera.position.x += 0.5;
  }

  // Downward Movement
  if (Movements.isPressed(40)) {
    camera.position.x -= 0.5;
    camera.position.y -= 0.5;
  }

  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
animate();

// Mint new NFT
const buttonMint = document.getElementById("mint");
buttonMint.addEventListener("click", mintNFT);

function mintNFT() {
  var nft_name = document.getElementById("nft_name").value;
  var nft_width = document.getElementById("nft_width").value;
  var nft_height = document.getElementById("nft_height").value;
  var nft_depth = document.getElementById("nft_depth").value;
  var nft_x = document.getElementById("nft_x").value;
  var nft_y = document.getElementById("nft_y").value;
  var nft_z = document.getElementById("nft_z").value;

  if (typeof window.ethereum === "undefined") {
    rej("MetaMask is not installed: You should install Metamask to use it");
  }

  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0x3da6C1dE25BEEbB899aCF19EA5Df9d4BC8259cfe"
  );

  console.log("Minting NFT...");
  console.log(
    "NFT name: " + nft_name,
    "NFT width: " + nft_width,
    "NFT height: " + nft_height,
    "NFT depth: " + nft_depth,
    "NFT x: " + nft_x,
    "NFT y: " + nft_y,
    "NFT z: " + nft_z
  );

  web3.eth.getAccounts().then((accounts) => {
    console.log("Accounts: ", accounts);
    contract.methods
      .mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z)
      .send({
        from: accounts[0],
      })
      .then((data) => {
        console.log("NFT available in the Metaverse");
      });
  });
}

// web3 connection to the data generated in the blockchain to be represented in the Metaverse
blockchain.then((result) => {
  // For each building paid for in the Smart Contract,
  // a graphical representation is created in the Metaverse
  result.building.forEach((building, index) => {
    if (index <= result.supply) {
      const boxGeometry = new THREE.BoxGeometry(
        building.w,
        building.h,
        building.d
      );
      const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x33fffc });
      const nft = new THREE.Mesh(boxGeometry, boxMaterial);
      nft.position.set(building.x, building.y, building.z);
      scene.add(nft);
    }
  });
});

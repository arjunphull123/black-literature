import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Group, Scene } from 'three'

//Data
const data = {
  1985: 0.0072,
  1986: 0.006,
  1987: 0.01,
  1988: 0.013,
  1989: 0.012,
  1990: 0.0102,
  1991: 0.0175,
  1992: 0.020888889,
  1993: 0.016444444,
  1994: 0.018222222,
  1995: 0.022222222,
  1996: 0.020444444,
  1997: 0.0176,
  1998: 0.0192,
  1999: 0.0164,
  2000: 0.017454545,
  2001: 0.018,
  2002: 0.021904762,
  2003: 0.0246875,
  2004: 0.035357143,
  2005: 0.026785714,
  2006: 0.029,
  2007: 0.025666667,
  2008: 0.027666667,
  2009: 0.027666667,
  2010: 0.03,
  2011: 0.023235294,
  2012: 0.019166667,
  2013: 0.0215625,
  2014: 0.024285714,
  2015: 0.031764706,
  2016: 0.027647059,
  2017: 0.035675676,
  2018: 0.058120587,
  2019: 0.057668712,
  2020: 0.075340481,
  2021: 0.091917129
}

//Whole Data
const wholeData = {
  1985: ['2,500', '18', 0.7],
  1986: ['3,000', '18', 0.6],
  1987: ['3,000', '30', 1.0],
  1988: ['3,000', '39', 1.3],
  1989: ['4,000', '48', 1.2],
  1990: ['5,000', '51', 1.0],
  1991: ['4,000', '70', 1.8],
  1992: ['4,500', '94', 2.1],
  1993: ['4,500', '74', 1.6],
  1994: ['4,500', '82', 1.8],
  1995: ['4,500', '100', 2.2],
  1996: ['4,500', '92', 2.0],
  1997: ['5,000', '88', 1.8],
  1998: ['5,000', '96', 1.9],
  1999: ['5,000', '82', 1.6],
  2000: ['5,500', '96', 1.7],
  2001: ['5,500', '99', 1.8],
  2002: ['3,150', '69', 2.2],
  2003: ['3,200', '79', 2.5],
  2004: ['2,800', '99', 3.5],
  2005: ['2,800', '75', 2.7],
  2006: ['3,000', '87', 2.9],
  2007: ['3,000', '77', 2.6],
  2008: ['3,000', '83', 2.8],
  2009: ['3,000', '83', 2.8],
  2010: ['3,400', '102', 3.0],
  2011: ['3,400', '79', 2.3],
  2012: ['3,600', '69', 1.9],
  2013: ['3,200', '69', 2.2],
  2014: ['3,500', '85', 2.4],
  2015: ['3,400', '108', 3.2],
  2016: ['3,400', '94', 2.8],
  2017: ['3,700', '132', 3.6],
  2018: ['3,682', '214', 5.8],
  2019: ['4,075', '235', 5.8],
  2020: ['3,451', '260', 7.5],
  2021: ['3,427', '315', 9.2]
}

//Scene
const scene = new THREE.Scene()
const loader = new GLTFLoader()
loader.setPath('/assets/')

const axesHelper = new THREE.AxesHelper(10)
//scene.add(axesHelper)

const gridHelper = new THREE.GridHelper(10, 10)
//scene.add(gridHelper)

let scaleFactor = 22

function loadPencil(year) {
  // load middle
  const middle = new THREE.Group()
  middle.position.set(0.0031*scaleFactor, 0, 0)
  middle.rotateY(-3.14159/2)
  
  loader.load('Middle.gltf', function( gltf ) {
    gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor)
    gltf.scene.translateZ(-0.02915*scaleFactor)
    middle.add(gltf.scene)
  })

  // load tip
  const tip = new THREE.Group()
  tip.position.set(0, 0, 0)
  tip.rotateY(-3.14159/2)
  
  loader.load('Tip.gltf', function( gltf ) {
    gltf.scene.translateZ(-0.10215*scaleFactor)
    gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor)
    tip.add(gltf.scene)
  })

  // load eraser
  const eraser = new THREE.Group()
  eraser.position.set(0, 0, 0)
  eraser.rotateY(-3.14159/2)
  
  loader.load('Eraser.gltf', function( gltf ) {
    gltf.scene.translateZ(0.0245*scaleFactor)
    gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor)
    eraser.add(gltf.scene)
  })

  scene.add(tip)
  scene.add(eraser)
  scene.add(middle)

  const wholePencil = new THREE.Group()
  wholePencil.name = year
  wholePencil.add(eraser)
  wholePencil.add(tip)
  wholePencil.add(middle)
  wholePencil.middle = middle
  scene.add(wholePencil)
  wholePencil.rotateY(-3.14159)
    

  const pencil = [year, tip, middle, eraser, wholePencil]

  return pencil
}

class Pencil {
  constructor([year, tip, middle, eraser, whole]) {
    this.year = year
    this.tip = tip
    this.middle = middle
    this.eraser = eraser
    this.whole = whole
    this.zPos = (1.15 * 0.0106 * scaleFactor) * (this.year - 2003)
  }
}

// Initialize Pencils
const p1985 = new Pencil(loadPencil(1985))
const p1986 = new Pencil(loadPencil(1986))
const p1987 = new Pencil(loadPencil(1987))
const p1988 = new Pencil(loadPencil(1988))
const p1989 = new Pencil(loadPencil(1989))
const p1990 = new Pencil(loadPencil(1990))
const p1991 = new Pencil(loadPencil(1991))
const p1992 = new Pencil(loadPencil(1992))
const p1993 = new Pencil(loadPencil(1993))
const p1994 = new Pencil(loadPencil(1994))
const p1995 = new Pencil(loadPencil(1995))
const p1996 = new Pencil(loadPencil(1996))
const p1997 = new Pencil(loadPencil(1997))
const p1998 = new Pencil(loadPencil(1998))
const p1999 = new Pencil(loadPencil(1999))
const p2000 = new Pencil(loadPencil(2000))
const p2001 = new Pencil(loadPencil(2001))
const p2002 = new Pencil(loadPencil(2002))
const p2003 = new Pencil(loadPencil(2003))
const p2004 = new Pencil(loadPencil(2004))
const p2005 = new Pencil(loadPencil(2005))
const p2006 = new Pencil(loadPencil(2006))
const p2007 = new Pencil(loadPencil(2007))
const p2008 = new Pencil(loadPencil(2008))
const p2009 = new Pencil(loadPencil(2009))
const p2010 = new Pencil(loadPencil(2010))
const p2011 = new Pencil(loadPencil(2011))
const p2012 = new Pencil(loadPencil(2012))
const p2013 = new Pencil(loadPencil(2013))
const p2014 = new Pencil(loadPencil(2014))
const p2015 = new Pencil(loadPencil(2015))
const p2016 = new Pencil(loadPencil(2016))
const p2017 = new Pencil(loadPencil(2017))
const p2018 = new Pencil(loadPencil(2018))
const p2019 = new Pencil(loadPencil(2019))
const p2020 = new Pencil(loadPencil(2020))
const p2021 = new Pencil(loadPencil(2021))

const pencils = [p1985, p1986, p1987, p1988, p1989, p1990, p1991, p1992, p1993, p1994, p1995, p1996, p1997, p1998, p1999, p2000, p2001, p2002, p2003, p2004, p2005, p2006, p2007, p2008, p2009, p2010, p2011, p2012, p2013, p2014, p2015, p2016, p2017, p2018, p2019, p2020, p2021]



function adjustTipAndEraser(pencil) {
  // get current middle length
  const currentMiddleLength = (0.146 * pencil.middle.scale.z * scaleFactor)
  // set position of tip
  pencil.tip.position.x = - currentMiddleLength / 2  + 0.0031*scaleFactor
  // set position of eraser
  pencil.eraser.position.x = currentMiddleLength / 2 + 0.0031*scaleFactor
}

function leftAlignPencil(pencil) {
  // get middle length
  const currentMiddleLength = (0.146 * pencil.middle.scale.z * scaleFactor)
  // get tip length
  const tipLength = 0.0307 * scaleFactor
  // get eraser length
  const eraserLength = 0.0245 * scaleFactor
  // total length
  const totalLength = currentMiddleLength + tipLength + eraserLength
  pencil.whole.position.setX((totalLength/2) - 0.1345 - 2.25)

  pencil.whole.position.setZ(pencil.zPos)
}

//Scale Pencils:

function scalePencil(pencil) {
  const newScale = data[pencil.year] * 14
  gsap.to(pencil.middle.scale, 0.85, {x: 1, y: 1, z: newScale})
}

setTimeout(function(){
  pencils.forEach((pencil) => scalePencil(pencil))
  pencils.forEach((pencil) => adjustTipAndEraser(pencil))
}, 2000)




//Hover
var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

var hoveredObject
var hoverScale = 1.1
var hoverLift = 0.125

document.addEventListener('mousemove', onMouseMove, false)
const totalBooks = document.querySelector("#totalBooks");
const blackBooks = document.querySelector("#blackBooks");

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera)
  var intersects = raycaster.intersectObjects(scene.children)
  
  if (intersects.length > 0) { // if there is an intersection
    // first get the object
    var object = intersects[0].object
    // iterate to get to the top group:
    while (object.parent.parent != null) {
      object = object.parent
    }
    // only proceed if the intersection is not the current hovered object
    if (object !== hoveredObject) {
      // so it's a new object. was there a previous hovered object? if so, revert that
      if (hoveredObject) {
        //hoveredObject.middle.scale.z /= hoverScale
        gsap.to(hoveredObject.middle.scale, 0.25, {z: hoveredObject.middle.scale.z / hoverScale})
        gsap.to(hoveredObject.position, 0.25, {y: 0})
      }
      // set hoveredObject to the current object
      hoveredObject = object
      // grow the new hovered object
      //hoveredObject.middle.scale.z *= hoverScale
      gsap.to(hoveredObject.middle.scale, 0.25, {z: hoveredObject.middle.scale.z * hoverScale})
      gsap.to(hoveredObject.position, 0.25, {y: hoverLift})
      // log name
      console.log(hoveredObject.name)
      const year = hoveredObject.name
      const total = wholeData[year][0]
      const black = wholeData[year][1]
      const pct = wholeData[year][2]
      totalBooks.textContent = "In " + year + ', an estimated ' + total + ' books were published.'
      blackBooks.textContent = "Of those, " + black + ', or ' + pct + "%, were written by Black authors."
    }
  } else {
    // if there's no intersection, reset hovered object
    if (hoveredObject) {
      //hoveredObject.middle.scale.z /= hoverScale
      gsap.to(hoveredObject.middle.scale, 0.25, {z: hoveredObject.middle.scale.z / hoverScale})
      gsap.to(hoveredObject.position, 0.25, {y: 0})
      hoveredObject = null
    }
  }
}



//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const ptLight = new THREE.PointLight(0xffffff, 0.75, 100)
ptLight.position.set(10, 10, 0)
scene.add(ptLight)

const backLight = new THREE.PointLight(0xffffff, 0.25, 100)
backLight.position.set(-10, -10, 0)
scene.add(backLight)

const ambLight = new THREE.AmbientLight(0xffffff, 0.80)
scene.add(ambLight)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-0.25, 11, 0)
//camera.position.set(0, 14, 8)
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas}, {alpha: true})
renderer.setClearColor ( 0x000000, 0)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.render(scene, camera)





//Controls
const controls = new OrbitControls(camera, canvas) // experiment with other controls in import statement?
controls.enableDamping = true
controls.enableZoom = false
controls.enablePan = false
controls.enableRotate = false
//controls.autoRotate = true
//controls.autoRotateSpeed = 10

//Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

//Loop
const loop = () => {
  controls.update()
  pencils.forEach((pencil) => adjustTipAndEraser(pencil))
  pencils.forEach((pencil) => leftAlignPencil(pencil))
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()
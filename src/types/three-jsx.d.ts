import { Object3DNode, extend } from '@react-three/fiber'
import { Mesh, Group, BoxGeometry, MeshStandardMaterial, LineSegments, EdgesGeometry, LineBasicMaterial, AmbientLight, PointLight, GridHelper } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: Object3DNode<Group, typeof Group>
      mesh: Object3DNode<Mesh, typeof Mesh>
      boxGeometry: Object3DNode<BoxGeometry, typeof BoxGeometry>
      meshStandardMaterial: Object3DNode<MeshStandardMaterial, typeof MeshStandardMaterial>
      lineSegments: Object3DNode<LineSegments, typeof LineSegments>
      edgesGeometry: Object3DNode<EdgesGeometry, typeof EdgesGeometry>
      lineBasicMaterial: Object3DNode<LineBasicMaterial, typeof LineBasicMaterial>
      ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>
      pointLight: Object3DNode<PointLight, typeof PointLight>
      gridHelper: Object3DNode<GridHelper, typeof GridHelper>
    }
  }
}

export {}


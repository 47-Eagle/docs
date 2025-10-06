declare module '@theatre/r3f' {
  import { Object3D } from 'three'
  import { ReactThreeFiber } from '@react-three/fiber'
  import { FC, ReactNode } from 'react'
  import { ISheet } from '@theatre/core'

  interface EditableProxy {
    group: FC<any>
    mesh: FC<any>
    pointLight: FC<any>
  }

  export const editable: EditableProxy & (<T>(Component: T) => T)
  export const SheetProvider: FC<{ sheet: ISheet; children: ReactNode }>
  export const PerspectiveCamera: FC<any>
} 
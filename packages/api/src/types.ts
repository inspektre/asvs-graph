export type Asvs = AsvsInterface[] 

export interface AsvsInterface {
  level1: boolean
  level2: boolean
  level3: boolean
  chapterId: string
  chapterName: string
  sectionId: string
  sectionName: string
  requirementId: string
  description: string
  cweId?: number
  nistId: any
}
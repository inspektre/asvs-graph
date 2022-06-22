export const ASVS_CREATE = `UNWIND $cypherList AS i MERGE (a: Asvs
  {
    ID: apoc.create.uuid(),
    level1: i.level1,
    level2: i.level2,
    level3: i.level3,
    chapterId: i.chapterId,
    chapterName: i.chapterName,
    sectionId: i.sectionId,
    sectionName: i.sectionName,
    requirementId: i.requirementId,
    description: i.description,
    cweId: i.cweId,
    nistId: i.nistId,
    createdAt: datetime(),
    updatedAt: datetime()
  })
  ON MATCH SET 
  a.level1=i.level1,
  a.level2=i.level2,
  a.level3=i.level3,
  a.chapterId=i.chapterId,
  a.chapterName=i.chapterName,
  a.sectionId=i.sectionId,
  a.sectionName=i.sectionName,
  a.requirementId=i.requirementId,
  a.description=i.description,
  a.cweId=i.cweId,
  a.nistId=i.nistId,
  a.updatedAt=datetime();
`;
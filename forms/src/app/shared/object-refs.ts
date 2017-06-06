class ObjectRef {
  constructor(public refId: number, public object: any) { }
}

export class ObjectRefs {
  public refId = 0;
  public references: ObjectRef[] = [];
  
  addRef(object: any) {
    this.references.push(new ObjectRef(this.refId++, object));
  }

  getRef(object: any) {
    return this.references.find(ref => ref.object === object);
  }

  removeRef(object: any) {
    let ref = this.getRef(object);
    if (ref) {
      this.references.splice(this.references.indexOf(ref), 1);
    }
  }

  getRefId(object: any) {
    let ref = this.getRef(object);
    return ref ? ref.refId : null;
  }
}

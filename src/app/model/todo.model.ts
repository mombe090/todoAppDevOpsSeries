export class TodoModel {
  constructor(
    public title: string,
    public status: boolean,
    public createdAt?: string,
    public updatedAt?: string,
    public id?: number,
    public isEditing = false
  ) {}
}

export class TodoModel {
  constructor(
    public title: string,
    public status: boolean,
    public createdAt?: string,
    public updatedAt?: string,
    public id?: string,
    public isEditing = false
  ) {}
}
